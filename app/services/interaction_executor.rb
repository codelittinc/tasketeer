# frozen_string_literal: true

class InteractionExecutor < ApplicationService
  def initialize(interaction, organization_id)
    super()
    @interaction = interaction
    @organization_id = organization_id
  end

  def call
    message = @interaction.prompt
    search_uuid = Clients::NlpProcessor::Client.new.search(message.body, @organization_id, message.user_id)
    raise 'Could not process the search in nlp-processor' if search_uuid.blank?

    # start a background job to get the nlp response and send it to chat
    InteractionWorker.perform_in(3.seconds, {
      retry: 0,
      search_uuid:,
      user_id: message.user_id,
      has_audio: message.has_audio,
      interaction_id: @interaction.id.to_s
    }.to_json)
  end
end
