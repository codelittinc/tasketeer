# frozen_string_literal: true

class MessageCreator < ApplicationService
  def initialize(params, medium = nil, writer = nil, interaction = nil)
    super()
    @params = params
    @medium = medium
    @writer = writer
    @interaction = interaction
  end

  def call
    message = nil
    ActiveRecord::Base.transaction do
      message = Message.new(@params)
      message.writer = @writer
      message.save!

      if @interaction.present?
        # raise ActiveRecord::RecordInvalid if @interaction.response.present?
        @interaction.update!(response: message)
      elsif @interaction.nil?
        Interaction.create!(medium: @medium, prompt: message)
      end
    end

    message
  rescue ActiveRecord::RecordInvalid
    message
  end
end
