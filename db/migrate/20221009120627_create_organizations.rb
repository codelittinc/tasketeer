# frozen_string_literal: true

class CreateOrganizations < ActiveRecord::Migration[7.0]
  def change
    create_table :organizations do |t|
      t.string :notifications_id
      t.string :name
      t.string :notifications_key

      t.timestamps
    end
  end
end
