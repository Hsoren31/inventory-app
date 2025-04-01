const pool = require("./pool");

async function getAllGames() {
  const { rows } = await pool.query("SELECT * FROM games");
  return rows;
}

async function insertGame({ title, year, price }) {
  await pool.query(
    "INSERT INTO games (title, year, price) VALUES ($1, $2, $3)",
    [title, year, price]
  );
}

module.exports = {
  getAllGames,
  insertGame,
};
