import { InferenceClient } from '@huggingface/inference';

const HF_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_MODEL || "stabilityai/stable-diffusion-3.5-large";
const HF_PROVIDER = process.env.HF_PROVIDER || "fal-ai";
const HF_FALLBACKS = (process.env.HF_MODEL_FALLBACKS || "runwayml/stable-diffusion-v1-5").split(",").map(s => s.trim()).filter(Boolean);

let hfSdkClient: InferenceClient | null = null;
try {
  if (HF_KEY) {
    hfSdkClient = new InferenceClient(HF_KEY);
  }
} catch (e) {
  console.warn("Hugging Face SDK not initialized:", e instanceof Error ? e.message : String(e));
}

async function callHfModel(modelId: string, prompt: string): Promise<{ ok: boolean; dataUri?: string; error?: string; status?: number; contentType?: string; text?: string }> {
  if (!HF_KEY) {
    throw new Error("HF_API_KEY not configured");
  }

  const url = `https://api-inference.huggingface.co/models/${modelId}`;
  console.log(`Calling HF model ${modelId}...`);

  const body = {
    inputs: prompt,
    options: { wait_for_model: true },
    parameters: { guidance_scale: 7.5 }
  };

  // Try SDK first
  if (hfSdkClient) {
    try {
      console.log("Calling HF SDK textToImage for model:", modelId);
      const sdkResp = await hfSdkClient.textToImage({
        model: modelId,
        inputs: prompt,
        provider: HF_PROVIDER as any,
        parameters: body.parameters
      }, { outputType: "blob" });

      if (sdkResp instanceof Blob) {
        const buf = await sdkResp.arrayBuffer();
        const ct = 'image/png'; // Default content type for blob
        return { ok: true, dataUri: `data:${ct};base64,${Buffer.from(buf).toString('base64')}` };
      }

      if (Array.isArray(sdkResp) && typeof sdkResp[0] === 'string') {
        return { ok: true, dataUri: `data:image/png;base64,${sdkResp[0]}` };
      }
      if ((sdkResp as any)?.images && Array.isArray((sdkResp as any).images) && typeof (sdkResp as any).images[0] === 'string') {
        return { ok: true, dataUri: `data:image/png;base64,${(sdkResp as any).images[0]}` };
      }
      if ((sdkResp as any)?.generated_images && Array.isArray((sdkResp as any).generated_images) && typeof (sdkResp as any).generated_images[0] === 'string') {
        return { ok: true, dataUri: `data:image/png;base64,${(sdkResp as any).generated_images[0]}` };
      }

      if ((sdkResp as any)?.error) {
        return { ok: false, error: (sdkResp as any).error, status: (sdkResp as any).status || 500 };
      }

      console.warn("HF SDK returned unrecognized shape, falling back to HTTP", typeof sdkResp);
    } catch (e) {
      console.warn("HF SDK call failed, falling back to HTTP:", e instanceof Error ? e.message : String(e));
    }
  }

  // Fallback to HTTP
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

  // Handle deprecated endpoint
  if (status === 410 && text.includes("router.huggingface.co")) {
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
      console.error("Router fallback failed:", err instanceof Error ? err.message : String(err));
      return { ok: false, status: 410, error: err instanceof Error ? err.message : String(err) };
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
    // not json
  }

  return { ok: false, status, contentType, text };
}

export async function generateImage(prompt: string): Promise<string | { error: string; details?: any }> {
  const models = [HF_MODEL, ...HF_FALLBACKS];
  let lastErr: any = null;
  for (const m of models) {
    try {
      const r = await callHfModel(m, prompt);
      if (r.ok && r.dataUri) {
        return r.dataUri;
      }
      lastErr = r;
      console.warn(`Model ${m} did not return image:`, r);
    } catch (e) {
      lastErr = e;
      console.error(`Error calling model ${m}:`, e instanceof Error ? e.message : String(e));
    }
  }

  return { error: "no_image", details: lastErr };
}