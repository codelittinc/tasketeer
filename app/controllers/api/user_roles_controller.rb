# frozen_string_literal: true

module Api
  class UserRolesController < ApiController
    before_action :verify_admin

    def index
      users_roles = UserRole
                    .where(organization_id: current_user.selected_organization.id)
                    .order('users.email ASC')
                    .includes(:user, :role)
      return render json: { roles: [] } if users_roles.blank?

      render json: { roles: users_roles.map { |ur| UserRoleSerializer.new(ur).serializable_hash[:data][:attributes] } }
    end

    def create
      user = User.find_by(email: params[:email])
      render json: { not_found: true }, status: :ok and return if user.blank?

      already_exists = UserRole.where(
        organization_id: current_user.selected_organization.id,
        user_id: user.id,
        role_id: params[:role_id]
      ).count.positive?
      render json: { already_exists: true }, status: :ok and return if already_exists

      UserRole.new(
        organization_id: current_user.selected_organization.id,
        user_id: user.id,
        role_id: params[:role_id]
      ).save!
      render json: { Ok: true }, status: :created
    end

    def destroy
      UserRole.find(params[:id]).destroy!
      render json: { Ok: true }, status: :ok
    end
  end
end
