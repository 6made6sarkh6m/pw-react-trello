export class UserService {
  static isLoggedIn() {
    return !!localStorage.getItem("user");
  }

  static getCurrentUser() {
    return localStorage.getItem("user") || "";
  }

  static setUsername(username: string) {
    localStorage.setItem("user", username);
  }

  static patternValidation(value: string) {
    return /\s/g.test(value);
  }
}
