# frozen_string_literal: true

module Api
  class OrganizationFilesController < ApiController
    before_action :verify_admin

    def index
      @files = OrganizationFile.order(created_at: :desc).where(organization: current_user.selected_organization)
      render json: { files: @files }, status: :ok
    end

    def index_files
      ExternalResourceMetadataWorker.perform_in(3.seconds, current_user.selected_organization.id)
      render json: { success: true }, status: :ok
    end

    def show_processing_files
      processing_files = ExternalResourceMetadata.where(indexed: false, processing: true, organization_id: current_user.selected_organization.id)
      render json: { files: processing_files }, status: :ok
    end

    def create
      attachments = params[:files]
      @box_client = Clients::Box::Client.new

      if attachments.is_a?(Array)
        attachments.each do |attachment|
          upload_file(attachment)
        end
      else
        upload_file(attachments)
      end

      render json: { success: true }, status: :ok
    end

    def destroy
      file_id = params[:id]
      result = OrganizationFilesService.new.delete_file(file_id)
      render json: { success: true }, status: :ok if result
      render json: { success: false, errors: ['Error deleting the file'] }, status: :bad_request unless result
    end

    private

    def upload_file(attachment)
      organization_file = OrganizationFile.new
      organization_file.organization = current_user.selected_organization

      folder = @box_client.folder(organization_file.organization.name)
      file_info = @box_client.upload(attachment.tempfile, attachment.original_filename, folder)
      organization_file.box_id = file_info.id
      organization_file.name = attachment.original_filename
      organization_file.save!
      BoxFileReaderWorker.perform_in(5.seconds, { box_file_id: file_info.id, organization: organization_file.organization.id }.to_json)
    end
  end
end
