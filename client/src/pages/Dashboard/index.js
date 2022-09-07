import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/reducers/userSlice';
import Auth from '../../utils/auth';
import './style.css';

function Dashboard() {
	const dispatch = useDispatch();
	const loggedIn = useSelector(state => state.user.loggedIn);
	const navigate = useNavigate();

	const handleLogout = () => {
		Auth.logout();
		dispatch(logoutUser());
	};

	useEffect(() => {
		if (!loggedIn) {
			navigate('/');
		}
	}, [loggedIn]);

	if (!loggedIn) {
		return <div>...loading</div>;
	}

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
