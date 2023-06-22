# frozen_string_literal: true

class AddSlackTeamIdToOrganization < ActiveRecord::Migration[7.0]
  def change
    add_column :organizations, :slack_team_id, :string
  end
end
