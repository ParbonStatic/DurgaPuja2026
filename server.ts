import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Poem / Sharodiya Greeting generation
  app.post("/api/gemini/generate-poem", async (req, res) => {
    try {
      const { theme, recipientName, mood, languageMix } = req.body || {};
      const ai = getGeminiClient();

      const prompt = `You are a legendary Bengali poet writing for a Durga Puja 2026 tribute website ("Sharodiyo").
Generate a short 4-8 line poetic verse and a heartfelt Shubho Sharodiya blessing/greeting.
Theme requested: ${theme || "Agamani / Durga Puja joy and nostalgic Bengali culture"}
Recipient/Dedicated to: ${recipientName || "Dear Friend / প্রিয় বন্ধু"}
Mood: ${mood || "Nostalgic, joyful, spiritual, artistic"}

CRITICAL RULES:
1. Maintain exactly a mix where roughly 20% to 30% of key words are in authentic Bengali script (বাংলা) and the rest in eloquent English, or provide Bengali lines with English poetic meanings.
2. Include authentic Bengali Puja imagery: Kash Phool (কাশ ফুল), Dhak rhythm (ঢাক), Shiuli flower (শিউলি ফুল), Dhunuchi (ধুনুচি), Agamani (আগমনী), Mahalaya (মহালয়া).
3. Format as a clean JSON object with keys:
   - "bengaliTitle": Short title in Bengali & English (e.g., "আগমনী সুরে - Echoes of Agamani")
   - "poemLines": Array of string lines (each line blending Bengali script words & English)
   - "greetingText": Heartfelt 2-sentence Sharodiya wish
   - "culturalNote": A 1-sentence note explaining a Bengali tradition mentioned in the poem.

Respond ONLY with valid JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error("No text returned from AI");
      }

      const parsed = JSON.parse(text);
      res.json({ success: true, data: parsed });
    } catch (error: any) {
      console.error("Gemini API Error:", error?.message || error);
      res.status(500).json({
        success: false,
        error: error?.message || "Failed to generate AI poem",
        // Fallback default poem if API fails or key is missing
        fallback: {
          bengaliTitle: "কাশফুলের হাওয়ায় - Winds of Kash Phool",
          poemLines: [
            "কাশফুলের দোলা (Kash Phool sways) in autumn breeze so bright,",
            "ঢাকের কাঠিতে (Dhak beat resonates) through the starlit night.",
            "মা দুর্গার আগমন (Mother Durga arrives) to bless our hearth and home,",
            "শুভ শারদীয়া (Shubho Sharodiya) to all wherever you roam."
          ],
          greetingText: "May the festive rhythm of Dhak and the aroma of Shiuli flowers bring endless joy, peace, and prosperity to you and your family this Durga Puja 2026!",
          culturalNote: "Kash Phool (silver feather grass) blooming along riverbanks signals the sacred onset of Sharodotsav in Bengal."
        }
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware for dev / static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
