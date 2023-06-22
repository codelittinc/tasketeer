import apiClient from '../clients/apiClient';
import ApiService from './api.service';

const Actions = {
  messages: 'api/messages',
  deleteAllMessages: 'api/messages/delete_all',
};

class MessagesService {
  static async createMessage(params) {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.post(Actions.messages, params);

      const { message } = response.data;

      return {
        message,
        errorMessage: null,
      };
    });
  }

  static async listMessages() {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.get(Actions.messages);

      const { messages } = response.data;

      return {
        messages,
        errorMessage: null,
      };
    });
  }

  static async deleteAllMessages() {
    return ApiService.executeRequest(async () => {
      const response = await apiClient.delete(Actions.deleteAllMessages);

      const { status } = response;

      return {
        status,
        errorMessage: null,
      };
    });
  }
}

export default MessagesService;
