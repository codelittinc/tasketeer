# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    respond_to :json
    skip_before_action :verify_authenticity_token

    def new
      render 'app/index'
    end

    private

    def respond_with(resource, _opts = {})
      render json: {
        user: UserSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    end

    def respond_to_on_destroy
      head :no_content
    end
  end
end
