const { User } = require("../models");

const findOneByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (e) {
    throw e;
  }
};
module.exports = {
  findOneByEmail,
};
