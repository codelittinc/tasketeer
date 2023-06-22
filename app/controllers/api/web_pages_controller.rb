# frozen_string_literal: true

module Api
  class WebPagesController < ApiController
    before_action :verify_admin

    # GET /web_pages or /web_pages.json
    def index
      organization_id = current_user.selected_organization.id
      web_pages = WebPage.where(organization_id:, domain_id: nil)
      domains = Domain.where(organization_id:)
      combined_list = domains | web_pages
      render json: combined_list, status: :ok
    end

    # POST /web_pages or /web_pages.json
    def create
      @web_page = WebPage.find_or_initialize_by(web_page_params)
      @web_page.organization_id = current_user.selected_organization.id

      if @web_page.new_record?
        domain = Domain.new

        if params[:get_all_pages]
          domain_name = URI.parse(@web_page.url).host
          domain = Domain.find_or_create_by(name: domain_name, organization_id: current_user.selected_organization.id)

          @web_page.domain_id = domain.id
        end

        web_page_content = WebScraperService.new.scrape(@web_page.url, domain.name)

        @web_page.content = web_page_content.text

        if @web_page.save
          WebScraperWorker.perform_in(3.seconds, { links: web_page_content.links.uniq.take(5), domain: }.to_json) if params[:get_all_pages]

          render json: @web_page, status: :created
        else
          render json: @web_page.errors, status: :unprocessable_entity
        end
      else
        render json: { message: 'WebPage already exists' }, status: :unprocessable_entity
      end
    end

    def destroy
      id = params[:id]
      WebPage.find(id).destroy!

      ExternalResourceMetadata.where(
        key: 'web-page-content',
        organization_id: current_user.selected_organization.id,
        web_page_id: id
      ).destroy_all

      ExternalResourceMetadataWorker.perform_in(3.seconds, current_user.selected_organization.id)
      render json: { Ok: true }, status: :ok
    end

    private

    # Only allow a list of trusted parameters through.
    def web_page_params
      params.require(:web_page).permit(:content, :url, :organization_id, :indexed)
    end
  end
end
