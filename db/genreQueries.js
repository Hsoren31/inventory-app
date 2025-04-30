const pool = require("./pool");

async function getAllGenres() {
  const { rows } = await pool.query("SELECT genre FROM genres ORDER BY genre");
  return rows;
}

async function insertGenre(genre) {
  genre = genre.toLowerCase();
  await pool.query("INSERT INTO genres (genre) VALUES ($1)", [genre]);
}

async function getGenreName(id) {
  const { rows } = await pool.query(
    "SELECT genre FROM genres WHERE id = ($1)",
    [id]
  );
  return rows;
}

async function getGenreId(genre) {
  const { rows } = await pool.query(
    "SELECT id FROM genres WHERE genre = ($1)",
    [genre]
  );
  return rows;
}

async function getGameGenres(gameId) {
  const { rows } = await pool.query(
    "SELECT genre FROM genres JOIN game_genres ON genres.id = genre_id JOIN games ON games.id = game_id WHERE games.id = ($1)",
    [gameId]
  );
  return rows;
}

async function getGenresGames(genreId) {
  const { rows } = await pool.query(
    "SELECT games.id, title FROM games JOIN game_genres ON games.id = game_id WHERE genre_id = ($1)",
    [genreId]
  );
  return rows;
}

async function addGameGenres(gameId, genres) {
  if (!genres) {
    return;
  } else if (!Array.isArray(genres)) {
    const genreId = await getGenreId(genres);
    await pool.query("INSERT INTO game_genres VALUES ($1, $2)", [
      gameId,
      genreId,
    ]);
    return;
  } else {
    genres.map(async (genre) => {
      const genreId = await getGenreId(genre);
      await pool.query("INSERT INTO game_genres VALUES ($1, $2)", [
        gameId,
        genreId,
      ]);
    });
  }
}

async function updateGenres(gameId, genres) {
  if (!genres) {
    await pool.query("DELETE FROM game_genres WHERE game_id = ($1)", [gameId]);
    return;
  } else if (!Array.isArray(genres)) {
    await pool.query("DELETE FROM game_genres WHERE game_id = ($1)", [gameId]);
    await addGameGenres(gameId, genres);
    return;
  } else {
    await pool.query("DELETE FROM game_genres WHERE game_id = ($1)", [gameId]);
    genres.forEach(async (genre) => {
      await addGameGenres(gameId, genre);
    });
  }
}

async function getTopGenres() {
  const { rows } = await pool.query(
    "SELECT id, genre FROM genres JOIN game_genres ON genres.id = genre_id GROUP BY genres.id ORDER BY COUNT(genre_id) DESC LIMIT 5"
  );
  return rows;
}

module.exports = {
  getAllGenres,
  addGameGenres,
  getGameGenres,
  getGenresGames,
  getGenreName,
  insertGenre,
  updateGenres,
  getTopGenres,
};
