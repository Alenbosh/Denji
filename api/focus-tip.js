export default async function handler(req, res) {
  const GEMINI_ENDPOINT =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "Missing GEMINI_API_KEY" });
  }

  const prompt = `
Give ONE short, calm productivity tip (max 20 words).
No emojis. No quotes. Plain text.
`;

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Focus on one task. Ignore everything else for now.";

    res.status(200).json({ tip: text });
  } catch (err) {
    res.status(500).json({
      tip: "Focus on one task. Ignore everything else for now.",
    });
  }
}
