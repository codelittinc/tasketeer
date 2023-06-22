# frozen_string_literal: true

module Flows
  module Ai
    module Gpt
      class Flow < BaseFlow
        delegate :user_name, :prompt, :text, to: :parser

        def execute
          response = Clients::Gpt::Client.new.generate(prompt)

          message = "Prompt: \n\n *#{prompt}* \n \n Response: \n\n #{response}"

          Clients::Notifications::Direct.new(organization).send(message, user_name)
        end

        def can_execute?
          text&.split&.first == 'ask'
        end

        def organization
          return @organization if @organization

          notification = Clients::Notifications::Notification.new.show(@params[:team_id])
          notifications_id = notification['id']
          return nil if notifications_id.nil?

          @organization = Organization.find_by(notifications_id:)
          @organization
        end
      end
    end
  end
end
