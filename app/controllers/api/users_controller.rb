# frozen_string_literal: true

module Api
  class UsersController < ApiController
    skip_before_action :authenticate_user!, only: %i[slack authorize_oauth_slack]
    skip_before_action :verify_organization_approval

    def index
      render json: { user: UserSerializer.new(current_user).serializable_hash[:data][:attributes] }, status: :ok
    end

    def authorize_oauth_slack
      resp = Clients::Slack::Oauth.new(params['code']).authenticate!
      organization_token = resp['access_token']
      organization_user_token = resp['authed_user']['access_token']
      user_info = Slack::Web::Client.new.openid_connect_userInfo(token: organization_user_token)
      @user = UsersService.new.create_notification_provider(user_info, organization_token)
      if @user.present?
        sign_in @user
        render json: { user: UserSerializer.new(@user).serializable_hash[:data][:attributes] }
      else
        render json: { errors: @user&.errors&.full_messages || ['Internal server error'] }, status: :internal_server_error
      end
    end

    def slack
      client = Slack::Web::Client.new
      resp = client.openid_connect_token(
        code: params['code'],
        client_id: ENV.fetch('SLACK_CLIENT_ID', nil),
        client_secret: ENV.fetch('SLACK_CLIENT_SECRET', nil),
        redirect_uri: "#{ENV.fetch('REACT_APP_API_URL', nil)}oauth/slack"
      )
      load_user(resp.access_token)
    end

    private

    def load_user(access_token)
      client = Slack::Web::Client.new
      user_info = client.openid_connect_userInfo(token: access_token)
      @user = UsersService.new.load_from_slack(user_info)
      if @user.present?
        sign_in @user
        render json: { user: UserSerializer.new(@user).serializable_hash[:data][:attributes] }
      else
        render json: { errors: @user&.errors&.full_messages || ['Internal server error'] }, status: :internal_server_error
      end
    end
  end
end
