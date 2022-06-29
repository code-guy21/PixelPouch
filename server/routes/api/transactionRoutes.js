const router = require("express").Router();
const {authMiddleware} = require("../../utils/auth")

const {deleteTransaction, createTransaction,updateTransaction} = require("../../controllers/transaction-controller");

router.route("/").post(authMiddleware,createTransaction)

router.route("/:id").delete(authMiddleware, deleteTransaction).put(authMiddleware, updateTransaction)

module.exports = router;