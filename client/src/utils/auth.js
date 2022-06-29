import jwt_decode from "jwt-decode"

class AuthService {
	login(token) {
		localStorage.setItem('auth_token', token);
	}

	getUser(token){
		return jwt_decode(token)
	}

	loggedIn(){
		return !this.isTokenExpired(this.getToken()) && this.getToken();
	}

	isTokenExpired(token){

		try {
			const user = jwt_decode(token)
			return user.exp < Date.now()/1000 ? true : false;
		} catch (error) {
			return true;
		}
	}
	
	getToken(){
		return localStorage.getItem("auth_token")
	}

	logout() {
		localStorage.removeItem('auth_token');
	}
}

export default new AuthService();
