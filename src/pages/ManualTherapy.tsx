import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { manualTechniques, manualTherapyCategories } from "@/data/manual-therapy";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BookmarkButton } from "@/components/BookmarkButton";
import { RelatedSpecialTests } from "@/components/RelatedSpecialTests";
import { Hand, Search, ChevronDown, ChevronRight, BookOpen, Link2, ShieldCheck, AlertTriangle, ListChecks, Activity, Lightbulb, Home, TrendingUp, Beaker } from "lucide-react";

export default function ManualTherapyPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(
    searchParams.get("id") ? Number(searchParams.get("id")) : null
  );

  useEffect(() => {
    const id = searchParams.get("id");
    const s = searchParams.get("search");
    if (id) setOpenId(Number(id));
    if (s) setQuery(s);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return manualTechniques.filter(t =>
      (!activeCat || t.category === activeCat) &&
      (!q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) ||
        t.source_books.some(b => b.toLowerCase().includes(q)) ||
        t.indications.some(i => i.toLowerCase().includes(q))
      )
    );
  }, [query, activeCat]);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <Hand className="h-6 w-6 text-primary" />
          Physical Therapy & Manual Techniques
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          {manualTechniques.length} evidence-based techniques sourced from your Books library — interlinked with Impairments, Muscles & EBP.
        </p>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search techniques, indications, books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-secondary/50 border-border/50"
        />
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <button onClick={() => setActiveCat(null)}
          className={`px-3 py-1 rounded-full text-xs border transition-colors ${!activeCat ? "bg-primary/15 text-primary border-primary/30" : "bg-secondary/40 text-muted-foreground border-border/50"}`}>
          All ({manualTechniques.length})
        </button>
        {manualTherapyCategories.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            className={`px-3 py-1 rounded-full text-xs border transition-colors ${activeCat === cat ? "bg-primary/15 text-primary border-primary/30" : "bg-secondary/40 text-muted-foreground border-border/50 hover:border-primary/30"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(t => {
          const open = openId === t.id;
          return (
            <div key={t.id} className="elevated !p-0 overflow-hidden mb-3">
              <button onClick={() => setOpenId(open ? null : t.id)}
                className="w-full text-left p-4 flex items-start justify-between gap-3 hover:bg-accent/30 transition-colors">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-semibold text-foreground text-sm">{t.name}</h3>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">{t.category}</Badge>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border/50 text-muted-foreground">{t.region}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{t.description}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0 mt-1">
                  <BookmarkButton id={t.id} type="manual-technique" name={t.name} />
                  {open ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                </div>
              </button>

              {open && (
                <div className="border-t border-border/50 bg-secondary/20 p-4 space-y-3">
                  <Section icon={Beaker} title="Mechanism of Action">{t.mechanism}</Section>
                  <Section icon={ListChecks} title="Procedure">{t.procedure}</Section>
                  <Section icon={Activity} title="Dosage / Parameters">{t.dosage}</Section>
                  <ListSection icon={ShieldCheck} title="Indications" items={t.indications} tone="text-emerald-400" />
                  <ListSection icon={AlertTriangle} title="Contraindications" items={t.contraindications} tone="text-amber-400" />
                  <ListSection icon={TrendingUp} title="Progressions" items={t.progressions} tone="text-primary" />
                  <Section icon={Lightbulb} title="Clinical Pearls">{t.clinical_pearls}</Section>
                  <Section icon={Home} title="Home / Self-Care">{t.home_self_care}</Section>
                  <Section icon={BookOpen} title="Evidence">{t.evidence}</Section>

                  <RelatedSpecialTests region={t.region} condition={t.name} />

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1.5 flex items-center gap-1.5">
                      <BookOpen className="h-3 w-3" /> Key References
                    </p>
                    <ul className="text-xs text-foreground/85 list-disc pl-5 space-y-0.5">
                      {t.key_references.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1.5 flex items-center gap-1.5">
                      <BookOpen className="h-3 w-3" /> Source Books
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.source_books.map(b => (
                        <span key={b} className="px-2 py-1 rounded bg-secondary/60 text-foreground/80 text-xs border border-border/50">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1.5 flex items-center gap-1.5">
                      <Link2 className="h-3 w-3" /> Related Pages
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <button onClick={() => navigate(`/special-tests?search=${encodeURIComponent(t.region)}`)}
                        className="px-2 py-1 rounded bg-primary/10 text-primary text-xs border border-primary/30 hover:bg-primary/20">
                        MSK Special Tests
                      </button>
                      {t.related_pages.filter(p => !p.path.startsWith('/books')).map(p => (
                        <button key={p.path} onClick={() => navigate(p.path)}
                          className="px-2 py-1 rounded bg-secondary/60 text-foreground/80 text-xs border border-border/50 hover:border-primary/30 hover:text-primary">
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground py-8 text-center">No techniques match your filters.</p>
        )}
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1 flex items-center gap-1.5">
        <Icon className="h-3 w-3" /> {title}
      </p>
      <p className="text-xs text-foreground/85 leading-relaxed">{children}</p>
    </div>
  );
}

function ListSection({ icon: Icon, title, items, tone }: { icon: React.ElementType; title: string; items: string[]; tone: string }) {
  return (
    <div>
      <p className={`text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1.5 ${tone}`}>
        <Icon className="h-3 w-3" /> {title}
      </p>
      <ul className="text-xs text-foreground/85 list-disc pl-5 space-y-0.5">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}
