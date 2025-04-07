const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function sortByGenre() {
  const { rows } = await pool.query(
    "SELECT title, year, price, genre FROM games JOIN game_genres ON games.id = game_id JOIN genres ON genres.id = genre_id ORDER BY genres.genre "
  );
  return rows;
}

async function getGenreById(genre) {
  const { rows } = await pool.query(
    "SELECT id FROM genres WHERE genre = ($1)",
    [genre]
  );
  return rows;
}

async function getGameById(gameTitle) {
  const { rows } = await pool.query("SELECT id FROM games WHERE title = ($1)", [
    gameTitle,
  ]);
  return rows;
}

async function addGameGenres(gameId, genreId) {
  await pool.query("INSERT INTO game_genres VALUES ($1, $2)", [
    gameId[0].id,
    genreId[0].id,
  ]);
}
async function insertGame({ title, year, price, genres }) {
  await pool.query(
    "INSERT INTO games (title, year, price) VALUES ($1, $2, $3)",
    [title, year, price]
  );
  if (!genres) {
    return;
  }
  const gameId = await getGameById(title);
  await genres.forEach(async (genre) => {
    const genreId = await getGenreById(genre);
    await addGameGenres(gameId, genreId);
  });
}

module.exports = {
  getAllGames,
  insertGame,
};
