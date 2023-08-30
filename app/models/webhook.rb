class Webhook < ApplicationRecord
  belongs_to :organization

  validates :url, presence: true
end
