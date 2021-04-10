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
