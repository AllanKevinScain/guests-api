import "dotenv/config";
import express from "express";
import cors from "cors";
import { guestsRoutes } from "./routes/guests.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send({ message: "🚀 API de convidados está em órbita!" });
});

app.use((req, _, next) => {
  console.log(
    `🔁 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`,
  );
  next();
});

app.use(guestsRoutes);

export default app;
