const express = require('express');
const sequelize = require('./config/connection');
const path = require('path')
const routes = require("./routes")

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../client/build")))
}

app.use(routes)

//sync database before starting API server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
