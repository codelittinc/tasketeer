# frozen_string_literal: true

class CreateApiCredentials < ActiveRecord::Migration[7.0]
  def change
    create_table :api_credentials do |t|
      t.string :secret_key
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
