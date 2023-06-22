# frozen_string_literal: true

# == Schema Information
#
# Table name: messages
#
#  id         :bigint           not null, primary key
#  body       :text
#  has_audio  :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :bigint           not null
#  writer_id  :bigint
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
class Message < ApplicationRecord
  after_create_commit { broadcast_message }

  has_one :prompt_interaction, class_name: 'Interaction', foreign_key: 'prompt_id', dependent: :destroy, inverse_of: :prompt
  has_one :response_interaction, class_name: 'Interaction', foreign_key: 'response_id', dependent: :destroy, inverse_of: :response

  belongs_to :user
  belongs_to :writer, class_name: 'User', optional: true

  private

  def bot_message?
    writer_id.nil?
  end

  def broadcast_message
    audio = ''

    audio = Clients::TextToSpeech::Client.new.speak(body) if bot_message? && has_audio

    ActionCable.server.broadcast("MessagesChannel-#{user_id}", { message: self, audio: })
  end
end
