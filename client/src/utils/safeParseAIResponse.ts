export type ParseResult<T> = { success: true; data: T } | { success: false; error: string };
export function safeParseAIResponse<T>(raw: string): ParseResult<T> {
  if (!raw?.trim()) return { success: false, error: "Empty AI response" };
  const unfenced = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  const start = unfenced.indexOf("{"); const end = unfenced.lastIndexOf("}");
  const object = start >= 0 && end > start ? unfenced.slice(start, end + 1) : unfenced;
  const candidates = [raw, unfenced, object, object.replace(/[\u201C\u201D]/g, '"').replace(/,\s*([}\]])/g, "$1")];
  for (const candidate of candidates) { try { return { success: true, data: JSON.parse(candidate) as T }; } catch { /* continue safe recovery */ } }
  return { success: false, error: "No valid JSON object could be recovered" };
}
