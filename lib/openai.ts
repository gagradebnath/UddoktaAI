import OpenAI from 'openai';

export interface PromptAndCaption {
  poster_prompt: string;
  caption: string;
}

export async function generatePromptAndCaption(text: string, stats: Record<string, any> = {}): Promise<PromptAndCaption> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "You are a marketing assistant. Respond only in JSON with keys: 'poster_prompt' and 'caption'. No extra text or markdown."
    },
    {
      role: "user",
      content: `Create JSON for this idea:\nText: "${text}"\nStats: ${JSON.stringify(stats)}`
    }
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.7,
    max_tokens: 400
  });

  const content = response.choices[0]?.message?.content ?? "";

  // Try to parse JSON from the response
  let parsed: any = null;
  try {
    const match = content.match(/\{[\s\S]*\}/);
    parsed = match ? JSON.parse(match[0]) : JSON.parse(content);
  } catch (e) {
    // If parsing fails, use the raw content as prompt
    console.warn("Could not parse structured JSON from OpenAI response, using raw text as prompt");
    return { poster_prompt: content.trim(), caption: "" };
  }

  return {
    poster_prompt: parsed.poster_prompt || parsed.prompt || parsed.prompt_text || "",
    caption: parsed.caption || parsed.title || ""
  };
}