const pool = require("./pool");

getAllDevelopers = async () => {
  const { rows } = await pool.query(
    "SELECT developer FROM developers ORDER BY developer"
  );
  return rows;
};

async function getDeveloperById(developer) {
  const { rows } = await pool.query(
    "SELECT id FROM developers WHERE developer = ($1)",
    [developer]
  );
  return rows;
}

addDeveloper = async (developer) => {
  await pool.query("INSERT INTO developers (developer) VALUES ($1)", [
    developer,
  ]);
};

addGameDeveloper = async (gameId, developer) => {
  const developerId = await getDeveloperById(developer);
  console.log(gameId, developerId);
  await pool.query("INSERT INTO game_developers VALUES ($1, $2)", [
    gameId,
    developerId[0].id,
  ]);
};

module.exports = {
  getAllDevelopers,
  getDeveloperById,
  addDeveloper,
  addGameDeveloper,
};
