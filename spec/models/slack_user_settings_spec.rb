# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SlackUserSettings, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:slack_user_id) }
  end
end
