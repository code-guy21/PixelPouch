const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = {
    authMiddleware: (req,res,next) => {
        const auth = req.headers.authorization;

        if(!auth){
            res.status(401).send("unauthorized")
        }else{
            const token = auth.split(" ")[1]
            try {
                const {data} = jwt.verify(token, process.env.JWT_SECRET, {maxAge: process.env.EXPIRATION})
                req.user = data;
                next()
            } catch (error) {
                res.status(401).send("unauthorized")
            }
        }
    },
    signToken: ({email,username, id}) => {
        try {
            const token = jwt.sign({
                data: {email,username,id}
            }, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRATION})
            return token;
        } catch (error) {
            throw new Error(error)
        }
    }
}