const pool = require("./pool");

exports.getAllGenres = async (req, res) => {
  const { rows } = await pool.query("SELECT genre FROM genres");
  return rows;
};
