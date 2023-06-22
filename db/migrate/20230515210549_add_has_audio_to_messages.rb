# frozen_string_literal: true

class AddHasAudioToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :has_audio, :boolean, null: true
  end
end
