# frozen_string_literal: true

require 'rest-client'
require 'json'

module Clients
  module NlpProcessor
    class Client
      def initialize
        @api_key = ENV.fetch('NLP_PROCESSOR_KEY', nil)
        @api_url = ENV.fetch('NLP_PROCESSOR_URL', nil)
      end

      def generate_file_index(content, organization)
        body = { 'organization' => organization, 'content' => content }.to_json
        headers = { content_type: :json, accept: :json, Authorization: @api_key }
        response = RestClient::Request.execute(method: :post, url: "#{@api_url}/contents", payload: body, headers:, timeout: 600)
        raise "NLP Processor returned http status code: #{response.code}" unless response.code == 200

        JSON.parse(response.body)['document_id']
      end

      def get_file_indexing_status(process_uuid)
        headers = {
          content_type: :json,
          accept: :json,
          authorization: @api_key
        }
        response = RestClient::Request.execute(method: :get, url: "#{@api_url}/contents/#{process_uuid}", headers:, timeout: 600)
        JSON.parse(response.body) if response.code == 200
      end

      def search(query, organization, user)
        # TODO: This is a temporary solution to generate a unique chat_id per user and organization
        #       This should be changed to the Chat ID once we have multiple chats
        chat_id = "#{organization}_#{user}"

        headers = {
          content_type: :json,
          accept: :json,
          authorization: @api_key,
          params: { organization:, 'q' => query, chat_id: }
        }
        response = RestClient::Request.execute(method: :get, url: "#{@api_url}/search", headers:, timeout: 600)
        return JSON.parse(response.body)['response'] if response.code == 200
      end

      def get_by_process_uuid(process_uuid)
        headers = {
          content_type: :json,
          accept: :json,
          authorization: @api_key
        }
        response = RestClient::Request.execute(method: :get, url: "#{@api_url}/search/#{process_uuid}", headers:, timeout: 600)
        JSON.parse(response.body) if response.code == 200
      end

      def save_gpt_key(api_key, organization_id)
        headers = {
          content_type: :json,
          accept: :json,
          authorization: @api_key
        }

        body = {
          api_key:,
          organization_id:
        }

        response = RestClient::Request.execute(method: :post, url: "#{@api_url}/api_key", payload: body.to_json, headers:, timeout: 600)
        JSON.parse(response.body) if response.code == 200
      end

      def delete_gpt_key(organization_id)
        headers = {
          content_type: :json,
          accept: :json,
          authorization: @api_key
        }

        response = RestClient::Request.execute(method: :delete, url: "#{@api_url}/api_key/#{organization_id}", headers:, timeout: 600)
        JSON.parse(response.body) if response.code == 200
      end
    end
  end
end
