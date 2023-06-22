# frozen_string_literal: true

module Api
  class NotionIntegrationController < ApiController
    before_action :set_organization
    before_action :verify_admin

    def all_pages
      pages = NotionPage.where(organization: @organization, parent: nil).includes(:children)
      render json: { pages: pages.map(&:to_node) }, except: ['content'], include: ['children'], status: :ok
    end

    def last_execution
      @external_resource_metadata = ExternalResourceMetadata.find_by(organization: @organization, key:)
      render json: { external_resource_metadata: @external_resource_metadata.as_json(except: [:value]) }, status: :ok
    end

    def run
      ContentNotionWorker.perform_async(integration_params[:organization_id])
      render json: { message: 'Accepted' }, status: :accepted
    end

    private

    def set_organization
      @organization = current_user.organizations.find_by(id: integration_params[:organization_id])
    end

    def integration_params
      params.permit(:organization_id)
    end

    def key
      "notion-content-#{@organization.id}"
    end
  end
end
