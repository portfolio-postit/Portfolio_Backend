const { Skill } = require("../../entities/models");

const findByEmail = async (email) => {
  try {
    const skill = await Skill.findAll({ where: { email } });
    return skill;
  } catch (e) {
    throw e;
  }
};

const findByType = async (email, type) => {
  try {
    const skill = await Skill.findAll({ where: { email, skill_type: type } });
    return skill;
  } catch (e) {
    throw e;
  }
};
module.exports = {
  findByType,
  findByEmail,
};
