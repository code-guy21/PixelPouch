import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import Auth from '../../utils/auth';
import './style.css';

function Home() {
	const navigate = useNavigate();

	useEffect(() => {
		let token = Auth.loggedIn() ? Auth.getToken() : null;
		if (token) {
			navigate('/dashboard');
		}
	}, []);

	return (
		<div className='home'>
			<div className='container'>
				<header>
					<nav className='loginNav'>
						<h3 className='title'>NFTracker</h3>
					</nav>
				</header>

				<AuthForm />
			</div>
		</div>
	);
}

export default Home;
