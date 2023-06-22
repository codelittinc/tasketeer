class ApiService {
  static formatErrors(errors) {
    return errors.join(', ');
  }

  static async executeRequest(requestFn) {
    try {
      return await requestFn();
    } catch (error) {
      if (error.isAxiosError && error.response.data?.errors) {
        return {
          user: null,
          errorMessage: ApiService.formatErrors(error.response.data?.errors),
        };
      }

      return {
        user: null,
        errorMessage: 'Unexpected error',
      };
    }
  }
}

export default ApiService;
