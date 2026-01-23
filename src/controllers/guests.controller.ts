import { db } from "../database/db";
import { normalizeName } from "../helpers/format";

export async function listGuests(req, res) {
  const database = await db;

  const guests = await database.all(`
    SELECT *
    FROM guests
    ORDER BY tableNumber DESC, name ASC
  `);

  res.json(guests);
}

export async function addGuest(req, res) {
  const { name, tableNumber } = req.body;

  if (!name || tableNumber < 1 || tableNumber > 30) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  const database = await db;
  await database.run(
    "INSERT INTO guests (name, tableNumber, approved) VALUES (?, ?, ?)",
    [normalizeName(name), tableNumber, false],
  );
  res.status(201).send();
}

export async function deleteGuest(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  const database = await db;
  await database.run("DELETE FROM guests WHERE id = ?", id);
  res.send();
}

export async function editGuest(req, res) {
  const { id } = req.params;
  const { name, tableNumber, approved = false } = req.body;

  if (!name || tableNumber < 1 || tableNumber > 30) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  const database = await db;
  await database.run(
    "UPDATE guests SET name = ?, tableNumber = ?, approved = ? WHERE id = ?",
    [normalizeName(name), tableNumber, approved, id],
  );
  res.send();
}

export async function getGuestById(req, res) {
  const { id } = req.params;
  const database = await db;
  const guest = await database.get("SELECT * FROM guests WHERE id = ?", id);

  if (!guest) {
    return res.status(404).json({ message: "Convidado não encontrado" });
  }

  res.json(guest);
}

export async function approveGuest(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Dados inválidos" });
  }

  const guest = await getGuestById(req, res);

  const database = await db;
  await database.run(
    `UPDATE guests SET name = ?, tableNumber = ? WHERE id = ?, WHERE approved = ?`,
    [...guest, !guest.approved],
  );
  res.send();
}
