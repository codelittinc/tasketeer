# frozen_string_literal: true

class AddProfileInformationToUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :users, bulk: true do |t|
      t.string :avatar_url
      t.string :given_name
    end
  end
end
