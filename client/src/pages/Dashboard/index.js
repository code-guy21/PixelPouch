import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/reducers/userSlice';
import Auth from '../../utils/auth';
import './style.css';

function Dashboard() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const navigate = useNavigate();

	const handleLogout = () => {
		Auth.logout();
		dispatch(logoutUser());
	};

	useEffect(() => {
		if (!user.loggedIn) {
			navigate('/');
		}
	}, [user.loggedIn]);

	if (!user.loggedIn) {
		return <div>...loading</div>;
	}

	return (
		<>
			<header className='dashTitle'>
				<h1>NFTracker</h1>
				<button onClick={handleLogout}>logout</button>
			</header>
			<div id='content'>
				<aside id='menu'>
					<h1 id='title'>{user.username}</h1>
					<nav>
						<div className='menu_option'>Profile</div>
						<div className='menu_option'>Transactions</div>
						<div className='menu_option'>Stats</div>
					</nav>
				</aside>
				<main>
					{user.transactions.map(t => (
						<div>{t.collection}</div>
					))}
				</main>
			</div>
		</>
	);
}

export default Dashboard;
