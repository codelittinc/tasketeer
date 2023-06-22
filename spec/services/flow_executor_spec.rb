# frozen_string_literal: true

require 'rails_helper'

RSpec.describe FlowExecutor, type: :service do
  describe '#execute' do
    context 'when the is a result' do
      it 'executes the flow' do
        flow_request_text = 'help'
        flow_request = FlowRequest.create!(json: {
          text: flow_request_text,
          user_name: 'rheniery.mendes'
        }.to_json)

        expect_any_instance_of(Flows::HelpFlow).to receive(:execute)

        described_class.call(flow_request)
      end
    end

    context 'when there is an error' do
      it 'saves the error in the error message' do
        flow_request_text = 'help'
        flow_request = FlowRequest.create!(json: {
          text: flow_request_text,
          user_name: 'rheniery.mendes'
        }.to_json)

        allow_any_instance_of(Clients::Notifications::Direct).to receive(:send).and_raise(StandardError)
        expect { described_class.call(flow_request) }.to raise_error(StandardError)
        expect(flow_request.reload.error_message).to match(/StandardError.*/)
      end

      it 'throws an error' do
        flow_request_text = 'help'
        flow_request = FlowRequest.create!(json: {
          text: flow_request_text,
          user_name: 'rheniery.mendes'
        }.to_json)

        allow_any_instance_of(Clients::Notifications::Direct).to receive(:send).and_raise(StandardError.new)

        expect { described_class.call(flow_request) }.to raise_error
      end
    end

    context 'when there are no results' do
      it 'sends a direct no results message' do
        flow_request_text = 'test'
        flow_request = FlowRequest.create!(json: {
          text: flow_request_text,
          user_name: 'rheniery.mendes'
        }.to_json)
        expected_message = "There are no results for *#{flow_request_text}*. Please, check for more information using the `/roadrunner help` command."
        expect_any_instance_of(Clients::Notifications::Direct).to receive(:send).with(expected_message,
                                                                                      'rheniery.mendes')

        described_class.call(flow_request)
      end
    end
  end
end
