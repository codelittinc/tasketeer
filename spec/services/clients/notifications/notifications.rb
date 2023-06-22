# frozen_string_literal: true

require 'rails_helper'
require 'external_api_helper'

RSpec.describe Clients::Notifications::Notification, type: :service do
  describe '#show' do
    context 'the third_party_id is invalid when', :vcr do
      it 'has any value' do
        expected_response = {
          id: 5
        }

        VCR.use_cassette('clients#notifications#provider_credentials', erb: { body: { id: expected_id } }) do
          response = described_class.new.show('T029Q9LHJ')
          expect(response.to_json).to eq(expected_response.to_json)
        end
      end

      it 'is nil' do
        expect(Request).to_not receive(:get)

        described_class.new.show(nil)
      end
    end
  end
end
