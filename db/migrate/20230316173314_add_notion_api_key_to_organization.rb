# frozen_string_literal: true

class AddNotionApiKeyToOrganization < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :notion_api_key, :string
  end
end
