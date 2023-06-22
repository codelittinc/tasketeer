# frozen_string_literal: true

require 'boxr'
require 'rest-client'
require 'json'

module Clients
  module Box
    class Client
      def initialize
        @access_token = ENV.fetch('BOX_ACCESS_TOKEN', nil)
        @client = Boxr::Client.new(@access_token)
      end

      def upload(file, file_name, folder)
        @client.upload_file_from_io(file, folder, name: "#{SecureRandom.uuid}-#{file_name}")
      end

      def folder(name)
        @client.folder_from_path("/#{name}")
      rescue StandardError => _e
        @client.create_folder(name, Boxr::ROOT)
      end

      def delete_file(box_file_id)
        @client.delete_file(box_file_id)
      end

      def file_representations(box_file_id)
        headers = {
          content_type: :json,
          accept: :json,
          authorization: "Bearer #{@access_token}",
          'x-rep-hints': '[extracted_text]'
        }

        # call box api to get the file representations
        response = RestClient.get "https://api.box.com/2.0/files/#{box_file_id}?fields=representations", headers
        representation = JSON.parse(response.body)
        return unless representation.dig('representations', 'entries')

        # get the extracted text representation urls
        urls = []
        entries = representation.dig('representations', 'entries')
        entries.each do |item|
          url = item.dig('content', 'url_template') if item['representation'] == 'extracted_text'
          url = url.gsub('{+asset_path}', '') if url
          urls << url if url
        end

        # return the extracted text representation urls
        urls
      end

      def file_content(box_file_id)
        urls = file_representations(box_file_id)
        raise 'Box file representations not found' unless urls

        content = ''
        urls.each do |url|
          response = RestClient.get url, authorization: "Bearer #{@access_token}"
          content += response.body if response.code == 200
        end

        content
      end
    end
  end
end
