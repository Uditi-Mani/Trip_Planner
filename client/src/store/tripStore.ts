import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Stop, TripPlan, TripSession } from "../types/trip";
type State = { trip: TripPlan | null; sessions: TripSession[]; dark: boolean; setTrip: (trip: TripPlan) => void; save: (prompt: string) => void; load: (id: string) => void; removeSession: (id: string) => void; toggleDark: () => void; updateStop: (dayId: string, stopId: string, patch: Partial<Stop>) => void; removeStop: (dayId: string, stopId: string) => void; reorder: (dayId: string, activeId: string, overId: string) => void; };
const mutate = (trip: TripPlan, dayId: string, fn: (stops: Stop[]) => Stop[]) => ({ ...trip, days: trip.days.map(d => d.id === dayId ? { ...d, stops: fn(d.stops) } : d) });
export const useTripStore = create<State>()(persist((set, get) => ({
  trip: null, sessions: [], dark: false,
  setTrip: trip => set({ trip }),
  save: prompt => { const trip = get().trip; if (!trip) return; const session = { id: crypto.randomUUID(), prompt, savedAt: new Date().toISOString(), trip }; set(s => ({ sessions: [session, ...s.sessions.filter(x => x.trip.id !== trip.id)].slice(0, 12) })); },
  load: id => { const session = get().sessions.find(s => s.id === id); if (session) set({ trip: session.trip }); },
  removeSession: id => set(s => ({ sessions: s.sessions.filter(session => session.id !== id) })),
  toggleDark: () => set(s => ({ dark: !s.dark })),
  updateStop: (dayId, stopId, patch) => set(s => ({ trip: s.trip ? mutate(s.trip, dayId, stops => stops.map(x => x.id === stopId ? { ...x, ...patch } : x)) : null })),
  removeStop: (dayId, stopId) => set(s => ({ trip: s.trip ? mutate(s.trip, dayId, stops => stops.filter(x => x.id !== stopId)) : null })),
  reorder: (dayId, activeId, overId) => set(s => ({ trip: s.trip ? mutate(s.trip, dayId, stops => { const a = stops.findIndex(x => x.id === activeId), b = stops.findIndex(x => x.id === overId); if (a < 0 || b < 0) return stops; const copy = [...stops]; copy.splice(b, 0, copy.splice(a, 1)[0]); return copy; }) : null }))
}), { name: "trip-planner-sessions" }));
