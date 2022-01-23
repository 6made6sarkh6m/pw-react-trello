export class UserService {
    
    static isLoggedIn() {
        return !!localStorage.getItem('user');
    }

    static getCurrentUser() {
        return JSON.parse(localStorage.getItem('user') || '');
    }

    static setUsername(username : string) {
        localStorage.setItem('user', username);
    }
}

