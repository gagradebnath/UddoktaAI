import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_TEXT_MODEL = process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash";

let geminiClient: GoogleGenAI | null = null;
try {
  if (GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }
} catch (e) {
  console.warn("Gemini client not initialized:", e instanceof Error ? e.message : String(e));
}

export interface PromptAndCaption {
  poster_prompt: string;
  caption: string;
}

export async function generatePromptAndCaptionWithGemini(text: string, stats: Record<string, any> = {}): Promise<PromptAndCaption> {
  if (!geminiClient) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const prompt = `Create a marketing poster concept. Respond only in JSON with keys: 'poster_prompt' and 'caption'. No extra text.

Text: "${text}"
Stats: ${JSON.stringify(stats)}`;

  try {
    const response = await geminiClient.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: prompt,
    });

    const content = response.text || "";

    // Try to parse JSON from the response
    let parsed: any = null;
    try {
      const match = content.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : JSON.parse(content);
    } catch (e) {
      console.warn("Could not parse structured JSON from Gemini response, using raw text as prompt");
      return { poster_prompt: content.trim(), caption: "" };
    }

    return {
      poster_prompt: parsed.poster_prompt || parsed.prompt || parsed.prompt_text || "",
      caption: parsed.caption || parsed.title || ""
    };
  } catch (e) {
    console.error("Gemini text generation failed:", e instanceof Error ? e.message : String(e));
    throw new Error("Gemini text generation failed");
  }
}

export async function generateImageWithGemini(prompt: string): Promise<string | { error: string; details?: any }> {
  // Gemini doesn't support direct image generation like DALL-E or Stable Diffusion
  // This could be implemented using Imagen API separately if needed
  console.warn("Gemini image generation not implemented - using as text-only fallback");
  return { error: "not_supported", details: "Gemini image generation not available" };
}