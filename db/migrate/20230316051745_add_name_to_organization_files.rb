# frozen_string_literal: true

class AddNameToOrganizationFiles < ActiveRecord::Migration[7.0]
  def change
    add_column :organization_files, :name, :string
  end
end
