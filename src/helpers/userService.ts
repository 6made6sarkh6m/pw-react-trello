export class UserService {
  static getCurrentUser() {
    return localStorage.getItem("user") || "";
  }

  static setUsername(username: string) {
    localStorage.setItem("user", username);
  }
}
