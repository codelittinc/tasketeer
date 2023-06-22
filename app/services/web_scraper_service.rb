# frozen_string_literal: true

class WebScraperService
  class CrawlerResult
    attr_reader :text, :links

    def initialize(text, links)
      @text = text
      @links = links
    end
  end

  def scrape(url, domain_name)
    response = HTTParty.get(url)
    content = Nokogiri::HTML(response)

    links = extract_links(content, url, domain_name)

    remove_unwanted_elements(content)

    text = content.text.gsub(/[\n\t]/, ' ')

    CrawlerResult.new(text, links)
  end

  private

  def extract_links(content, base_url, domain_name)
    return [] if domain_name.blank?

    content.xpath('//a/@href').map do |link|
      link_parsed = URI.join(base_url, link.value).host
      link.value if link_parsed == domain_name
    rescue URI::InvalidURIError
      next
    end.compact
  end

  def remove_unwanted_elements(content)
    content.xpath('//script|//style|//a|//img')&.remove
  end
end
