const { About } = require("../../entities/models");
const service = require("./service");
const aboutRepositories = require("../../entities/repositories/about");
const userRepositroes = require("../../entities/repositories/user");
const createAbout = async (req, res, next) => {
  try {
    const { phone_number, git_url } = req.body;
    const user = await userRepositroes.findOneByEmail(req.decoded.email);
    if (!user) res.status(400).end();
    const about = await aboutRepositories.findOneByEmail(user.email);
    if (about) res.status(400).end();

    const uuidname = service.uploadFile(req.file);

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
    const about = await aboutRepositories.findOneByEmail(req.params.email);
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

const deleteAbout = async (req, res, next) => {
  try {
    const user = await userRepositroes.findOneByEmail(req.decoded.email);
    if (!user) res.status(400).end();
    const about = await aboutRepositories.findOneByEmail(user.email);
    About.destroy({
      where: { username: user.name },
    });
    s3.deleteObject({
      Bucket: "toinin",
      Key: about.file_name,
    }).promise;
    res.status(200).end();
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
