const router = require("express").Router()
const {getUsers} = require("../../controllers/user-controller")

router.route("/").get(getUsers)

module.exports = router;