# frozen_string_literal: true

module Api
  class RolesController < ApiController
    before_action :verify_admin

    def index
      render json: { roles: Role.all.order(:name) }
    end
  end
end
