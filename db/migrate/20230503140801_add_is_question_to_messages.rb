# frozen_string_literal: true

class AddIsQuestionToMessages < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :is_question, :boolean, null: true
  end
end
