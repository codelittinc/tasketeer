# frozen_string_literal: true

class FlowsWorker
  include Sidekiq::Worker

  def perform(flow_request_id)
    flow_request = FlowRequest.find_by(id: flow_request_id)
    FlowExecutor.call(flow_request)
  end
end
