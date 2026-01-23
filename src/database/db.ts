import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = open({
  filename: "guests.sqlite",
  driver: sqlite3.Database,
});

export async function initDb() {
  const database = await db;
  await database.exec(`
    CREATE TABLE IF NOT EXISTS guests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      tableNumber INTEGER NOT NULL,
      approved BOOLEAN NOT NULL
    )
  `);
}
