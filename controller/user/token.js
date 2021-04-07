const jwt = require("jsonwebtoken");

const mkAccess = async (req, user) => {
  const secret = req.app.get("jwt-secret");
  const token = await jwt.sign(
    {
      email: user.email,
      name: user.name,
    },
    secret,
    {
      expiresIn: "10m",
    }
  );
  return token;
};

const mkRefresh = async (req, user) => {
  const secret = req.app.get("refresh-secret");
  const token = await jwt.sign(
    {
      email: user.email,
      name: user.name,
    },
    secret,
    {
      expiresIn: "1w",
    }
  );
  return token;
};



module.exports = {
  mkAccess,
  mkRefresh,
};
