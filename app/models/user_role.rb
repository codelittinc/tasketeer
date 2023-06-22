# frozen_string_literal: true

# == Schema Information
#
# Table name: user_roles
#
#  id              :bigint           not null, primary key
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  organization_id :bigint           not null
#  role_id         :bigint           not null
#  user_id         :bigint           not null
#
# Foreign Keys
#
#  fk_rails_...  (organization_id => organizations.id)
#  fk_rails_...  (role_id => roles.id)
#  fk_rails_...  (user_id => users.id)
#
class UserRole < ApplicationRecord
  belongs_to :user
  belongs_to :role
  belongs_to :organization
end
