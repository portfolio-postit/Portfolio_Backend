const Sequelize = require('sequelize');
const config = require('../config/config');
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//orm sequelize model:generate --name User --attributes name:string,email:string,password:string
db.User = require("./user")(sequelize, Sequelize);


module.exports = db;
