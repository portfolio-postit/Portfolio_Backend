const typeMiddleware = async (req, res, next) => {
  try {
    const type = req.body.skill_type;
    if (!type) {
      res.status(403).json({ message: "type 빔" });
    }
    if (
      type == "MOSTLANGUAGE" ||
      type == "SUBLANGUAGE" ||
      type == "TOOL" ||
      type == "FRAMEWORK"
    ) {
      next();
    } else {
      console.log("type error");
      res.status(402).json({ msssage: "type error" });
    }
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

module.exports = { typeMiddleware };
