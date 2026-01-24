import { Router } from "express";
import {
  listGuests,
  addGuest,
  deleteGuest,
  editGuest,
  getGuestById,
  approveGuest,
} from "../controllers/guests.controller";

export const guestsRoutes = Router();

guestsRoutes.get("/guests", listGuests);
guestsRoutes.get("/guests/:id", getGuestById);

guestsRoutes.post("/guests", addGuest);

guestsRoutes.delete("/guests/:id", deleteGuest);

guestsRoutes.put("/guests/:id", editGuest);
guestsRoutes.put("/guests/approved/:id", approveGuest);
