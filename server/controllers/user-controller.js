const { Op } = require('sequelize');
const { User, Transaction } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
	createUser: async (req, res) => {
		try {
			const user = await User.create(req.body);
			const token = signToken(user);
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
				include: [Transaction]
			});

			if (!user) {
				res.status(400).send('error verifying user');
			} else {
				let check = user.checkPassword(req.body.password);

				if (!check) {
					res.status(400).send('error verifying user');
				} else {
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
