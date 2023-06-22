# frozen_string_literal: true

class AddOrganizationToDomains < ActiveRecord::Migration[7.0]
  def change
    add_reference :domains, :organization, foreign_key: true
  end
end
