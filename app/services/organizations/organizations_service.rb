# frozen_string_literal: true

module Organizations
  class OrganizationsService
    ORGS_FEED_CHANNEL = 'C050J3DF99V'

    def create(slack_team_id:, name:, notion_api_key: nil, notifications_id: nil, notifications_key: nil)
      if slack_team_id.present?
        organization = Organization.find_by(slack_team_id:)
        organization.update({ approved: true })
        organization.update(notifications_id:, notifications_key:) if organization.present? && organization.notifications_id == '0'

        return organization if organization.present?
      end

      Rails.logger.info 'Creating a new organization'
      organization = Organization.new(slack_team_id:, name:, notion_api_key:, approved: false, notifications_id:, notifications_key:)
      organization.skip_notifications!
      organization.save!

      notify_slack organization if Rails.env.production?

      organization
    end

    private

    def notify_slack(organization)
      Clients::Notifications::Channel.new.send(
        "New organization created: ##{organization.id} - #{organization.name}.
Click here to approve it: #{RailsAdmin.railtie_routes_url_helpers.edit_url(model_name: 'organization', id: organization.id, host: ENV.fetch('REACT_APP_API_URL', nil))}",
        ORGS_FEED_CHANNEL
      )
    end
  end
end
