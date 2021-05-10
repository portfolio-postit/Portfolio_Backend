module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "project_comment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      comment: {
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
