const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');

const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

//fetch static assets from build folder if in production mode
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
}

//use API routes in Express app
app.use(routes);

//synchronize database before starting API server
sequelize
	.sync({
		force: false,
	})
	.then(() => {
		app.listen(PORT, () => {
			console.log(`App listening on port ${PORT}!`);
		});
	});
