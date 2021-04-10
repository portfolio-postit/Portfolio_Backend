const { Project_tag } = require("../models");

const findAllByProjectId = async (projectId) => {
  try {
    const project_tag = await Project_tag.findAll({ where: { projectId } });
    return project_tag;
  } catch (e) {
    throw e;
  }
};
const findOneById = async (id) => {
  try {
    Project_tag.findOne({ id });
  } catch (e) {
    throw e;
  }
};
module.exports = {
  findAllByProjectId,
  findOneById,
};
