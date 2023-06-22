# frozen_string_literal: true

class AddNlpProcessed < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :nlp_indexed, :boolean, default: false, null: false
  end
end
