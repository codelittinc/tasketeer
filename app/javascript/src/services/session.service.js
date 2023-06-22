class SessionService {
  static getAccessToken() {
    return localStorage.getItem('token');
  }

  static getCachedUser() {
    if (typeof window === 'undefined') return null;

    const user = localStorage.getItem('user');

    if (user && user !== '' && user !== 'undefined') {
      return JSON.parse(user);
    }

    return null;
  }

  static setCachedUser(user) {
    const stringUser = JSON.stringify(user);
    localStorage.setItem('user', stringUser);
  }

  static removeCachedUser() {
    localStorage.removeItem('user');
  }

  static setCachedAccessToken(token) {
    localStorage.setItem('token', token);
  }

  static removeCachedAccessToken() {
    localStorage.removeItem('token');
  }
}

export default SessionService;
