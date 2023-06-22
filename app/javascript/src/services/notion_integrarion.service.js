import apiClient from '../clients/apiClient';
import ApiService from './api.service';

const Actions = {
  last_execution: 'api/notion/last-execution/',
  run: 'api/notion/run/',
  all_pages: 'api/notion/all_pages/',
};

class NotionIntegrationService {
  static async allPages(organizationId) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.get(Actions.all_pages + organizationId);
      const { pages } = response.data;

      return {
        pages,
        errorMessage: null,
      };
    });
  }

  static async lastExecution(organizationId) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.get(Actions.last_execution + organizationId);
      const { external_resource_metadata } = response.data;

      return {
        response: external_resource_metadata,
        errorMessage: null,
      };
    });
  }

  static async runIntegration(organizationId) {
    return ApiService.executeRequest(async () => {
      await apiClient.post(Actions.run + organizationId);

      return {
        errorMessage: null,
      };
    });
  }
}

export default NotionIntegrationService;
