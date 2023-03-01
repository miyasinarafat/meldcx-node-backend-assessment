require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./src/models");
const initRoutes = require("./src/routes/api");

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));

/** Serving static files */
//app.use('/storage', express.static('storage'));

initRoutes(app);

/** For Production */
db.sequelize.sync();

/** For Development */
/*db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/

/** Set port, listen for requests */
const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Running at localhost:${PORT}`);
});