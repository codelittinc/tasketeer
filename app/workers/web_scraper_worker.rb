# frozen_string_literal: true

class WebScraperWorker
  include Sidekiq::Worker

  def perform(payload)
    request = JSON.parse(payload)
    links = request['links']
    domain = request['domain']
    domain_name = domain['name']
    domain_id = domain['id']
    organization_id = domain['organization_id']
    link = links.shift

    absolute_url = URI.join("https://#{domain_name}", link)

    new_web_page_content = WebScraperService.new.scrape(absolute_url, domain_name)

    web_page_attrs = {
      content: new_web_page_content.text,
      domain_id:,
      organization_id:
    }

    WebPage.find_or_initialize_by(url: absolute_url.to_s).update!(web_page_attrs)

    web_page_domain = Domain.find(domain_id)

    new_links_list = links

    domain_pages_amount = web_page_domain.web_pages.length

    new_links_list_length = 5 - domain_pages_amount

    new_links_list = (links | new_web_page_content.links.uniq).take(new_links_list_length) if new_links_list_length.positive? && links.length < new_links_list_length

    if new_links_list.empty? || new_links_list_length <= 0
      web_page_domain.update!(indexed: true)
    else
      WebScraperWorker.perform_in(3.seconds, { links: new_links_list, domain: }.to_json)
    end
  end
end
