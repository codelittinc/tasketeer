# frozen_string_literal: true

# rubocop:disable Rails/ReversibleMigration

class ChangeSearchArchiveColumnsToText < ActiveRecord::Migration[7.0]
  def change
    change_table :search_archives, bulk: true do |table|
      table.change :query, :text, null: false
      table.change :response, :text, null: false
    end
  end
end

# rubocop:enable Rails/ReversibleMigration
