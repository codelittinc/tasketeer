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
class ApiCredential < ApplicationRecord
  belongs_to :organization

  validates :secret_key, presence: true
end
