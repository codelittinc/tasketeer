# frozen_string_literal: true

class InteractionWorker
  include Sidekiq::Worker

  def max_retries
    ENV.fetch('SEND_SEARCH_RESPONSE_WORKER_RETRIES', '75').to_i
  end

  def interval
    ENV.fetch('SEND_SEARCH_RESPONSE_WORKER_INTERVAL', '3').to_i
  end

  def perform(payload)
    request = JSON.parse(payload)
    current_retry = request['retry']
    search_uuid = request['search_uuid']
    user_id = request['user_id']
    has_audio = request['has_audio']
    interaction = Interaction.find(request['interaction_id'])

    if current_retry >= max_retries
      Rails.logger.error "Max retries reached for search_uuid: #{search_uuid}."
      return
    end

    # Get the openai search response from nlp-processor
    gpt_response = Clients::NlpProcessor::Client.new.get_by_process_uuid(search_uuid)
    if gpt_response.nil? || gpt_response['response'].blank?
      InteractionWorker.perform_in(interval.seconds, {
        retry: current_retry + 1,
        search_uuid:,
        user_id:,
        has_audio:,
        interaction_id: interaction.id
      }.to_json)
      return
    end

    params = { body: gpt_response['response'], user_id:, has_audio: }
    MessageCreator.new(params, nil, nil, interaction).call
  end
end
