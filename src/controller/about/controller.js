const { About } = require("../../entities/models");
const query = require("./query");
const createAbout = async (req, res, next) => {
  try {
    const { phone_number, email, git_url } = req.body;
    const user = await query.findOneByEmail(req.decoded.email);
    if (!user) res.status(400).end();

    await About.create({ username: user.name, phone_number, email, git_url });

    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(409).end();
  }
};
module.exports = {
  createAbout,
};
