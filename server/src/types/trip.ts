export type StopCategory = "activity" | "food" | "transport" | "hotel";
export type Stop = { id: string; name: string; category: StopCategory; description: string; duration: string; completed: boolean; };
export type TripPlan = { id: string; title: string; summary: string; days: Array<{ id: string; day: number; title: string; description: string; stops: Stop[] }> };
