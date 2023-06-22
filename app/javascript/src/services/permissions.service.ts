import apiClient from '../clients/apiClient';
import ApiService from './api.service';

const Actions = {
  listPermissions: 'api/user_roles',
  deletePermission: 'api/user_roles',
  createPermission: 'api/user_roles',
};

class PermissionsService {
  static async listPermissions() {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.get(Actions.listPermissions);
      const { roles } = response.data;

      return {
        roles,
        errorMessage: null,
      };
    });
  }

  static async createPermission(email, role) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.post(Actions.createPermission, {
        email,
        role_id: role,
      });
      const { Ok, not_found: notFound, already_exists: alreadyExists } = response.data;

      return {
        Ok,
        notFound,
        alreadyExists,
        errorMessage: null,
      };
    });
  }

  static async deletePermission(id) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.delete(`${Actions.deletePermission}/${id}`);
      const { Ok } = response.data;

      return {
        Ok,
        errorMessage: null,
      };
    });
  }
}

export default PermissionsService;
