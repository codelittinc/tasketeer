# frozen_string_literal: true

class CreateWebPages < ActiveRecord::Migration[7.0]
  def change
    create_table :web_pages do |t|
      t.boolean :indexed
      t.text :content
      t.string :url
      t.bigint :organization_id

      t.timestamps
    end
  end
end
