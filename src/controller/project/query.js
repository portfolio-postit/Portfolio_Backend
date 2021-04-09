const { User, Project } = require("../../entities/models");

const findOneByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (e) {
    throw e;
  }
};
const findAllByAboutEmaill = async (email) => {
  try {
    const project = await Project.findAll({ where: { email } });
    return project;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  findOneByEmail,
  findAllByAboutEmaill,
};
