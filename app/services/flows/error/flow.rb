# frozen_string_literal: true

require 'json'

module Flows
  module Error
    class Flow < BaseFlow
      delegate :name, :body, to: :parser

      def execute
        raise body.to_json if body

        raise "Error manually raised by Flows::Notifications::Error::Flow at #{DateTime.now}"
      end

      def can_execute?
        @params[:name] == 'flow-raise-exception'
      end
    end
  end
end
