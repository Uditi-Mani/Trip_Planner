import express from "express";
import cors from "cors";
import { tripRoutes } from "./routes/tripRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5175",
];

if (process.env.CLIENT_ORIGIN) {
  allowedOrigins.push(process.env.CLIENT_ORIGIN);
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
  app.use(express.json({ limit: "20kb" }));
  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/trips", tripRoutes);
  app.use(errorHandler);
  return app;
}
