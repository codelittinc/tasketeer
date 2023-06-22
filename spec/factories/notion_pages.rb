# frozen_string_literal: true

# == Schema Information
#
# Table name: notion_pages
#
#  id              :bigint           not null, primary key
#  content         :text
#  name            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  notion_id       :string
#  notion_page_id  :bigint
#  organization_id :bigint
#
# Foreign Keys
#
#  fk_rails_...  (notion_page_id => notion_pages.id)
#  fk_rails_...  (organization_id => organizations.id)
#
FactoryBot.define do
  factory :notion_page do
    name { 'MyString' }
    content { 'MyString' }
    notion_id { 'MyString' }
    notion_page { nil }
  end
end
