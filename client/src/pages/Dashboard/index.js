import React, { useState, useEffect } from 'react';
import { currentUser } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, loginUser } from '../../redux/reducers/userSlice';
import { format, parseISO, isValid } from 'date-fns';
import Auth from '../../utils/auth';
import './style.css';

function Dashboard() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const navigate = useNavigate();

	const handleLogout = () => {
		Auth.logout();
		dispatch(logoutUser());
		navigate('/');
	};

	useEffect(() => {
		let token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			navigate('/');
		} else if (!user.loggedIn) {
			const getUser = async () => {
				const resp = await currentUser(token);
				const userInfo = await resp.json();
				dispatch(loginUser(userInfo));
			};

			getUser();
		}
	}, [user.loggedIn]);

	if (!user.loggedIn) {
		return <div>...loading</div>;
	}

	return (
		<>
			<header className='dash_header'>
				<nav className='main_nav'>
					<h1>NFTracker</h1>
					<div className='small_menu'>
						<button onClick={handleLogout}>logout</button>
					</div>
				</nav>
			</header>
			<div id='content'>
				<div className='sidebar'>
					<aside id='menu'>
						<h1 id='title'>{user.username}</h1>
						<nav className='side_nav'>
							<div className='menu_option'>Profile</div>
							<div className='menu_option'>Transactions</div>
							<div className='menu_option'>Stats</div>
						</nav>
					</aside>
				</div>

				<main>
					{user.transactions.length > 0 ? (
						user.transactions.map((t, i) => {
							return (
								<div className='card' key={i}>
									<div className='item'>{t.collection}</div>
									<div className='item'>{t.collection_id}</div>
									<div className='item'>
										{format(parseISO(t.purchase_date), 'MM/dd/yyyy')}
									</div>
									<div className='item'>{t.purchase_currency}</div>
									<div className='item'>{t.purchase_total}</div>
									<div className='item'>{t.USD_purchase_total}</div>
									<div className='item'>{t.sale_date}</div>
									<div className='item'>{t.sale_currency}</div>
									<div className='item'>{t.sale_total}</div>
									<div className='item'>{t.USD_sale_total}</div>
									<div className='item'>{t.USD_net_total}</div>
								</div>
							);
						})
					) : (
						<div>no transactions</div>
					)}
				</main>
			</div>
		</>
	);
}

export default Dashboard;
