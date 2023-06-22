# frozen_string_literal: true

class AddFileIdToExternalResources < ActiveRecord::Migration[7.0]
  def change
    change_table(:external_resource_metadata, bulk: true) do |t|
      t.column :box_file_id, :string
      t.column :processing, :boolean
      t.column :error, :text
    end
  end
end
