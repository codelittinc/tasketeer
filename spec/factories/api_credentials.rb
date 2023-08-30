# frozen_string_literal: true

# == Schema Information
#
# Table name: api_credentials
#
#  id              :bigint           not null, primary key
#  secret_key      :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#
FactoryBot.define do
  factory :api_credential do
    secret_key { 'MyString' }
    organization
  end
end
