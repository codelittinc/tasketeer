# frozen_string_literal: true

require 'uri'
require 'net/http'

module Clients
  module Slack
    class Oauth
      SLACK_AUTHENTICATE_URL = 'https://slack.com/api/oauth.v2.access'

      def initialize(code)
        @code = code
      end

      def authenticate!
        data =  {
          code: @code,
          client_id: ENV.fetch('SLACK_CLIENT_ID', nil),
          client_secret: ENV.fetch('SLACK_CLIENT_SECRET', nil),
          redirect_uri: "#{ENV.fetch('REACT_APP_API_URL', nil)}authorize_oauth/slack"
        }

        post(data)
      end

      private

      def post(body)
        encoded_data = URI.encode_www_form(body)

        uri = URI.parse("#{SLACK_AUTHENTICATE_URL}?#{encoded_data}")
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true
        req = Net::HTTP::Get.new(uri.request_uri)
        result = http.request(req)

        JSON.parse(result.body) if result&.body
      end
    end
  end
end
