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
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable,
         :jwt_authenticatable, :omniauthable,
         omniauth_providers: %i[slack], jwt_revocation_strategy: self

  has_many :user_organizations, dependent: :destroy
  has_many :user_roles, dependent: :destroy
  has_many :organizations, through: :user_organizations

  has_many :approved_organizations,
           -> { where(organizations: { approved: true }) },
           class_name: 'Organization',
           source: :organization,
           through: :user_organizations

  def selected_organization
    @selected_organization ||= user_organizations.find_by(selected: true)&.organization
  end

  def roles
    return [] if selected_organization.blank?

    @roles ||= user_roles.where(organization: selected_organization).map(&:role)
  end

  def admin?
    return false if selected_organization.blank?

    user_organizations.find_by(organization: selected_organization).is_admin
  end
end
