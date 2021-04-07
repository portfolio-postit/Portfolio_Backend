const Sequelize = require("sequelize");
const config = require("../../config/config");
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//orm sequelize model:generate --name User --attributes name:string,email:string,password:string
db.User = require("./user")(sequelize, Sequelize);
db.About = require("./about")(sequelize, Sequelize);
db.Skill = require("./skill")(sequelize, Sequelize);
db.Project = require("./project")(sequelize, Sequelize);

db.User.hasOne(db.About, { foreignKey: "email", targetKey: "email" });
db.About.belongsTo(db.User, { foreignKey: "email" });
db.User.hasMany(db.Skill, { foreignKey: "email", targetKey: "email" });
db.Skill.belongsTo(db.User, { foreignKey: "email" });
db.User.hasMany(db.Project, { foreignKey: "email", targetKey: "email" });
db.Project.belongsTo(db.User, { foreignKey: "email" });
module.exports = db;
