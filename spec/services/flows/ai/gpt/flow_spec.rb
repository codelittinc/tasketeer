# frozen_string_literal: true

require 'rails_helper'
require 'external_api_helper'

RSpec.describe Flows::Ai::Gpt::Flow, type: :service do
  describe '#flow?' do
    context 'returns true' do
      it 'when the text message starts with ask and has the team id' do
        flow = described_class.new({
                                     text: 'ask how to make potatoes',
                                     team_id: 123
                                   })

        expect(flow.flow?).to be_truthy
      end
    end

    context 'returns false' do
      it 'when the text message does not start with ask and has the team id' do
        flow = described_class.new({
                                     text: 'cool message',
                                     team_id: 123
                                   })
        expect(flow.flow?).to be_falsey
      end

      it 'when the text message starts with ask and does not have the team id' do
        flow = described_class.new({
                                     text: 'ask how to make potatoes'
                                   })

        expect(flow.flow?).to be_falsey
      end
    end
  end

  describe '#run' do
    context 'sends a private message with the result' do
      it 'when host is the application external identifier' do
        VCR.use_cassette('flows#ai#gpt#send-message') do
          flow = described_class.new({
                                       text: 'ask write a blogpost about how to release ruby on rails applications',
                                       user_name: 'kaiomagalhaes',
                                       team_id: 'T029Q9LHJ'
                                     })

          expected = File.read('spec/services/flows/ai/gpt/gpt_generated_text.txt')
          expect_any_instance_of(Clients::Notifications::Direct).to receive(:send).with(
            expected,
            'kaiomagalhaes'
          )
          flow.run
        end
      end
    end
  end
end
