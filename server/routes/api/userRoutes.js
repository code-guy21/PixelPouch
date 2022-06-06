const router = require("express").Router()
const {getUsers, createUser, loginUser} = require("../../controllers/user-controller")

router.route("/").get(getUsers).post(createUser)
router.route("/login").post(loginUser)

module.exports = router;