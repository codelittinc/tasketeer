# frozen_string_literal: true

class AddMediumToInteraction < ActiveRecord::Migration[7.0]
  def change
    add_column :interactions, :medium, :string
    remove_column :messages, :medium, :string
  end
end
