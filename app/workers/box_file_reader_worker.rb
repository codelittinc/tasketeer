# frozen_string_literal: true

require 'rest-client'

class BoxFileReaderWorker
  include Sidekiq::Worker
  sidekiq_options retry: 2
  sidekiq_retry_in do |_count|
    5.minutes
  end

  def perform(payload)
    request = JSON.parse(payload)
    box_file_id = request['box_file_id']
    organization = request['organization']
    metadata = "file id: #{box_file_id}, organization: #{organization}"

    Rails.logger.info "Reading file content. #{metadata}"

    # get the file content from box
    box_client = Clients::Box::Client.new
    content = box_client.file_content(box_file_id)

    raise "Could not read the file content. #{metadata}" if content.blank?

    Rails.logger.info "Read file content: #{content}. #{metadata}" if content.present?

    ExternalResourceMetadata.new(
      key: 'box-content',
      value: content,
      organization_id: organization,
      processing: false,
      box_file_id:
    ).save!

    Organization.update(organization, is_indexed: false)

    Rails.logger.info "Box file content processed successfully! #{metadata}"
  end
end
