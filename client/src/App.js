import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from './redux/reducers/userSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Auth from './utils/auth';

function App() {
	const dispatch = useDispatch();
	const loggedIn = useSelector(state => state.user.loggedIn);

	useEffect(() => {
		let token = Auth.loggedIn() ? Auth.getToken() : null;

		if (!token) {
			dispatch(logoutUser());
		} else {
			let { data } = Auth.getUser(token);
			dispatch(loginUser(data));
		}
	}, [loggedIn]);

	if (loggedIn === null) {
		return <div>...loading</div>;
	}

	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</Router>
	);
}

export default App;
