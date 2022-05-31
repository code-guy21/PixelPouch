const { Model, DataTypes} = require("sequelize")
const sequelize = require("../config/connection")

class User extends Model{}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            len: [5,10]
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            len: [4,10]
        }
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "user"
})

module.exports = User