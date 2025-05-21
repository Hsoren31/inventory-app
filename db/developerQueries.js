const pool = require("./pool");

async function getAllDevelopers() {
  const { rows } = await pool.query(
    "SELECT * FROM developers ORDER BY developer"
  );
  return rows;
}

async function getPopularDevelopers() {
  const { rows } = await pool.query(
    "SELECT id, developer FROM developers JOIN game_developers ON developers.id = developer_id GROUP BY developers.id ORDER BY COUNT(developer_id) DESC LIMIT 5"
  );
  return rows;
}

async function getDeveloperById(id) {
  const { rows } = await pool.query(
    "SELECT * FROM developers WHERE id = ($1)",
    [id]
  );
  return rows;
}

async function getGamesDevelopers(gameId) {
  const { rows } = await pool.query(
    "SELECT developer_id, developer FROM developers JOIN game_developers ON developers.id = developer_id JOIN games ON games.id = game_id WHERE games.id = ($1)",
    [gameId]
  );
  return rows;
}

async function getDevelopersGames(developerId) {
  const { rows } = await pool.query(
    "SELECT games.id, title FROM games JOIN game_developers ON games.id = game_id JOIN developers ON developer_id = developers.id WHERE developers.id = ($1) ORDER BY title",
    [developerId]
  );
  return rows;
}

async function insertDeveloper(developer) {
  developer = developer.toLowerCase();
  await pool.query("INSERT INTO developers (developer) VALUES ($1)", [
    developer,
  ]);
}

async function addGameDeveloper(gameId, developers) {
  if (!developers) {
    return;
  } else if (!Array.isArray(developers)) {
    await pool.query("INSERT INTO game_developers VALUES ($1, $2)", [
      gameId,
      developers,
    ]);
    return;
  } else {
    developers.map(async (developer) => {
      await pool.query("INSERT INTO game_developers VALUES ($1, $2)", [
        gameId,
        developer,
      ]);
    });
  }
}

async function updateGamesDevelopers(gameId, developers) {
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

async function updateDeveloper(developerId, developerName) {
  await pool.query("UPDATE developers SET developer = ($1) WHERE id = ($2)", [
    developerName,
    developerId,
  ]);
}

async function deleteDeveloper(developerId) {
  await pool.query("DELETE FROM game_developers WHERE developer_id = ($1)", [
    developerId,
  ]);
  await pool.query("DELETE FROM developers WHERE id = ($1)", [developerId]);
}

module.exports = {
  getAllDevelopers,
  getDeveloperById,
  insertDeveloper,
  addGameDeveloper,
  updateGamesDevelopers,
  getGamesDevelopers,
  getDevelopersGames,
  updateDeveloper,
  deleteDeveloper,
  getPopularDevelopers,
};
