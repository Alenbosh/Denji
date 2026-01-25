const FALLBACK_TIP =
  "Focus on one task. Ignore everything else for now.";

export default async function handler(req, res) {
  const GEMINI_ENDPOINT =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      error: "Missing GEMINI_API_KEY",
      tip: FALLBACK_TIP,
    });
  }

  const prompt = `
Give ONE short productivity tip.
Avoid common advice like focusing on one task or ignoring distractions.
Make it different from typical tips.
Max 20 words. Plain text. No emojis. No quotes.
`;

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8 },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const msg = data?.error?.message ?? `Gemini API ${response.status}`;
      console.error("[focus-tip] Gemini error:", response.status, msg);
      return res.status(502).json({
        error: "Gemini request failed",
        detail: msg,
        tip: FALLBACK_TIP,
      });
    }

    if (data?.error) {
      console.error("[focus-tip] Gemini error body:", data.error);
      return res.status(502).json({
        error: "Gemini error",
        detail: data.error.message ?? String(data.error),
        tip: FALLBACK_TIP,
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? null;

    if (!text) {
      console.error("[focus-tip] No text in Gemini response:", JSON.stringify(data).slice(0, 500));
      return res.status(502).json({
        error: "Gemini returned no tip",
        tip: FALLBACK_TIP,
      });
    }

    return res.status(200).json({ tip: text });
  } catch (err) {
    console.error("[focus-tip] Unexpected error:", err?.message ?? err);
    return res.status(500).json({
      error: "Server error",
      tip: FALLBACK_TIP,
    });
  }
}
