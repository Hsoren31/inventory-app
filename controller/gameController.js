const db = require("../db/queries");

async function getGames(req, res) {
  res.render("games", {
    games: await db.getAllGames(),
  });
}

async function createGameGet(req, res) {
  res.render("createGame", {
    title: "Create Game",
    genres: (await db.getAllGenres()).map((obj) => Object.values(obj)).flat(),
  });
}

async function createGamePost(req, res) {
  const { title, year, price, genres } = req.body;
  await db.insertGame({ title, year, price, genres });
  res.redirect("/games");
}

async function gameUpdateGet(req, res) {
  res.render("updateGame", {
    title: "Update Game",
    game: (await db.getGameById(req.params.id))[0],
    genres: (await db.getAllGenres()).map((obj) => Object.values(obj)).flat(),
    gamesGenre: (await db.getGameGenres(req.params.id))
      .map((obj) => Object.values(obj))
      .flat(),
  });
}

async function gameUpdatePost(req, res) {
  const { title, year, price, genres } = req.body;
  await db.updateGame(req.params.id, { title, year, price, genres });
  res.redirect("/games");
}

async function gameDeletePost(req, res) {
  await db.deleteGame(req.params.id);
  res.redirect("/games");
}

module.exports = {
  getGames,
  createGameGet,
  createGamePost,
  gameUpdateGet,
  gameUpdatePost,
  gameDeletePost,
};
