import React from 'react';
import AuthForm from '../../components/AuthForm'
import "./style.css"

function Home() {
	return <div className='home'>
		<div className="container">
		<h3 className="title" >NFTracker</h3>
		<AuthForm/>
		</div>
	</div>;
}

export default Home;
