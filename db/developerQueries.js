const pool = require("./pool");

async function getAllDevelopers() {
  const { rows } = await pool.query(
    "SELECT developer FROM developers ORDER BY developer"
  );
  return rows;
}

async function getDeveloperId(developer) {
  const { rows } = await pool.query(
    "SELECT id FROM developers WHERE developer = ($1)",
    [developer]
  );
  return rows[0].id;
}

async function insertDeveloper(developer) {
  await pool.query("INSERT INTO developers (developer) VALUES ($1)", [
    developer,
  ]);
}

async function addGameDeveloper(gameId, developers) {
  if (!developers) {
    return;
  } else if (!Array.isArray(developers)) {
    const developerId = await getDeveloperId(developers);
    await pool.query("INSERT INTO game_developers VALUES ($1, $2)", [
      gameId,
      developerId,
    ]);
    return;
  } else {
    developers.map(async (developer) => {
      const developerId = await getDeveloperId(developer);
      await pool.query("INSERT INTO game_developers VALUES ($1, $2)", [
        gameId,
        developerId,
      ]);
    });
  }
}

async function updateDeveloper(gameId, developers) {
  if (!developers) {
    await pool.query("DELETE FROM game_developers WHERE game_id = ($1)", [
      gameId,
    ]);
    return;
  } else if (!Array.isArray(developers)) {
    await pool.query("DELETE FROM game_developers WHERE game_id = ($1)", [
      gameId,
    ]);
    await addGameDeveloper(gameId, developers);
    return;
  } else {
    await pool.query("DELETE FROM game_developers WHERE game_id = ($1)", [
      gameId,
    ]);
    developers.forEach(async (developer) => {
      await addGameDeveloper(gameId, developer);
    });
  }
}

async function getGameDevelopers(gameId) {
  const { rows } = await pool.query(
    "SELECT developer FROM developers JOIN game_developers ON developers.id = developer_id JOIN games ON games.id = game_id WHERE games.id = ($1)",
    [gameId]
  );
  return rows;
}

module.exports = {
  getAllDevelopers,
  getDeveloperId,
  insertDeveloper,
  addGameDeveloper,
  updateDeveloper,
  getGameDevelopers,
};
