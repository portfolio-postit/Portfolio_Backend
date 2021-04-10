const bcrypt = require("bcrypt-nodejs");

const passwordEncoding = async (password) => {
  return await bcrypt.hashSync(password);
};

const passwordCompare = async (password, encoded) => {
  return await bcrypt.compareSync(password, encoded);
};

module.exports = {
  passwordEncoding,
  passwordCompare,
};
