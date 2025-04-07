#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  year INTEGER,
  price INTEGER
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre TEXT
);

CREATE TABLE IF NOT EXISTS game_genres (
  game_id integer REFERENCES games,
  genre_id integer REFERENCES genres,
  PRIMARY KEY (game_id, genre_id)
);

INSERT INTO genres (genre) VALUES 
('action'), ('adventure'), ('role-playing'),
('simulation'), ('strategy'), ('sports & racing'),
('themes'), ('puzzles'), ('arcade'), 
('casual'), ('story-rich');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
