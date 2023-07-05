export const login = async formData =>
	fetch('/api/user/login', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const register = async formData =>
	fetch('/api/user', {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	});

export const currentUser = async token =>
	fetch('/api/user', {
		method: 'GET',
		headers: {
			authorization: 'Bearer ' + token,
		},
	});

export const logout = async token =>
	fetch('/api/user/logout', {
		method: 'POST',
		headers: {
			authorization: 'Bearer ' + token,
		},
	});
