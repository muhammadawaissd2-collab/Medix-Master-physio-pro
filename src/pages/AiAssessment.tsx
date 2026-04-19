import { useState } from "react";
import { Stethoscope, FileOutput, Loader2 } from "lucide-react";
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

export default function AiAssessmentPage() {
  const [history, setHistory] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAssessment = async () => {
    if (!history.trim()) return;
    setLoading(true);
    setResult("");
    
    try {
      const ai = getAiClient();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are an expert physiotherapist. Based on the following patient history and current presentation, provide a comprehensive clinical assessment. Include: 1) Key clinical findings to look for, 2) Recommended objective measures (ROM, strength, etc.), 3) Recommended Special Tests, 4) Prognosis.
        
Patient Profile & History:
${history}`
      });
      
      setResult(response.text || "No result generated.");
    } catch (err) {
      console.error("AI Error:", err);
      setResult("Sorry, an error occurred while generating the assessment. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto animate-fade-in relative z-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl elevated-icon flex items-center justify-center">
          <Stethoscope className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-foreground font-medium tracking-wide">AI Assessment</h1>
          <p className="text-sm sm:text-base text-foreground/60 leading-snug mt-1">Generate a comprehensive clinical assessment plan.</p>
        </div>
      </div>

      <div className="elevated mb-6 !p-6">
        <label className="block text-sm sm:text-base font-medium text-foreground mb-3 uppercase tracking-widest text-primary/80">Patient History & Context</label>
        <textarea
          value={history}
          onChange={(e) => setHistory(e.target.value)}
          placeholder="e.g. 28yo female runner, anterior knee pain increasing over last 3 weeks, worse changing directions..."
          className="w-full h-32 p-4 rounded-xl bg-background/50 border border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary shadow-inner text-base resize-none mb-4 transition-all"
        />
        
        <button 
          onClick={handleAssessment}
          disabled={loading || !history.trim()}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-base shadow-lg hover:scale-[1.01] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <FileOutput className="h-5 w-5" />}
          {loading ? "Generating Plan..." : "Generate Assessment"}
        </button>
      </div>

      {result && (
        <div className="inner-elevated p-6 animate-fade-in border border-primary/5">
          <h2 className="text-xl font-medium text-primary mb-4">Assessment Report</h2>
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground/90 whitespace-pre-line leading-relaxed">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
