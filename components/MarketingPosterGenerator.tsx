"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Image as ImageIcon } from "lucide-react";

interface PosterResponse {
  caption: string;
  poster_prompt: string;
  image: string | null;
  hf_error?: { error: string; details?: any };
}

export function MarketingPosterGenerator() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PosterResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parseStatsInput = (text: string) => {
    if (!text || !text.trim()) return {};
    try {
      const obj = JSON.parse(text);
      if (typeof obj !== 'object' || Array.isArray(obj) || obj === null) {
        throw new Error('Stats must be a JSON object (e.g. {"price":499})');
      }
      return obj;
    } catch (err) {
      throw new Error('Invalid JSON in stats field: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Please enter some text or idea");
      return;
    }

    let parsedStats = {};
    try {
      parsedStats = parseStatsInput(stats);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, stats: parsedStats })
      });

      let data: PosterResponse;
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        data = await response.json();
      } else {
        const txt = await response.text();
        if (!txt || !txt.trim()) {
          throw new Error(`Empty response from server (status ${response.status})`);
        }
        try {
          data = JSON.parse(txt);
        } catch (e) {
          throw new Error(`Server returned non-JSON response (status ${response.status}): ${txt}`);
        }
      }

      if (data.hf_error) {
        setError("Failed to generate image: " + (data.hf_error.error || JSON.stringify(data.hf_error)));
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Failed to generate poster: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Marketing Poster Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="text">Marketing Idea / Text:</Label>
          <Textarea
            id="text"
            placeholder="Enter your marketing idea..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="stats">Optional Stats (JSON format):</Label>
          <Textarea
            id="stats"
            placeholder='{"target_age":"18-30","sector_focus":"tech"}'
            value={stats}
            onChange={(e) => setStats(e.target.value)}
            rows={2}
          />
        </div>

        <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Poster"
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="space-y-4 mt-6">
            <div>
              <h3 className="font-semibold mb-2">Caption:</h3>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                {result.caption}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Poster Prompt:</h3>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                {result.poster_prompt}
              </p>
            </div>

            {result.image && (
              <div>
                <h3 className="font-semibold mb-2">Generated Image:</h3>
                <img
                  src={result.image}
                  alt="Generated Poster"
                  className="max-w-full h-auto rounded border"
                />
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}