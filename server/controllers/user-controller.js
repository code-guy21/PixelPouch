const { Op } = require('sequelize');
const { User, Transaction } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
	createUser: async (req, res) => {
		try {
			const {id,email,username} = await User.create(req.body);
			const user = {id,email,username}
			const token = signToken(user);
			res.status(200).json({
				token,user
			});
		} catch (error) {
			res.status(400).send('error registering user');
		}
	},
	loginUser: async (req, res) => {
		try {
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
				include: [Transaction]
			});

			if (!userData) {
				res.status(400).send('error verifying user');
			} else {
				let check = userData.checkPassword(req.body.password);

				if (!check) {
					res.status(400).send('error verifying user');
				} else {
					let {id,email,transactions,username} = userData;
					let user = {id,email,transactions,username}
					let token = signToken(user);
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
