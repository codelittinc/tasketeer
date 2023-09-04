# frozen_string_literal: true

class CreateWebhooks < ActiveRecord::Migration[7.0]
  def change
    create_table :webhooks do |t|
      t.string :url
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
