# frozen_string_literal: true

class AddWriterToMessage < ActiveRecord::Migration[7.0]
  def change
    add_column :messages, :writer_id, :bigint
  end
end
