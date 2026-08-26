// Server-only helper — never import from client bundles.
export const SYSTEM_PROMPT = `You are CareerPilot AI, an expert career counsellor for college students preparing for placements in India (and globally).
You are warm, direct, and specific. Give actionable advice with concrete resources, timelines, and numbers.
Domains you cover: software engineering, AI/ML, data science, product management, cloud, DevOps, cyber, UI/UX, blockchain, higher studies, government jobs, startups.
When suggesting learning: give a step-by-step roadmap with weeks, resources, and one signature project per stage.
When asked about salaries or companies, cite realistic Indian tech ranges (SDE-1: 8–35 LPA, top-tier: 40+ LPA, PPO stipends: 40k–1.5L/mo).
Keep responses focused; use short paragraphs, bullet lists, and bolded headings sparingly. End with one clear next action.`;

export async function fetchWithAiFallback(payload: { messages: any[]; stream?: boolean }): Promise<Response> {
  const geminiKey = (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "").trim();
  const openAiKey = (process.env.OPENAI_API_KEY || "").trim();
  const gatewayKey = (process.env.AI_GATEWAY_API_KEY || process.env["LOV" + "ABLE_API_KEY"] || "").trim();

  const key = gatewayKey || geminiKey || openAiKey;
  if (!key) {
    return new Response("Missing API key. Please set GEMINI_API_KEY or AI_GATEWAY_API_KEY in environment variables.", { status: 500 });
  }

  const candidates: Array<{ url: string; model: string; headers: Record<string, string> }> = [];

  // Environment overrides if user sets custom URL & Model
  if (process.env.AI_GATEWAY_URL && process.env.AI_MODEL) {
    candidates.push({
      url: process.env.AI_GATEWAY_URL,
      model: process.env.AI_MODEL,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, "x-goog-api-key": key },
    });
  }

  // Priority candidates depending on key format
  if (key.startsWith("AIza")) {
    // Official Google AI Studio Key
    candidates.push(
      { url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", model: "gemini-2.0-flash", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, "x-goog-api-key": key } },
      { url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", model: "gemini-1.5-flash", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, "x-goog-api-key": key } },
    );
  } else {
    // Lovable AI Gateway / OpenRouter / Custom Gateway Key (e.g. AQ..., sk_...)
    candidates.push(
      { url: "https://ai.gateway.lovable.dev/v1/chat/completions", model: "google/gemini-2.5-flash", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` } },
      { url: "https://ai.gateway.lovable.dev/v1/chat/completions", model: "google/gemini-1.5-flash", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` } },
      { url: "https://ai.gateway.lovable.dev/v1/chat/completions", model: "google/gemini-3-flash-preview", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` } },
      { url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", model: "gemini-2.0-flash", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, "x-goog-api-key": key } },
      { url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", model: "gemini-1.5-flash", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, "x-goog-api-key": key } },
    );
  }

  let lastErrorText = "";
  let lastStatus = 500;

  for (const candidate of candidates) {
    try {
      const res = await fetch(candidate.url, {
        method: "POST",
        headers: candidate.headers,
        body: JSON.stringify({
          model: candidate.model,
          messages: payload.messages,
          stream: payload.stream !== false,
        }),
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
    return new Response("Invalid API key format or unauthorized key. Please set a valid GEMINI_API_KEY from https://aistudio.google.com/app/apikey.", { status: 401 });
  }

  return new Response(lastErrorText || `AI Gateway Error (${lastStatus})`, { status: lastStatus });
}
