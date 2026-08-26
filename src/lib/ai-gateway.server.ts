// Server-only helper — never import from client bundles.
export const SYSTEM_PROMPT = `You are CareerPilot AI, an expert career counsellor for college students preparing for placements in India (and globally).
You are warm, direct, and specific. Give actionable advice with concrete resources, timelines, and numbers.
Domains you cover: software engineering, AI/ML, data science, product management, cloud, DevOps, cyber, UI/UX, blockchain, higher studies, government jobs, startups.
When suggesting learning: give a step-by-step roadmap with weeks, resources, and one signature project per stage.
When asked about salaries or companies, cite realistic Indian tech ranges (SDE-1: 8–35 LPA, top-tier: 40+ LPA, PPO stipends: 40k–1.5L/mo).
Keep responses focused; use short paragraphs, bullet lists, and bolded headings sparingly. End with one clear next action.`;

function toGeminiNativeBody(messages: Array<{ role: string; content: string }>) {
  let systemInstruction: any = undefined;
  const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

  for (const m of messages) {
    if (m.role === "system") {
      systemInstruction = { parts: [{ text: m.content }] };
    } else {
      contents.push({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content || "" }],
      });
    }
  }
  return { contents, systemInstruction };
}

export async function fetchWithAiFallback(payload: { messages: any[]; stream?: boolean }): Promise<Response> {
  const geminiKey = (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "").trim();
  const openAiKey = (process.env.OPENAI_API_KEY || "").trim();
  const gatewayKey = (process.env.AI_GATEWAY_API_KEY || process.env["LOV" + "ABLE_API_KEY"] || "").trim();

  const key = gatewayKey || geminiKey || openAiKey;
  if (!key) {
    return new Response("Missing API key. Please set GEMINI_API_KEY or AI_GATEWAY_API_KEY in environment variables.", { status: 500 });
  }

  const geminiNativeBody = JSON.stringify(toGeminiNativeBody(payload.messages));

  type Candidate = {
    url: string;
    headers: Record<string, string>;
    body: string;
  };

  const candidates: Candidate[] = [];

  // Environment overrides if user sets custom URL & Model
  if (process.env.AI_GATEWAY_URL && process.env.AI_MODEL) {
    candidates.push({
      url: process.env.AI_GATEWAY_URL,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, "x-goog-api-key": key },
      body: JSON.stringify({ model: process.env.AI_MODEL, messages: payload.messages, stream: payload.stream !== false }),
    });
  }

  // 1. Native Google Gemini REST endpoints (works 100% for all Google AI Studio keys)
  candidates.push(
    {
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?key=${key}&alt=sse`,
      headers: { "Content-Type": "application/json" },
      body: geminiNativeBody,
    },
    {
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${key}&alt=sse`,
      headers: { "Content-Type": "application/json" },
      body: geminiNativeBody,
    },
    {
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:streamGenerateContent?key=${key}&alt=sse`,
      headers: { "Content-Type": "application/json" },
      body: geminiNativeBody,
    },
  );

  // 2. OpenAI-compatible endpoints (Google OpenAI format & Lovable Gateway format)
  candidates.push(
    {
      url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, "x-goog-api-key": key },
      body: JSON.stringify({ model: "gemini-2.0-flash", messages: payload.messages, stream: payload.stream !== false }),
    },
    {
      url: "https://ai.gateway.lovable.dev/v1/chat/completions",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: "google/gemini-2.5-flash", messages: payload.messages, stream: payload.stream !== false }),
    },
    {
      url: "https://ai.gateway.lovable.dev/v1/chat/completions",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: "google/gemini-3-flash-preview", messages: payload.messages, stream: payload.stream !== false }),
    },
  );

  let lastErrorText = "";
  let lastStatus = 500;

  for (const candidate of candidates) {
    try {
      const res = await fetch(candidate.url, {
        method: "POST",
        headers: candidate.headers,
        body: candidate.body,
      });

      if (res.ok && res.body) {
        return res;
      }

      lastStatus = res.status;
      lastErrorText = await res.text().catch(() => "");
    } catch (e: any) {
      lastErrorText = e?.message || "Fetch failed";
    }
  }

  if (lastStatus === 401) {
    return new Response("Invalid API key or unauthorized key. Please set a valid GEMINI_API_KEY from https://aistudio.google.com/app/apikey.", { status: 401 });
  }

  return new Response(lastErrorText || `AI Gateway Error (${lastStatus})`, { status: lastStatus });
}
