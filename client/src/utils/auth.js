import jwt_decode from "jwt-decode"

class AuthService {
	login(token) {
		localStorage.setItem('auth_token', token);
	}

	getUser(){
		return jwt_decode(this.getToken())
	}
	
	getToken(){
		return localStorage.getItem("auth_token")
	}

	logout() {
		localStorage.removeItem('auth_token');
	}
}

export default new AuthService();
