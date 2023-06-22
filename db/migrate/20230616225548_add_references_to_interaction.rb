# frozen_string_literal: true

class AddReferencesToInteraction < ActiveRecord::Migration[7.0]
  def change
    add_reference :interactions, :prompt, foreign_key: { to_table: :messages }
    add_reference :interactions, :response, foreign_key: { to_table: :messages }
  end
end
