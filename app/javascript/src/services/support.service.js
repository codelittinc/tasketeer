import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import { SUPPORT_API_URL } from 'env';
import ApiService from './api.service';

class SupportService {
  static async submit(formData) {
    return ApiService.executeRequest(async () => {
      await axios.postForm(SUPPORT_API_URL, formData, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
      return {
        errorMessage: null,
      };
    });
  }
}

export default SupportService;
