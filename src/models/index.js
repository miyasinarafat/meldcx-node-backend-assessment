const dbConfig = require("../config/db.sqlite.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.files = require("./file.model.js")(sequelize, Sequelize);

module.exports = db;
