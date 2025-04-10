const db = require("../db/genreQueries");

exports.getGenres = async (req, res) => {
  res.render("genres", {
    title: "Genres",
    genres: await db.getAllGenres(),
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
