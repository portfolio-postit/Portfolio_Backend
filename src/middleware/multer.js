const s3 = require("../config/s3");
const multerS3 = require("multer-s3");
const multer = require("multer");
const uuid = require("uuid4");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "toinin",
    key: function (req, file, cb) {
      var filename = uuid();
      req.filename = filename;
      //   console.log(req.filename);
      var ext = file.mimetype.split("/")[1];
      if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) {
        return cb(new Error("Only images are allowed"));
      }
      cb(null, filename + ".jpg");
    },
  }),
  acl: "public-read-write",
});

module.exports = {
  upload,
};
