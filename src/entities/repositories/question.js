const { Question } = require("../models");

const findAll = async () => {
  try {
    const question = await Question.findAll();
    return question;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  findAll,
};
