import { useState } from "react";
import { ClipboardList, PlusCircle, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;
const getAiClient = () => {
  if (!aiClient) {
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is missing. Please set it in your environment.");
    }
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "missing-key" });
  }
  return aiClient;
};

export default function PhysioPlanPage() {
  const [condition, setCondition] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    if (!condition.trim()) return;
    setLoading(true);
    setResult("");
    
    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert physiotherapist. Create a detailed, phase-based rehabilitation and exercise plan for the following condition/patient description. Include: 1) Acute/Protection Phase, 2) Sub-acute/Mobility Phase, 3) Strengthening Phase, 4) Return to Sport/Function Phase. Provide explicit exercises, sets, reps, and manual therapy suggestions.
        
Condition/Description:
${condition}`
      });
      
      setResult(response.text || "No result generated.");
    } catch (err) {
      console.error("AI Error:", err);
      setResult("Sorry, an error occurred while generating the plan. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto animate-fade-in relative z-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl elevated-icon flex items-center justify-center">
          <ClipboardList className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-foreground font-medium tracking-wide">Physio Exercise Plan</h1>
          <p className="text-sm sm:text-base text-foreground/60 leading-snug mt-1">Generate a phased rehabilitation protocol.</p>
        </div>
      </div>

      <div className="elevated mb-6 !p-6">
        <label className="block text-sm sm:text-base font-medium text-foreground mb-3 uppercase tracking-widest text-primary/80">Condition or Diagnosis</label>
        <textarea
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. Post-op Day 4 ACL Reconstruction with hamstring graft, managing swelling..."
          className="w-full h-32 p-4 rounded-xl bg-background/50 border border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner text-base resize-none mb-4 transition-all"
        />
        
        <button 
          onClick={handleGeneratePlan}
          disabled={loading || !condition.trim()}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-base shadow-lg hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <PlusCircle className="h-5 w-5" />}
          {loading ? "Designing..." : "Create Rehab Plan"}
        </button>
      </div>

      {result && (
        <div className="inner-elevated p-6 animate-fade-in border border-primary/5">
          <h2 className="text-xl font-medium text-primary mb-4">Rehabilitation Protocol</h2>
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/90 whitespace-pre-line leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
