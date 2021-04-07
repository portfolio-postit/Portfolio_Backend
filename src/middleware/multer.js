const s3 = require("../config/s3");
const multerS3 = require("multer-s3");
const multer = require("multer");
const uuid = require("uuid4");
const { extname } = require("path");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "toinin",
    key: function (req, file, cb) {
      const filename = uuid();
      // path.extname 쓰는 거 추천
      req.filename = filename + extname(file.originalname);
      req.origin_name = file.originalname;
      const ext = file.mimetype.split("/")[1];
      if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) {
        return cb(new Error("Only images are allowed"));
      }
      cb(null, filename);
    },
  }),
  acl: "public-read-write",
});

module.exports = {
  upload,
};
