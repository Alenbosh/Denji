export async function getFocusTip(): Promise<string> {
  const todayKey = `denji.focusTip.${new Date().toDateString()}`;
  const cached = localStorage.getItem(todayKey);
  if (cached) return cached;

  const res = await fetch("/api/focus-tip");

  if (!res.ok) {
    return "Focus on one task. Ignore everything else for now.";
  }

  const data = await res.json();
  localStorage.setItem(todayKey, data.tip);
  return data.tip;
}
