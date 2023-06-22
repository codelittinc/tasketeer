# frozen_string_literal: true

class ExternalResourceMetadataWorker
  include Sidekiq::Worker
  sidekiq_options retry: 2
  sidekiq_retry_in do |_count|
    5.minutes
  end

  def perform(organization_id)
    Rails.logger.info 'Sending external resource metadata records to nlp processor.'
    external_resources = ExternalResourceMetadata.where(processing: false, organization_id:).order('created_at DESC')
    return unless external_resources.any?

    error = ''

    # set all records to processing
    set_processing(external_resources, true)

    begin
      process_indexing(external_resources, organization_id)
      set_indexed(external_resources, true)
      Organization.update(organization_id, is_indexed: true)
      Organization.update(organization_id, nlp_indexed: true)
    rescue StandardError => e
      error = [e.to_s, e.backtrace].flatten.join("\n")
      set_error(external_resources, error)
      set_indexed(external_resources, false)
      Organization.update(organization_id, is_indexed: false)
      Rails.logger.error error
    ensure
      set_processing(external_resources, false)
    end

    # raise an exception and reschedule the worker in case there are any errors
    raise error if error.present?

    Rails.logger.info 'Finished sending external resource metadata records to nlp processor.'
  end

  private

  def process_indexing(external_resources, organization_id)
    client = Clients::NlpProcessor::Client.new
    process_uuid = client.generate_file_index(get_files_content(external_resources), organization_id.to_s)
    set_error(external_resources, nil)
    set_process_uuid(external_resources, process_uuid)

    num_retry = 0
    track_indexing = {}

    loop do
      track_indexing = client.get_file_indexing_status(process_uuid)
      break if track_indexing['process_uuid'] == process_uuid || num_retry >= 100

      sleep 5.seconds
      num_retry += 1
    end

    raise "Indexing did not return a completed status, please verify the process_uuid: #{process_uuid} in nlp-processor" unless track_indexing['process_uuid']
  end

  def get_files_content(external_resources)
    content = []
    external_resources.each do |metadata|
      content << metadata.value
    end
    content.join("\n")
  end

  def set_processing(external_resources, processing)
    external_resources.each do |metadata|
      ExternalResourceMetadata.update(metadata.id, processing:)
      WebPage.update(metadata.web_page_id, is_processing: processing)
    end
  end

  def set_indexed(external_resources, indexed)
    external_resources.each do |metadata|
      ExternalResourceMetadata.update(metadata.id, indexed:)
      WebPage.update(metadata.web_page_id, indexed: true)
    end
  end

  def set_process_uuid(external_resources, process_uuid)
    external_resources.each do |metadata|
      ExternalResourceMetadata.update(metadata.id, process_uuid:)
    end
  end

  def set_error(external_resources, error)
    external_resources.each do |metadata|
      ExternalResourceMetadata.update(metadata.id, error:)
    end
  end
end
