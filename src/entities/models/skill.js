module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "skill",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      original_file_name: {
        type: DataTypes.STRING,
      },
      file_name: {
        type: DataTypes.STRING,
      },
      skill_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      skill_score: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      skill_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      logging: false,
      timestamps: false,
    }
  );
};
