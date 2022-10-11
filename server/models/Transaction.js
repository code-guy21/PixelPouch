const {Model, DataTypes} = require("sequelize")
const sequelize = require("../config/connection")

class Transaction extends Model{}

Transaction.init(
{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
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
        allowNull: false,
        validate: {
            isDecimal: true
        }
    },
    USD_purchase_total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
            isDecimal: true
        }
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
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        validate: {
            isDecimal: true
        }
    },
    USD_sale_total: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
        validate: {
            isDecimal: true
        }
    },
    USD_net_total:{
        type: DataTypes.DECIMAL,
        defaultValue: 0
    },
    user_id:{
        type: DataTypes.UUID,
        allowNull: false,
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

//hook used to calculate net total before transaction is created
Transaction.beforeCreate((transaction) => {
    transaction.USD_net_total = transaction.USD_sale_total - transaction.USD_purchase_total;
})

//hook used to calculate net total before transaction is updated
Transaction.beforeUpdate((transaction) => {
    transaction.USD_net_total = transaction.USD_sale_total - transaction.USD_purchase_total;
})

module.exports = Transaction