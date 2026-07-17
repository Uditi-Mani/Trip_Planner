import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DayPlan } from "../types/trip";
import { useTripStore } from "../store/tripStore";
import { StopCard } from "./StopCard";
export function DayCard({ day }: { day: DayPlan }) { const [open, setOpen] = useState(true); const reorder = useTripStore(s => s.reorder); const onDragEnd = ({active, over}: DragEndEvent) => { if (over && active.id !== over.id) reorder(day.id, String(active.id), String(over.id)); };
 return <section className="day"><button className="day-head" onClick={() => setOpen(!open)}><span><b>Day {day.day}</b><strong>{day.title}</strong><small>{day.description}</small></span><ChevronDown className={open ? "rotated" : ""}/></button>{open && <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}><SortableContext items={day.stops.map(s => s.id)} strategy={verticalListSortingStrategy}><div className="stops">{day.stops.map(stop => <StopCard key={stop.id} stop={stop} dayId={day.id}/>)}</div></SortableContext></DndContext>}</section>; }
