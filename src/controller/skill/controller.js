const _ = require("lodash");
const { Skill } = require("../../entities/models");
const query = require("./query");

const write = async (req, res) => {
  try {
    console.log(req.origin_name);
    await Skill.create({
      email: req.decoded.email,
      origin_name: req.origin_name,
      file_name: req.filename,
      skill_name: req.body.skill_name,
      skill_score: req.body.skill_score,
    });
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const showSkill = async (req, res) => {
  try {
    const skill = await query.findByEmail(req.query.email);
    if (!skill) res.status(400);
    const response = _.map(skill, (e) => {
      e.url = process.env.S3URL + e.file_name;
      return _.pick(e, [
        "id",
        "url",
        "origin_name",
        "skill_name",
        "skill_score",
        "email",
      ]);
    });
    res.status(200).send({ response });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
module.exports = {
  write,
  showSkill,
};
