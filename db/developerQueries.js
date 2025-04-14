const pool = require("./pool");

let getAllDevelopers = async () => {
  const { rows } = await pool.query(
    "SELECT developer FROM developers ORDER BY developer"
  );
  return rows;
};

let getDeveloperId = async (developer) => {
  const { rows } = await pool.query(
    "SELECT id FROM developers WHERE developer = ($1)",
    [developer]
  );
  return rows[0].id;
};

let insertDeveloper = async (developer) => {
  await pool.query("INSERT INTO developers (developer) VALUES ($1)", [
    developer,
  ]);
};

let addGameDeveloper = async (gameId, developers) => {
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
};

module.exports = {
  getAllDevelopers,
  getDeveloperId,
  insertDeveloper,
  addGameDeveloper,
};
