const _ = require("lodash");
const { Skill } = require("../../entities/models");
const repositories = require("../../entities/repositories/skill");
const s3 = require("../../config/s3");
const uuid = require("uuid4");
const { extname } = require("path");

const write = async (req, res) => {
  try {
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
    await Skill.create({
      email: req.decoded.email,
      origin_name: req.file.originalname,
      file_name: uuidname,
      skill_name: req.body.skill_name,
      skill_score: req.body.skill_score,
      skill_type: req.body.skill_type,
    });
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const showAllSkill = async (req, res) => {
  try {
    const { email } = req.qeury;
    const skill = await repositories.findAllByEmail(email);
    if (!skill) res.status(400);

    const response = _.map(skill, (e) => {
      e.url = process.env.S3URL + e.file_name;
      return _.pick(e, [
        "id",
        "url",
        "origin_name",
        "skill_name",
        "skill_score",
        "skill_type",
        "email",
      ]);
    });
    res.status(200).send({ response });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const showTypeSkill = async (req, res) => {
  try {
    const { email, type } = req.qeury;
    const skill = await repositories.findAllByType(email, type);
    if (!skill) res.status(400);

    const response = _.map(skill, (e) => {
      e.url = process.env.S3URL + e.file_name;
      return _.pick(e, [
        "id",
        "url",
        "origin_name",
        "skill_name",
        "skill_score",
        "skill_type",
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
  showAllSkill,
  showTypeSkill,
};
