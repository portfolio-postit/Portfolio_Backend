const projectRepositories = require("../../entities/repositories/project");
const tagRepositories = require("../../entities/repositories/project_tag");
const userRepositroes = require("../../entities/repositories/user");
const service = require("./service");
const _ = require("lodash");
const { Project, Project_tag } = require("../../entities/models");

const createProject = async (req, res, next) => {
  try {
    const {
      link,
      project_title,
      project_content,
      project_tag,
      member,
      progress,
      contribution,
    } = req.body;
    const user = await userRepositroes.findOneByEmail(req.decoded.email);
    if (!user) res.status(400).end();

    const uuidname = await service.uploadFile(req.file);

    const project = await Project.create({
      email: user.email,
      file_name: uuidname,
      link,
      project_title,
      project_content,
      member,
      progress,
      contribution,
    });

    if (Array.isArray(project_tag))
      await project_tag.map((e) => {
        Project_tag.create({
          tag: e,
          projectId: project.id,
        });
      });
    else
      Project_tag.create({
        tag: project_tag,
        projectId: Project.id,
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
    if (Array.isArray(project_tag))
      await project_tag.map((e) => {
        Project_tag.create({
          tag: e,
          projectId: project.id,
        });
      });
    else
      Project_tag.create({
        tag: project_tag,
        projectId: Project.id,
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

const changeTag = async (req, res, next) => {
  try {
    const user = await userRepositroes.findOneByEmail(req.decoded.email);
    const tag = await tagRepositories.findOneById(req.params.id);
    const project = await projectRepositories.findOneById(tag.projectId);
    if (user.email != project.email) res.status(400).end();
    const { project_tag } = req.body;
    Project_tag.update({ project_tag }, { where: { id: req.params.id } });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
const changeProject = async (req, res, next) => {
  const user = await userRepositroes.findOneByEmail(req.decoded.email);
  const project = await projectRepositories.findOneById(tag.projectId);
  if (user.email != project.email) res.status(400).end();
  const {
    link,
    project_title,
    project_content,
    member,
    progress,
    contribution,
  } = req.body;
  Project.update(
    { link, project_title, project_content, member, progress, contribution },
    { where: { id: req.params.id } }
  );
  try {
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
  changeTag,
  changeProject,
};
