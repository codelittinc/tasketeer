# frozen_string_literal: true

class FlowBuilder
  SERVICES_DIR = './app/services/'

  def self.build(params)
    params_with_indifferent_access = JSON.parse(params.json).with_indifferent_access

    flows = classnames.map do |classname|
      ruby_class = Object.const_get(classname)
      ruby_class.new(params_with_indifferent_access)
    rescue StandardError
      nil
    end.compact
    flows.find(&:flow?)
  end

  def self.classnames
    files.map do |full_path|
      clean_file_path = full_path.gsub(SERVICES_DIR, '')
      path = clean_file_path.split('/')
      dir = path[0...-1]
      dir_class = dir.map { |d| d.split('_').map(&:capitalize).join }.join('::')

      file = path[-1].gsub('.rb', '')
      file_class = file.split('_').map(&:capitalize).join

      "#{dir_class}::#{file_class}"
    end.compact
  end

  def self.files
    paths = Dir.glob("#{SERVICES_DIR}flows/**/*").reject { |file| File.directory?(file) }

    paths.reject do |file|
      file.include?('base')
    end
  end
end
