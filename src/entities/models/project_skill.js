module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "project_skill",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      skill: {
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
