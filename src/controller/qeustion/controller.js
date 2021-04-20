const { response } = require("express");
const { reset } = require("nodemon");
const { Question } = require("../../entities/models");
const Repositories = require("../../entities/repositories/question");
const sendQuestion = async (req, res) => {
  try {
    console.log("실행은 됨");
    const { email, content } = req.body;
    let today = new Date();

    await Question.create({
      email,
      content,
      createdAt: today.toLocaleString(),
    });
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

const readQuestion = async (req, res, next) => {
  try {
    const response = await Repositories.findAll();
    res.status(200).send(response);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

module.exports = {
  sendQuestion,
  readQuestion,
};
