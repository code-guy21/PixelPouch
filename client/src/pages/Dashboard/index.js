import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';

function Dashboard() {
	const [loggedIn, setLoggedIn] = useState(false);
	const navigate = useNavigate();

	const logout = () => {
		Auth.logout();
		setLoggedIn(false);
	};

	useEffect(() => {
		try {
			let token = Auth.loggedIn() ? Auth.getToken() : null;

			if (!token) {
				throw new Error('something went wrong');
			}

			setLoggedIn(true);
		} catch (error) {
			navigate('/');
		}
	}, [loggedIn]);

	return (
		<div>
			<h1>dashboard</h1>
			<button onClick={logout}>logout</button>
		</div>
	);
}

export default Dashboard;
