const db = require("../db/queries");

async function getGames(req, res) {
  const games = await db.getAllGames();
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

async function gameUpdateGet(req, res) {
  const game = await db.getGameById(req.params.id);
  let genres = await db.getGameGenres(req.params.id);
  genres = genres.map((obj) => Object.values(obj)).flat();
  res.render("updateGame", {
    title: "Update Game",
    game: game[0],
    genres: genres,
  });
}

async function gameUpdatePost(req, res) {
  const { title, year, price, genres } = req.body;
  await db.updateGame(req.params.id, { title, year, price, genres });
  res.redirect("/games");
}

module.exports = {
  getGames,
  createGameGet,
  createGamePost,
  gameUpdateGet,
  gameUpdatePost,
};
