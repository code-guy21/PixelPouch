import React from 'react';
import Auth from "../../utils/auth"

function Dashboard() {
	return <div>
		<h1>dashboard</h1>
		<button onClick={Auth.logout}>logout</button>
	</div>;
}

export default Dashboard;
