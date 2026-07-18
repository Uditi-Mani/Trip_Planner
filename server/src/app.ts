import express from "express";
import cors from "cors";
import { tripRoutes } from "./routes/tripRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5175",
      process.env.CLIENT_ORIGIN,
    ].filter(Boolean),
    credentials: true,
  })
);
  app.use(express.json({ limit: "20kb" }));
  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/trips", tripRoutes);
  app.use(errorHandler);
  return app;
}
