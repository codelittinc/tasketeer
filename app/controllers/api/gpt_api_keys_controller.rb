# frozen_string_literal: true

# app/controllers/api/gpt_api_keys_controller.rb
module Api
  class GptApiKeysController < ApplicationController
    def index
      @api_key = GptApiKey.find_by(organization_id: current_user.selected_organization.id)

      if @api_key
        render json: { api_key: @api_key }, status: :ok
      else
        render json: { error: 'API Key not found' }, status: :not_found
      end
    end

    def create
      @api_key = GptApiKey.find_or_initialize_by(api_key_params)
      @api_key.value = api_key_params[:value][-4..]
      @api_key.organization_id = current_user.selected_organization.id

      if @api_key.save
        Clients::NlpProcessor::Client.new.save_gpt_key(api_key_params[:value], @api_key.organization_id)
        render json: { api_key: @api_key }, status: :created
      else
        render json: @api_key.errors, status: :unprocessable_entity
      end
    end

    def destroy
      @api_key = GptApiKey.find(params[:id])
      @api_key.delete
      Clients::NlpProcessor::Client.new.delete_gpt_key(@api_key.organization_id)
      head :no_content
    end

    private

    def api_key_params
      params.require(:api_key).permit(:value, :id)
    end
  end
end
