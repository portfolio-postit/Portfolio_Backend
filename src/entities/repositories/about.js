const { About } = require("../models");

const findOneByEmail = async (email) => {
  try {
    const about = await About.findOne({ where: { email } });
    return about;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  findOneByEmail,
};
