const {User} = require("../models")

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
            const newUser = await User.create(req.body)
            res.status(200).json(newUser)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}