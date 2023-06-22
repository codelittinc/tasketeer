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
class BotSetting < ApplicationRecord
end
