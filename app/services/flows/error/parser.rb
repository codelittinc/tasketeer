# frozen_string_literal: true

module Flows
  module Error
    class Parser < Parsers::BaseParser
      attr_reader :name, :body

      def can_parse?
        @json[:name] == 'flow-raise-exception'
      end

      def parse!
        @name = @json[:name].downcase
        @body = @json[:body]
      end
    end
  end
end
