# frozen_string_literal: true

class AddOrganizationToNotionPage < ActiveRecord::Migration[7.0]
  def change
    add_reference :notion_pages, :organization, null: true, foreign_key: true
  end
end
