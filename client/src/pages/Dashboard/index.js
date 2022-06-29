import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import {logout,login} from "../../redux/reducers/userSlice"
import Auth from '../../utils/auth';

function Dashboard() {
	const dispatch = useDispatch()
	const loggedIn = useSelector((state) => state.user.loggedIn)
	const navigate = useNavigate();

	const logoutUser = () => {
		Auth.logout();
		dispatch(logout())
	};

	useEffect(() => {
		try {
			let token = Auth.loggedIn() ? Auth.getToken() : null;

			if (!token) {
				throw new Error('something went wrong');
			}

			dispatch(login())
		} catch (error) {
			navigate('/');
		}
	}, [loggedIn]);

	return (
		<div>
			<h1>dashboard</h1>
			<button onClick={logoutUser}>logout</button>
		</div>
	);
}

export default Dashboard;
