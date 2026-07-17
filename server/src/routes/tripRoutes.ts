import { Router } from "express"; import { generate } from "../controllers/tripController.js";
export const tripRoutes = Router(); tripRoutes.post("/generate", generate);
