# frozen_string_literal: true

module Clients
  module Notifications
    class Client
      def initialize(owner = nil)
        @owner = owner
        @key = key
        @url = ENV.fetch('NOTIFICATIONS_API_URL', nil)
      end

      def authorization
        "Bearer #{@key}"
      end

      def build_url(path)
        "#{@url}#{path}"
      end

      def request(path, body)
        url = build_url(path)
        response = Request.post(url, authorization, body)
        JSON.parse(response.body) if response&.body
      end

      private

      def key
        return @owner&.notifications_key if @owner.is_a?(Organization)
        return ENV.fetch('NOTIFICATIONS_API_KEY', nil) if @owner.nil?
      end
    end
  end
end
