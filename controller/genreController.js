const db = require("../db/genreQueries");

exports.getGenres = async (req, res) => {
  res.render("genres", {
    title: "Genres",
    genres: await db.getAllGenres(),
  });
};
