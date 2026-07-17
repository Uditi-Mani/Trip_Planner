import type { DayPlan } from "../types/trip"; import { DayCard } from "./DayCard";
export function DayAccordion({ day }: { day: DayPlan }) { return <DayCard day={day}/>; }
