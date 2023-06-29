import apiClient from '../clients/apiClient';
import ApiService from './api.service';

const Actions = {
  index_google_drive: 'api/google-integration/index-google-drive',
};

class GoogleIntegrationService {
  static async indexGoogleDrive(googleToken, googleFolderId) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.post(Actions.index_google_drive, {
        google_token: googleToken,
        google_folder_id: googleFolderId,
      });

      const { success } = response.data;

      return {
        errorMessage: null,
        success,
      };
    });
  }
}

export default GoogleIntegrationService;
