# frozen_string_literal: true

# == Schema Information
#
# Table name: external_resource_metadata
#
#  id              :bigint           not null, primary key
#  error           :text
#  indexed         :boolean          default(FALSE)
#  key             :string
#  process_uuid    :string
#  processing      :boolean
#  value           :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  box_file_id     :string
#  organization_id :bigint
#  web_page_id     :string
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#
FactoryBot.define do
  factory :external_resource_metadata do
    key { 'MyString' }
    value { 'MyString' }
  end
end
