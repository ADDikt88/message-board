#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const testSQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

// {
//   id: 0,
//   text: "Hi there!",
//   user: "Amando",
//   added: new Date(),
// },

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  time_added TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (username, message)
VALUES
  ('Bryan', 'Hello, how is everyone?'),
  ('Odin', 'Doing great, just exploring the world.'),
  ('Damon', 'Adventure awaits!');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.PROD_EXT_DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Accepts self-signed certificates. Use cautiously!
    },
  });
  await client.connect();
  console.log("connected...");
  await client.query(SQL);
  console.log("finished query...");
  await client.end();
  console.log("done");
}

main();
