import { useEffect } from "react";
import { useTripStore } from "../store/tripStore";

export function useDarkMode() {
  const dark = useTripStore(s => s.dark); const toggle = useTripStore(s => s.toggleDark);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  return { dark, toggle };
}
