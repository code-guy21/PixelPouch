//imports
const express = require("express");

//PORT assignment
const PORT = process.env.PORT || 3001;

//create Express app
const app = express()

//basic route
app.get("/api", (req,res) => {
    res.send("welcome to the NFTracker API")
})

//start server
app.listen(PORT, () => {
    console.log("API running")
})