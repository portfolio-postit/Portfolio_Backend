const { About } = require("../../entities/models");
const about = require("../../entities/models/about");
const query = require("./query");
const uuid = require("uuid4");
const { extname } = require("path");
const s3 = require("../../config/s3");

const createAbout = async (req, res, next) => {
  try {
    const { phone_number, git_url } = req.body;
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
    await About.create({
      username: user.name,
      phone_number,
      email: user.email,
      git_url,
      file_name: uuidname,
    });

    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const readAbout = async (req, res) => {
  try {
    const about = await query.findOneByAboutEmail(req.params.email);
    const response = _.map(about, (e) => {
      e.url = process.env.S3URL + e.file_name;
      return _.pick(e, ["url", "username", "phone_number", "git_url", "email"]);
    });
    res.status(200).send({ response });
    res.status(200).json(about);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const deleteAbout = async (req, res) => {
  try {
    const user = await query.findOneByEmail(req.decoded.email);

    if (!user) res.status(400).end();
    about.destroy({
      where: { username: user.name },
    });
    const about = await Skill.findOne({ where: { email: user.email } });
    s3.deleteObject({
      Bucket: "toinin",
      Key: file.file_name,
    }).promise;
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
module.exports = {
  createAbout,
  readAbout,
  deleteAbout,
};
