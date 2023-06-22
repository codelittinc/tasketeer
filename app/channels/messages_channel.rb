# frozen_string_literal: true

class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "MessagesChannel-#{params['user_id']}"
  end
end
