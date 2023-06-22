# frozen_string_literal: true

require 'rails_helper'

RSpec.describe FlowBuilder, type: :service do
  describe '#build' do
    context 'with params that match a flow' do
      it 'returns the right flow' do
        flow_request = FlowRequest.create!(json: {
          text: 'help',
          user_name: 'rheniery.mendes'
        }.to_json)

        flow = described_class.build(flow_request)

        expect(flow).to be_a(Flows::HelpFlow)
      end
    end
  end
end
