const express = require('express');
const sequelize = require('./config/connection');
const {User, Transaction} = require("./models")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.send("welcome to the NFTracker API")
})

//sync database before starting API server
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
