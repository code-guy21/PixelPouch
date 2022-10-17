const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');

const {
	createUser,
	loginUser,
	currentUser,
} = require('../../controllers/user-controller');

router.route('/').post(createUser).get(authMiddleware, currentUser);
router.route('/login').post(loginUser);

module.exports = router;
