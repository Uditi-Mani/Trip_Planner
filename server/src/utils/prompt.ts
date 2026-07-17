export function createItineraryPrompt(request: string) {
  return `You are an itinerary planner. Return ONLY VALID JSON. Do not include markdown or explanations. Follow this EXACT schema:\n{"title":"","summary":"","days":[{"id":"","day":1,"title":"","description":"","stops":[{"id":"","name":"","category":"activity|food|transport|hotel","description":"","duration":""}]}]}\nUse concise practical descriptions. Give every day and stop a unique stable id. Generate a detailed itinerary for: ${request}`;
}
