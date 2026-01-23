import express from "express";
import cors from "cors";
import { guestsRoutes } from "./routes/guests.routes";
import { initDb } from "./database/db";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(guestsRoutes);

initDb();
