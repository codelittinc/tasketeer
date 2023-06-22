# frozen_string_literal: true

class AddIndexedToExternalResourceMetadata < ActiveRecord::Migration[7.0]
  def change
    add_column :external_resource_metadata, :indexed, :boolean, default: false
  end
end
