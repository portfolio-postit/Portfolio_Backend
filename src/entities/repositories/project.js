const { Project } = require("../models");

const findAllByEmail = async (email) => {
  try {
    const project = await Project.findAll({ where: { email } });
    return project;
  } catch (e) {
    throw e;
  }
};
const findOneById = async (id) => {
  try {
    const project = await Project.findOne({ where: { id } });
    return project;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  findAllByEmail,
  findOneById,
};
