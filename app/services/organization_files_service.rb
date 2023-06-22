# frozen_string_literal: true

class OrganizationFilesService
  def delete_file(file_id)
    Rails.logger.info "Removing file id: #{file_id}"

    begin
      file = OrganizationFile.find(file_id)
      box_id = file.box_id

      # delete file from database
      file.destroy!

      # delete external resource metadata (file content that is indexed)
      ExternalResourceMetadata.where(box_file_id: box_id).destroy_all

      # delete file from box
      @box_client = Clients::Box::Client.new
      @box_client.delete_file(box_id)

      true
    rescue StandardError => e
      Rails.logger.error "Error deleting the file #{file_id}: #{e.inspect}"
      false
    end
  end
end
