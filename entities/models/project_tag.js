module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "project_tag",
    {
      projectId: {
        unique: true,
        primaryKey: true,
        type: DataTypes.STRING(100),
      },
      tag: {
        type: DataTypes.STRING(20),
      },
    },
    {
      timestamps: false,
    }
  );
};
