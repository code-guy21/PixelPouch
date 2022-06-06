const router = require("express").Router();
const {getTransactions, createTransaction} = require("../../controllers/transaction-controller");
const auth = require("../../utils/auth");
const {authMiddleware} = require("../../utils/auth")

router.route("/").get(getTransactions).post(authMiddleware,createTransaction)

module.exports = router;