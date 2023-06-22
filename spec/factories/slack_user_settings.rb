# frozen_string_literal: true

# == Schema Information
#
# Table name: slack_user_settings
#
#  id                     :bigint           not null, primary key
#  messages_tab_opened_at :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  slack_user_id          :string
#
require 'ffaker'

FactoryBot.define do
  factory :slack_user_settings do
    slack_user_id { FFaker::Guid.guid }
    messages_tab_opened_at { FFaker::Time.datetime }
  end
end
