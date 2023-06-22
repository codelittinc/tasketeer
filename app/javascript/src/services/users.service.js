import apiClient from "../clients/apiClient";
import routes from "../constants/routes";
import ApiService from "./api.service";
import SessionService from "./session.service";

const Actions = {
  currentUser: "api/me",
  logout: "logout",
  oauthSlackSignIn: "api/oauth/slack",
  oauthSlackAuthorize: "api/authorize_oauth/slack",
  signIn: "login",
  signUp: "signup",
};

class UsersService {
  static async getAuthenticatedUser() {
    try {
      if (!SessionService.getAccessToken()) {
        return { user: null };
      }
      const response = await apiClient.get(Actions.currentUser);
      const { user } = response.data;
      SessionService.setCachedUser(user);
      return {
        user,
        errorMessage: null,
      };
    } catch (error) {
      if (error.isAxiosError && error.response.data?.errors) {
        return {
          user: null,
          errorMessage: ApiService.formatErrors(error.response.data?.errors),
        };
      }

      return {
        user: null,
        errorMessage: "Unexpected error",
      };
    }
  }

  static async slackOauthAuthorize(code, pathname) {
    const isAuthorize = pathname === routes.authorizeOauthSlack;
    const endpoint = isAuthorize
      ? Actions.oauthSlackAuthorize
      : Actions.oauthSlackSignIn;

    return ApiService.executeRequest(async () => {
      const response = await apiClient.post(endpoint, {
        code,
      });
      const { user } = response.data;
      SessionService.setCachedAccessToken(
        response.headers.get("Authorization")
      );
      SessionService.setCachedUser(user);

      return {
        user,
        errorMessage: null,
      };
    });
  }

  static async signIn(email, password) {
    try {
      const response = await apiClient.post(Actions.signIn, {
        user: {
          email,
          password,
        },
      });

      const { user } = response.data;
      SessionService.setCachedAccessToken(
        response.headers.get("Authorization")
      );
      SessionService.setCachedUser(user);
      return {
        user,
        errorMessage: null,
      };
    } catch (error) {
      if (error.isAxiosError) {
        if (error.response.data?.errors) {
          return {
            user: null,
            errorMessage: ApiService.formatErrors(error.response.data?.errors),
          };
        }

        if (error.response.status >= 400 && error.response.status < 500) {
          return {
            user: null,
            errorMessage: "Invalid credentials",
          };
        }
      }

      return {
        user: null,
        errorMessage: "Unexpected error",
      };
    }
  }

  static async signUp(userData) {
    try {
      const {
        email,
        password,
        // eslint-disable-next-line camelcase
        password_confirmation,
      } = userData;

      const response = await apiClient.post(Actions.signUp, {
        user: {
          email,
          password,
          // eslint-disable-next-line camelcase
          password_confirmation,
        },
      });

      const { user, errors } = response.data;

      if (errors) {
        return {
          user: null,
          errorMessage: ApiService.formatErrors(errors),
        };
      }

      SessionService.setCachedAccessToken(
        response.headers.get("Authorization")
      );
      SessionService.setCachedUser(user);
      return {
        user,
        errorMessage: null,
      };
    } catch (error) {
      if (error.isAxiosError && error.response.data?.errors) {
        return {
          user: null,
          errorMessage: ApiService.formatErrors(error.response.data?.errors),
        };
      }
      return {
        user: null,
        errorMessage: "Unexpected error",
      };
    }
  }

  static async signOut() {
    try {
      await apiClient.delete(Actions.logout);
    } catch (_ignored) {
      /* empty */
    }
    SessionService.removeCachedAccessToken();
    SessionService.removeCachedUser();
  }
}

export default UsersService;
