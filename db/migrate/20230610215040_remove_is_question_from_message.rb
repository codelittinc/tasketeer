# frozen_string_literal: true

class RemoveIsQuestionFromMessage < ActiveRecord::Migration[7.0]
  def change
    remove_column :messages, :is_question, :boolean
  end
end
