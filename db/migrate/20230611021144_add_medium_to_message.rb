# frozen_string_literal: true

class AddMediumToMessage < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :medium, :string
  end
end
