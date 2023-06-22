# frozen_string_literal: true

module Clients
  module Notifications
    class Reactji < Client
      def send(reaction, channel, notification_id)
        request('/reactions', {
                  reaction:,
                  channel:,
                  notification_id:
                })
      end
    end
  end
end
