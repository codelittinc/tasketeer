import apiClient from '../clients/apiClient';
import ApiService from './api.service';

// transform this file into a webhook
const Actions = {
  apiSecrets: 'api/api_credentials',
};

class ApiCredentialsService {
  static async createApiCredential(params) {
    return ApiService.executeRequest(async () => {
      const body = {
        secret_key: params.secretKey,
      }
      const response = await apiClient.post(Actions.apiSecrets, body);

      const { api_credential: apiCredential } = response.data;

      return {
        apiCredential,
        errorMessage: null,
      };
    });
  }

  static async updateApiCredential(id, params) {
    return ApiService.executeRequest(async () => {
      const body = {
        secret_key: params.secretKey,
      }
      const response = await apiClient.patch(`${Actions.apiSecrets}/${id}`, body);

      const { api_credential: apiCredential } = response.data;
      debugger

      return {
        apiCredential,
        errorMessage: null,
      };
    });
  }

  static async getApiCredential(id) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.get(`${Actions.apiSecrets}/${id}`);

      const { api_credential: apiCredential } = response.data;

      return {
        apiCredential,
        errorMessage: null,
      };
    });
  }
}

export default ApiCredentialsService;
