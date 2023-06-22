# frozen_string_literal: true

module Api
  module Admin
    class SearchHistoryController < ApiAdminController
      include Pagy::Backend

      def index
        pagy, searches = pagy(SearchArchive.order('created_at DESC'))
        render json: { pagination: pagy, searches: SearchArchiveSerializer.new(searches, is_collection: true).serializable_hash[:data] }, status: :ok
      end
    end
  end
end
