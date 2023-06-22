import apiClient from '../clients/apiClient';
import ApiService from './api.service';

const Actions = {
  create: 'api/organizations',
  update: 'api/organizations/',
  upload: 'api/organization_files',
  listFiles: 'api/organization_files',
  deleteFile: 'api/organization_files',
  indexFiles: 'api/index-files',
};

class OrganizationsService {
  static async createOrganization(orgName, notionApiKey) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.post(Actions.create, {
        organization: {
          name: orgName,
          notion_api_key: notionApiKey,
        },
      });
      const { organization } = response.data;

      return {
        organization,
        errorMessage: null,
      };
    });
  }

  static async updateOrganization(organizationId, notionApiKey) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.put(Actions.update + organizationId, {
        organization: {
          notion_api_key: notionApiKey,
        },
      });
      const { organization } = response.data;

      return {
        organization,
        errorMessage: null,
      };
    });
  }

  static async uploadFiles(files) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.post(Actions.upload, {
        files,
      }, { headers: { 'Content-Type': 'multipart/form-data' } });
      const { success } = response.data;

      return {
        success,
        errorMessage: null,
      };
    });
  }

  static async listFiles() {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.get(Actions.listFiles);
      const { files } = response.data;

      return {
        files,
        errorMessage: null,
      };
    });
  }

  static async deleteFile(fileId) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.delete(`${Actions.deleteFile}/${fileId}`);
      const { success } = response.data;

      return {
        success,
        errorMessage: null,
      };
    });
  }

  static async indexFiles() {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.post(Actions.indexFiles);
      const { success } = response.data;

      return {
        success,
        errorMessage: null,
      };
    });
  }
}

export default OrganizationsService;
