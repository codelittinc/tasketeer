# frozen_string_literal: true

module Api
  module Admin
    class ApiAdminController < ApiController
      before_action :verify_admin

      private

      def verify_admin
        return if current_user.admin?

        render json: {
                 errors: ['Only admins can access this page.'],
                 error_code: ErrorCodes::UNAUTHORIZED_ONLY_ADMINS
               },
               status: :unauthorized
      end
    end
  end
end
