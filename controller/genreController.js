const db = require("../db/genreQueries");

exports.getGenres = async (req, res) => {
  res.render("genres", {
    title: "Genres",
    genres: await db.getAllGenres(),
  });
};

exports.viewGenreGames = async (req, res) => {
  const genre = await db.getGenreById(req.params.id);
  res.render("viewGenre", {
    genre: genre,
    games: await db.getGenresGames(req.params.id),
  });
};

exports.createGenreGet = async (req, res) => {
  res.render("createGenre", { title: "Create Genre" });
};

exports.createGenrePost = async (req, res) => {
  const { genreName } = req.body;
  await db.insertGenre(genreName);
  res.redirect("/genres");
};

exports.updateGenreGet = async (req, res) => {
  res.render("updateGenre", {
    title: "Update Genre",
    genre: await db.getGenreById(req.params.id),
  });
};

exports.updateGenrePost = async (req, res) => {
  const { genreName } = req.body;
  await db.updateGenre(req.params.id, genreName);
  res.redirect("/genres/" + req.params.id);
};
