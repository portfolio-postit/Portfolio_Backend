const s3 = require("../../config/s3");

const { Skill } = require("../../entities/models");

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
  deleteS3,
};
