import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, ChevronDown } from "lucide-react";
import { useState } from "react";
import type { Stop } from "../types/trip";
import { useTripStore } from "../store/tripStore";
export function StopCard({ stop, dayId }: { stop: Stop; dayId: string }) {
  const [open, setOpen] = useState(false); const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: stop.id });
  const update = useTripStore(s => s.updateStop); const remove = useTripStore(s => s.removeStop);
  return <article ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className={`stop ${stop.completed ? "done" : ""}`}>
    <div className="stop-row"><button className="drag" aria-label="Drag stop" {...attributes} {...listeners}><GripVertical size={18}/></button><input aria-label={`Complete ${stop.name}`} type="checkbox" checked={stop.completed} onChange={e => update(dayId, stop.id, { completed: e.target.checked })}/><div className="stop-main"><strong>{stop.name}</strong><span className={`tag ${stop.category}`}>{stop.category}</span><small>{stop.duration}</small></div><button className="icon" onClick={() => setOpen(!open)} aria-label="Expand stop"><ChevronDown size={18}/></button><button className="icon danger" onClick={() => remove(dayId, stop.id)} aria-label="Delete stop"><Trash2 size={18}/></button></div>
    {open && <div className="stop-details"><p>{stop.description}</p><label>Personal notes<textarea value={stop.notes ?? ""} onChange={e => update(dayId, stop.id, { notes: e.target.value })} placeholder="Add a reservation, address, or reminder..."/></label></div>}
  </article>;
}
