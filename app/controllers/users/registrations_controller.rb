# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    respond_to :json

    def new
      render 'app/index'
    end

    def create
      build_resource(sign_up_params)
      if resource.save
        sign_in(resource_name, resource)
        render json: { user: UserSerializer.new(resource).serializable_hash[:data][:attributes] }
      else
        render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
      end
    end

    protected

    def sign_up_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end

    # If you have extra params to permit, append them to the sanitizer.
    # def configure_account_update_params
    #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
    # end

    # The path used after sign up.
    # def after_sign_up_path_for(resource)
    #   super(resource)
    # end

    # The path used after sign up for inactive accounts.
    # def after_inactive_sign_up_path_for(resource)
    #   super(resource)
    # end
  end
end
