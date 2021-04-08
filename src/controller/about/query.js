const { User, About } = require("../../entities/models");

const findOneByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (e) {
    throw e;
  }
};
const findOneByAboutEmail = async (email) => {
  try {
    const about = await About.findOne({ where: { email } });
    return about;
  } catch (e) {
    throw e;
  }
};
module.exports = {
  findOneByEmail,
  findOneByAboutEmail,
};
