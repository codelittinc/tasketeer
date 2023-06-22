# frozen_string_literal: true

class AddOrganizationIdToExternalResourceMetadata < ActiveRecord::Migration[7.0]
  def change
    add_reference :external_resource_metadata, :organization, null: true, foreign_key: true
  end
end
