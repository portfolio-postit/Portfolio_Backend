const { User } = require("../../models");
const query = require("./query");
const token = require("./token");

const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    // const findUser = await query.findOneByEmail({ email: email });
    // if (findUser) res.status(400).end();
    const encodedPassword = await query.passwordEncoding(password);
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
    const findUser = await query.findOneByEmail(email);
    if (!findUser) return res.status(400).end();
    if (!(query.passwordCompare(password, findUser.password))) return res.status(400).end();

    const accessToken = await token.mkAccess(req, findUser);
    const refreshToken = await token.mkRefresh(req, findUser);
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);

    res.status(400).end();
  }
};

const refresh = async (req, res, next) => {
  const user = await query.findOneByEmail(req.decoded.email);
  const accessToken = await token.mkAccess(req, user);
  res.status(200).json({ accessToken });
};

const check = async (req, res, next) => {
  const user = await query.findOneByEmail(req.decoded.email);
  res.status(200).json({ email: user.email });
};

module.exports = {
  register,
  login,
  refresh,
  check,
};
