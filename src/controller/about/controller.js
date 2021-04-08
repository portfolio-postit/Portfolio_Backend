const { About } = require("../../entities/models");
const about = require("../../entities/models/about");
const query = require("./query");
const createAbout = async (req, res, next) => {
  try {
    const { phone_number, git_url } = req.body;
    const user = await query.findOneByEmail(req.decoded.email);
    if (!user) res.status(400).end();

    await About.create({
      username: user.name,
      phone_number,
      email: user.email,
      git_url,
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
