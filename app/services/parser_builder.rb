# frozen_string_literal: true

class ParserBuilder
  SERVICES_DIR = './app/services/'

  def self.build(params)
    legacy_parser = LegacyParserBuilder.build(params)

    return legacy_parser if legacy_parser.present?

    parsers = classnames.map do |classname|
      ruby_class = Object.const_get(classname)
      ruby_class.new(params)
    end.compact

    parsers.find(&:can_parse?) || Parsers::DefaultParser.new(params)
  end

  def self.files
    paths = Dir.glob("#{SERVICES_DIR}flows/**/*").reject { |file| File.directory?(file) }

    paths.grep(/parser.rb$/)
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
end
