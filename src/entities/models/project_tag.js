module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "project_tag",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      tag: {
        type: DataTypes.STRING(20),
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
