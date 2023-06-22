# frozen_string_literal: true

module Clients
  module Notifications
    class Notification < Client
      def show(third_party_id)
        return unless third_party_id

        url = build_url("/api/provider?team_id=#{third_party_id}")
        Request.get(url)
      end
    end
  end
end
