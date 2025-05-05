const db = require("../db/gameQueries");
const genreDb = require("../db/genreQueries");
const developerDb = require("../db/developerQueries");

exports.getGames = async (req, res) => {
  res.render("games", {
    games: await db.getAllGames(),
  });
};

exports.viewGame = async (req, res) => {
  res.render("viewGame", {
    game: (await db.getGameById(req.params.id))[0],
    developers: await developerDb.getGamesDevelopers(req.params.id),
    genres: await genreDb.getGamesGenres(req.params.id),
  });
};

exports.createGameGet = async (req, res) => {
  res.render("createGame", {
    title: "Create Game",
    developers: await developerDb.getAllDevelopers(),
    genres: await genreDb.getAllGenres(),
  });
};

exports.createGamePost = async (req, res) => {
  const { title, year, price, genres, developers } = req.body;
  await db.insertGame({ title, year, price, genres, developers });
  res.redirect("/games");
};

exports.gameUpdateGet = async (req, res) => {
  res.render("updateGame", {
    title: "Update Game",
    game: (await db.getGameById(req.params.id))[0],
    developers: await developerDb.getAllDevelopers(),
    genres: await genreDb.getAllGenres(),
    gamesGenre: (await genreDb.getGamesGenres(req.params.id))
      .map((obj) => Object.values(obj))
      .flat(),
    gamesDeveloper: (await developerDb.getGamesDevelopers(req.params.id))
      .map((obj) => Object.values(obj))
      .flat(),
  });
};

exports.gameUpdatePost = async (req, res) => {
  const { title, year, price, genres, developers } = req.body;
  await db.updateGame(req.params.id, {
    title,
    year,
    price,
    genres,
    developers,
  });
  res.redirect("/games/" + req.params.id);
};

exports.deleteGame = async (req, res) => {
  await db.deleteGame(req.params.id);
  res.redirect("/games");
};
