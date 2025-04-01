#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ),
  year INTEGER,
  price INTEGER
);

INSERT INTO games (title, year, price)
VALUES ('Game 1', 1999, 15), ('Game 2', 2000, 15), ('Game 5', 2006, 30);
`;

async function main() {
  console.log("seeding...");
  console.log(process.env.CONNECTION_STRING);

  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
