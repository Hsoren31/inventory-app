const developerDb = require("../db/developerQueries");

getDevelopers = async (req, res) => {
  res.render("developers", {
    title: "Developers",
    developers: await developerDb.getAllDevelopers(),
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

async function viewDeveloper(req, res) {
  const developer = (await developerDb.getDeveloperById(req.params.id))[0];
  res.render("viewDeveloper", {
    title: developer,
    developer: developer,
    developerGames: await developerDb.getDevelopersGames(req.params.id),
  });
}

async function updateDeveloperGet(req, res) {
  const developer = (await developerDb.getDeveloperById(req.params.id))[0];
  res.render("updateDeveloper", {
    title: developer,
    developer: developer,
  });
}

async function updateDeveloperPost(req, res) {
  const { developer } = req.body;
  await developerDb.updateDeveloper(req.params.id, developer);
  res.redirect("/developers/" + req.params.id);
}

async function deleteDeveloper(req, res) {
  await developerDb.deleteDeveloper(req.params.id);
  res.redirect("/developers");
}

module.exports = {
  getDevelopers,
  createDeveloperGet,
  createDeveloperPost,
  viewDeveloper,
  updateDeveloperGet,
  updateDeveloperPost,
  deleteDeveloper,
};
