import { NextRequest, NextResponse } from 'next/server';
import { generatePromptAndCaption } from '@/lib/openai';
import { generatePromptAndCaptionWithGemini } from '@/lib/gemini';
import { generateImage } from '@/lib/huggingface';

export async function POST(request: NextRequest) {
  try {
    const { text, stats } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Missing 'text' in request body" }, { status: 400 });
    }

    let llm;
    try {
      llm = await generatePromptAndCaption(text, stats || {});
    } catch (openaiError) {
      console.warn("\n OpenAI failed, trying Gemini as fallback:", openaiError instanceof Error ? openaiError.message : String(openaiError));
      
      try {
        llm = await generatePromptAndCaptionWithGemini(text, stats || {});
        
        console.log("\n"+llm.poster_prompt+"\n");
      } catch (geminiError) {
        console.error("Both OpenAI and Gemini failed:", geminiError instanceof Error ? geminiError.message : String(geminiError));
        return NextResponse.json({
          error: "Failed to generate prompt with both OpenAI and Gemini",
          openai_error: openaiError instanceof Error ? openaiError.message : String(openaiError),
          gemini_error: geminiError instanceof Error ? geminiError.message : String(geminiError)
        }, { status: 500 });
      }
    }

    if (!llm || !llm.poster_prompt) {
      return NextResponse.json({ error: "Failed to generate prompt", details: llm }, { status: 500 });
    }

    const imageResult = await generateImage(llm.poster_prompt);
    if (typeof imageResult === 'object' && imageResult.error) {
      return NextResponse.json({
        caption: llm.caption || "",
        poster_prompt: llm.poster_prompt,
        image: null,
        hf_error: imageResult
      });
    }

    return NextResponse.json({
      caption: llm.caption || "",
      poster_prompt: llm.poster_prompt,
      image: imageResult
    });
  } catch (e) {
    console.error("/api/create error:", e instanceof Error ? e.message : String(e));
    return NextResponse.json({
      error: "server_error",
      details: e instanceof Error ? e.message : String(e)
    }, { status: 500 });
  }
}