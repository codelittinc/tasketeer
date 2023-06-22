# frozen_string_literal: true

class CreateGptApiKeys < ActiveRecord::Migration[7.0]
  def change
    create_table :gpt_api_keys do |t|
      t.references :organization, null: false, foreign_key: true
      t.string :value

      t.timestamps
    end
  end
end
