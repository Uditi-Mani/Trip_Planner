export class AIResponseError extends Error { constructor(message: string, public readonly details?: string) { super(message); } }
const removeFences = (value: string) => value.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
const extractObject = (value: string) => { const first = value.indexOf("{"); const last = value.lastIndexOf("}"); return first >= 0 && last > first ? value.slice(first, last + 1) : value; };
const clean = (value: string) => value.replace(/[\u201C\u201D]/g, '"').replace(/[\u2018\u2019]/g, "'").replace(/,\s*([}\]])/g, "$1").replace(/[\u0000-\u001F]+/g, " ");
/** Recovers common LLM wrapping/formatting mistakes. It never executes or evaluates model output. */
export function safeParseAIResponse(raw: string): unknown { if (!raw?.trim()) throw new AIResponseError("The AI returned an empty response."); const attempts = [raw.trim(), removeFences(raw), extractObject(removeFences(raw)), clean(extractObject(removeFences(raw)))]; for (const candidate of attempts) { try { return JSON.parse(candidate); } catch { /* try the next safe normalization */ } } throw new AIResponseError("The AI response was not valid JSON after recovery.", raw.slice(0, 500)); }
