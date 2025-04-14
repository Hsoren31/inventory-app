const pool = require("./pool");
const developerQuery = require("./developerQueries");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games ORDER BY title");
  return rows;
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT genre FROM genres");
  return rows;
}

async function getGenreId(genre) {
  const { rows } = await pool.query(
    "SELECT id FROM genres WHERE genre = ($1)",
    [genre]
  );
  return rows[0].id;
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

async function getGameGenres(gameId) {
  const { rows } = await pool.query(
    "SELECT genre FROM genres JOIN game_genres ON genres.id = genre_id JOIN games ON games.id = game_id WHERE games.id = ($1)",
    [gameId]
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

async function insertGame({ title, year, price, genres, developers }) {
  await pool.query(
    "INSERT INTO games (title, year, price) VALUES ($1, $2, $3)",
    [title, year, price]
  );
  const gameId = await getGameId(title);
  await developerQuery.addGameDeveloper(gameId, developers);
  await addGameGenres(gameId, genres);
}

async function updateGame(id, { title, year, price, genres }) {
  await pool.query(
    "UPDATE games SET title = ($1), year = ($2), price = ($3) WHERE id = ($4)",
    [title, year, price, id]
  );
  if (!genres && !developers) {
    return;
  }
  await developers.forEach(async (developer) => {
    await pool.query("DELETE FROM game_developers WHERE game_id = ($1)", [id]);
    const developerId = await developerQuery.getDeveloperById(developer);
    await developerQuery.addGameDeveloper(id, developerId);
  });
  await genres.forEach(async (genre) => {
    await pool.query("DELETE FROM game_genres WHERE game_id = ($1)", [id]);
    const genreId = await getGenreById(genre);
    await addGameGenres(id, genreId[0].id);
  });
}

async function deleteGame(id) {
  await pool.query("DELETE FROM game_genres WHERE game_id = ($1)", [id]);
  await pool.query("DELETE FROM games WHERE id = ($1)", [id]);
}

module.exports = {
  getAllGames,
  getAllGenres,
  insertGame,
  getGameById,
  getGameGenres,
  updateGame,
  deleteGame,
};
