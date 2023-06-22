# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Flows::SlackAppOpenedFlow, type: :service do
  let(:slack_app_opened_message) do
    JSON.parse(File.read(File.join('spec', 'fixtures', 'services', 'flows',
                                   'app_home_opened.json'))).with_indifferent_access
  end

  describe '#flow?' do
    context 'when it is a callback message with type app_home_opened' do
      it 'returns true' do
        flow = described_class.new(slack_app_opened_message)
        expect(flow.flow?).to be_truthy
      end
    end
  end

  describe '#run' do
    context 'when the user opens the app for the first time' do
      before do
        FactoryBot.create(:bot_setting)
      end

      it 'sends a message in the chat with tasketeer' do
        flow = described_class.new(slack_app_opened_message)

        expect_any_instance_of(Clients::Notifications::Channel).to receive(:send).with(
          BotSetting.last.welcome_message,
          'D04UCJ36LV6'
        )

        flow.run
      end
    end

    context 'when the user have already received the welcome message' do
      before do
        FactoryBot.create(:slack_user_settings, slack_user_id: 'UJFK67A1H', messages_tab_opened_at: Time.zone.now)
      end

      it 'should not send a message' do
        flow = described_class.new(slack_app_opened_message)

        expect_any_instance_of(Clients::Notifications::Channel).to_not receive(:send)

        flow.run
      end
    end
  end
end
