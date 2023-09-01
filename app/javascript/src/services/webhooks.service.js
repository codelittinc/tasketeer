import apiClient from '../clients/apiClient';
import ApiService from './api.service';

// transform this file into a webhook
const Actions = {
  webhooks: 'api/webhooks',
};

class WebhooksService {
  static async createWebhook(params) {
    return ApiService.executeRequest(async () => {
      debugger
      const body = {
        webhook: {
          url: params.url,
        }
      }

      const response = await apiClient.post(Actions.webhooks, body);

      const { webhook: apiCredential } = response.data;

      return {
        apiCredential,
        errorMessage: null,
      };
    });
  }

  static async updateWebhook(id, params) {
    return ApiService.executeRequest(async () => {
      const body = {
        webhook: {
          url: params.url,
        }
      }
      const response = await apiClient.patch(`${Actions.webhooks}/${id}`, body);

      const { webhook: apiCredential } = response.data;
      debugger

      return {
        apiCredential,
        errorMessage: null,
      };
    });
  }

  static async getWebhook(id) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.get(`${Actions.webhooks}/${id}`);

      const { webhook } = response.data;

      return {
        webhook,
        errorMessage: null,
      };
    });
  }
}

export default WebhooksService;
