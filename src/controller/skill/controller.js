const _ = require("lodash");
const { Skill } = require("../../entities/models");
const query = require("./query");
const Blob = require("node-blob");

// const s3 = require("../../config/s3");
const AWS = require("aws-sdk");

const write = async (req, res) => {
  try {
    // console.log(Blob([req.file.buffer]));
    const blob = req.file.buffer;
    const params = {
      Bucket: "toinin",
      Key: "req.file.originalname",
      Body: blob,
    };
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3();
    s3.upload(params, function (err, data) {
      console.log(err, data);
    });
    await Skill.create({
      email: req.decoded.email,
      origin_name: req.file.originalname,
      file_name: req.origin_name,
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
    const skill = await query.findByType(req.query.email, req.query.type);
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
