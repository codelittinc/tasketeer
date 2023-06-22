# frozen_string_literal: true

# == Schema Information
#
# Table name: organizations
#
#  id                :bigint           not null, primary key
#  approved          :boolean          default(FALSE)
#  is_indexed        :boolean          default(FALSE), not null
#  name              :string
#  nlp_indexed       :boolean          default(FALSE), not null
#  notifications_key :string
#  notion_api_key    :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  notifications_id  :string
#  slack_team_id     :string
#
FactoryBot.define do
  factory :organization do
    notifications_id { 'MyString' }
    name { 'MyString' }
    notifications_key { 'MyString' }
  end
end
