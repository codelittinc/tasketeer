# frozen_string_literal: true

class AddPermissionsTables < ActiveRecord::Migration[7.0]
  def change
    # Add a table to store the roles
    create_table :roles do |t|
      t.string :name, unique: true

      t.timestamps
    end

    # Add a table to store the role of a user in an organization
    create_table :user_roles, &:timestamps
    add_reference :user_roles, :organization, foreign_key: true
    add_reference :user_roles, :user, foreign_key: true
    add_reference :user_roles, :role, foreign_key: true

    # Add an unique index to make sure an user can't have duplicate roles in the same organization
    add_index :user_roles, %i[organization_id user_id role_id], unique: true, name: 'idx_user_role_on_organization'
  end
end
