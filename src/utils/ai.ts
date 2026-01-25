const FALLBACK_TIP = "Focus on one task. Ignore everything else for now.";

export async function getFocusTip(): Promise<string> {
  const todayKey = `denji.focusTip.${new Date().toDateString()}`;
  const cached = localStorage.getItem(todayKey);
  if (cached) return cached;

  try {
    const res = await fetch("/api/focus-tip");

    if (!res.ok) {
      if (import.meta.env.DEV) {
        console.warn("[FocusTip] API returned", res.status, res.statusText, "- using fallback. Check /api/focus-tip on Vercel.");
      }
      return FALLBACK_TIP;
    }

    const data = (await res.json()) as { tip?: string };
    const tip = data?.tip ?? FALLBACK_TIP;
    localStorage.setItem(todayKey, tip);
    return tip;
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn("[FocusTip] Fetch failed:", e, "- using fallback. Use `vercel dev` for local API.");
    }
    return FALLBACK_TIP;
  }
}
