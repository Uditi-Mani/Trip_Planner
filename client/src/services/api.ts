import axios from "axios";
import { tripSchema } from "../schemas/trip";
import type { TripPlan } from "../types/trip";
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000/api", timeout: 30_000 });
export async function generateTrip(prompt: string, signal?: AbortSignal): Promise<TripPlan> {
  const { data } = await api.post("/trips/generate", { prompt }, { signal });
  const result = tripSchema.safeParse(data.trip);
  if (!result.success) throw new Error("The itinerary response was incomplete. Please regenerate it.");
  return result.data;
}
