const {Transaction} = require("../models")

module.exports = {
    getTransactions: async (req,res) => {
        try {
            let transactions = await Transaction.findAll()
            res.status(200).json(transactions)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    createTransaction: async(req,res) => {
        try {
            let newTransaction = await Transaction.create({...req.body, user_id: req.user.id})

            res.status(200).json(newTransaction)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}