const { Skill } = require("../../entities/models");

const findByEmail = async (email) => {
  try {
    const skill = await Skill.findAll({ where: { email } });
    return skill;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  findByEmail,
};
