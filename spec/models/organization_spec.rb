# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Organization, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:notifications_id) }
    it { should validate_presence_of(:notifications_key) }
    it { should validate_presence_of(:name) }
  end
end
