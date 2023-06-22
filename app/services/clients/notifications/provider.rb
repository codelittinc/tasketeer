# frozen_string_literal: true

module Clients
  module Notifications
    class Provider < Client
      def create(team_id, team_name, access_token)
        request('/api/provider', {
                  team_id:,
                  team_name:,
                  access_token:
                })
      end
    end
  end
end
