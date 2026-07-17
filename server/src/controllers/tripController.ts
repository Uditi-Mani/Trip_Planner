import type { Request, Response, NextFunction } from "express";
import { z } from "zod"; import { buildTrip } from "../services/plannerService.js";
const requestSchema = z.object({ prompt: z.string().trim().min(12).max(2000) }).strict();
export async function generate(req: Request, res: Response, next: NextFunction) { try { const data = requestSchema.parse(req.body); res.json({ trip: await buildTrip(data.prompt) }); } catch (error) { next(error); } }
