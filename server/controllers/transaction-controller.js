const {Transaction} = require("../models")
const {Op} = require("sequelize")
module.exports = {
    createTransaction: async(req,res) => {
        try {
            let newTransaction = await Transaction.create({...req.body, user_id: req.user.id})

            res.status(200).json(newTransaction)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    deleteTransaction: async(req,res) => {
        try {
            //search for transaction with matching id and user_id
            let transaction = await Transaction.findOne({
                where:{
                    [Op.and]: {
                        "user_id": req.user.id,
                        "id": req.params.id
                    }
                }
            })

            //check if transaction was found
            if(!transaction){
                res.status(400).send("transaction not found")
            }else{
                //delete transaction from user account
                await transaction.destroy()
                res.send("transaction successfully deleted")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateTransaction: async(req,res) => {
        try {
            //search for transaction with matching id and user_id
            let transaction = await Transaction.findOne({
                where:{
                    [Op.and]: {
                        "user_id": req.user.id,
                        "id": req.params.id
                    }
                }
            })

            //check if transaction was found
            if(!transaction){
                res.status(400).send("transaction not found")
            }else{
                //update transaction
                let updatedTransaction = await transaction.update(req.body);
                res.json(updatedTransaction)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}