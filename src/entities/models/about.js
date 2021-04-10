module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "about",
    {
      email: {
        unique: true,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      phone_number: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      git_url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      file_name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
