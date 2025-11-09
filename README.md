# Marketing Poster Generator (OpenAI + Hugging Face)

A small, runnable hackathon demo that: 1) asks OpenAI to craft a poster prompt and caption from a short idea + optional stats, then 2) sends that prompt to a Hugging Face text-to-image model and returns the generated image. The web UI at `index.html` posts `{ text, stats }` to the local server and displays the caption, prompt, and generated image (as a data URI).

This README is a step-by-step guide so anyone can run the project locally on Windows (PowerShell) and reproduce results for a demo.

## Quick file tour
- `server.js` — Express server and main logic. Endpoint: POST `/api/create` accepts `{ text, stats }`, calls OpenAI to generate JSON `{ poster_prompt, caption }`, then calls Hugging Face (SDK or HTTP) to produce an image. Returns JSON `{ caption, poster_prompt, image }` (image is a data URI) or `image:null` plus `hf_error` on failure.
- `index.html` — Single-page front-end that posts user inputs and shows results.
- `hf-test.js` — A short script that tests your Hugging Face key + model by calling `textToImage` and saving `hf-test.png` when successful.
- `.env` — Environment file for secrets and config (do not commit this file).

## High-level flow
1. User or client sends `{ text, stats }` to `/api/create`.
2. `server.js` calls OpenAI Chat Completions asking for a strict JSON object with `poster_prompt` and `caption` (the LLM crafts a detailed image prompt using the idea + stats).
3. The generated `poster_prompt` is passed to a Hugging Face text-to-image model (via the official Inference SDK if available or via HTTP as a fallback).
4. The server returns JSON: `{ caption, poster_prompt, image }`, where `image` is a `data:image/png;base64,...` string. If HF failed, `image` may be `null` with `hf_error` details.

## Prerequisites
- Node.js (16 or later). Verify with `node -v`.
- npm (comes with Node.js).
- An OpenAI API key with Chat Completions access (used to craft the poster prompt/caption).
- A Hugging Face token with inference permission (the token must be allowed to run the model you pick).
- Internet access for API calls.

## Environment variables (`.env`)
Create a `.env` file in the project root (example below). Do NOT commit this file to source control.

Example `.env`:

```
OPENAI_API_KEY=sk-REPLACE_WITH_YOUR_OPENAI_KEY
HF_API_KEY=hf_REPLACE_WITH_YOUR_HF_KEY
HF_MODEL=stabilityai/stable-diffusion-3.5-large
HF_PROVIDER=fal-ai
PORT=5000
```

Notes:
- If your HF token doesn't have access to `HF_MODEL`, either grant model access in your Hugging Face account or set `HF_MODEL` to a model your token can use. The server will attempt fallback models when possible.
- When you change `.env`, restart the server so the new values are loaded.

## Install dependencies
From the project root run (PowerShell):

```powershell
npm install
```

If you don't have `package.json` or want to verify required packages, the project depends on at least:

```text
express
node-fetch
@huggingface/inference
dotenv
```

`npm install` should install what's declared in `package.json`. If you get errors, run `npm init -y` then `npm install express node-fetch @huggingface/inference dotenv`.

## Quick verification (Hugging Face SDK test)
Before starting the server, test that your HF token + model/provider are reachable. This helps isolate token/permission issues.

```powershell
# load .env into the current PowerShell session (optional)
Get-Content .env | ForEach-Object {
  if ($_ -match '^\s*(#|//)') { return }
  if ($_ -match '^\s*$') { return }
  $parts = $_ -split '=', 2
  if ($parts.Count -eq 2) {
    $name = $parts[0].Trim()
    $value = $parts[1].Trim().Trim('"')
    Set-Item -Path "Env:$name" -Value $value
  }
}

# run the HF SDK test (saves hf-test.png if successful)
node hf-test.js
```

If `hf-test.png` is created successfully, your HF key and model/provider are working.

If the HF SDK call fails with permission/model errors, try a different `HF_MODEL` (one your account can access) or create a new HF token with the `inference` scope.

## Start the server

```powershell
node server.js
```

Open http://localhost:5000 in a browser (or `http://localhost:<PORT>` if you changed `PORT`). The UI will let you enter an idea and optional stats JSON and then click "Generate Poster".

If server logs show HF or OpenAI errors, copy the log lines and the JSON `hf_error` returned by `/api/create` to help debugging.

