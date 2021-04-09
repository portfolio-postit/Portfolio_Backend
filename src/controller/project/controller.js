const query = require("./query");
const uuid = require("uuid4");
const { extname } = require("path");
const s3 = require("../../config/s3");
const { Project, Project_tag } = require("../../entities/models");
const _ = require("lodash");

const createProject = async (req, res, next) => {
  try {
    console.log(req.body);
    const { link, project_title, project_content, project_tag } = req.body;
    console.log(project_tag);
    const user = await query.findOneByEmail(req.decoded.email);
    if (!user) res.status(400).end();
    const blob = req.file.buffer;
    const filename = uuid();
    const uuidname = filename + extname(req.file.originalname);
    const params = {
      Bucket: "toinin",
      Key: uuidname,
      Body: blob,
    };

    s3.upload(params, function (err, data) {
      console.log(err, data);
    });

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
    const user = await query.findOneByEmail(req.decoded.email);
    const project = await query.findOneByProjectId(req.params.id);
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
    const project = await query.findOneByProjectId(req.params.id);
    const project_tag = await query.findAllByTagId(project.id);
    const data = project;
    data.dataValues.url = process.env.S3URL + project.file_name;
    data.dataValues.tag = project_tag;
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
const readAllRroject = async (req, res) => {
  try {
    const project = await query.findAllByProjectEmail(req.params.email);
    res.status(200).json({ project });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const user = await query.findOneByEmail(req.decoded.email);
    const project = await query.findOneByProjectId(req.params.id);
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
    const user = await query.findOneByEmail(req.decoded.email);
    const project_tag = await Project_tag.findOne({ id: req.params.id });
    const project = await Project.findOne({ id: project_tag.projectId });
    if (user.email != project.email) res.status(400).end();
    await Project_tag.destroy({
      where: { projectId: project.id },
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
