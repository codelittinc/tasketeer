# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Flows::HelpFlow, type: :service do
  describe '#flow?' do
    context 'returns true' do
      it 'with a valid json' do
        flow = described_class.new({
                                     text: 'help',
                                     channel_name: 'cool-channel'
                                   })
        expect(flow.flow?).to be_truthy
      end
    end

    context 'returns false' do
      it 'with an invalid json' do
        flow = described_class.new({
                                     text: 'not help',
                                     channel_name: 'cool-channel'
                                   })
        expect(flow.flow?).to be_falsey
      end
    end
  end

  describe '#run' do
    context 'with valid params' do
      let(:website_link) { 'https://tasketeer.ai' }
      it 'sends a message to the user with the help content' do
        flow = described_class.new({
                                     text: 'help',
                                     channel_name: 'cool-channel',
                                     user_name: 'batman'
                                   })

        expect_any_instance_of(Clients::Notifications::Direct).to receive(:send).with(
          "I see you need some help, please check our <#{website_link}/faq|FAQ page>, and if you can't find the information you are looking for <#{website_link}/contact|send us a message>", 'batman'
        )

        flow.run
      end
    end
  end
end
