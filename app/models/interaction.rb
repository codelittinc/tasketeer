# frozen_string_literal: true

# == Schema Information
#
# Table name: interactions
#
#  id          :bigint           not null, primary key
#  medium      :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  prompt_id   :bigint
#  response_id :bigint
#
# Foreign Keys
#
#  fk_rails_...  (prompt_id => messages.id)
#  fk_rails_...  (response_id => messages.id)
#
class Interaction < ApplicationRecord
  belongs_to :prompt, class_name: 'Message', dependent: :destroy, optional: true
  belongs_to :response, class_name: 'Message', dependent: :destroy, optional: true

  validates :medium, inclusion: { in: %w[chat slack] }, presence: true
  validate :ensure_response_is_not_changed

  def ensure_response_is_not_changed
    return unless response_id_changed? && persisted? && response_id_was.present?

    errors.add(:response, 'cannot be changed once it has been set')
  end
end
