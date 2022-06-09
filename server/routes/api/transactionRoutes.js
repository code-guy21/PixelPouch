const router = require("express").Router();
const {deleteTransaction, createTransaction,updateTransaction} = require("../../controllers/transaction-controller");
const {authMiddleware} = require("../../utils/auth")

router.route("/").post(authMiddleware,createTransaction)
router.route("/:id").delete(authMiddleware, deleteTransaction).put(authMiddleware, updateTransaction)

module.exports = router;