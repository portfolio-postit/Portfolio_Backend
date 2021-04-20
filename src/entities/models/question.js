module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "question",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.STRING,
      },
    },
    {
      logging: false,
      timestamps: false,
    }
  );
};
