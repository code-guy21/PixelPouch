const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = {
    signToken: ({email,username, id}) => {
        try {
            const token = jwt.sign({
                data: {email,username,id}
            }, process.env.JWT_SECRET, {expiresIn: "15h"})
            return token;
        } catch (error) {
            throw new Error(error)
        }
    }
}