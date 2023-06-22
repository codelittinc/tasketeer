# frozen_string_literal: true

# == Schema Information
#
# Table name: gpt_api_keys
#
#  id              :bigint           not null, primary key
#  value           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#
class GptApiKey < ApplicationRecord
  belongs_to :organization
end
