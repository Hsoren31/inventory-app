const db = require("../db/genreQueries");

exports.getGenres = async (req, res) => {
  res.render("genres", {
    title: "Genres",
    genres: await db.getAllGenres(),
  });
};

exports.viewGenreGames = async (req, res) => {
  const genre = await db.getGenreName(req.params.id);
  res.render("viewGenre", {
    genre: genre[0].genre,
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
