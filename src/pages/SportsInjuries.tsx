import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sportsInjuries, allSports, exercises, disorders, differentialDiagnoses } from "@/data";
import { EBPBadge, RegionTag } from "@/components/EBPBadge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, Activity, ChevronRight, AlertCircle, Shield, Clock, Dumbbell, ArrowRight, Filter, Target, FlaskConical } from "lucide-react";
import { BookmarkButton } from "@/components/BookmarkButton";
import { RelatedSpecialTests } from "@/components/RelatedSpecialTests";
import type { SportsInjury } from "@/types";

export default function SportsInjuriesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sportFilter, setSportFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subcategoryFilter, setSubcategoryFilter] = useState("all");
  const [selectedInjury, setSelectedInjury] = useState<SportsInjury | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    const s = searchParams.get("search");
    if (id) {
      const inj = sportsInjuries.find(i => i.id === Number(id));
      if (inj) { setSelectedInjury(inj); setPanelOpen(true); }
    }
    if (s) setSearch(s);
  }, [searchParams]);

  const categories = [...new Set(sportsInjuries.map(i => i.category))].filter(Boolean).sort();
  const subcategories = [...new Set(sportsInjuries.map(i => i.subcategory))].filter(Boolean).sort();

  const filtered = useMemo(() => {
    return sportsInjuries.filter(i => {
      const matchSearch = !search ||
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.sport.toLowerCase().includes(search.toLowerCase()) ||
        i.description.toLowerCase().includes(search.toLowerCase());
      const matchSport = sportFilter === "all" || i.sport === sportFilter;
      const matchCategory = categoryFilter === "all" || i.category === categoryFilter;
      const matchSubcategory = subcategoryFilter === "all" || i.subcategory === subcategoryFilter;
      return matchSearch && matchSport && matchCategory && matchSubcategory;
    });
  }, [search, sportFilter, categoryFilter, subcategoryFilter]);

  const relatedExercises = (injury: SportsInjury) =>
    exercises.filter(ex =>
      ex.region.toLowerCase().includes(injury.region.toLowerCase().split("/")[0].toLowerCase()) ||
      injury.region.toLowerCase().includes(ex.region.toLowerCase().split(" ")[0].toLowerCase())
    ).slice(0, 8);

  const relatedDisorders = (injury: SportsInjury) =>
    disorders.filter(imp =>
      imp.region.toLowerCase().includes(injury.region.toLowerCase().split("/")[0].toLowerCase()) ||
      injury.name.toLowerCase().includes(imp.name.toLowerCase().split(" ")[0].toLowerCase())
    ).slice(0, 5);

  const severityColor = (s: string) => {
    if (s === "Mild" || s === "Grade I") return "text-green-400 bg-green-400/10 border-green-400/30";
    if (s === "Moderate" || s === "Grade II") return "text-amber-400 bg-amber-400/10 border-amber-400/30";
    return "text-red-400 bg-red-400/10 border-red-400/30";
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          Sports Injuries
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{sportsInjuries.length} injuries · {filtered.length} shown</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search injuries, sports..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="w-[140px] flex-1 min-w-[120px] bg-secondary/50 border-border/50 h-8 text-xs">
              <SelectValue placeholder="Sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              {allSports.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px] flex-1 min-w-[140px] bg-secondary/50 border-border/50 h-8 text-xs">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={subcategoryFilter} onValueChange={setSubcategoryFilter}>
            <SelectTrigger className="w-[160px] flex-1 min-w-[140px] bg-secondary/50 border-border/50 h-8 text-xs">
              <SelectValue placeholder="Subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subcategories</SelectItem>
              {subcategories.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((injury) => (
          <button
            key={injury.id}
            onClick={() => { setSelectedInjury(injury); setPanelOpen(true); }}
            className="elevated !p-3 w-full text-left group flex flex-col mb-3"
          >
             <div className="flex items-start justify-between gap-2 w-full">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{injury.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">{injury.category}</span>
                  {injury.subcategory && <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded-full text-muted-foreground">{injury.subcategory}</span>}
                </div>
                <p className="text-xs text-muted-foreground truncate mt-1">{injury.sport} · {injury.description.slice(0, 60)}...</p>
              </div>
              <div className="flex gap-1 shrink-0 items-center">
                <BookmarkButton id={injury.id} type="sports-injury" name={injury.name} />
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${severityColor(injury.severity)}`}>
                  {injury.severity}
                </span>
                <RegionTag region={injury.region} />
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="h-3 w-3 text-muted-foreground/60" />
              <span className="text-[10px] text-muted-foreground/70">{injury.recovery_time}</span>
              <EBPBadge level={injury.ebp_level} className="ml-auto" />
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No sports injuries match your filters</p>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      <Sheet open={panelOpen} onOpenChange={(o) => !o && setPanelOpen(false)}>
        <SheetContent className="w-full sm:max-w-lg bg-card border-border/50 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            {selectedInjury && (
              <div className="p-6">
                <SheetHeader className="text-left mb-4">
                  <SheetTitle className="font-display text-xl text-foreground pr-6 flex items-center gap-2">
                    {selectedInjury.name}
                    <BookmarkButton id={selectedInjury.id} type="sports-injury" name={selectedInjury.name} size="md" />
                  </SheetTitle>
                  <SheetDescription className="sr-only">Details for {selectedInjury.name}</SheetDescription>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <RegionTag region={selectedInjury.region} />
                    <Badge variant="outline" className="text-xs">{selectedInjury.sport}</Badge>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${severityColor(selectedInjury.severity)}`}>
                      {selectedInjury.severity}
                    </span>
                    <EBPBadge level={selectedInjury.ebp_level} />
                  </div>
                </SheetHeader>

                <p className="text-sm text-muted-foreground mb-4">{selectedInjury.description}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Recovery: {selectedInjury.recovery_time}</span>
                </div>

                <h3 className="flex items-center gap-2 text-sm font-display font-semibold text-foreground mt-4 mb-2">
                  <AlertCircle className="h-4 w-4 text-primary" /> Mechanism
                </h3>
                <p className="text-sm text-foreground/80">{selectedInjury.mechanism}</p>

                <h3 className="flex items-center gap-2 text-sm font-display font-semibold text-foreground mt-4 mb-2">
                  <AlertCircle className="h-4 w-4 text-primary" /> Causes
                </h3>
                <ul className="list-disc list-inside text-sm text-foreground/80 space-y-0.5">
                  {selectedInjury.causes.map((c, i) => <li key={i}>{c}</li>)}
                </ul>

                <h3 className="flex items-center gap-2 text-sm font-display font-semibold text-foreground mt-4 mb-2">
                  <Activity className="h-4 w-4 text-primary" /> Signs & Symptoms
                </h3>
                <ul className="list-disc list-inside text-sm text-foreground/80 space-y-0.5">
                  {selectedInjury.signs_symptoms.map((s, i) => <li key={i}>{s}</li>)}
                </ul>

                {selectedInjury.msk_tests && selectedInjury.msk_tests.length > 0 && (
                   <>
                    <h3 className="flex items-center gap-2 text-sm font-display font-semibold text-foreground mt-4 mb-2">
                      <Target className="h-4 w-4 text-primary" /> MSK Tests
                    </h3>
                    <div className="space-y-1">
                      {selectedInjury.msk_tests.map((s, i) => (
                        <button 
                          key={i}
                          onClick={() => { setPanelOpen(false); navigate(`/special-tests?search=${encodeURIComponent(s)}`); }}
                          className="w-full text-left flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors"
                        >
                          <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span>{s}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {selectedInjury.diagnostic_tips && (
                  <>
                    <h3 className="flex items-center gap-2 text-sm font-display font-semibold text-foreground mt-4 mb-2">
                      <FlaskConical className="h-4 w-4 text-primary" /> Diagnostic Tips
                    </h3>
                    <div className="inner-elevated !p-3">
                      <p className="text-sm text-foreground/90">{selectedInjury.diagnostic_tips}</p>
                    </div>
                  </>
                )}

                <h3 className="flex items-center gap-2 text-sm font-display font-semibold text-foreground mt-4 mb-2">
                  <Dumbbell className="h-4 w-4 text-primary" /> Physiotherapy Plan
                </h3>
                <div className="space-y-2">
                  {Object.entries(selectedInjury.pt_plan).map(([phase, text]) => (
                    <div key={phase} className="inner-elevated !p-3">
                      <p className="text-xs font-medium text-primary uppercase mb-1">{phase.replace(/_/g, ' ')}</p>
                      <p className="text-sm text-foreground/80">{text}</p>
                    </div>
                  ))}
                </div>

                <h3 className="flex items-center gap-2 text-sm font-display font-semibold text-foreground mt-4 mb-2">
                  <Shield className="h-4 w-4 text-primary" /> Prevention
                </h3>
                <ul className="list-disc list-inside text-sm text-foreground/80 space-y-0.5">
                  {selectedInjury.prevention.map((p, i) => <li key={i}>{p}</li>)}
                </ul>

                {/* Relevant MSK Special Tests */}
                <div className="mt-5">
                  <RelatedSpecialTests region={selectedInjury.region} condition={selectedInjury.name} />
                </div>

                {/* Interlinks */}
                {relatedExercises(selectedInjury).length > 0 && (
                  <>
                    <h3 className="flex items-center gap-2 text-sm font-display font-semibold text-foreground mt-5 mb-2">
                      <Dumbbell className="h-4 w-4 text-primary" /> Related Exercises
                    </h3>
                    <div className="space-y-1">
                      {relatedExercises(selectedInjury).map((ex) => (
                        <button key={ex.id} onClick={() => { setPanelOpen(false); navigate(`/exercises?id=${ex.id}`); }}
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors w-full text-left">
                          <ArrowRight className="h-3 w-3 shrink-0" />
                          <span className="truncate">{ex.name}</span>
                          <EBPBadge level={ex.ebp_level} className="ml-auto shrink-0" />
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {relatedDisorders(selectedInjury).length > 0 && (
                  <>
                    <h3 className="flex items-center gap-2 text-sm font-display font-semibold text-foreground mt-5 mb-2">
                      <AlertCircle className="h-4 w-4 text-primary" /> Related Disorders
                    </h3>
                    <div className="space-y-1">
                      {relatedDisorders(selectedInjury).map((imp) => (
                        <button key={imp.id} onClick={() => { setPanelOpen(false); navigate(`/disorders?id=${imp.id}`); }}
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors w-full text-left">
                          <ArrowRight className="h-3 w-3 shrink-0" />
                          {imp.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
