# frozen_string_literal: true

# == Schema Information
#
# Table name: notion_pages
#
#  id              :bigint           not null, primary key
#  content         :text
#  name            :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  notion_id       :string
#  notion_page_id  :bigint
#  organization_id :bigint
#
# Foreign Keys
#
#  fk_rails_...  (notion_page_id => notion_pages.id)
#  fk_rails_...  (organization_id => organizations.id)
#
class NotionPage < ApplicationRecord
  belongs_to :organization
  belongs_to :parent, class_name: 'NotionPage', optional: true, foreign_key: :notion_page_id, inverse_of: :children
  has_many :children, class_name: 'NotionPage', dependent: :destroy

  validates :notion_id, presence: true
  validates :name, presence: true

  def to_node
    {
      'attributes' => attributes, 'children' => children.map(&:to_node)
    }
  end
end
