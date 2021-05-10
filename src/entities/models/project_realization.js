module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "project_realization",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      realization: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      projectId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
