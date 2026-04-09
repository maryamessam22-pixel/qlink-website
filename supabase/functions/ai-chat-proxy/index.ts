// @ts-nocheck
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

const MODELS = [
  "gemini-2.5-flash",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
];

const SYSTEM_PROMPT = `You are Qlink Safety Bot, a professional AI assistant for Qlink — 
a smart emergency medical bracelet. Answer helpfully and concisely. 
Focus on safety, health, and Qlink product information.`;

async function callGemini(model: string, userText: string, retries = 2): Promise<string> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${userText}` }] }],
            generationConfig: { maxOutputTokens: 500, temperature: 0.7 },
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        const code = data.error.code;
        if (code === 503 || code === 429 || code === 500) {
          throw new Error(`MODEL_OVERLOADED:${data.error.message}`);
        }
        throw new Error(data.error.message);
      }

      return data.candidates[0].content.parts[0].text;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.startsWith("MODEL_OVERLOADED") && attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Max retries reached");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  if (!GEMINI_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    const missing = [
      !GEMINI_API_KEY && 'GEMINI_API_KEY',
      !SUPABASE_URL && 'SUPABASE_URL',
      !SUPABASE_SERVICE_KEY && 'SUPABASE_SERVICE_ROLE_KEY',
    ].filter(Boolean);

    return new Response(
      JSON.stringify({ error: `Missing edge function secrets: ${missing.join(', ')}` }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }

  try {
    const { message, session_id } = await req.json();

    if (!message || !session_id) {
      return new Response(
        JSON.stringify({ error: "Missing message or session_id" }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    let botReply = "";
    let modelUsed = "";

    for (const model of MODELS) {
      try {
        botReply = await callGemini(model, message);
        modelUsed = model;
        break;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("MODEL_OVERLOADED") || msg.includes("Max retries")) {
          console.warn(`Model ${model} failed, trying next...`);
          continue;
        }
        throw err;
      }
    }

    if (!botReply) {
      throw new Error("All models are currently unavailable. Please try again in a moment.");
    }

    const { error: insertError } = await supabase.from("chat_messages").insert([
      { session_id, sender: "user", text: message, model_used: null },
      { session_id, sender: "bot", text: botReply, model_used: modelUsed },
    ]);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return new Response(
        JSON.stringify({ error: `Failed to save chat history: ${insertError.message}` }),
        { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ reply: botReply, model: modelUsed }),
      { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unexpected error";
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }
});
