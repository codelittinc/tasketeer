# frozen_string_literal: true

def load_fixture(*args)
  JSON.parse(File.read(File.join(['spec', 'fixtures', 'services', args].flatten))).with_indifferent_access
end

def load_flow_fixture(filename)
  load_fixture('flows', filename)
end
