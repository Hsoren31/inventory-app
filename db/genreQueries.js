const pool = require("./pool");

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres ORDER BY genre");
  return rows;
}

async function getPopularGenres() {
  const { rows } = await pool.query(
    "SELECT id, genre FROM genres JOIN game_genres ON genres.id = genre_id GROUP BY genres.id ORDER BY COUNT(genre_id) DESC LIMIT 5"
  );
  return rows;
}

async function getGenreById(id) {
  const { rows } = await pool.query("SELECT * FROM genres WHERE id = ($1)", [
    id,
  ]);
  return rows[0];
}

async function getGamesGenres(gameId) {
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

async function insertGenre(genre) {
  genre = genre.toLowerCase();
  await pool.query("INSERT INTO genres (genre) VALUES ($1)", [genre]);
}

async function addGamesGenres(gameId, genres) {
  if (!genres) {
    return;
  } else if (!Array.isArray(genres)) {
    await pool.query("INSERT INTO game_genres VALUES ($1, $2)", [
      gameId,
      genres,
    ]);
    return;
  } else {
    genres.map(async (genre) => {
      await pool.query("INSERT INTO game_genres VALUES ($1, $2)", [
        gameId,
        genre,
      ]);
    });
  }
}

async function updateGamesGenres(gameId, genres) {
  if (!genres) {
    await pool.query("DELETE FROM game_genres WHERE game_id = ($1)", [gameId]);
    return;
  } else if (!Array.isArray(genres)) {
    await pool.query("DELETE FROM game_genres WHERE game_id = ($1)", [gameId]);
    await addGamesGenres(gameId, genres);
    return;
  } else {
    await pool.query("DELETE FROM game_genres WHERE game_id = ($1)", [gameId]);
    genres.forEach(async (genre) => {
      await addGamesGenres(gameId, genre);
    });
  }
}

async function updateGenre(genreId, genreName) {
  await pool.query("UPDATE genres SET genre = ($1) WHERE id = ($2)", [
    genreName,
    genreId,
  ]);
}

async function deleteGenre(genreId) {
  await pool.query("DELETE FROM game_genres WHERE genre_id = ($1)", [genreId]);
  await pool.query("DELETE FROM genres WHERE id = ($1)", [genreId]);
}

module.exports = {
  getAllGenres,
  getPopularGenres,
  getGenreById,
  getGamesGenres,
  getGenresGames,
  insertGenre,
  addGamesGenres,
  updateGamesGenres,
  updateGenre,
  deleteGenre,
};
