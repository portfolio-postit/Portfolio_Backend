module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "about",
    {
      username: {
        type: DataTypes.STRING(20),
        unique: true,
        primaryKey: true,
      },
      phone_number: {
        type: DataTypes.STRING(100),
      },
      email: {
        type: DataTypes.STRING(100),
      },
      git_url: {
        type: DataTypes.STRING(20),
      },
    },
    {
      timestamps: false,
    }
  );
};
