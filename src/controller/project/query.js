const { User, Project, Project_tag } = require("../../entities/models");

const findOneByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (e) {
    throw e;
  }
};
const findOneByAboutId = async (id) => {
  try {
    const project = await Project.findOne({ where: { id: id } });
    return project;
  } catch (e) {
    throw e;
  }
};
const findAllByTagId = async (id) => {
  try {
    const project_tag = await Project_tag.findAll({ where: { projectId: id } });
    return project_tag;
  } catch (e) {
    throw e;
  }
};
module.exports = {
  findOneByEmail,
  findOneByAboutId,
  findAllByTagId,
};
