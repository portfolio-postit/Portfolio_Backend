module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "project",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(100),
      },
      link: {
        type: DataTypes.STRING(100),
      },
      project_title: {
        type: DataTypes.STRING(100),
      },
      project_content: {
        type: DataTypes.STRING(100),
      },
      file_name: {
        type: DataTypes.STRING(100),
      },
    },
    {
      logging: false,
      timestamps: false,
    }
  );
};
