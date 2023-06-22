# frozen_string_literal: true

class SendSearchResponseWorker
  include Sidekiq::Worker

  def max_retries
    ENV.fetch('SEND_SEARCH_RESPONSE_WORKER_RETRIES', '75').to_i
  end

  def interval
    ENV.fetch('SEND_SEARCH_RESPONSE_WORKER_INTERVAL', '3').to_i
  end

  def perform(payload)
    # parse the payload to get the uuid, slack_channel and message_timestamp
    request = JSON.parse(payload)
    current_retry = request['retry']
    search_uuid = request['search_uuid']
    slack_channel = request['slack_channel']
    message_timestamp = request['message_timestamp']
    organization_id = request['organization_id']

    # Should not retry more than max_retries
    if current_retry >= max_retries
      Rails.logger.error "Max retries reached for search_uuid: #{search_uuid}."
      return
    end

    # Get the openai search response from nlp-processor
    gpt_response = Clients::NlpProcessor::Client.new.get_by_process_uuid(search_uuid)
    if gpt_response.nil? || gpt_response['response'].blank?
      # Retry in 3 seconds
      SendSearchResponseWorker.perform_in(interval.seconds, {
        retry: current_retry + 1,
        search_uuid:,
        slack_channel:,
        message_timestamp:,
        organization_id:
      }.to_json)
      return
    end

    # Send the response to slack
    organization = Organization.find_by(id: organization_id)
    Clients::Notifications::Channel.new(organization).send(
      gpt_response['response'],
      slack_channel,
      message_timestamp
    )

    # archive the search response
    SearchArchive.new(
      query: gpt_response['question'],
      response: gpt_response['response'],
      organization_id: gpt_response['organization']
    ).save

    Rails.logger.info "Search response sent to slack. uuid: #{search_uuid}"
  end
end
