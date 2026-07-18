import axios from "axios";
import { generatedTripSchema } from "../schemas/trip.js";
import { createItineraryPrompt } from "../utils/prompt.js";
import { AIResponseError, safeParse } from "../utils/safeParse.js";

const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
export async function requestItinerary(prompt: string) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return null;
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const { data } = await axios.post("https://openrouter.ai/api/v1/chat/completions", { model: process.env.OPENROUTER_MODEL ?? "google/gemini-2.0-flash-001", messages: [{ role: "user", content: createItineraryPrompt(prompt) }], temperature: 0.45 }, { headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, timeout: 25_000 });
      const content = data?.choices?.[0]?.message?.content;
      if (typeof content !== "string") throw new AIResponseError("The AI provider returned no message content.");
      const result = generatedTripSchema.safeParse(safeParse(content));
      if (!result.success) throw new AIResponseError("The AI response did not match the itinerary schema.");
      return result.data;
} catch (error) {
  console.error("OpenRouter Error:", error);

  if (axios.isAxiosError(error)) {
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
  }

  lastError = error;

  if (attempt === 0) {
    await sleep(400);
  }
}
  }
  if (lastError instanceof AIResponseError) throw lastError;
  throw new AIResponseError("The itinerary provider timed out or is temporarily unavailable.");
}
