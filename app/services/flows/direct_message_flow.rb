# frozen_string_literal: true

module Flows
  class DirectMessageFlow < BaseFlow
    def execute
      org_id = organization_id.to_s
      search_uuid = Clients::NlpProcessor::Client.new.search(message, org_id, user.to_s)
      raise 'Could not process the search in nlp-processor' if search_uuid.blank?

      # start a background job to get the nlp response and send it to slack
      SendSearchResponseWorker.perform_in(3.seconds, {
        retry: 0,
        search_uuid:,
        slack_channel:,
        message_timestamp:,
        organization_id: org_id
      }.to_json)
    end

    def flow?
      @params[:type] == 'event_callback' &&
        %w[message app_mention].include?(@params[:event]&.dig(:type)) &&
        human_message? &&
        message.present?
    end

    private

    def message_timestamp
      return nil unless mention?

      @params[:event][:ts]
    end

    def mention?
      @params[:event][:type] == 'app_mention'
    end

    def human_message?
      @params[:event][:bot_id].blank?
    end

    def user
      @params[:event][:user]
    end

    def message
      @message ||= @params[:event][:text]&.gsub(/<[^>]*>/, '')&.chomp&.strip
    end

    def slack_channel
      @params[:event][:channel]
    end

    def organization_id
      organization = Organization.find_by(slack_team_id: @params[:team_id])
      raise "Organization not found for slack_team_id: #{@params[:team_id]}" unless organization

      organization.id
    end
  end
end
