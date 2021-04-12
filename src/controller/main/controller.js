const aboutRepositories = require("../../entities/repositories/about");
const userRepositories = require("../../entities/repositories/user");
const projectRepositories = require("../../entities/repositories/project");
const skillRepositories = require("../../entities/repositories/skill");
const tagRepositories = require("../../entities/repositories/project_tag");
const _ = require("lodash");

const readMainProject = async (req, res) => {
  try {
    const email = await req.params.email;
    const user = await userRepositories.findOneByEmail(email);
    const about = await aboutRepositories.findOneByEmail(email);
    const project = await projectRepositories.findAllByEmail(email);
    const skill = await skillRepositories.findAllByEmail(email);

    const detail = await Promise.all(
      project.map(async (e) => {
        const projectId = e.id;
        e.tag = await tagRepositories.findAllByProjectId(projectId);
        return _.pick(e, [
          "id",
          "email",
          "link",
          "file_name",
          "project_content",
          "project_title",
          "tag",
        ]);
      })
    );
    const tool = skill.filter((e) => e.skill_type == "TOOL");
    const mostLanguage = skill.filter((e) => e.skill_type == "MOSTLANGUAGE");
    const subLagnuage = skill.filter((e) => e.skill_type == "SUBLANGUAGE");
    const framework = skill.filter((e) => e.skill_type == "FRAMEWORK");
    const projectArray = [detail[0], detail[1]];
    const mostLagnuageArray = [mostLanguage[0], mostLanguage[1]];
    const subLagnuageArray = [subLagnuage[0], subLagnuage[1]];
    const toolArray = [tool[0], tool[1]];
    const frameworkArray = [framework[0], framework[1]];
    res.status(200).json({
      about: about,
      project: projectArray,
      tool: toolArray,
      mostLanguage: mostLagnuageArray,
      subLagnuage: subLagnuageArray,
      framework: frameworkArray,
    });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};

module.exports = {
  readMainProject,
};
