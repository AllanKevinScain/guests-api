import "dotenv/config";
import { db } from "../database/db";

(async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS guests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      tableNumber INTEGER NOT NULL,
      approved BOOLEAN NOT NULL,
      payment TEXT NOT NULL DEFAULT 'PAYED'
      CHECK (payment IN ('PAYED', 'PENDING'))
    );
  `);

  console.log("🏁 Migrações executadas!");
})();
