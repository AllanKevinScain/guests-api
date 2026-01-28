import { db } from "../database/db";
import { normalizeName } from "../helpers/format";
import { Request, Response } from "express";
import { GuestType, ReturnType } from "../types/Guest.type";

export async function listGuests(req: Request, res: Response) {
  try {
    const guests = await db.execute(`
    SELECT *
    FROM guests
    ORDER BY tableNumber DESC, name ASC
  `);
    res.json(guests.rows);
  } catch (error) {
    res.status(500).json({ message: error || "Erro ao buscar convidados" });
  }
}

export async function getGuestById(req: Request, res: Response) {
  const id = Number(req.params.id);

  try {
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const request = await db.execute("SELECT * FROM guests WHERE id = ?", [id]);
    const result = await request.toJSON();
    if (!result) {
      return res.status(404).json({ message: "Convidado não encontrado" });
    }

    res.json(request.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error || "Erro ao buscar convidado" });
  }
}

export async function addGuest(req: Request, res: Response) {
  const {
    name,
    tableNumber,
    payment = "PAYED",
    approved = false,
  } = req.body as GuestType;

  try {
    if (!name || tableNumber < 1 || tableNumber > 30) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    const request = await db.execute(
      "INSERT INTO guests (name, tableNumber, approved, payment) VALUES (?, ?, ?, ?)",
      [normalizeName(name), tableNumber, approved, payment],
    );
    const response = (await request.toJSON()) as ReturnType;

    if (response.rowsAffected) {
      res.json({ message: "Convidado criado com sucesso!" });
    }
  } catch (error) {
    res.status(500).json({ message: error || "Erro ao adicionar convidado" });
  }
}

export async function editGuest(req: Request, res: Response) {
  const id = Number(req.params.id);
  const {
    name,
    tableNumber,
    approved = false,
    payment = "PAYED",
  } = req.body as GuestType;

  try {
    if (!id) {
      return res.status(400).json({ message: "identificador inválido" });
    }

    if (!name || tableNumber < 1 || tableNumber > 30) {
      return res.status(400).json({ message: "Dados do formulário inválidos" });
    }

    const request = await db.execute(
      "UPDATE guests SET name = ?, tableNumber = ?, approved = ?, payment = ? WHERE id = ?",
      [normalizeName(name), tableNumber, approved, payment, id],
    );

    const response = (await request.toJSON()) as ReturnType;
    if (response.rowsAffected) {
      res.json({ message: "Atualização feita com sucesso!" });
    }
  } catch (error) {
    res.status(500).json({ message: error || "Erro ao editar convidado" });
  }
}

export async function deleteGuest(req: Request, res: Response) {
  const id = Number(req.params.id);
  try {
    if (!id) {
      return res.status(400).json({ message: "identificador inválido" });
    }

    const data = await db.execute("DELETE FROM guests WHERE id = ?", [id]);
    res.status(201).json({ message: "Convidado deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error || "Erro ao deletar convidado" });
  }
}

export async function approveGuest(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Identificador inválido" });
  }

  try {
    const result = await db.execute(
      "UPDATE guests SET approved = NOT approved WHERE id = ?",
      [id],
    );

    return res.status(200).json({
      message: "Status do convidado atualizado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar convidado" });
  }
}
