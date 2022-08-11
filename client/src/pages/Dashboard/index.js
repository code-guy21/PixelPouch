import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from '../../redux/reducers/userSlice';
import Auth from '../../utils/auth';
import './style.css';

function Dashboard() {
	const dispatch = useDispatch();
	const loggedIn = useSelector(state => state.user.loggedIn);
	const navigate = useNavigate();

	const logoutUser = () => {
		Auth.logout();
		dispatch(logout());
	};

	useEffect(() => {
		try {
			let token = Auth.loggedIn() ? Auth.getToken() : null;

			if (!token) {
				throw new Error('something went wrong');
			}

			dispatch(login());
		} catch (error) {
			navigate('/');
		}
	}, [loggedIn]);

	return (
		<div id='content'>
			<aside id='menu'>
				<div id='title'>
					<h1>NFTracker</h1>
				</div>

				<nav>
					<button>Profile</button>
					<button>Transactions</button>
					<button>Stats</button>
				</nav>
			</aside>
			<main></main>
		</div>
	);
}

export default Dashboard;
