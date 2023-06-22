# frozen_string_literal: true

class FlowExecutor < ApplicationService
  def initialize(flow_request)
    super()
    @params = JSON.parse(flow_request.json).with_indifferent_access
    @flow_request = flow_request
  end

  def call
    flow = FlowBuilder.build(@flow_request)
    if flow
      flow.run
      @flow_request.destroy
    else
      send_no_result_message!
    end
  rescue StandardError => e
    message = [e.to_s, e.backtrace].flatten.join("\n")
    Rails.logger.error "ERROR: #{message}"
    @flow_request.update(error_message: message, flow_name: flow.class.name)
    throw e
  end

  private

  def send_no_result_message!
    message = Messages::GenericBuilder.notify_no_results_from_flow(@params[:text])
    username = @params[:user_name]
    Clients::Notifications::Direct.new.send(message, username) if username
  end
end
