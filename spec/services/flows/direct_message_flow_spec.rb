# frozen_string_literal: true

require 'rails_helper'
require 'sidekiq/testing'

Sidekiq::Testing.inline!

RSpec.describe Flows::DirectMessageFlow, type: :service do
  let(:direct_message_from_user) do
    JSON.parse(File.read(File.join('spec', 'fixtures', 'services', 'flows',
                                   'direct_message.json'))).with_indifferent_access
  end

  let(:direct_message_from_rr) do
    JSON.parse(File.read(File.join('spec', 'fixtures', 'services', 'flows',
                                   'direct_message_from_rr.json'))).with_indifferent_access
  end

  let(:message_with_rr_mention) do
    JSON.parse(File.read(File.join('spec', 'fixtures', 'services', 'flows',
                                   'message_mention_rr.json'))).with_indifferent_access
  end

  describe '#flow?' do
    context 'when it is a message from a user' do
      it 'returns true' do
        flow = described_class.new(direct_message_from_user)
        expect(flow.flow?).to be_truthy
      end
    end

    context 'when it is a message from roadrunner' do
      it 'returns false' do
        flow = described_class.new(direct_message_from_rr)
        expect(flow.flow?).to be_falsy
      end
    end

    context 'when it is a message that mentions roadrunner' do
      it 'returns true' do
        flow = described_class.new(message_with_rr_mention)
        expect(flow.flow?).to be_truthy
      end
    end
  end

  describe '#run' do
    let(:external_resource_metadata) { FactoryBot.create(:external_resource_metadata) }
    let(:organization) { FactoryBot.create(:organization, slack_team_id: 'T029Q9LHJ') }

    context 'when it is a direct message to roadrunner' do
      it 'sends a message in the chat with roadrunner' do
        flow = described_class.new(direct_message_from_user)

        expect_any_instance_of(Clients::NlpProcessor::Client).to receive(:search).with(
          'is kaio a robot?', organization.id.to_s, 'UJFK67A1H'
        ).and_return('Yes, he is!')

        expect(SendSearchResponseWorker).to receive(:perform_in).with(
          3.seconds, {
            retry: 0,
            search_uuid: 'Yes, he is!',
            slack_channel: 'DSX1REERE',
            message_timestamp: nil,
            organization_id: organization.id.to_s
          }.to_json
        )

        flow.run
      end
    end

    context 'when it is message in a channel that mentions roadrunner' do
      it 'sends a message in the same channel in a thread' do
        flow = described_class.new(message_with_rr_mention)

        expect_any_instance_of(Clients::NlpProcessor::Client).to receive(:search).with(
          'hello', organization.id.to_s, 'UJFK67A1H'
        ).and_return('hi')

        expect(SendSearchResponseWorker).to receive(:perform_in).with(
          3.seconds, {
            retry: 0,
            search_uuid: 'hi',
            slack_channel: 'C04SE02BGP2',
            message_timestamp: '1677672376.129789',
            organization_id: organization.id.to_s
          }.to_json
        )

        flow.run
      end
    end
  end
end
