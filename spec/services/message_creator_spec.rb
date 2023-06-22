# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MessageCreator, type: :service do
  describe '#call' do
    let(:current_user) do
      FactoryBot.create(:user)
    end

    let(:prompt_params) do
      {
        user_id: current_user.id,
        body: 'Who let the dogs out?',
        has_audio: false
      }
    end

    context 'when there is no interaction' do
      it 'creates a message' do
        expect do
          described_class.new(prompt_params, 'chat', current_user).call
        end.to change(Message, :count).by(1)
      end

      it 'creates an interaction' do
        expect do
          described_class.new(prompt_params, 'chat', current_user).call
        end.to change(Interaction, :count).by(1)
      end

      it 'sets the message as the prompt to the interaction' do
        message = described_class.new(prompt_params, 'chat', current_user).call
        interaction = message.prompt_interaction
        expect(interaction.prompt).to eq(message)
      end

      it 'doest persist the message if the interaction is not persisted' do
        message = described_class.new(prompt_params, nil, current_user).call
        expect(message).to_not be_persisted
      end
    end

    context 'when there is an interaction' do
      let!(:interaction) do
        prompt = described_class.new(prompt_params, 'chat', current_user).call
        prompt.prompt_interaction
      end

      let(:response_params) do
        {
          user_id: current_user.id,
          body: 'Sattler did that!',
          has_audio: false
        }
      end

      it 'creates a message' do
        message = described_class.new(response_params, nil, nil, interaction).call

        expect(message).to be_persisted
      end

      it 'does not create an interaction' do
        expect do
          described_class.new(response_params, nil, nil, interaction).call
        end.to change(Interaction, :count).by(0)
      end

      it 'sets the message as the prompt to the interaction' do
        message = described_class.new(response_params, nil, nil, interaction).call
        expect(interaction.response).to eq(message)
      end

      it 'does not create a message if the interaction already has the response' do
        described_class.new(response_params, nil, nil, interaction).call

        message = described_class.new(response_params, nil, nil, interaction).call
        expect(message).to_not be_persisted
      end
    end
  end
end
