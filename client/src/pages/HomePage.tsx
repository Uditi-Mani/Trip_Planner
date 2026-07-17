import { Compass, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TripInput } from "../components/TripInput";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { ErrorCard } from "../components/ErrorCard";
import { ThemeToggle } from "../components/ThemeToggle";
import { useGenerateTrip } from "../hooks/useGenerateTrip";

export function HomePage() {
  const nav = useNavigate();
  const { generate, loading, error, clearError } = useGenerateTrip();
  const onSubmit = async (prompt: string) => {
    try { await generate(prompt); nav("/planner", { state: { prompt } }); } catch { /* ErrorCard presents the failure. */ }
  };
  return <main className="min-h-screen bg-[#f7f8f4] text-slate-900 transition-colors dark:bg-pine-950 dark:text-white">
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6"><div className="flex items-center gap-2 font-bold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-pine-700 text-white"><Compass size={19}/></span> Roamwise</div><ThemeToggle/></header>
    <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-20 pt-12 md:grid-cols-[1.2fr_.8fr] md:pt-24"><div><span className="inline-flex items-center gap-2 rounded-full bg-pine-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-pine-700 dark:bg-white/10 dark:text-emerald-200"><Sparkles size={14}/> AI itinerary studio</span><h1 className="mt-5 font-serif text-5xl font-bold leading-[.98] tracking-tight md:text-7xl">Travel with a plan,<br/><i className="text-pine-500">not a spreadsheet.</i></h1><p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">Tell us where you want to go and what matters to you. Get a detailed itinerary that stays flexible when your trip changes.</p><TripInput onSubmit={onSubmit} loading={loading}/></div><div className="rounded-3xl bg-gradient-to-br from-pine-700 via-pine-500 to-emerald-300 p-1 shadow-glow"><div className="flex h-full min-h-80 flex-col justify-end rounded-[22px] bg-pine-950/15 p-7 text-white"><span className="text-sm font-semibold uppercase tracking-widest text-emerald-100">Designed for real trips</span><p className="mt-4 font-serif text-3xl leading-tight">Build it. Reorder it. Make it yours.</p><div className="mt-7 flex gap-2"><span className="rounded-lg bg-white/15 px-3 py-2 text-xs backdrop-blur">Drag & drop</span><span className="rounded-lg bg-white/15 px-3 py-2 text-xs backdrop-blur">Saved locally</span></div></div></div></section>
    {error && <div className="px-6 pb-8"><ErrorCard message={error} onDismiss={clearError}/></div>}{loading && <LoadingSkeleton/>}
  </main>;
}
