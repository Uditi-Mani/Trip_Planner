# AI Trip Planner

An interview-ready React 19 and Express take-home project designed around reliable structured LLM output. The existing TrafficVision project remains untouched; this document describes the new `client/` and `server/` workspace apps.

## Run locally

1. Copy `server/.env.example` to `server/.env` and add `OPENROUTER_API_KEY` for live AI generation (optional).
2. Run `npm install` at the repository root.
3. Run `npm run dev` and open `http://localhost:5173`.

Without a key, the server returns a valid deterministic starter itinerary, keeping the demo functional offline.

## Reliability design

- The browser validates every API itinerary with Zod before rendering it.
- The server sends a strict JSON-only prompt, normalizes common LLM response damage, extracts an object safely, parses it without evaluation, and validates it with a strict Zod schema.
- Schema or malformed-output failures become clear `502` errors; invalid user requests become `400` errors. The API never forwards untrusted model output directly.
- Sessions are persisted locally in Zustand, and stop edits, notes, completion state, deletion, and drag ordering remain immediately responsive.

## Deploy

Deploy `client` to Vercel with `VITE_API_URL` pointing to the Render API URL. Deploy `server` to Render with build command `npm install && npm run build -w server` and start command `npm run start -w server`; set `CLIENT_ORIGIN`, `OPENROUTER_API_KEY`, and optional `OPENROUTER_MODEL`.
