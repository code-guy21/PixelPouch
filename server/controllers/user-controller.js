const { Op } = require("sequelize");
const {User} = require("../models")
const {signToken} = require("../utils/auth")

module.exports = {
    getUsers: async (req,res) => {
        try {
            let users = await User.findAll()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    createUser: async (req,res) =>{
        try {
            const user = await User.create(req.body)
            const token = signToken(user)
            res.status(200).json({token, user})
        } catch (error) {
            res.status(500).send("error registering user")
        }
    },
    loginUser: async (req,res) => {
       
        try {
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        {email: req.body.email},
                        {username: req.body.username}
                    ]
                }
            })
            res.json(user)
        } catch (error) {
            res.status(500).json("erorr logging in")
        }
    }
}