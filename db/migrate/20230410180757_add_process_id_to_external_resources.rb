# frozen_string_literal: true

class AddProcessIdToExternalResources < ActiveRecord::Migration[7.0]
  def change
    add_column :external_resource_metadata, :process_uuid, :string
  end
end
