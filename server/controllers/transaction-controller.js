const {Transaction} = require("../models")

module.exports = {
    getTransactions: function(req,res){
        res.send("test transaction")
    }
}