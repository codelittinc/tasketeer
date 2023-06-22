# frozen_string_literal: true

module Clients
  class ClientParser
    def initialize(json)
      @json = json.instance_of?(Sawyer::Resource) ? json : json.with_indifferent_access
      parse!
    end

    def parse!
      throw Error.new('Implement this method!')
    end
  end
end
