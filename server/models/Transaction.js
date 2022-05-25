const {Model, DataTypes} = require("sequelize")
const sequelize = require("../config/connection")

class Transaction extends Model{}

Transaction.init(
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    collection: {
        type: DataTypes.STRING
    },
    collection_id: {
        type: DataTypes.STRING
    },
    purchase_date: {
        type: DataTypes.DATE
    },
    purchase_currency: {
        type: DataTypes.STRING
    },
    purchase_total: {
        type: DataTypes.DECIMAL
    },
    sale_date: {
        type: DataTypes.DATE
    },
    sale_currency: {
        type: DataTypes.STRING
    },
    sale_total: {
        type: DataTypes.DECIMAL
    },
    user_id:{
        type: DataTypes.INTEGER,
        references: {
            key: "id",
            model: "user"
        }
    }
}, 
    {
        sequelize,
        freezeTableName: true,
        modelName: "transaction"
    }
)

module.exports = Transaction