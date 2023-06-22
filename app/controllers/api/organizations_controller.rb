# frozen_string_literal: true

module Api
  class OrganizationsController < ApiController
    skip_before_action :verify_organization_approval, only: %i[create]

    def show
      @organization = Organization.find(params[:id])
      render json: { organization: @organization }, status: :ok
    end

    def create
      organization_service = Organizations::OrganizationsService.new

      begin
        Organization.transaction do
          @organization = organization_service.create(slack_team_id: nil, name:, notion_api_key:)
          @organization.update({ approved: true })
          UserOrganization.create!(user: current_user, organization: @organization, selected: true)
          Organizations::AdminMakerService.new(@organization.id).make
        end

        render json: { organization: @organization }, status: :created
      rescue StandardError => e
        render json: { errors: @organization&.errors.present? ? @organization.errors.full_messages : [e.full_message] }, status: :unprocessable_entity
      end
    end

    def update
      @organization = Organization.find(params[:id])
      @organization.notion_api_key = notion_api_key
      @organization.save!
      Organizations::AdminMakerService.new(@organization.id).make
      render json: { organization: @organization }, status: :ok
    end

    private

    def organization_params
      params.require(:organization).permit(:name, :notion_api_key)
    end

    def notifications_id
      @notifications_id ||= organization_params[:notifications_id]
    end

    def name
      @name ||= organization_params[:name]
    end

    def notion_api_key
      @notion_api_key ||= organization_params[:notion_api_key]
    end
  end
end
