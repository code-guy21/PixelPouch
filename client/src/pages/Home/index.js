import React, { useState } from 'react';
import AuthForm from '../../components/AuthForm';
import './style.css';

function Home() {
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
