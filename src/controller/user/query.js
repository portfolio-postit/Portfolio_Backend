const { User } = require("../../entities/models");
const bcrypt = require("bcrypt-nodejs");

const passwordEncoding = async (password) => {
  return await bcrypt.hashSync(password);
};

const passwordCompare = async (password, encoded) => {
  return await bcrypt.compareSync(password, encoded);
};

const findOneByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  passwordEncoding,
  passwordCompare,
  findOneByEmail,
};
