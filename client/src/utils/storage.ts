export const storage = {
  get<T>(key: string, fallback: T): T { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; } },
  set<T>(key: string, value: T) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* non-essential persistence failure */ } },
  remove(key: string) { try { localStorage.removeItem(key); } catch { /* non-essential persistence failure */ } }
};
