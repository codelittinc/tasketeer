# frozen_string_literal: true

class AddIsIndexedToOrganization < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :is_indexed, :bool, default: false, null: false
  end
end
