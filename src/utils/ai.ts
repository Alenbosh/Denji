const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getFocusTip(): Promise<string> {
  const todayKey = `denji.focusTip.${new Date().toDateString()}`;
  const cached = localStorage.getItem(todayKey);
  if (cached) return cached;

  const prompt = `
Give ONE short, calm productivity tip (max 20 words).
No emojis. No quotes. Plain text.
`;

  const res = await fetch(`${GEMINI_ENDPOINT}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!res.ok) {
    console.error("Gemini error");
    return "Focus on one task. Ignore everything else for now.";
  }

  const data = await res.json();
  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ??
    "Focus on one task. Ignore everything else for now.";

  localStorage.setItem(todayKey, text);
  return text;
}
