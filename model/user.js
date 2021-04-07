module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    email: {
      type: DataTypes.STRING(20),
      unique: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(100),
    },
    name: {
      type: DataTypes.STRING(10),
    },

  }, {
    timestamps: false
  });
};
