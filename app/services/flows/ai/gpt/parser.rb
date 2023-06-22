# frozen_string_literal: true

module Flows
  module Ai
    module Gpt
      class Parser < Parsers::BaseParser
        attr_reader :prompt, :user_name, :text

        def can_parse?
          @json[:text]&.split&.first == 'ask' && @json[:team_id]
        end

        def parse!
          @text = @json[:text]
          @prompt = @text.gsub('ask', '').strip
          @user_name = @json[:user_name]
        end
      end
    end
  end
end
