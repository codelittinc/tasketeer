# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApiCredential, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:secret_key) }
  end
end
