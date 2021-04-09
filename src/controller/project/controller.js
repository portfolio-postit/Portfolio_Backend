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

    // s3.upload(params, function (err, data) {
    //   console.log(err, data);
    // });

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

const readProject = async (req, res) => {
  try {
    // const about = await query.findOneByAboutEmail(req.params.email);
    // const response = _.map(about, (e) => {
    //   e.url = process.env.S3URL + e.file_name;
    //   return _.pick(e, ["url", "username", "phone_number", "git_url", "email"]);
    // });
    // res.status(200).send({ response });
    res.status(200).json(about);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const deleteProject = async (req, res) => {
  try {
    const user = await query.findOneByEmail(req.decoded.email);
    const project = await Project.findOne({ where: { id: req.query.id } });

    if (!user) res.status(400).end();
    project.destroy({
      where: { project },
    });
    // s3.deleteObject({
    //   Bucket: "toinin",
    //   Key: file.file_name,
    // }).promise;
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

module.exports = {
  createProject,
  readProject,
  deleteProject,
};
