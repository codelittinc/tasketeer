# frozen_string_literal: true

# == Schema Information
#
# Table name: domains
#
#  id              :bigint           not null, primary key
#  indexed         :boolean
#  name            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :bigint
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#
class Domain < ApplicationRecord
  has_many :web_pages, dependent: false
end
