const { Op } = require('sequelize');
const { User, Transaction } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
	createUser: async (req, res) => {
		try {
			const { id, email, username } = await User.create(req.body);

			const user = { id, email, username };

			//create JSON web token with user data as payload
			const token = signToken(user);

			//send back token along with user data
			res.status(200).json({
				token,
				user,
			});
		} catch (error) {
			res.status(400).send('error registering user');
		}
	},
	loginUser: async (req, res) => {
		try {

			//find user that matches email or password given by client
			const userData = await User.findOne({
				where: {
					[Op.or]: [
						{
							email: req.body.email,
						},
						{
							username: req.body.username,
						},
					],
				},
				//include users transaction history in query
				include: [Transaction],
			});

			//check if user was found
			if (!userData) {
				res.status(400).send('error verifying user');
			} else {

				//verify if user's password is correct
				let check = userData.checkPassword(req.body.password);

				if (!check) {
					res.status(400).send('error verifying user');
				} else {

					//extract only necessary information from user
					let { id, email, transactions, username } = userData;

					let user = { id, email, transactions, username };

					//create JSON web token with user data as payload
					let token = signToken(user);

					//send client JSON web token along with user data
					res.json({
						token,
						user,
					});
				}
			}
		} catch (error) {
			res.status(500).json('error logging in');
		}
	},
};
