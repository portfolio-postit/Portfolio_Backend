const { Skill } = require("../../entities/models");

const findAllByEmail = async (email) => {
  try {
    const skill = await Skill.findAll({ where: { email } });
    return skill;
  } catch (e) {
    throw e;
  }
};

const findAllByType = async (email, type) => {
  try {
    const skill = await Skill.findAll({ where: { email, skill_type: type } });
    return skill;
  } catch (e) {
    throw e;
  }
};

const findOneById = async (id) => {
  try {
    const skill = await Skill.findOne({ where: { id } });
    return skill;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  findAllByType,
  findAllByEmail,
  findOneById,
};
