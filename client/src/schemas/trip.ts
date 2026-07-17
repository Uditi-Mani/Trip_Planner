import { z } from "zod";
export const stopSchema = z.object({ id: z.string().min(1), name: z.string().min(1), category: z.enum(["activity", "food", "transport", "hotel"]), description: z.string().min(1), duration: z.string().min(1), completed: z.boolean().default(false), notes: z.string().optional() });
export const daySchema = z.object({ id: z.string().min(1), day: z.number().int().positive(), title: z.string().min(1), description: z.string().min(1), stops: z.array(stopSchema).min(1) });
export const tripSchema = z.object({ id: z.string().min(1), title: z.string().min(1), summary: z.string().min(1), days: z.array(daySchema).min(1) });
