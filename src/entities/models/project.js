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
        allowNull: false,
        type: DataTypes.STRING,
      },
      link: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      project_title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      project_content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      file_name: {
        type: DataTypes.STRING,
      },
      member: {
        type: DataTypes.INTEGER,
      },
      Contribution: {
        type: DataTypes.INTEGER,
      },
      Progress: {
        type: DataTypes.INTEGER,
      },
    },
    {
      logging: false,
      timestamps: false,
    }
  );
};
