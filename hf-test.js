// hf-test.js
// Simple test script to generate an image from Hugging Face Inference
// - Reads HF_API_KEY and optional HF_MODEL from environment (or .env)
// - Accepts the prompt as the first CLI argument (or uses a default prompt)
// - Calls the HF HTTP inference endpoint and handles multiple response shapes
// - Writes the first returned image to ./hf-test.png
// Requires: Node 18+ (for global fetch) or set up a fetch polyfill

import fs from "fs";
import path from "path";
import process from "process";
import dotenv from "dotenv";

dotenv.config();

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = process.env.HF_MODEL || "stabilityai/stable-diffusion-3.5-large";

if (!HF_API_KEY) {
	console.error("Missing HF_API_KEY in environment. Create a .env with HF_API_KEY=your_token");
	process.exit(2);
}

const prompt = process.argv[2] || "A vibrant fantasy landscape, highly detailed, photorealistic";

async function callHfHttp(modelId, promptText) {
	const url = `https://api-inference.huggingface.co/models/${encodeURIComponent(modelId)}`;
	const body = {
		inputs: promptText,
		options: { wait_for_model: true },
		// You can add model-specific parameters under `parameters` if needed
	};

	console.log(`Calling HF model ${modelId} via HTTP inference...`);

	const res = await fetch(url, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${HF_API_KEY}`,
			Accept: "application/json, image/png, image/jpeg, application/octet-stream",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const contentType = res.headers.get("content-type") || "";
	console.log(`HF HTTP response status: ${res.status}; content-type: ${contentType}`);

	if (!res.ok) {
		// Try to parse any json error body
		let text = await res.text();
		try {
			const j = JSON.parse(text);
			console.error("HF error response:", j);
		} catch (e) {
			console.error("HF error response text:", text);
		}
		throw new Error(`HF HTTP request failed: ${res.status}`);
	}

	// If image bytes are returned directly
	if (contentType.startsWith("image/") || contentType === "application/octet-stream") {
		const arr = await res.arrayBuffer();
		return Buffer.from(arr);
	}

	// Otherwise parse JSON and handle several shapes
	const json = await res.json();

	// Case A: API returns an array of base64 strings
	if (Array.isArray(json) && typeof json[0] === "string") {
		// assume base64 string
		const b64 = json[0];
		return Buffer.from(b64, "base64");
	}

	// Case B: object with `images` or `generated_images` arrays
	const imagesField = json.images || json.generated_images || json.data || null;
	if (imagesField && Array.isArray(imagesField) && imagesField.length > 0) {
		const first = imagesField[0];
		if (typeof first === "string") {
			return Buffer.from(first, "base64");
		}
		if (first && first.b64_json) {
			return Buffer.from(first.b64_json, "base64");
		}
		// if it's raw bytes encoded as numbers, try converting
		if (first && Array.isArray(first)) {
			return Buffer.from(first);
		}
	}

	// Case C: object with a `error` field
	if (json.error) {
		throw new Error(`HF inference error: ${json.error}`);
	}

	// Fallback: try to find a base64 string anywhere in the JSON
	const text = JSON.stringify(json);
	const b64match = text.match(/[A-Za-z0-9+/=]{100,}/);
	if (b64match) {
		return Buffer.from(b64match[0], "base64");
	}

	throw new Error("Unrecognized HF response format - couldn't extract an image");
}

async function main() {
	console.log("hf-test.js starting...");
	console.log(`Model: ${HF_MODEL}`);
	console.log(`Prompt: ${prompt}`);

	try {
		const imgBuf = await callHfHttp(HF_MODEL, prompt);
		const outPath = path.resolve(process.cwd(), "hf-test.png");
		fs.writeFileSync(outPath, imgBuf);
		console.log(`Wrote image to ${outPath} (${imgBuf.length} bytes)`);
	} catch (err) {
		console.error("Generation failed:", err);
		process.exitCode = 1;
	}
}

// Run
main();
