# frozen_string_literal: true

module Flows
  class HelpFlow < BaseFlow
    def execute
      website_link = 'https://tasketeer.ai'
      message = "I see you need some help, please check our <#{website_link}/faq|FAQ page>, and if you can't find the information you are looking for <#{website_link}/contact|send us a message>"

      Clients::Notifications::Direct.new.send(message, user_name)
    end

    def flow?
      text == 'help'
    end

    private

    def user_name
      @user_name ||= @params[:user_name]
    end

    def channel_name
      @channel_name ||= @params[:channel_name]
    end

    def text
      @text ||= @params[:text]
    end
  end
end