## Front-end: stats input format
The front-end `stats` textarea expects valid JSON representing an object (not an array or string). Keys and string values must use double quotes. Example valid JSON payloads (paste directly into the stats field):

- Minimal:
```
{}
```

- Product example:
```
{
  "title": "Eco Bottle",
  "target_age": "18-45",
  "sector_focus": "sustainability",
  "price": 24.99,
  "tone": "clean minimal"
}
```

- Event example:
```
{
  "title": "AI Marketing Workshop",
  "date_time": "2025-12-10 18:00",
  "location": "London",
  "target_age": "20-55",
  "sector_focus": "business",
  "tone": "professional"
}
```

Common JSON mistakes to avoid:
- Unquoted keys (use double quotes): `{ title: "X" }` → invalid
- Single quotes around strings (`'a'`) → invalid
- Trailing commas → invalid

The UI will attempt to parse the JSON and show a parse error if it is invalid.

Tip: If you paste a JavaScript-style object (single quotes, unquoted keys, `=` instead of `:`), the UI will throw a JSON parse error. Use the examples below (valid JSON) or ask the UI to show inline suggestions (see next section if you want me to add that UX improvement).

## Example API calls

PowerShell (Invoke-RestMethod):

```powershell
$body = @{ text = "A new eco-friendly water bottle launch"; stats = @{ title = "Eco Bottle"; price = 24.99; target_age = "18-45" } }
Invoke-RestMethod -Uri "http://localhost:5000/api/create" -Method Post -ContentType "application/json" -Body (ConvertTo-Json $body -Depth 6)
```

curl (bash):

```bash
curl -X POST "http://localhost:5000/api/create" \
  -H "Content-Type: application/json" \
  -d '{"text":"A new eco-friendly water bottle launch","stats":{"title":"Eco Bottle","price":24.99,"target_age":"18-45"}}'
```

Successful response sample:

```json
{
  "caption": "Sleek eco bottle — keep your hydration green!",
  "poster_prompt": "A photorealistic poster of a sleek eco-friendly recycled plastic water bottle on a crisp white background, minimalist typography ...",
  "image": "data:image/png;base64,iVBORw0K..."
}
```

If image generation failed you may see:

```json
{
  "caption": "...",
  "poster_prompt": "...",
  "image": null,
  "hf_error": { "error": "no_image", "details": { /* HF response details */ } }
}
```

## Troubleshooting
### Image is `null`
- Check server logs for `hf_error` and any HTTP status codes returned by the HF endpoint. Common causes:
  - Model not accessible to your token.
  - Token missing `inference` scope or expired.
  - Model returned a JSON error (quota, model loading, 410 router deprecation message).
- Re-run `node hf-test.js` to isolate HF token/model issues.
- Restart `node server.js` after any `.env` change.

### OpenAI returned malformed JSON / caption missing
- The server asks OpenAI to respond with strict JSON. If the assistant returns text that can't be parsed, the server will use the raw assistant text as the image prompt. To reduce this risk:
  - Lower temperature in `server.js` OpenAI call (currently 0.7).
  - Make the system message stricter in `server.js` if needed.

### Rate limits / 429
- Both OpenAI and Hugging Face may return 429 or 5xx. If you hit rate limits, wait and retry. Consider adding retries/backoff in `server.js` for production use.



Suggested demo steps:
1. Ensure `.env` is correct and `node hf-test.js` succeeds.
2. Start `node server.js`.
3. Open `index.html` and paste a sample stats JSON + short text idea and click Generate.
4. Show server logs and the resulting `poster_prompt` (explains how the prompt was composed) and the generated image.

Pro tip: during your demo, keep `hf-test.png` or a saved data URI handy as a fallback in case of quota or network issues.

## Security & privacy
- Keep API keys out of source control. Use environment variables or CI secrets for production.
- The server sends user inputs to external APIs (OpenAI/Hugging Face). Don't send sensitive or personal data.

## Credits & libraries
- OpenAI for prompt-to-JSON generation
- Hugging Face Inference (SDK / HTTP) for text-to-image generation
- `node-fetch`, `express`, `dotenv` for server plumbing


## License
You can add a suitable open-source license for your hackathon submission (MIT is common). This repository does not include a license file by default.

---


