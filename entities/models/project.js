module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "project",
    {
      email: {
        type: DataTypes.STRING(100),
      },
      link: {
        type: DataTypes.STRING(100),
      },
      project_name: {
        type: DataTypes.STRING(100),
      },
      project_content: {
        type: DataTypes.STRING(100),
      },
    },

    {
      timestamps: false,
    }
  );
};
