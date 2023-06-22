# frozen_string_literal: true

class AddSearchArchiveTable < ActiveRecord::Migration[7.0]
  def change
    create_table :search_archives do |t|
      t.references :organization, null: false, foreign_key: true
      t.string :query, null: false
      t.string :response, null: false
      t.timestamps
    end
  end
end
