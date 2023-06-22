# frozen_string_literal: true

class CreateOrganizationFiles < ActiveRecord::Migration[7.0]
  def change
    create_table :organization_files do |t|
      t.string :box_id
      t.belongs_to :organization

      t.timestamps
    end
  end
end
