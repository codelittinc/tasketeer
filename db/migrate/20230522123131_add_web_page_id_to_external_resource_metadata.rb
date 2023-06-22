# frozen_string_literal: true

class AddWebPageIdToExternalResourceMetadata < ActiveRecord::Migration[7.0]
  def change
    add_column :external_resource_metadata, :web_page_id, :string
  end
end
