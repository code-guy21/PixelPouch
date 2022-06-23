class AuthService {
  login (token) {
        localStorage.setItem("auth_token", token)
    }
    
    logout () {
        localStorage.removeItem("auth_token")
    }
}

export default new AuthService();