import React, { useState } from 'react';
import AuthForm from '../../components/AuthForm';
import './style.css';

function Home() {
	const [modalState, setModalState] = useState(false);

	return (
		<div className='home'>
			<div className='container'>
				<nav className="loginNav">
					<h3 className='title'>NFTracker</h3>
				<button className='login' onClick={() => setModalState(!modalState)}>
					login
				</button>
				</nav>
				
			</div>
			<div
				onClick={() => setModalState(!modalState)}
				className={modalState ? 'overlay' : 'overlay hide'}>
				
			</div>
			<AuthForm modalState={modalState}/>
		</div>
	);
}

export default Home;
