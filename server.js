import express from "express";
import fetch from "node-fetch";
import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "5mb" }));

// Simple request logger to help debug 405/404 issues
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// Guard for /api/create - return JSON 405 for non-POST methods so the client
// never receives an empty body or ambiguous HTML response. Allow OPTIONS for CORS preflight.
app.all("/api/create", (req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(204);
  if (req.method !== "POST") {
    console.warn(`/api/create called with unsupported method: ${req.method}`);
    return res.status(405).json({ error: "method_not_allowed", method: req.method, allowed: ["POST"] });
  }
  next();
});

// Convert JSON parse errors from express.json into structured JSON responses
app.use((err, req, res, next) => {
  if (err && (err instanceof SyntaxError || err.type === 'entity.parse.failed')) {
    console.warn("Invalid JSON body:", err && err.message ? err.message : err);
    return res.status(400).json({ error: "invalid_json", message: err.message || String(err) });
  }
  return next(err);
});

const PORT = process.env.PORT || 5000;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const HF_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_MODEL || "stabilityai/stable-diffusion-3.5-large";
const HF_PROVIDER = process.env.HF_PROVIDER || "fal-ai"; 
const HF_FALLBACKS = (process.env.HF_MODEL_FALLBACKS || "runwayml/stable-diffusion-v1-5").split(",").map(s => s.trim()).filter(Boolean);

if (!OPENAI_KEY) console.warn("⚠️ OPENAI_API_KEY missing in environment (.env)");
if (!HF_KEY) console.warn("⚠️ HF_API_KEY missing in environment (.env)");
console.log(`Using primary Hugging Face model: ${HF_MODEL}`);
console.log(`Using HF provider: ${HF_PROVIDER}`);
if (HF_FALLBACKS.length) console.log(`HF fallback models: ${HF_FALLBACKS.join(", ")}`);

let hfSdkClient = null;
try {
  if (HF_KEY) hfSdkClient = new InferenceClient(HF_KEY);
} catch (e) {
  console.warn("Hugging Face SDK not initialized:", e && e.message ? e.message : e);
}

async function generatePromptAndCaption(text, stats = {}) {
  if (!OPENAI_KEY) throw new Error("OPENAI_API_KEY not configured");

  const body = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a marketing assistant. Respond only in JSON with keys: 'poster_prompt' and 'caption'. No extra text or markdown." },
      { role: "user", content: `Create JSON for this idea:\nText: "${text}"\nStats: ${JSON.stringify(stats)}` }
    ],
    temperature: 0.7,
    max_tokens: 400
  };

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const status = resp.status;
  
  const textBody = await resp.text();
  if (!resp.ok) {
    console.error("OpenAI error", { status, textBody });
    throw new Error(`OpenAI request failed: ${status} ${textBody}`);
  }

  
  let parsed = null;
  try {
 
    const json = JSON.parse(textBody);
    const content = json?.choices?.[0]?.message?.content ?? "";
    const match = String(content).match(/\{[\s\S]*\}/);
    parsed = match ? JSON.parse(match[0]) : JSON.parse(content);
  } catch (e) {
   
    const match = String(textBody).match(/\{[\s\S]*\}/);
    if (match) {
      try { parsed = JSON.parse(match[0]); } catch (e2) { /* ignore */ }
    }
  }

  if (!parsed) {
  
    console.warn("Could not parse structured JSON from OpenAI response, using raw text as prompt");
    return { poster_prompt: String(textBody).trim(), caption: "" };
  }

  return {
    poster_prompt: parsed.poster_prompt || parsed.prompt || parsed.prompt_text || "",
    caption: parsed.caption || parsed.title || ""
  };
}


