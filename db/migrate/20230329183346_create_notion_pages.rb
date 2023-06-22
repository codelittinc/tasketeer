# frozen_string_literal: true

class CreateNotionPages < ActiveRecord::Migration[7.0]
  def change
    create_table :notion_pages do |t|
      t.string :name
      t.text   :content, null: true
      t.string :notion_id
      t.references :notion_page, null: true, foreign_key: true

      t.timestamps
    end
  end
end
