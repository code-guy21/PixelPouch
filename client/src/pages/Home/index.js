import React from 'react';
import Auth from '../../components/Auth'
import "./style.css"

function Home() {
	return <div className='home'>
		<div className="container">
		<h3 >NFTracker</h3>
		<Auth/>
		</div>
	</div>;
}

export default Home;
