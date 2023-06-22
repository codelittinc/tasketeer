# frozen_string_literal: true

class AddJtiToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :jti, :string, null: false, default: ''
    add_index :users, :jti, unique: true
  end
end
