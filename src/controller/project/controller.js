const projectRepositories = require("../../entities/repositories/project");
const tagRepositories = require("../../entities/repositories/project_tag");
const userRepositroes = require("../../entities/repositories/user");
const service = require("./service");
const _ = require("lodash");

const createProject = async (req, res, next) => {
  try {
    const { link, project_title, project_content, project_tag } = req.body;
    const user = await userRepositroes.findOneByEmail(req.decoded.email);
    if (!user) res.status(400).end();

    const uuidname = service.uploadFile(req.file);

    project = await Project.create({
      email: user.email,
      file_name: uuidname,
      link,
      project_title,
      project_content,
    });

    await project_tag.map((e) => {
      Project_tag.create({
        tag: e,
        projectId: project.id,
      });
    });

    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const addTag = async (req, res, next) => {
  try {
    const user = await userRepositroes.findOneByEmail(req.decoded.email);
    const project = await projectRepositories.findOneById(req.params.id);
    if (!user) res.status(400).end();
    if (user.email != project.email) res.stats(400).end();
    const { project_tag } = req.body;
    await project_tag.map((e) => {
      Project_tag.create({
        tag: e,
        projectId: project.id,
      });
    });
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const readDetailProject = async (req, res) => {
  try {
    const project = await projectRepositories.findOneById(req.params.id);
    const project_tag = await tagRepositories.findAllByProjectId(project.id);
    const response = project;
    response.dataValues.url = process.env.S3URL + project.file_name;
    response.dataValues.tag = project_tag;
    res.status(200).json({ response });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const readAllRroject = async (req, res) => {
  try {
    const project = await projectRepositories.findAllByEmail(req.params.email);
    res.status(200).json({ project });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const user = await userRepositroes.findOneByEmail(req.decoded.email);
    const project = await projectRepositories.findOneById(req.params.id);
    if (user.email != project.email) res.status(400).end();

    await Project_tag.destroy({
      where: { projectId: project.id },
    });

    await Project.destroy({
      where: { id: project.id },
    });

    s3.deleteObject({
      Bucket: "toinin",
      Key: project.file_name,
    }).promise;

    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const deleteTag = async (req, res, next) => {
  try {
    const user = await userRepositroes.findOneByEmail(req.decoded.email);
    const project_tag = await tagRepositories.findOneById(req.params.id);
    const project = await projectRepositories.findOneById(
      project_tag.projectId
    );
    if (user.email != project.email) res.status(400).end();
    await Project_tag.destroy({
      where: { id: project_tag.id },
    });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

module.exports = {
  createProject,
  readDetailProject,
  deleteProject,
  addTag,
  deleteTag,
  readAllRroject,
};
