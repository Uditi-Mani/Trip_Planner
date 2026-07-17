export type StopCategory = "activity" | "food" | "transport" | "hotel";
export interface Stop { id: string; name: string; category: StopCategory; description: string; duration: string; completed: boolean; notes?: string; }
export interface DayPlan { id: string; day: number; title: string; description: string; stops: Stop[]; }
export interface TripPlan { id: string; title: string; summary: string; days: DayPlan[]; }
export interface TripSession { id: string; prompt: string; savedAt: string; trip: TripPlan; }
