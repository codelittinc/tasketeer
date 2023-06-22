# frozen_string_literal: true

class AddApprovedToOrganizations < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :approved, :boolean, default: false
  end
end
