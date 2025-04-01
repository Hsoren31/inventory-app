const db = require("../db/queries");

async function getGames(req, res) {
  const games = await db.getAllGames();
  console.log("Games: ", games);
  res.render("games", { games: games });
}

function createGameGet(req, res) {
  res.render("createGame", { title: "Create Game" });
}

async function createGamePost(req, res) {
  const { title, year, price } = req.body;
  await db.insertGame({ title, year, price });
  res.redirect("/games");
}

module.exports = {
  getGames,
  createGameGet,
  createGamePost,
};
