# frozen_string_literal: true

# == Schema Information
#
# Table name: bot_settings
#
#  id              :bigint           not null, primary key
#  welcome_message :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'ffaker'

FactoryBot.define do
  factory :bot_setting do
    welcome_message { FFaker::Lorem.paragraph }
  end
end
