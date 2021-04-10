const s3 = require("../../config/s3");
const uuid = require("uuid4");
const { extname } = require("path");

const uploadFile = async (file) => {
  try {
    const blob = file.buffer;
    const filename = uuid();
    const uuidname = filename + extname(file.originalname);
    const params = {
      Bucket: "toinin",
      Key: uuidname,
      Body: blob,
    };

    s3.upload(params, function (err, data) {
      console.log(err, data);
    });

    return uuidname;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = {
  uploadFile,
};
