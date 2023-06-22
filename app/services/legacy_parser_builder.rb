# frozen_string_literal: true

class LegacyParserBuilder
  def self.build(params)
    classes = classnames.map do |classname|
      class_const = Object.const_get("Parsers::#{classname}")
      class_const.new(params)
    end

    classes.find(&:can_parse?)
  end

  def self.files
    Dir['./app/services/parsers/*'].filter do |file|
      file.include?('parser')
    end
  end

  def self.classnames
    files.map do |file|
      regex = %r{/([a-z_]+).rb}
      file.match(regex)[1].split('_').map(&:capitalize).join if file.match?(regex)
    end.compact
  end
end