async function callHfModel(modelId, prompt) {
  if (!HF_KEY) throw new Error("HF_API_KEY not configured");
  const url = `https://api-inference.huggingface.co/models/${modelId}`;
  console.log(`Calling HF model ${modelId}...`);

  const body = { inputs: prompt, options: { wait_for_model: true } };
 
  body.parameters = { guidance_scale: 7.5 };

  
  if (hfSdkClient) {
    try {
      console.log("Calling HF SDK textToImage for model:", modelId);
      const sdkResp = await hfSdkClient.textToImage({ model: modelId, inputs: prompt, provider: process.env.HF_PROVIDER, parameters: body.parameters });

      if (sdkResp && typeof sdkResp.arrayBuffer === 'function') {
        const buf = await sdkResp.arrayBuffer();
        const ct = sdkResp.headers?.get?.('content-type') || 'image/png';
        return { ok: true, dataUri: `data:${ct};base64,${Buffer.from(buf).toString('base64')}` };
      }
  
      if (sdkResp instanceof ArrayBuffer) {
        return { ok: true, dataUri: `data:image/png;base64,${Buffer.from(sdkResp).toString('base64')}` };
      }
     
      if (Array.isArray(sdkResp) && typeof sdkResp[0] === 'string') {
        return { ok: true, dataUri: `data:image/png;base64,${sdkResp[0]}` };
      }
      if (sdkResp?.images && Array.isArray(sdkResp.images) && typeof sdkResp.images[0] === 'string') {
        return { ok: true, dataUri: `data:image/png;base64,${sdkResp.images[0]}` };
      }
      if (sdkResp?.generated_images && Array.isArray(sdkResp.generated_images) && typeof sdkResp.generated_images[0] === 'string') {
        return { ok: true, dataUri: `data:image/png;base64,${sdkResp.generated_images[0]}` };
      }
     
      if (sdkResp?.error) return { ok: false, error: sdkResp.error, status: sdkResp.status || 500 };
     
      console.warn("HF SDK returned unrecognized shape, falling back to HTTP", typeof sdkResp);
    } catch (e) {
      console.warn("HF SDK call failed, falling back to HTTP:", e && e.message ? e.message : e);
    }
  }

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const contentType = resp.headers.get("content-type") || "";
  const status = resp.status;


  if (resp.ok && contentType.includes("image")) {
    const buffer = await resp.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    return { ok: true, dataUri: `data:${contentType};base64,${base64}` };
  }

  
  let text = await resp.text();
 
  if (status === 410 && String(text).includes("router.huggingface.co")) {
    console.warn("HF API endpoint deprecated for this model; retrying with router.huggingface.co/hf-inference");
    try {
      const routerUrl = "https://router.huggingface.co/hf-inference";
      const routerBody = { model: modelId, inputs: prompt, options: { wait_for_model: true }, parameters: body.parameters };
      const r2 = await fetch(routerUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${HF_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(routerBody)
      });

      const ct2 = r2.headers.get("content-type") || "";
      const st2 = r2.status;
      if (r2.ok && ct2.includes("image")) {
        const buf2 = await r2.arrayBuffer();
        return { ok: true, dataUri: `data:${ct2};base64,${Buffer.from(buf2).toString("base64")}` };
      }

      const txt2 = await r2.text();
      try {
        const j2 = JSON.parse(txt2);
        if (Array.isArray(j2) && typeof j2[0] === 'string') return { ok: true, dataUri: `data:image/png;base64,${j2[0]}` };
        if (j2?.images && Array.isArray(j2.images) && typeof j2.images[0] === 'string') return { ok: true, dataUri: `data:image/png;base64,${j2.images[0]}` };
        if (j2?.generated_images && Array.isArray(j2.generated_images) && typeof j2.generated_images[0] === 'string') return { ok: true, dataUri: `data:image/png;base64,${j2.generated_images[0]}` };
        if (j2?.error) return { ok: false, error: j2.error, status: st2 };
      } catch (e) {
        // not json
      }

      return { ok: false, status: st2, contentType: ct2, text: txt2 };
    } catch (err) {
      console.error("Router fallback failed:", err && err.message ? err.message : err);
      return { ok: false, status: 410, error: err && err.message ? err.message : err };
    }
  }
  try {
    const j = JSON.parse(text);
    
    if (Array.isArray(j) && typeof j[0] === 'string') {
      
      return { ok: true, dataUri: `data:image/png;base64,${j[0]}` };
    }
    if (j?.error) {
      return { ok: false, error: j.error, status };
    }
    
    if (j?.images && Array.isArray(j.images) && typeof j.images[0] === 'string') {
      return { ok: true, dataUri: `data:image/png;base64,${j.images[0]}` };
    }
    if (j?.generated_images && Array.isArray(j.generated_images) && typeof j.generated_images[0] === 'string') {
      return { ok: true, dataUri: `data:image/png;base64,${j.generated_images[0]}` };
    }
  } catch (e) {

  }

 
  return { ok: false, status, contentType, text };
}


async function generateImage(prompt) {
  const models = [HF_MODEL, ...HF_FALLBACKS];
  let lastErr = null;
  for (const m of models) {
    try {
      const r = await callHfModel(m, prompt);
      if (r.ok) return r.dataUri;
      lastErr = r;
      console.warn(`Model ${m} did not return image:`, r);
    } catch (e) {
      lastErr = e;
      console.error(`Error calling model ${m}:`, e && e.message ? e.message : e);
    }
  }

  return { error: "no_image", details: lastErr };
}

app.post("/api/create", async (req, res) => {
  try {
    const { text, stats } = req.body || {};
    if (!text) return res.status(400).json({ error: "Missing 'text' in request body" });

    const llm = await generatePromptAndCaption(text, stats || {});
    if (!llm || !llm.poster_prompt) {
      return res.status(500).json({ error: "OpenAI did not return a prompt", details: llm });
    }

    const imageResult = await generateImage(llm.poster_prompt);
    if (imageResult && imageResult.error) {
      
      return res.json({ caption: llm.caption || "", poster_prompt: llm.poster_prompt, image: null, hf_error: imageResult });
    }

    return res.json({ caption: llm.caption || "", poster_prompt: llm.poster_prompt, image: imageResult });
  } catch (e) {
    console.error("/api/create error:", e && e.message ? e.message : e);
    res.status(500).json({ error: "server_error", details: e && e.message ? e.message : e });
  }
});

// Serve static files after API routes so API routes are not shadowed by the static handler
app.use(express.static("."));

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
