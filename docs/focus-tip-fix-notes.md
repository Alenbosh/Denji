# Focus Tip API – Problem & Solution Notes

> **Notion-friendly.** Copy-paste into a Notion page. Uses standard Markdown (headings, bullets, tables, code).

---

## The Problem (TL;DR)

The app always showed the **hard-coded fallback tip** (“Focus on one task. Ignore everything else for now.”) instead of **Gemini-generated daily tips**, even after adding an API route and setting `GEMINI_API_KEY` on Vercel.

---

## Chain of Issues

| # | What went wrong | Why it mattered |
|---|------------------|-----------------|
| 1 | **Next.js-style API in a Vite app** | `/api/focus-tip.ts` only works in Next.js. Vite has no API routes. |
| 2 | **404 on Vercel** | The route didn’t exist, so `/api/focus-tip` returned 404. |
| 3 | **Gemini never called** | Frontend always got 404 → fell back to default tip. |
| 4 | **Silent failures** | We didn’t check Gemini `response.ok` or `data.error`, so 401/429/etc. still returned 200 + fallback. |
| 5 | **Wrong / deprecated model** | `gemini-1.5-flash` was deprecated → “model not found” → fallback again. |

---

## What We Fixed

### 1. Use a Vercel Serverless Function (not Next.js API)

- **Before:** `/api/focus-tip.ts` (Next.js)
- **After:** `api/focus-tip.js` at **project root** as a **Vercel Serverless Function**
- **Config:** `GEMINI_API_KEY` in Vercel → **Project → Settings → Environment Variables** (Production + Preview as needed)

### 2. Keep `/api` Out of SPA Rewrites

- **Issue:** Vercel rewrites can send all routes (including `/api/*`) to `index.html` for the SPA.
- **Fix:** Add `vercel.json` with a rewrite that **excludes** `/api`:

```json
{
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

- **Result:** `/api/focus-tip` hits the serverless function instead of the SPA.

### 3. Handle Gemini Errors Properly

- **Before:** No check of `response.ok` or `data.error` → any Gemini failure still returned 200 + fallback.
- **After:**
  - Check `response.ok` and `data.error`.
  - On failure: return **502** with `{ error, detail, tip }`, log in Vercel Function logs.
  - Only return **200** when we actually get a tip from Gemini.

### 4. Better Prompt + Temperature (for variety)

- **Prompt:** Ask for **one short productivity tip**, avoid generic advice like “focus on one task,” max 20 words, plain text.
- **Config:** `generationConfig: { temperature: 0.8 }` so tips vary more day-to-day.

### 5. Use a Current Gemini Model

- **Before:** `gemini-1.5-flash` (deprecated / not found for v1beta).
- **After:** `gemini-2.5-flash` (current stable Flash model).
- **Endpoint:**  
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`

---

## Frontend Behavior

- **Cache key:** `denji.focusTip.<date>` (e.g. `denji.focusTip.Sun Jan 25 2026`).
- **Same day:** Use cached tip; no API call.
- **New day:** Cache miss → call `/api/focus-tip` → store new tip for that day.
- **On API error:** Use fallback tip; no cache (so we retry next time).

---

## Quick Checklist (Before “it works”)

- [ ] `api/focus-tip.js` at **repo root** (Vercel serverless function).
- [ ] `vercel.json` with rewrites that **exclude** `api/`.
- [ ] `GEMINI_API_KEY` in Vercel env vars for **Production** (and Preview if you use it).
- [ ] Model set to `gemini-2.5-flash` (or another [current model](https://ai.google.dev/gemini-api/docs/models)).
- [ ] **Redeploy** after changing env vars or config.

---

## How to Test

1. **Live API:**  
   Open `https://<your-app>.vercel.app/api/focus-tip`  
   - **200** + `{"tip":"..."}` → working.  
   - **502** + `error` / `detail` → check Vercel Function logs and env vars.

2. **In the app:**  
   Timer page → focus mode → “Focus Tip” card shows the daily tip (or fallback if API failed).

3. **Local dev:**  
   Use `vercel dev` so both frontend and `/api/focus-tip` run. `npm run dev` alone does **not** serve the API.

---

## One-Line Summary

> **Use a Vercel serverless `api/focus-tip.js`, exclude `/api` from SPA rewrites, set `GEMINI_API_KEY`, use `gemini-2.5-flash`, and handle Gemini errors explicitly—then daily focus tips work.**
