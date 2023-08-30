# frozen_string_literal: true

module Api
  class WebhooksController < ApplicationController
    before_action :set_instance, only: %i[show update]

    def show
      if @instance
        render json: { webhook: @instance }, status: :ok
      else
        render json: { error: 'API Secret not found' }, status: :not_found
      end
    end

    def create
      @instance = ApiCredential.new(link:, organization_id:)

      if @instance.save
        render json: { webhook: @instance }, status: :created
      else
        render json: @instance.errors, status: :unprocessable_entity
      end
    end

    def update
      if @instance.update(link:)
        render json: { webhook: @instance }, status: :created
      else
        render json: @instance.errors, status: :unprocessable_entity
      end
    end

    private

    def webhook_params
      params.require(:webhook).permit(:link, :id)
    end

    def set_instance
      @instance = ApiCredential.find_by(id: params[:id], organization_id:)
    end

    def link
      params[:link]
    end

    def organization_id
      current_user.selected_organization.id
    end
  end
end
