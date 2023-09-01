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
class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :created_at, :avatar_url, :given_name

  attributes :waiting_for_approval do |object|
    object.selected_organization.blank? ? nil : object.approved_organizations.empty?
  end

  attributes :selected_organization do |object|
    {
      id: object.selected_organization&.id,
      name: object.selected_organization&.name,
      api_credential: {
        id: object.selected_organization&.api_credential&.id
      },
      webhook: {
        id: object.selected_organization&.webhook&.id
      }
    }
  end

  attributes :is_admin, &:admin?
end
