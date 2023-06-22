# frozen_string_literal: true

# == Schema Information
#
# Table name: user_organizations
#
#  id              :bigint           not null, primary key
#  is_admin        :boolean          default(FALSE)
#  selected        :boolean          default(FALSE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :bigint           not null
#  user_id         :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (user_id => users.id)
#
FactoryBot.define do
  factory :user_organization do
    user { nil }
    organization { nil }
  end
end
