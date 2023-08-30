# frozen_string_literal: true

module Api
  class ApiCredentialsController < ApplicationController
    before_action :set_instance, only: %i[show update]

    def show
      if @instance
        render json: { api_credential: @instance }, status: :ok
      else
        render json: { error: 'API Secret not found' }, status: :not_found
      end
    end

    def create
      @instance = ApiCredential.new(secret_key:, organization_id:)

      if @instance.save
        render json: { api_credential: @instance }, status: :created
      else
        render json: @instance.errors, status: :unprocessable_entity
      end
    end

    def update
      if @instance.update(secret_key:)
        render json: { api_credential: @instance }, status: :created
      else
        render json: @instance.errors, status: :unprocessable_entity
      end
    end

    private

    def api_credential_params
      params.require(:api_credential).permit(:secret_key, :id)
    end

    def set_instance
      @instance = ApiCredential.find_by(id: params[:id], organization_id:)
    end

    def secret_key
      params[:secret_key]
    end

    def organization_id
      current_user.selected_organization.id
    end
  end
end
