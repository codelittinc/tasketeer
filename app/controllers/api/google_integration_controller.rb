# frozen_string_literal: true

module Api
  class GoogleIntegrationController < ApiController
    before_action :verify_admin

    def index_google_drive
      render json: { message: 'Google auth token and google folder id are required.' }, status: :bad_request and return if params[:google_token].blank? || params[:google_folder_id].blank?

      ExternalResourceMetadataWorker.perform_in(
        3.seconds,
        current_user.selected_organization.id,
        params[:google_token],
        params[:google_folder_id]
      )

      render json: { success: true }, status: :ok
    end
  end
end
