const db = require("../db/developerQueries");

exports.getDevelopers = async (req, res) => {
  res.render("developers/developers", {
    title: "Developers",
    developers: await db.getAllDevelopers(),
  });
};

exports.createDeveloperGet = async (req, res) => {
  res.render("developers/createDevelopers", {
    title: "Create Developer",
  });
};

exports.createDeveloperPost = async (req, res) => {
  const { developer } = req.body;
  await db.insertDeveloper(developer);
  res.redirect("/developers");
};

exports.viewDeveloper = async (req, res) => {
  const developer = (await db.getDeveloperById(req.params.id))[0];
  res.render("developers/viewDeveloper", {
    title: developer.developer,
    developer: developer,
    developerGames: await db.getDevelopersGames(req.params.id),
  });
};

exports.updateDeveloperGet = async (req, res) => {
  const developer = (await db.getDeveloperById(req.params.id))[0];
  res.render("developers/updateDeveloper", {
    title: developer.developer,
    developer: developer,
  });
};

exports.updateDeveloperPost = async (req, res) => {
  const { developer } = req.body;
  await db.updateDeveloper(req.params.id, developer);
  res.redirect("/developers/" + req.params.id);
};

exports.deleteDeveloper = async (req, res) => {
  await db.deleteDeveloper(req.params.id);
  res.redirect("/developers");
};
