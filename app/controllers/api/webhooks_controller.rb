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
      @instance = Webhook.new(url:, organization_id:)

      if @instance.save
        render json: { webhook: @instance }, status: :created
      else
        render json: @instance.errors, status: :unprocessable_entity
      end
    end

    def update
      if @instance.update(url:)
        render json: { webhook: @instance }, status: :created
      else
        render json: @instance.errors, status: :unprocessable_entity
      end
    end

    private

    def webhook_params
      params.require(:webhook).permit(:url, :id)
    end

    def set_instance
      @instance = Webhook.find_by(id: params[:id], organization_id:)
    end

    def url
      webhook_params[:url]
    end

    def organization_id
      current_user.selected_organization.id
    end
  end
end
