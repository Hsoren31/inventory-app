const pool = require("./pool");
const genreQuery = require("./genreQueries");
const developerQuery = require("./developerQueries");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games ORDER BY title");
  return rows;
}

async function getGameById(gameId) {
  const { rows } = await pool.query("SELECT * FROM games WHERE id = ($1)", [
    gameId,
  ]);
  return rows;
}

async function getGameId(gameTitle) {
  const { rows } = await pool.query("SELECT id FROM games WHERE title = ($1)", [
    gameTitle,
  ]);
  return rows[0].id;
}

async function insertGame({ title, year, price, genres, developers }) {
  await pool.query(
    "INSERT INTO games (title, year, price) VALUES ($1, $2, $3)",
    [title, year, price]
  );
  const gameId = await getGameId(title);
  await developerQuery.addGameDeveloper(gameId, developers);
  await genreQuery.addGameGenres(gameId, genres);
}

async function updateGame(id, { title, year, price, genres }) {
  await pool.query(
    "UPDATE games SET title = ($1), year = ($2), price = ($3) WHERE id = ($4)",
    [title, year, price, id]
  );
  if (!genres && !developers) {
    return;
  }
  await developerQuery.updateDeveloper(id, developers);
  await genreQuery.updateGenres(id, genres);
}

async function deleteGame(id) {
  await pool.query("DELETE FROM game_developers WHERE game_id = ($1)", [id]);
  await pool.query("DELETE FROM game_genres WHERE game_id = ($1)", [id]);
  await pool.query("DELETE FROM games WHERE id = ($1)", [id]);
}

module.exports = {
  getAllGames,
  insertGame,
  getGameById,
  updateGame,
  deleteGame,
};
