# frozen_string_literal: true

class AddAdminToUserOrganization < ActiveRecord::Migration[7.0]
  def change
    change_table :user_organizations, bulk: true do |t|
      t.boolean :is_admin, default: false
    end
  end
end
