import apiClient from '../clients/apiClient';
import ApiService from './api.service';

const Actions = {
  listRoles: 'api/roles',
};

class RolesService {
  static async listRoles() {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.get(Actions.listRoles);
      const { roles } = response.data;

      return {
        roles,
        errorMessage: null,
      };
    });
  }
}

export default RolesService;
