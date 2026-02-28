export async function generateAIInsight(data) {
  const API_KEY = import.meta.env.VITE_GEMINI_KEY;
 console.log("API KEY:", API_KEY);
  try {
    const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Analyze this burnout data and give 3 short behavioral insights:

Sleep: ${data.sleep}
Stress: ${data.stress}
Motivation: ${data.motivation}
Productivity: ${data.productivity}
Mood: ${data.mood}
`
                }
              ]
            }
          ]
        }),
      }
    );

    const result = await response.json();
    console.log("FULL API RESPONSE:", result);

    if (!result.candidates) {
      return "AI could not generate insight. Check API key or quota.";
    }

    return result.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error("AI Error:", error);
    return "Unable to generate AI insight.";
  }
}