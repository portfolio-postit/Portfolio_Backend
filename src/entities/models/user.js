module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      logging: false,
      timestamps: false,
    }
  );
};
