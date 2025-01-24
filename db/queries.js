const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function deleteUsernames() {
  await pool.query("DELETE FROM usernames WHERE username IS NOT NULL");
}

async function findUsername(username) {
  console.log("find", username);
  const { rows } = await pool.query(
    "SELECT * FROM usernames WHERE (username) ILIKE ($1)",
    [`%${username}%`]
  );
  return rows;
}

module.exports = {
  getAllUsernames,
  insertUsername,
  deleteUsernames,
  findUsername,
};
