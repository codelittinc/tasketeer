import apiClient from '../clients/apiClient';
import ApiService from './api.service';

const Actions = {
  searchHistory: 'api/admin/history',
};

class SearchHistoryService {
  static async fetchSearchHistory(page) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.get(Actions.searchHistory, {
        params: {
          page,
        },
      });
      const { searches, pagination } = response.data;

      return {
        searches,
        pagination,
        errorMessage: null,
      };
    });
  }
}

export default SearchHistoryService;
