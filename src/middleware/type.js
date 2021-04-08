const typeMiddleware = async (req, res, next) => {
  try {
    const type = req.body.type;
    if (!type) {
      res.status(403).json({ message: "type 빔" });
    }
    console.log(type);
    if (
      type == "MOSTLANGUAGE" ||
      type == "SUBLANGUAGE" ||
      type == "TOOL" ||
      type == "FRAMEWORK"
    ) {
      console.log("A");
    } else {
      console.log("z");
      res.status(402).end();
    }
    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

module.exports = { typeMiddleware };
