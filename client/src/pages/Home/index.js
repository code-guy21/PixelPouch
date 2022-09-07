import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';
import './style.css';

function Home() {
	const loggedIn = useSelector(state => state.user.loggedIn);
	const navigate = useNavigate();

	useEffect(() => {
		if (loggedIn) {
			navigate('/dashboard');
		}
	}, [loggedIn]);

	if (loggedIn) {
		return <div>...loading</div>;
	}

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
