# frozen_string_literal: true

class AddExternalResourceMetadata < ActiveRecord::Migration[7.0]
  def change
    create_table :external_resource_metadata do |t|
      t.string :key
      t.text :value

      t.timestamps
    end
  end
end
