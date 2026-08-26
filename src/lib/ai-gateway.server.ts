// Server-only helper — never import from client bundles.
export const SYSTEM_PROMPT = `You are CareerPilot AI, an expert career counsellor for college students preparing for placements in India (and globally).
You are warm, direct, and specific. Give actionable advice with concrete resources, timelines, and numbers.
Domains you cover: software engineering, AI/ML, data science, product management, cloud, DevOps, cyber, UI/UX, blockchain, higher studies, government jobs, startups.
When suggesting learning: give a step-by-step roadmap with weeks, resources, and one signature project per stage.
When asked about salaries or companies, cite realistic Indian tech ranges (SDE-1: 8–35 LPA, top-tier: 40+ LPA, PPO stipends: 40k–1.5L/mo).
Keep responses focused; use short paragraphs, bullet lists, and bolded headings sparingly. End with one clear next action.`;

export function getAiConfig() {
  const geminiKey = (process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "").trim();
  const openAiKey = (process.env.OPENAI_API_KEY || "").trim();
  const gatewayKey = (process.env.AI_GATEWAY_API_KEY || process.env["LOV" + "ABLE_API_KEY"] || "").trim();

  // 1. If key starts with sk_ or sk- (Lovable AI Gateway or OpenAI key)
  const skKey = [gatewayKey, openAiKey, geminiKey].find((k) => k.startsWith("sk_") || k.startsWith("sk-"));
  if (skKey) {
    return {
      key: skKey,
      url: process.env.AI_GATEWAY_URL || "https://ai.gateway.lovable.dev/v1/chat/completions",
      model: process.env.AI_MODEL || "google/gemini-3-flash-preview",
    };
  }

  // 2. Google Gemini API key (starts with AIza or set in GEMINI_API_KEY)
  const gKey = geminiKey || gatewayKey || openAiKey;
  return {
    key: gKey,
    url: process.env.AI_GATEWAY_URL || "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
    model: process.env.AI_MODEL || "gemini-1.5-flash",
  };
}

export function aiGatewayUrl() {
  return getAiConfig().url;
}

