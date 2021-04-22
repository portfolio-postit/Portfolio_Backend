const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["access-token"];
  if (!token) {
    res.status(403).json({ message: "token required" });
  }
  try {
    await jwt.verify(token, req.app.get("jwt-secret"), (err, decoded) => {
      if (err) throw new Error(err);
      req.decoded = decoded;
      next();
    });
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

const refreshMiddleware = async (req, res, next) => {
  const token = req.headers["refresh-token"];
  if (!token) {
    res.status(403).json({ message: "token required" });
  }
  try {
    await jwt.verify(token, req.app.get("refresh-secret"), (err, decoded) => {
      if (err) throw new Error(err);
      req.decoded = decoded;
      next();
    });
  } catch (e) {
    res.status(401).json({ message: e.message });
    console.log(e);
  }
};

module.exports = {
  authMiddleware,
  refreshMiddleware,
};
