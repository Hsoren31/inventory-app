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

CREATE TABLE IF NOT EXISTS developers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  developer TEXT
);

CREATE TABLE IF NOT EXISTS game_developers (
  game_id integer REFERENCES games,
  developer_id integer REFERENCES developers,
  PRIMARY KEY (game_id, developer_id)
);

INSERT INTO developers (developer) VALUES
('nintendo'), ('electronic arts'), ('microsoft'), ('sony interactive entertainment'),
('ubisoft'), ('take-two interactive software'), ('tencent'), ('bandai namco');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_PUBLIC_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
