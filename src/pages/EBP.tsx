import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ebpGuidelines } from "@/data";
import { RegionTag } from "@/components/EBPBadge";
import { BookmarkButton } from "@/components/BookmarkButton";
import { RelatedSpecialTests } from "@/components/RelatedSpecialTests";
import { BookOpen, ChevronDown, ChevronUp, Award, FileText, ClipboardList, Link2 } from "lucide-react";

export default function EBPPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [expandedId, setExpandedId] = useState<number | null>(
    searchParams.get("id") ? Number(searchParams.get("id")) : null
  );

  useEffect(() => {
    const id = searchParams.get("id");
    const s = searchParams.get("search");
    if (id) setExpandedId(Number(id));
    if (s) setSearch(s);
  }, [searchParams]);

  const gradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "ebp-badge-strong";
      case "B": return "ebp-badge-moderate";
      case "C": return "ebp-badge-limited";
      default: return "ebp-badge-moderate";
    }
  };

  const filtered = search
    ? ebpGuidelines.filter(g =>
        g.condition.toLowerCase().includes(search.toLowerCase()) ||
        g.summary.toLowerCase().includes(search.toLowerCase()) ||
        g.region.toLowerCase().includes(search.toLowerCase())
      )
    : ebpGuidelines;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          EBP Clinical Guidelines
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{filtered.length} of {ebpGuidelines.length} evidence-based guidelines</p>
      </div>

      {search && (
        <div className="mb-3">
          <button onClick={() => setSearch("")} className="text-xs text-primary hover:text-primary/80">
            ← Clear search "{search}"
          </button>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((g) => {
          const expanded = expandedId === g.id;
          return (
            <div key={g.id} className="elevated !p-0 overflow-hidden mb-3">
              <button
                onClick={() => setExpandedId(expanded ? null : g.id)}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-sm font-medium text-foreground">{g.condition}</p>
                    <span className={gradeColor(g.grade)}>Grade {g.grade}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{g.summary.slice(0, 100)}...</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <BookmarkButton id={g.id} type="ebp-guideline" name={g.condition} />
                  <RegionTag region={g.region} />
                  {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </button>

              {expanded && (
                <div className="px-4 pb-4 space-y-4 border-t border-border/50 pt-4 animate-fade-in">
                  <p className="text-sm text-foreground/90">{g.summary}</p>

                  <div>
                    <h3 className="text-xs font-display font-semibold text-foreground mb-2 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-primary" /> Key Interventions
                    </h3>
                    <div className="space-y-1.5">
                      {g.key_interventions.map((ki, i) => (
                        <div key={i} className="flex items-center justify-between bg-secondary/30 rounded-lg px-3 py-2">
                          <span className="text-sm text-foreground">{ki.intervention}</span>
                          <span className="text-xs text-primary font-medium">{ki.evidence}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-display font-semibold text-foreground mb-2 flex items-center gap-1.5">
                      <ClipboardList className="h-3.5 w-3.5 text-primary" /> Outcome Measures
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {g.outcome_measures.map((om, i) => (
                        <span key={i} className="text-xs bg-secondary/50 text-muted-foreground px-2 py-1 rounded-full">{om}</span>
                      ))}
                    </div>
                  </div>

                  <RelatedSpecialTests region={g.region} condition={g.condition} />

                  <div>
                    <h3 className="text-xs font-display font-semibold text-foreground mb-2 flex items-center gap-1.5">
                      <Link2 className="h-3.5 w-3.5 text-primary" /> Related Modules
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      <button onClick={() => navigate(`/impairments?search=${encodeURIComponent(g.condition)}`)}
                        className="px-2 py-1 rounded bg-primary/10 text-primary text-xs border border-primary/30 hover:bg-primary/20">
                        Impairments
                      </button>
                      <button onClick={() => navigate(`/exercises?search=${encodeURIComponent(g.condition)}`)}
                        className="px-2 py-1 rounded bg-primary/10 text-primary text-xs border border-primary/30 hover:bg-primary/20">
                        Exercises
                      </button>
                      <button onClick={() => navigate(`/manual-therapy?search=${encodeURIComponent(g.region)}`)}
                        className="px-2 py-1 rounded bg-primary/10 text-primary text-xs border border-primary/30 hover:bg-primary/20">
                        Manual Therapy
                      </button>
                      <button onClick={() => navigate(`/sports-injuries?search=${encodeURIComponent(g.condition)}`)}
                        className="px-2 py-1 rounded bg-primary/10 text-primary text-xs border border-primary/30 hover:bg-primary/20">
                        Sports Injuries
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-display font-semibold text-foreground mb-2 flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-primary" /> Key References
                    </h3>
                    <ul className="space-y-0.5">
                      {g.key_references.map((ref, i) => (
                        <li key={i} className="text-xs text-muted-foreground">• {ref}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
