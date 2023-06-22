# frozen_string_literal: true

class AddIndexedToDomain < ActiveRecord::Migration[7.0]
  def change
    add_column :domains, :indexed, :boolean
  end
end
