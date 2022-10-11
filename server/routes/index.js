const router = require("express").Router()
const path = require("path")

const apiRoutes = require("./api")

//prefix API routes with "/api" path
router.use("/api", apiRoutes)

//send build version of React app when no API routes are hit
router.use((function(req,res){
    res.sendFile(path.join(__dirname, "../../client/build/index.html"))
}))

module.exports = router;