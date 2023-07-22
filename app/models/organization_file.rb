# frozen_string_literal: true

# == Schema Information
#
# Table name: organization_files
#
#  id              :bigint           not null, primary key
#  indexed_at      :datetime
#  name            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  box_id          :string
#  organization_id :bigint
#
class OrganizationFile < ApplicationRecord
  attribute :indexed
  belongs_to :organization

  validates :box_id, presence: true

  def indexed
    ExternalResourceMetadata.where(box_file_id: box_id).pick(:indexed)
  end
end
