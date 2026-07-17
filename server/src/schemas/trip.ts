import { z } from "zod";
export const generatedStopSchema = z.object({ id: z.string().min(1), name: z.string().min(1), category: z.enum(["activity","food","transport","hotel"]), description: z.string().min(1), duration: z.string().min(1) }).strict();
export const generatedTripSchema = z.object({ title: z.string().min(1), summary: z.string().min(1), days: z.array(z.object({ id: z.string().min(1), day: z.number().int().positive(), title: z.string().min(1), description: z.string().min(1), stops: z.array(generatedStopSchema).min(1) }).strict()).min(1).max(21) }).strict();
