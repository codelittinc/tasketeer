# frozen_string_literal: true

class AddIsProcessingToWebPage < ActiveRecord::Migration[7.0]
  def change
    add_column :web_pages, :is_processing, :boolean, default: false, null: false
  end
end
