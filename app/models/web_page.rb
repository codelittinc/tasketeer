# frozen_string_literal: true

# == Schema Information
#
# Table name: web_pages
#
#  id              :bigint           not null, primary key
#  content         :text
#  indexed         :boolean
#  url             :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  domain_id       :bigint
#  organization_id :bigint
#
# Foreign Keys
#
#  fk_rails_...  (domain_id => domains.id)
#
class WebPage < ApplicationRecord
  after_create :create_external_resource_metadata!

  belongs_to :domain, optional: true

  private

  def create_external_resource_metadata!
    ExternalResourceMetadata.create!(
      key: 'web-page-content',
      value: content,
      organization_id:,
      processing: false,
      web_page_id: id
    )

    ExternalResourceMetadataWorker.perform_in(3.seconds, organization_id)
  end
end
