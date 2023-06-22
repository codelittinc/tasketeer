# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  avatar_url             :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  given_name             :string
#  jti                    :string           default(""), not null
#  provider               :string
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  uid                    :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
FactoryBot.define do
  factory :user do
    email { 'email@domain.com' }
    password { '123456789' }
  end
end
