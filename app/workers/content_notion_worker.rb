# frozen_string_literal: true

class ContentNotionWorker
  include Sidekiq::Worker

  def perform(organization_id)
    return if organization_id.nil?

    Rails.logger.info "Saving notion content for organization #{organization_id}."

    @organization = Organization.find_by(id: organization_id)

    # destroy old content from organization
    ExternalResourceMetadata.destroy_by(organization: @organization, key:)

    # destroy old pages from organization
    NotionPage.destroy_by(organization: @organization)

    page_tree_content = Clients::NotionApi::Client.new(@organization.notion_api_key).page_tree_content
    value = page_tree_content['content']
    root_pages = page_tree_content['pages']

    create_notion_pages(root_pages, nil)

    # save most recent notion content from organization
    @external_resource_metadata = ExternalResourceMetadata.new(
      key:,
      value:,
      processing: false,
      organization: @organization
    )
    @external_resource_metadata.save!
    Organization.update(organization_id, is_indexed: false)

    Rails.logger.info "Notion content for organization #{organization_id} saved successfully!"
  end

  private

  def create_notion_pages(root_pages, parent_page)
    root_pages.each do |notion_page|
      name = notion_page['properties']['title']['title'].find { |title| !title['plain_text'].strip.empty? }.plain_text
      page = NotionPage.new(
        organization: @organization,
        notion_id: notion_page['id'],
        name:,
        content: notion_page['page_content']
      )

      !parent_page.nil? && (page.parent = parent_page)

      begin
        page.save!
        notion_page['children'].present? && create_notion_pages(notion_page['children'], page)
      rescue StandardError => e
        Rails.logger.debug { "error #{e.message} to save NotionPage #{notion_page}" }
      end
    end
  end

  def key
    "notion-content-#{@organization.id}"
  end
end
