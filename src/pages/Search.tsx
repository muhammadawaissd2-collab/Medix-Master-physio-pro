import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { searchAll } from "@/data";
import { books } from "@/data/books";
import { manualTechniques } from "@/data/manual-therapy";
import { Input } from "@/components/ui/input";
import {
  Search as SearchIcon, Sparkles, Wifi, WifiOff, Send, Loader2,
  BookOpen, Dumbbell, Users, AlertTriangle, Activity, Stethoscope, Library, Bot,
} from "lucide-react";
import { toast } from "sonner";

const quickPrompts = [
  "Best evidence for ACL reconstruction rehab",
  "Differential diagnosis for shoulder pain in overhead athletes",
  "Manual therapy options for chronic low back pain",
  "Return-to-sport criteria after hamstring strain",
  "Special tests for rotator cuff tears",
  "Plantar fasciitis: load management protocol",
];

interface AppHit {
  type: "exercise" | "muscle" | "impairment" | "ebp" | "sports" | "manual" | "book";
  title: string;
  subtitle?: string;
  path: string;
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [submitted, setSubmitted] = useState(searchParams.get("q") || "");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  // Local hits across app data + book TOC — always available offline.
  const localHits: AppHit[] = useMemo(() => {
    if (!submitted.trim()) return [];
    const r = searchAll(submitted.trim());
    const q = submitted.toLowerCase();
    const hits: AppHit[] = [];
    r.exercises.slice(0, 8).forEach(e => hits.push({ type: "exercise", title: e.name, subtitle: `${e.region} · ${e.category}`, path: `/exercises?id=${e.id}` }));
    r.muscles.slice(0, 6).forEach(m => hits.push({ type: "muscle", title: m.name, subtitle: `${m.region} · ${m.muscles.length} muscles`, path: `/muscles?search=${encodeURIComponent(m.name)}` }));
    r.impairments.slice(0, 8).forEach(i => hits.push({ type: "impairment", title: i.name, subtitle: i.region, path: `/impairments?id=${i.id}` }));
    r.guidelines.slice(0, 5).forEach(g => hits.push({ type: "ebp", title: g.condition, subtitle: g.region, path: `/ebp` }));
    r.sportsInjuries.slice(0, 5).forEach(s => hits.push({ type: "sports", title: s.name, subtitle: `${s.sport} · ${s.region}`, path: `/sports-injuries` }));
    manualTechniques
      .filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.indications.some(i => i.toLowerCase().includes(q)))
      .slice(0, 5).forEach(t => hits.push({ type: "manual", title: t.name, subtitle: t.category, path: `/manual-therapy` }));
    r.books.slice(0, 5).forEach(b => hits.push({ type: "book", title: b.title, subtitle: b.author, path: `/books?search=${encodeURIComponent(b.title)}` }));
    return hits;
  }, [submitted]);

  // Compact corpus sent to the AI (kept tight to fit token budget).
  const buildCorpus = (q: string) => {
    const r = searchAll(q);
    const lower = q.toLowerCase();
    return {
      exercises: r.exercises.slice(0, 8).map(e => ({ name: e.name, region: e.region, category: e.category, target_muscles: e.target_muscles, description: e.description?.slice(0, 200) })),
      muscles: r.muscles.slice(0, 5).map(m => ({ name: m.name, region: m.region, muscles: m.muscles.map(x => x.name).slice(0, 10) })),
      impairments: r.impairments.slice(0, 6).map(i => ({ name: i.name, region: i.region, description: i.description?.slice(0, 200) })),
      guidelines: r.guidelines.slice(0, 4).map(g => ({ condition: g.condition, region: g.region, summary: g.summary?.slice(0, 250) })),
      sportsInjuries: r.sportsInjuries.slice(0, 4).map(s => ({ name: s.name, sport: s.sport, region: s.region, description: s.description?.slice(0, 200) })),
      manualTherapy: manualTechniques
        .filter(t => t.name.toLowerCase().includes(lower) || t.indications.some(i => i.toLowerCase().includes(lower)))
        .slice(0, 4).map(t => ({ name: t.name, category: t.category, indications: t.indications.slice(0, 4), description: t.description?.slice(0, 200) })),
      books: books
        .filter(b => b.title.toLowerCase().includes(lower) || b.tags.some(t => t.toLowerCase().includes(lower)) || b.chapters.some(c => c.title.toLowerCase().includes(lower) || c.topics?.some(t => t.toLowerCase().includes(lower))))
        .slice(0, 5)
        .map(b => ({
          title: b.title,
          author: b.author,
          chapters: b.chapters
            .filter(c => c.title.toLowerCase().includes(lower) || c.topics?.some(t => t.toLowerCase().includes(lower)))
            .slice(0, 3)
            .map(c => ({ title: c.title, topics: c.topics?.filter(t => t.toLowerCase().includes(lower)).slice(0, 6) })),
        })),
    };
  };

  async function runAI(q: string) {
    setLoading(true);
    setAnswer("");
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-search`;
      const resp = await fetch(url, {
        method: "POST",
        signal: ctrl.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ question: q, corpus: buildCorpus(q) }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) toast.error("AI rate limit reached — try again in a moment.");
        else if (resp.status === 402) toast.error("AI credits exhausted. Add credits in Workspace → Usage.");
        else toast.error("AI search failed. Showing local results below.");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      let done = false;

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const delta = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (delta) { acc += delta; setAnswer(acc); }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error(err);
        toast.error("AI search error. Local results still available.");
      }
    } finally {
      setLoading(false);
    }
  }

  const submit = (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setSubmitted(q);
    if (isOnline) runAI(q);
    else toast.info("Offline — showing local library results only.");
  };

  // Auto-run if arrived via deep link (?q=)
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !answer && !loading) submit(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iconFor = (t: AppHit["type"]) => {
    switch (t) {
      case "exercise": return <Dumbbell className="h-3.5 w-3.5" />;
      case "muscle": return <Users className="h-3.5 w-3.5" />;
      case "impairment": return <AlertTriangle className="h-3.5 w-3.5" />;
      case "ebp": return <BookOpen className="h-3.5 w-3.5" />;
      case "sports": return <Activity className="h-3.5 w-3.5" />;
      case "manual": return <Stethoscope className="h-3.5 w-3.5" />;
      case "book": return <Library className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto animate-fade-in">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          AI Clinical Search
        </h1>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60 shrink-0">
          {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
          {isOnline ? "AI ready" : "Offline"}
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-3">
        Ask any clinical question — answers are grounded in your local books, exercises, muscles, impairments, EBP guidelines and manual therapy library.
      </p>

      <form
        onSubmit={(e) => { e.preventDefault(); submit(query); }}
        className="relative mb-4"
      >
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Ask: e.g. 'best evidence for tennis elbow' or 'rotator cuff tests'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-12 bg-secondary/50 border-border/50 h-11"
          autoFocus
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 transition-colors"
          aria-label="Ask AI"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>

      {!submitted && (
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Try a clinical question
          </p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map(qp => (
              <button
                key={qp}
                onClick={() => submit(qp)}
                className="px-3 py-1.5 rounded-full bg-secondary/60 border border-border/50 text-xs text-foreground/80 hover:bg-primary/15 hover:text-primary hover:border-primary/30 transition-all text-left"
              >
                {qp}
              </button>
            ))}
          </div>
        </div>
      )}

      {submitted && (
        <>
          {/* AI answer panel */}
          <div className="glass-card !p-4 mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Bot className="h-4 w-4 text-primary" />
              <p className="text-xs font-display font-semibold text-primary">AI answer</p>
              {loading && <Loader2 className="h-3 w-3 text-muted-foreground animate-spin ml-1" />}
            </div>
            {answer ? (
              <div className="prose prose-sm prose-invert max-w-none text-foreground/90
                              prose-headings:font-display prose-headings:text-foreground prose-headings:text-sm prose-headings:mt-3 prose-headings:mb-1.5
                              prose-p:text-xs prose-p:leading-relaxed
                              prose-li:text-xs prose-li:leading-relaxed
                              prose-strong:text-foreground
                              prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => {
                      if (href && href.startsWith("/")) {
                        return <Link to={href} className="text-primary hover:underline">{children}</Link>;
                      }
                      return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
                    },
                  }}
                >
                  {answer}
                </ReactMarkdown>
              </div>
            ) : loading ? (
              <p className="text-xs text-muted-foreground italic">Reading the books and synthesising an answer…</p>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                {isOnline ? "No AI response yet." : "Offline — see local matches below."}
              </p>
            )}
          </div>

          {/* Local cross-linked results */}
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {localHits.length} result{localHits.length !== 1 ? "s" : ""} from local library
            </p>
            <p className="text-[10px] text-muted-foreground/60">tap to open</p>
          </div>
          <div className="space-y-1.5">
            {localHits.map((h, i) => (
              <button
                key={i}
                onClick={() => navigate(h.path)}
                className="w-full glass-card !p-3 text-left flex items-center gap-3 hover:border-primary/40 transition-colors"
              >
                <span className="h-7 w-7 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  {iconFor(h.type)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground truncate">{h.title}</span>
                  {h.subtitle && <span className="block text-[11px] text-muted-foreground truncate">{h.subtitle}</span>}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 shrink-0">{h.type}</span>
              </button>
            ))}
            {localHits.length === 0 && (
              <p className="text-sm text-muted-foreground py-6 text-center">
                No local matches. Try a broader query — the AI may still answer using book corpus.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
