const developerDb = require("../db/developerQueries");

getDevelopers = async (req, res) => {
  res.render("developers", {
    title: "Developers",
    developers: (await developerDb.getAllDevelopers())
      .map((obj) => Object.values(obj))
      .flat(),
  });
};

createDeveloperGet = async (req, res) => {
  res.render("createDevelopers", {
    title: "Create Developers",
  });
};

createDeveloperPost = async (req, res) => {
  const { developer } = req.body;
  await developerDb.insertDeveloper(developer.toLowerCase());
  res.redirect("/developers");
};

module.exports = {
  getDevelopers,
  createDeveloperGet,
  createDeveloperPost,
};
