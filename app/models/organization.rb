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
class Organization < ApplicationRecord
  attribute :can_index_files

  has_one :gpt_api_key, dependent: :destroy
  has_one :api_credential, dependent: :destroy
  has_one :webhook, dependent: :destroy

  has_many :organization_files, dependent: :destroy
  has_many :user_organizations, dependent: :destroy
  has_many :users, through: :user_organizations
  has_many :external_resource_metadatas, dependent: :destroy

  validates :notifications_id, presence: true
  validates :name, presence: true
  validates :notifications_key, presence: true

  def skip_notifications!
    self.notifications_id = notifications_id || 0
    self.notifications_key = notifications_key || 'lorenipsum'
  end

  def can_index_files
    # in case the organization is not indexed yet, and there are no files being processing at the moment,
    # then it should allow the organization to index the current files
    !is_indexed && external_resource_metadatas.where(processing: true).count.zero?
  end
end
