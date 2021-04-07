module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "skill",
    {
      email: {
        type: DataTypes.STRING(100),
      },
      origin_name: {
        type: DataTypes.STRING(10),
      },
      file_name: {
        type: DataTypes.STRING(100),
      },
      skill_name: {
        type: DataTypes.STRING(100),
      },
      skill_score: {
        type: DataTypes.STRING(10),
      },
    },

    {
      timestamps: false,
    }
  );
};
