# frozen_string_literal: true

class CreateInteractions < ActiveRecord::Migration[7.0]
  def change
    create_table :interactions, &:timestamps
  end
end
