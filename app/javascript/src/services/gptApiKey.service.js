import apiClient from '../clients/apiClient';
import ApiService from './api.service';

const Actions = {
  gptApiKey: 'api/gpt_api_keys',
};

class GptApiKeyService {
  static async createApiKey(params) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.post(Actions.gptApiKey, params);

      const { api_key: apiKey } = response.data;

      return {
        apiKey,
        errorMessage: null,
      };
    });
  }

  static async getApiKey() {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.get(Actions.gptApiKey);

      const { api_key: apiKey } = response.data;

      return {
        apiKey,
        errorMessage: null,
      };
    });
  }

  static async deleteApiKey(id) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.delete(`${Actions.gptApiKey}/${id}`);

      const { status } = response;

      return {
        status,
        errorMessage: null,
      };
    });
  }
}

export default GptApiKeyService;
