# frozen_string_literal: true

class CreateSlackUserSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :slack_user_settings do |t|
      t.string :slack_user_id
      t.timestamp :messages_tab_opened_at

      t.timestamps
    end
  end
end
