import apiClient from '../clients/apiClient';
import ApiService from './api.service';

const Actions = {
  webPages: 'api/web_pages',
};

class WebPagesService {
  static async createWebPage(params) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.post(Actions.webPages, params);

      const webPage = response.data;

      return {
        webPage,
        errorMessage: null,
      };
    });
  }

  static async deleteWebPage(id) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.delete(`${Actions.webPages}/${id}`);

      const { Ok } = response.data;

      return {
        Ok,
        errorMessage: null,
      };
    });
  }

  static async listWebPages() {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.get(Actions.webPages);

      const webPages = response.data;

      return {
        webPages,
        errorMessage: null,
      };
    });
  }
}

export default WebPagesService;
