# frozen_string_literal: true

class CreateUserOrganizations < ActiveRecord::Migration[7.0]
  def change
    create_table :user_organizations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :organization, null: false, foreign_key: true
      t.boolean :selected, default: false
      t.timestamps
    end
  end
end
