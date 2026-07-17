import { useCallback, useRef, useState } from "react";
import { generateTrip } from "../services/api";
import { useTripStore } from "../store/tripStore";
import { RequestManager } from "../utils/requestManager";

export function useGenerateTrip() {
  const [loading, setLoading] = useState(false); const [error, setError] = useState<string | null>(null); const sequence = useRef(0); const manager = useRef(new RequestManager()); const setTrip = useTripStore(s => s.setTrip);
  const generate = useCallback(async (prompt: string) => { const request = ++sequence.current; setLoading(true); setError(null); try { const trip = await generateTrip(prompt, manager.current.nextSignal()); if (request === sequence.current) setTrip(trip); return trip; } catch (cause) { if (request === sequence.current && !(cause instanceof DOMException && cause.name === "AbortError")) setError(cause instanceof Error ? cause.message : "Unable to generate your trip."); throw cause; } finally { if (request === sequence.current) setLoading(false); } }, [setTrip]);
  const cancel = useCallback(() => { sequence.current += 1; manager.current.cancel(); setLoading(false); }, []);
  return { generate, loading, error, clearError: () => setError(null), cancel };
}
