# frozen_string_literal: true

require 'google/cloud/text_to_speech'
require 'base64'

module Clients
  module TextToSpeech
    class Client
      def initialize
        @client = Google::Cloud::TextToSpeech.text_to_speech do |config|
          config.credentials = JSON.parse(ENV.fetch('GOOGLE_TEXT_TO_SPEECH_CREDENTIALS', nil))
        end
        @voice = {
          language_code: 'en-US',
          name: 'en-US-Neural2-D',
          ssml_gender: 'MALE'
        }
        @audio_config = { audio_encoding: 'MP3' }
      end

      def speak(text)
        input_text = { text: }

        response = @client.synthesize_speech(
          input: input_text,
          voice: @voice,
          audio_config: @audio_config
        )

        Base64.encode64(response.audio_content)
      end
    end
  end
end
