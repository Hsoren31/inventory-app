const pool = require("./pool");

exports.getAllGenres = async () => {
  const { rows } = await pool.query("SELECT genre FROM genres ORDER BY genre");
  return rows;
};

exports.insertGenre = async (genre) => {
  genre = genre.toLowerCase();
  await pool.query("INSERT INTO genres (genre) VALUES ($1)", [genre]);
};
