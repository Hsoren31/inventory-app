const db = require("../db/queries");

async function getGames(req, res) {
  const games = await db.getAllGames();
  res.render("games", { games: games });
}

async function sortGamesByGenre(req, res) {
  const games = await db.sortByGenre();
  res.render("games", { games: games });
}

function createGameGet(req, res) {
  res.render("createGame", { title: "Create Game" });
}

async function createGamePost(req, res) {
  const { title, year, price, genres } = req.body;
  await db.insertGame({ title, year, price, genres });
  res.redirect("/games");
}

module.exports = {
  getGames,
  createGameGet,
  createGamePost,
};
