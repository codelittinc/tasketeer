# frozen_string_literal: true

class AddDomainToWebPages < ActiveRecord::Migration[7.0]
  def change
    add_reference :web_pages, :domain, foreign_key: true
  end
end
