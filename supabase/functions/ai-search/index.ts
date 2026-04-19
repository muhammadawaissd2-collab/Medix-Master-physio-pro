// AI-powered clinical search edge function.
// Streams a grounded answer using the Lovable AI Gateway, given a compact corpus
// (top app entries + matching book chapters/topics) sent from the client.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are an expert physiotherapy clinical assistant for a musculoskeletal reference app.

You receive:
- The user's clinical question
- A CORPUS of app data: matching exercises, muscles, impairments, EBP guidelines, sports injuries, and book chapter/topic excerpts

Rules:
1. Ground every clinical claim in the CORPUS provided. If something is not in the corpus, say "Not in the local library" — do not invent.
2. Structure the answer in markdown with these sections (skip empty ones):
   ### Summary
   ### Key Clinical Points
   ### From the Books (cite book title + chapter)
   ### Linked Pages (markdown links to /exercises, /muscles, /impairments, /ebp, /sports-injuries, /manual-therapy, /books — based on what was relevant)
3. Keep answer under 350 words. Use bullet points. Be concise and clinically actionable.
4. Always finish with "### Linked Pages" containing 2-5 markdown links to the most relevant in-app pages so the user can navigate.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { question, corpus } = await req.json();
    if (!question || typeof question !== "string") {
      return new Response(JSON.stringify({ error: "Missing question" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const userPrompt = `CLINICAL QUESTION:\n${question}\n\nCORPUS (JSON):\n${JSON.stringify(corpus).slice(0, 12000)}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Add credits in Workspace → Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const txt = await response.text();
      console.error("AI gateway error:", response.status, txt);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-search error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
