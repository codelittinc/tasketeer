# frozen_string_literal: true

# == Schema Information
#
# Table name: webhooks
#
#  id              :bigint           not null, primary key
#  url             :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#
class Webhook < ApplicationRecord
  belongs_to :organization

  validates :url, presence: true
end
