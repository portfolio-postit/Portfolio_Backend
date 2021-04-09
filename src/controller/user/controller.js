const { User } = require("../../entities/models");
const service = require("./service");
const repositories = require("../../entities/repositories/user");
const token = require("./token");

const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const findUser = await repositories.findOneByEmail(email);
    if (findUser) res.status(400).end();
    const encodedPassword = await service.passwordEncoding(password);
    await User.create({ email, password: encodedPassword, name });
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(409).end();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await repositories.findOneByEmail(email);
    if (!findUser) return res.status(400).end();
    if (!service.passwordCompare(password, findUser.password))
      return res.status(400).end();

    const accessToken = await token.mkAccess(req, findUser);
    const refreshToken = await token.mkRefresh(req, findUser);
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);

    res.status(400).end();
  }
};

const refresh = async (req, res, next) => {
  const user = await repositories.findOneByEmail(req.decoded.email);
  const accessToken = await token.mkAccess(req, user);
  res.status(200).json({ accessToken });
};

const check = async (req, res, next) => {
  const user = await repositories.findOneByEmail(req.decoded.email);
  res.status(200).json({ email: user.email });
};

module.exports = {
  register,
  login,
  refresh,
  check,
};
