const query = require("./query");
const uuid = require("uuid4");
const { extname } = require("path");
const s3 = require("../../config/s3");
const { Project } = require("../../entities/models");

const createProject = async (req, res, next) => {
  try {
    const { link, project_title, project_content } = req.body;
    const user = await query.findOneByEmail(req.decoded.email);

    // s3.upload(params, function (err, data) {
    //   console.log(err, data);
    // });
    await Project.create({
      email: user.email,
      link,
      email: user.email,
      project_title,
      project_content,
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
