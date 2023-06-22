# frozen_string_literal: true

class AddIdexedAtToOrganizationFiles < ActiveRecord::Migration[7.0]
  def change
    add_column :organization_files, :indexed_at, :timestamp, default: nil
  end
end
