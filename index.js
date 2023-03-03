require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./src/models");
const cron = require('node-cron');
const initRoutes = require("./src/routes/api");
const filesCleanup = require("./src/schedulers/file.cleanup.scheduler");

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

/** Tasks Scheduled, remove files every sunday of week */
/**
 *   ┌────────────── second (optional)
 *   │ ┌──────────── minute
 *   │ │ ┌────────── hour
 *   │ │ │ ┌──────── day of month
 *   │ │ │ │ ┌────── month
 *   │ │ │ │ │ ┌──── day of week
 *   │ │ │ │ │ │
 *   │ │ │ │ │ │
 *  # * * * * * *
 * */
cron.schedule("*/15 * * * * *", function () {
    console.log("---------------------");
    console.log("Running cleaning task every 15 seconds");

    filesCleanup();
});

/** Set port, listen for requests */
const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
    console.log(`Running at localhost:${PORT}`);
});