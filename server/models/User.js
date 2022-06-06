const {
    Model,
    DataTypes
} = require("sequelize")
const sequelize = require("../config/connection")
const bcrypt = require("bcrypt")

class User extends Model {
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password)
    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 15]
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [4, 15]
        }
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: "user"
})

User.beforeCreate(async (user) => {
    try {
        user.password = await bcrypt.hash(user.password, 10)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = User