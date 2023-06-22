# frozen_string_literal: true

class AddInitialPermissions < ActiveRecord::Migration[7.0]
  def change
    # Add default list of permissions
    Role.create!(name: 'Admin')
    Role.create!(name: 'User')
  end
end
