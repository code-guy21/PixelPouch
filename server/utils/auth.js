const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    //verifies JSON web token coming from request authorization header
	authMiddleware: (req, res, next) => {
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

                //attach user data to req object
				req.user = data;

                //continue to API route
				next();
			} catch (error) {
				res.status(401).send('unauthorized');
			}
		}
	},

    //creates JSON web token
	signToken: ({ email, username, id }) => {
		try {
            //email,username,and id are used as payload for JSON web token
			const token = jwt.sign(
				{
					data: { email, username, id },
				},
				process.env.JWT_SECRET,
				{ expiresIn: process.env.EXPIRATION }
			);
			return token;
		} catch (error) {
			throw new Error(error);
		}
	},
};
