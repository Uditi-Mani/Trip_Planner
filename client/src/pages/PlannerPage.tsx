import { useLocation, useNavigate } from "react-router-dom";
import { RotateCcw, Save, ArrowLeft } from "lucide-react";
import { useTripStore } from "../store/tripStore";
import { DayAccordion } from "../components/DayAccordion";
import { ProgressBar } from "../components/ProgressBar";
import { SavedTripsDrawer } from "../components/SavedTripsDrawer";
import { ThemeToggle } from "../components/ThemeToggle";
import { generateTrip } from "../services/api";
export function PlannerPage() { const trip = useTripStore(s => s.trip); const dark = useTripStore(s => s.dark); const save = useTripStore(s => s.save); const setTrip = useTripStore(s => s.setTrip); const nav = useNavigate(); const prompt = (useLocation().state as {prompt?: string} | null)?.prompt ?? ""; if (!trip) return <main className="empty"><h1>No itinerary yet</h1><button className="primary" onClick={() => nav("/")}>Plan a trip</button></main>; const stops = trip.days.flatMap(d => d.stops); const done = stops.filter(s => s.completed).length;
const regenerate = async () => { if (!prompt) return nav("/"); try { setTrip(await generateTrip(prompt)); } catch (e) { alert(e instanceof Error ? e.message : "Regeneration failed."); } };
return <main className={dark ? "planner dark" : "planner"}><header><button className="back" onClick={() => nav("/")}><ArrowLeft size={18}/> New trip</button><div className="header-actions"><ThemeToggle/><button className="outline" onClick={() => save(prompt)}><Save size={17}/> Save</button><button className="outline" onClick={regenerate}><RotateCcw size={17}/> Regenerate</button></div></header><div className="trip-intro"><span className="eyebrow">Your custom itinerary</span><h1>{trip.title}</h1><p>{trip.summary}</p><div className="mt-6"><ProgressBar completed={done} total={stops.length}/></div></div><div className="planner-grid"><div className="days">{trip.days.map(day => <DayAccordion key={day.id} day={day}/>)}</div><SavedTripsDrawer/></div></main>; }
