const pool = require("./pool");

async function getAllMessages() {
  console.log("retrieving messages...");
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertNewMessage(username, message) {
  await pool.query(
    "INSERT INTO messages (username, message, time_added) VALUES ($1, $2, NOW())",
    [username, message]
  );
}

async function deleteMessage(selectedID) {
  await pool.query("DELETE FROM messages WHERE id IS selectedID");
}

module.exports = {
  getAllMessages,
  insertNewMessage,
  deleteMessage,
};
