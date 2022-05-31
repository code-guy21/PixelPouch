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
        type: DataTypes.STRING,
        allowNull:false
    },
    collection_id: {
        type: DataTypes.STRING,
        defaultValue: "#0"
    },
    purchase_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: true
        }
    },
    purchase_currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    purchase_total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    sale_date: {
        type: DataTypes.DATE,
        validate: {
            isDate: true
        }
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
        timestamps: false,
        freezeTableName: true,
        modelName: "transaction"
    }
)

module.exports = Transaction