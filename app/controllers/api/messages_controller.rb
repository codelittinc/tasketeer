# frozen_string_literal: true

module Api
  class MessagesController < ApiController
    # GET /messages or /messages.json
    def index
      @messages = Message.where(user_id: current_user.id).order(created_at: :asc)
      render json: { messages: @messages }, status: :ok
    end

    # GET /messages/1 or /messages/1.json
    def show; end

    # GET /messages/new
    def new
      @message = Message.new
    end

    # GET /messages/1/edit
    def edit; end

    # POST /messages or /messages.json
    def create
      @message = MessageCreator.new(message_params, 'chat', current_user).call

      if @message.valid?
        InteractionExecutor.new(@message.prompt_interaction, current_user.selected_organization.id).call
        render json: @message, status: :created
      else
        render json: @message.errors, status: :unprocessable_entity
      end
    end

    # DELETE /messages
    def delete_all
      Message.where(user_id: current_user.id).destroy_all
      render json: nil, status: :no_content
    end

    private

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:body, :user_id, :has_audio)
    end
  end
end
