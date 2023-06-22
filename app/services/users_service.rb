# frozen_string_literal: true

class UsersService
  def create_notification_provider(user_info, provider_access_token)
    Rails.logger.info "Loading user and adding ProviderCredential with slack payload: #{user_info.inspect}"

    begin
      organization_service = Organizations::OrganizationsService.new
      slack_team_id = user_info['https://slack.com/team_id']
      slack_team_name = user_info['https://slack.com/team_name']

      User.transaction do
        res = Clients::Notifications::Provider.new.create(slack_team_id, slack_team_name, provider_access_token)
        notifications_id = res['credentials']['id']
        notifications_key = res['credentials']['application_key']

        organization = organization_service.create(slack_team_id:, name: slack_team_name, notion_api_key: nil, notifications_id:, notifications_key:)
        user = load_user(user_info, organization)
        Rails.logger.info 'User loaded successfully'

        user
      end
    rescue StandardError => e
      Rails.logger.error "Error loading a user with a payload from Slack: #{e.inspect}"
    end
  end

  def load_from_slack(user_info)
    Rails.logger.info "Loading user with slack payload: #{user_info.inspect}"

    begin
      organization_service = Organizations::OrganizationsService.new
      slack_team_id = user_info['https://slack.com/team_id']
      User.transaction do
        organization = organization_service.create(slack_team_id:, name: user_info['https://slack.com/team_name'])
        user = load_user(user_info, organization)
        Rails.logger.info 'User loaded successfully'
        user
      end
    rescue StandardError => e
      Rails.logger.error "Error loading a user with a payload from Slack: #{e.inspect}"
    end
  end

  private

  def load_user(user_info, organization)
    user_params = {
      avatar_url: user_info.picture, given_name: user_info.given_name, uid: user_info.sub
    }

    user = User.find_by(email: user_info.email)
    if user.present?
      Rails.logger.info 'User found with Slack email'
      UserOrganization.find_or_create_by!(user_id: user.id, organization_id: organization.id).update!(selected: true)
      user.update!(user_params)
      return user
    end

    Rails.logger.info 'Creating a new user from Slack'
    user = User.create!(
      user_params.merge({
                          email: user_info.email,
                          password: Devise.friendly_token[0, 20]
                        })
    )
    user.user_organizations.create!(organization:, selected: true)
    Organizations::AdminMakerService.new(organization.id).make
    user
  end
end
