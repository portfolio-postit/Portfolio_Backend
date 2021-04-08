const s3 = require("../config/s3");
const multerS3 = require("multer-s3");
const multer = require("multer");
const uuid = require("uuid4");
const { extname } = require("path");
const { Skill } = require("../entities/models");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "toinin",
    key: function (req, file, cb) {
      const filename = uuid();
      req.filename = filename + extname(file.originalname);
      req.origin_name = file.originalname;
      const ext = file.mimetype.split("/")[1];
      if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) {
        return cb(new Error("Only images are allowed"));
      }
      console.log(req);
      // cb(null, req.filename);
    },
  }),
  acl: "public-read-write",
});

const deleteS3 = async (req, res) => {
  try {
    const id = req.query.id;
    const email = req.decoded.email;
    const user = await User.findOne({ where: { email } });
    const file = await Skill.findOne({ where: { id } });
    if (file.email != user.email) {
      res.status(400).end();
    }
    s3.deleteObject({
      Bucket: "toinin",
      Key: file.file_name,
    }).promise;

    Skill.destroy({
      where: { id },
    });

    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

module.exports = {
  upload,
  deleteS3,
};
