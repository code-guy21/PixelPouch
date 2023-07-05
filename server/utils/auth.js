const jwt = require('jsonwebtoken');
const { createClient } = require('redis');
require('dotenv').config();

let client;

(async () => {
	client = createClient({
		socket: {
			port: process.env.REDIS_PORT,
			host: process.env.REDIS_URL,
		},
	});
	client.on('error', err => {
		console.log('Redis Client Error', err);
		process.exit(1);
	});
	await client.connect();
})();

module.exports = {
	//verifies JSON web token coming from request authorization header
	authMiddleware: async (req, res, next) => {
		//retrieve authorization header
		const auth = req.headers.authorization;

		//check if authorization header exists
		if (!auth) {
			res.status(401).send('unauthorized');
		} else {
			//separate JSON web token from authorization header
			const token = auth.split(' ')[1];

			try {
				//verify JSON web token and extract user data
				const { data } = jwt.verify(token, process.env.JWT_SECRET, {
					maxAge: process.env.EXPIRATION,
				});

				let reply = await client.get(token);

				if (reply && reply === data.id) {
					//attach user data to req object
					req.user = data;

					//continue to API route
					next();
				} else {
					res.status(401).send('unauthorized');
				}
			} catch (error) {
				res.status(401).send('unauthorized');
			}
		}
	},

	//creates JSON web token
	signToken: async id => {
		try {
			//email,username,and id are used as payload for JSON web token
			const token = jwt.sign(
				{
					data: { id },
				},
				process.env.JWT_SECRET,
				{ expiresIn: process.env.EXPIRATION }
			);
			await client.set(token, id);
			return token;
		} catch (error) {
			throw new Error(error);
		}
	},
	removeToken: async token => {
		try {
			let reply = await client.del(token);
			return reply;
		} catch (error) {
			throw new Error(error);
		}
	},
};
