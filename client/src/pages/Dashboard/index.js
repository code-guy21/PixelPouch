import React, { useState, useEffect } from 'react';
import { currentUser } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, loginUser } from '../../redux/reducers/userSlice';
import { format, parseISO, isValid } from 'date-fns';
import iconSet from './selection.json';
import IcomoonReact, { iconList } from 'icomoon-react';
import Auth from '../../utils/auth';
import './style.css';
import thug from '../../images/thugbird.png';

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
						<ul>
							<li className='menu_option title'>
								<div className='menu_selection'>
									<div className='menu_item'>{user.username.toUpperCase()}</div>
								</div>
							</li>

							<li className='menu_option'>
								<div className='menu_item'>
									<div className='menu_selection'>
										<span>
											<IcomoonReact
												iconSet={iconSet}
												color='#ffff'
												size={20}
												icon='user'
											/>
										</span>

										<p>Profile</p>
									</div>
								</div>
							</li>
							<li className='menu_option'>
								<div className='menu_item'>
									<div className='menu_selection'>
										<span>
											<IcomoonReact
												iconSet={iconSet}
												color='#ffff'
												size={20}
												icon='coin-dollar'
											/>
										</span>
										<p>Transactions</p>
									</div>
								</div>
							</li>
							<li className='menu_option'>
								<div className='menu_item'>
									<div className='menu_selection'>
										{' '}
										<span>
											<IcomoonReact
												iconSet={iconSet}
												color='#ffff'
												size={20}
												icon='stats-dots'
											/>
										</span>
										<p>Stats</p>
									</div>
								</div>
							</li>
						</ul>
					</aside>
				</div>

				<main>
					<section>
						<div className='mini_nav'>
							<div className='view'>
								<button>
									<IcomoonReact
										iconSet={iconSet}
										color='#ffff'
										size={20}
										icon='menu'
									/>
								</button>
								<button>
									<IcomoonReact
										iconSet={iconSet}
										color='#ffff'
										size={20}
										icon='border-all'
									/>
								</button>
							</div>
						</div>
						<div className='transactions'>
							{user.transactions.length > 0 ? (
								user.transactions.map((t, i) => {
									return (
										<div className='card' key={i}>
											<div className='card_image'>
												<img src={thug}></img>
											</div>
											<div className='info'></div>
											{/* <div className='item'>{t.collection}</div>
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
											<div className='item'>{t.USD_net_total}</div> */}
										</div>
									);
								})
							) : (
								<div>no transactions</div>
							)}
						</div>
						{/* {user.transactions.length > 0 ? (
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
						)} */}
					</section>
				</main>
			</div>
		</>
	);
}

export default Dashboard;
