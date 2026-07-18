import axios from "axios";
import type { TripPlan } from "../types/trip.js";
import { generatedTripSchema } from "../schemas/trip.js";
import { safeParseAIResponse, AIResponseError } from "../utils/safeParseAIResponse.js";
import { requestItinerary } from "./ai.service.js";
const prompt = (request: string) => `You are an itinerary planner. Return ONLY VALID JSON. Do not include markdown or explanations. Follow this EXACT schema:\n{"title":"","summary":"","days":[{"id":"","day":1,"title":"","description":"","stops":[{"id":"","name":"","category":"activity|food|transport|hotel","description":"","duration":""}]}]}\nGenerate a detailed, practical itinerary for: ${request}`;
const id = (prefix: string, n: number) => `${prefix}-${n}`;
function fallback(request: string): TripPlan { const destination = request.match(/(?:to|in|visit)\s+([A-Z][\w-]*(?:\s+[A-Z][\w-]*)?)/)?.[1] ?? "Your destination"; const days = Array.from({length: 3}, (_, i) => ({ id: id("day", i+1), day: i+1, title: i === 0 ? "Arrival & orientation" : i === 1 ? "Local highlights" : "A memorable finale", description: "A balanced day with room to wander and adjust your pace.", stops: [{id:id(`d${i+1}s`,1),name:"Explore the neighborhood",category:"activity" as const,description:"Start with a relaxed walk and get oriented.",duration:"2 hours",completed:false},{id:id(`d${i+1}s`,2),name:"Local meal",category:"food" as const,description:"Choose a well-reviewed local spot.",duration:"1.5 hours",completed:false},{id:id(`d${i+1}s`,3),name:"Return to accommodation",category:"hotel" as const,description:"Rest and prepare for tomorrow.",duration:"Evening",completed:false}] })); return { id: crypto.randomUUID(), title: `${destination} getaway`, summary: "A starter itinerary generated locally. Add OPENROUTER_API_KEY to create AI-tailored plans.", days }; }
export async function buildTrip(
  request: string
): Promise<TripPlan> {
  try {
    const generated = await requestItinerary(request);

    if (!generated) {
      return fallback(request);
    }

    return {
      id: crypto.randomUUID(),
      ...generated,
      days: generated.days.map(day => ({
        ...day,
        stops: day.stops.map(stop => ({
          ...stop,
          completed: false,
        })),
      })),
    };
  } catch (error) {
    console.error("AI generation failed:", error);
    return fallback(request);
  }
}