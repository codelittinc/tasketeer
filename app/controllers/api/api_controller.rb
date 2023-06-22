# frozen_string_literal: true

module Api
  class ApiController < ApplicationController
    before_action :authenticate_user!, :verify_organization_approval
    skip_before_action :verify_authenticity_token

    def verify_admin
      return if current_user.admin?

      render json: {
               errors: ['Only admins can access this page.'],
               error_code: ErrorCodes::UNAUTHORIZED_ONLY_ADMINS
             },
             status: :unauthorized
    end

    private

    def verify_organization_approval
      return if current_user.selected_organization&.approved?

      render json: {
               errors: ['Your organization is not approved yet.'],
               error_code: ErrorCodes::ORGANIZATION_NOT_APPROVED
             },
             status: :unauthorized
    end
  end
end
