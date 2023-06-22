# frozen_string_literal: true

module Flows
  class SlackAppOpenedFlow < BaseFlow
    def execute
      welcome_message_sent = SlackUserSettings.find_by(slack_user_id:)&.messages_tab_opened_at
      return if welcome_message_sent.present?

      organization = Organization.find_by(slack_team_id: @params[:team_id])
      Clients::Notifications::Channel.new(organization).send(
        BotSetting.last.welcome_message,
        slack_channel
      )

      SlackUserSettings.find_or_create_by!(slack_user_id:) do |user_settings|
        user_settings.messages_tab_opened_at = Time.zone.now
      end
    end

    def flow?
      @params[:type] == 'event_callback' &&
        %w[app_home_opened].include?(@params[:event]&.dig(:type))
    end

    private

    def message_timestamp
      return nil unless mention?

      @params[:event][:ts]
    end

    def slack_channel
      @params[:event][:channel]
    end

    def slack_user_id
      @params[:event][:user]
    end
  end
end
