import decode from 'jwt-decode';

// create a class with methods that perform different actions with the token
class AuthService {
  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if the user is still logged in
  loggedIn() {
    // check if there is a saved token and it's still valid
    const token = this.getToken();
    // use type coercion to check ig token is NOT undefined and the token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  // check if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // retrieve token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // set token to localStorage and reload page to homepage
  login(idToken) {
    // saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // clear token from localStorage and force logout with reload
  logout() {
    // clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // reload the page and reset the state of the application
    window.location.assign('/');
  }
}

// every component that imports it will have a new version to reduce risk of leaving remnant data hanging around
export default new AuthService();
