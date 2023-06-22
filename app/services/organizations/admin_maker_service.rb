# frozen_string_literal: true

module Organizations
  class AdminMakerService
    def initialize(organization_id)
      @organization_id = organization_id
    end

    def make
      return if @organization_id.nil?

      Rails.logger.info "Setting organization admin for organization: #{@organization_id}"
      has_admin = UserOrganization.where(is_admin: true, organization_id: @organization_id).count.positive?

      # abort if there is already an admin for this organization
      return if has_admin

      # get the first user created from this organization
      user_organization = UserOrganization.where(organization_id: @organization_id)&.order('created_at ASC')&.first
      return if user_organization.nil?

      # set the user as admin
      user_organization.update!(is_admin: true)
    end
  end
end
