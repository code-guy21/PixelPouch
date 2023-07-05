const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');

const {
	createUser,
	loginUser,
	currentUser,
	logoutUser,
} = require('../../controllers/user-controller');

router.route('/').post(createUser).get(authMiddleware, currentUser);
router.route('/login').post(loginUser);
router.route('/logout').post(authMiddleware, logoutUser);

module.exports = router;
