const { Op } = require('sequelize');
const { User, Transaction } = require('../models');
const { signToken, removeToken } = require('../utils/auth');

module.exports = {
	currentUser: async (req, res) => {
		try {
			let { id, email, username, transactions } = await User.findOne({
				where: { id: req.user.id },
				include: [Transaction],
			});
			const userInfo = { id, email, username, transactions };
			res.json(userInfo);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	createUser: async (req, res) => {
		try {
			const user = await User.findOne({
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
			});

			if (user) {
				res.status(400).send('User account already exists');
			} else {
				const { id, email, username } = await User.create(req.body);

				const userInfo = { id, email, username };

				//create JSON web token with user data as payload
				const token = await signToken(id);

				//send back token along with user data
				res.status(200).json({
					token,
					userInfo,
				});
			}
		} catch (error) {
			console.log(error);
			res.status(400).send(error.message);
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
				res.status(400).send('No account found');
			} else {
				//verify if user's password is correct
				let check = userData.checkPassword(req.body.password);

				if (!check) {
					res.status(400).send('Incorrect password');
				} else {
					//extract only necessary information from user
					let { id, email, transactions, username } = userData;

					let userInfo = { id, email, username, transactions };

					//create JSON web token with user data as payload
					let token = await signToken(id);

					//send client JSON web token along with user data
					res.json({
						token,
						userInfo,
					});
				}
			}
		} catch (error) {
			res.status(500).send('Error logging in');
		}
	},

	logoutUser: async (req, res) => {
		try {
			let auth = req.headers.authorization;
			const token = auth.split(' ')[1];
			await removeToken(token);
			res.status(200).send('successfully logged out!');
		} catch (error) {
			res.status(500).send(error);
		}
	},
};
