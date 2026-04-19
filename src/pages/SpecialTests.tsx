import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { specialTests, specialTestRegions } from "@/data/special-tests";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/BookmarkButton";
import {
  ClipboardCheck, Search, ChevronDown, ChevronRight, Target, Activity,
  Crosshair, AlertCircle, BookOpen, Link2, BarChart3, Lightbulb, Stethoscope
} from "lucide-react";

export default function SpecialTestsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(
    searchParams.get("id") ? Number(searchParams.get("id")) : null
  );

  useEffect(() => {
    const idParam = searchParams.get("id");
    const searchParam = searchParams.get("search");
    if (idParam) setOpenId(Number(idParam));
    if (searchParam) setQuery(searchParam);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return specialTests.filter(t =>
      (!activeRegion || t.region === activeRegion) &&
      (!q ||
        t.name.toLowerCase().includes(q) ||
        t.condition.toLowerCase().includes(q) ||
        t.purpose.toLowerCase().includes(q) ||
        t.related_impairments.some(i => i.toLowerCase().includes(q)) ||
        t.related_muscles.some(m => m.toLowerCase().includes(q))
      )
    );
  }, [query, activeRegion]);

  useEffect(() => {
    // Auto-open if only 1 result or exact match
    if (filtered.length === 1) {
      setOpenId(filtered[0].id);
    } else if (query && (openId === null)) {
      const exactMatch = filtered.find(t => t.name.toLowerCase() === query.toLowerCase());
      if (exactMatch) setOpenId(exactMatch.id);
    }
  }, [filtered, query, openId]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof specialTests>();
    filtered.forEach(t => {
      if (!map.has(t.region)) map.set(t.region, []);
      map.get(t.region)!.push(t);
    });
    return map;
  }, [filtered]);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6 text-primary" />
          MSK Special Tests
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {specialTests.length} evidence-based orthopaedic & neurological tests organised by anatomical region — interlinked with Impairments, Muscles, Exercises & Manual Therapy.
        </p>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tests, conditions, muscles, regions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-secondary/50 border-border/50"
        />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        <button onClick={() => setActiveRegion(null)}
          className={`px-3 py-1 rounded-full text-xs border transition-colors ${
            !activeRegion ? "bg-primary/15 text-primary border-primary/30" : "bg-secondary/40 text-muted-foreground border-border/50"
          }`}>
          All ({specialTests.length})
        </button>
        {specialTestRegions.map(r => {
          const count = specialTests.filter(t => t.region === r).length;
          return (
            <button key={r} onClick={() => setActiveRegion(r)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                activeRegion === r ? "bg-primary/15 text-primary border-primary/30" : "bg-secondary/40 text-muted-foreground border-border/50 hover:border-primary/30"
              }`}>
              {r} ({count})
            </button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mb-3">{filtered.length} test{filtered.length !== 1 ? "s" : ""} found</p>

      <div className="space-y-6">
        {[...grouped.entries()].map(([region, list]) => (
          <section key={region}>
            <h2 className="font-display text-sm font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
              <Target className="h-4 w-4" />
              {region} <span className="text-muted-foreground/60 normal-case">({list.length})</span>
            </h2>
            <div className="space-y-2">
              {list.map(t => {
                const open = openId === t.id;
                return (
                  <div key={t.id} className="elevated !p-0 overflow-hidden mb-3">
                    <button
                      onClick={() => setOpenId(open ? null : t.id)}
                      className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-accent/30 transition-colors">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-semibold text-foreground text-sm break-words">{t.name}</h3>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">{t.condition}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5 break-words">{t.purpose}</p>
                        <div className="flex gap-3 mt-1.5 text-[10px] text-muted-foreground/80">
                          <span>Sn: <span className="text-foreground/80">{t.sensitivity}</span></span>
                          <span>Sp: <span className="text-foreground/80">{t.specificity}</span></span>
                          <span className="text-emerald-400/90">{t.evidence_level}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 mt-1">
                        <BookmarkButton id={t.id} type="special-test" name={t.name} />
                        {open
                          ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </button>

                    {open && (
                      <div className="border-t border-border/50 bg-secondary/20 p-4 space-y-3">
                        <Field icon={Stethoscope} label="Patient Position">{t.position}</Field>
                        <Field icon={Activity} label="Procedure">{t.procedure}</Field>
                        <Field icon={Crosshair} label="Positive Finding" tone="text-emerald-400">{t.positive_finding}</Field>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="inner-elevated !p-2.5">
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 flex items-center gap-1.5">
                              <BarChart3 className="h-3 w-3" /> Sensitivity
                            </p>
                            <p className="text-sm font-medium text-primary">{t.sensitivity}</p>
                          </div>
                          <div className="inner-elevated !p-2.5">
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 flex items-center gap-1.5">
                              <BarChart3 className="h-3 w-3" /> Specificity
                            </p>
                            <p className="text-sm font-medium text-primary">{t.specificity}</p>
                          </div>
                        </div>

                        <Field icon={Lightbulb} label="Clinical Pearls" tone="text-amber-400">{t.clinical_pearls}</Field>

                        <InterlinkRow
                          label="Related Impairments"
                          icon={AlertCircle}
                          items={t.related_impairments}
                          onClick={(name) => navigate(`/impairments?search=${encodeURIComponent(name)}`)}
                        />
                        <InterlinkRow
                          label="Related Muscles"
                          icon={Target}
                          items={t.related_muscles}
                          onClick={(name) => navigate(`/muscles?search=${encodeURIComponent(name)}`)}
                        />
                        <InterlinkRow
                          label="Related Exercises"
                          icon={Activity}
                          items={t.related_exercises}
                          onClick={(name) => navigate(`/exercises?search=${encodeURIComponent(name)}`)}
                        />

                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1.5 flex items-center gap-1.5">
                            <BookOpen className="h-3 w-3" /> Source References
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {t.source_books.map(b => (
                              <span key={b} className="px-2 py-1 rounded bg-secondary/60 text-foreground/80 text-[11px] border border-border/50">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1.5 flex items-center gap-1.5">
                            <Link2 className="h-3 w-3" /> Cross-link to other modules
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            <button onClick={() => navigate(`/manual-therapy?search=${encodeURIComponent(t.region)}`)}
                              className="px-2 py-1 rounded bg-primary/10 text-primary text-xs border border-primary/30 hover:bg-primary/20">
                              Manual Therapy
                            </button>
                            <button onClick={() => navigate(`/sports-injuries?search=${encodeURIComponent(t.condition)}`)}
                              className="px-2 py-1 rounded bg-primary/10 text-primary text-xs border border-primary/30 hover:bg-primary/20">
                              Sports Injuries
                            </button>
                            <button onClick={() => navigate(`/ebp?search=${encodeURIComponent(t.condition)}`)}
                              className="px-2 py-1 rounded bg-primary/10 text-primary text-xs border border-primary/30 hover:bg-primary/20">
                              EBP Guidelines
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground py-8 text-center">No tests match your filters.</p>
        )}
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, tone, children }: { icon: React.ElementType; label: string; tone?: string; children: React.ReactNode }) {
  return (
    <div>
      <p className={`text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5 ${tone ?? "text-muted-foreground/70"}`}>
        <Icon className="h-3 w-3" /> {label}
      </p>
      <p className="text-xs text-foreground/85 leading-relaxed">{children}</p>
    </div>
  );
}

function InterlinkRow({ label, icon: Icon, items, onClick }: { label: string; icon: React.ElementType; items: string[]; onClick: (n: string) => void }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1.5 flex items-center gap-1.5">
        <Icon className="h-3 w-3" /> {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {items.map(it => (
          <button key={it} onClick={() => onClick(it)}
            className="px-2 py-1 rounded bg-secondary/60 text-foreground/80 text-[11px] border border-border/50 hover:border-primary/30 hover:text-primary transition-colors">
            {it}
          </button>
        ))}
      </div>
    </div>
  );
}
