# frozen_string_literal: true

class CreateFlowRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :flow_requests do |t|
      t.string :json
      t.string :flow_name
      t.string :error_message
      t.boolean :executed

      t.timestamps
    end
  end
end
