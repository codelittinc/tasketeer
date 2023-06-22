# frozen_string_literal: true

module Flows
  class BaseFlow
    delegate :can_parse?, to: :parser

    def initialize(params)
      @params = params
    end

    def pre_run
      Rails.logger.debug { "Starting #{self.class.name}" }
    end

    def run
      pre_run
      parse_data!
      execute
      pos_run
    end

    def pos_run
      Rails.logger.debug { "Finishing #{self.class.name}" }
    end

    def execute
      throw Error.new('Implement this method!')
    end

    def flow?
      return unless can_parse?

      parse_data!
      can_execute?
    end

    def can_execute?
      raise 'override this method'
    end

    def parse_data!
      parser.parse!
    end

    def parser
      @parser ||= ParserBuilder.build(@params)
    end
  end
end
