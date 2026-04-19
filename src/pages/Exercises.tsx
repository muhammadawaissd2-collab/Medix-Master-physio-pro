import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { exercises, allRegions, allCategories, allDifficulties, allEBPLevels } from "@/data";
import { EBPBadge, DifficultyBadge, RegionTag } from "@/components/EBPBadge";
import { DetailPanel } from "@/components/DetailPanel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Dumbbell, Filter, ChevronDown, ChevronRight } from "lucide-react";
import { BookmarkButton } from "@/components/BookmarkButton";
import { Badge } from "@/components/ui/badge";
import type { Exercise } from "@/types";

const muscleRoleColors = {
  primary: "bg-primary/20 text-primary border-primary/30",
  secondary: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  tertiary: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  other: "bg-muted text-muted-foreground border-border/50",
};

function MusclePill({ name, role }: { name: string; role: keyof typeof muscleRoleColors }) {
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${muscleRoleColors[role]}`}>
      {name}
    </span>
  );
}

export default function ExercisesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [regionFilter, setRegionFilter] = useState(searchParams.get("region") || "all");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [ebpFilter, setEbpFilter] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const ex = exercises.find(e => e.id === Number(id));
      if (ex) { setSelectedExercise(ex); setPanelOpen(true); }
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return exercises.filter(e => {
      const allMuscles = [...(e.primary_muscles || []), ...(e.secondary_muscles || []), ...(e.tertiary_muscles || []), ...(e.other_muscles || [])];
      const matchSearch = !search || e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()) ||
        allMuscles.some(m => m.toLowerCase().includes(search.toLowerCase()));
      const matchRegion = regionFilter === "all" || e.region === regionFilter;
      const matchCategory = categoryFilter === "all" || e.category === categoryFilter;
      const matchDifficulty = difficultyFilter === "all" || e.difficulty === difficultyFilter;
      const matchEBP = ebpFilter === "all" || e.ebp_level === ebpFilter;
      return matchSearch && matchRegion && matchCategory && matchDifficulty && matchEBP;
    });
  }, [search, regionFilter, categoryFilter, difficultyFilter, ebpFilter]);

  const exerciseRegions = [...new Set(exercises.map(e => e.region))].sort();

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-primary" />
          Exercises
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{exercises.length} EBP-based exercises · {filtered.length} shown</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Primary</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" /> Secondary</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Tertiary</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted-foreground/50" /> Other</span>
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises, muscles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-[140px] bg-secondary/50 border-border/50 h-8 text-xs">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {exerciseRegions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px] bg-secondary/50 border-border/50 h-8 text-xs">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-[130px] bg-secondary/50 border-border/50 h-8 text-xs">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {allDifficulties.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={ebpFilter} onValueChange={setEbpFilter}>
            <SelectTrigger className="w-[130px] bg-secondary/50 border-border/50 h-8 text-xs">
              <SelectValue placeholder="Evidence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Evidence</SelectItem>
              {allEBPLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Exercise List */}
      <div className="space-y-2">
        {filtered.map((ex) => {
          const isExpanded = expandedId === ex.id;
          return (
            <div key={ex.id} className="elevated !p-0 overflow-hidden mb-3">
              <button
                onClick={() => setExpandedId(isExpanded ? null : ex.id)}
                className="w-full text-left p-3 flex items-start gap-3 group hover:bg-secondary/30 transition-colors"
              >
                <div className="mt-0.5">
                  {isExpanded ? <ChevronDown className="h-4 w-4 text-primary" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors break-words leading-snug">{ex.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 break-words">{ex.category} · {ex.sets_reps}</p>
                </div>
                <div className="flex flex-wrap gap-1 shrink-0 items-center max-w-[40%] justify-end">
                  <BookmarkButton id={ex.id} type="exercise" name={ex.name} />
                  <RegionTag region={ex.region} />
                  <EBPBadge level={ex.ebp_level} />
                  <DifficultyBadge difficulty={ex.difficulty} />
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-border/30 p-4 space-y-3 bg-secondary/10">
                  <p className="text-sm text-muted-foreground">{ex.description}</p>

                  {/* Muscle targeting hierarchy */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-foreground">Target Muscles</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ex.primary_muscles?.length > 0 && (
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] font-semibold text-primary w-16 shrink-0 pt-0.5">Primary</span>
                          <div className="flex flex-wrap gap-1">
                            {ex.primary_muscles.map(m => <MusclePill key={m} name={m} role="primary" />)}
                          </div>
                        </div>
                      )}
                      {ex.secondary_muscles?.length > 0 && (
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] font-semibold text-blue-400 w-16 shrink-0 pt-0.5">2nd</span>
                          <div className="flex flex-wrap gap-1">
                            {ex.secondary_muscles.map(m => <MusclePill key={m} name={m} role="secondary" />)}
                          </div>
                        </div>
                      )}
                      {ex.tertiary_muscles?.length > 0 && (
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] font-semibold text-amber-400 w-16 shrink-0 pt-0.5">3rd</span>
                          <div className="flex flex-wrap gap-1">
                            {ex.tertiary_muscles.map(m => <MusclePill key={m} name={m} role="tertiary" />)}
                          </div>
                        </div>
                      )}
                      {ex.other_muscles?.length > 0 && (
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] font-semibold text-muted-foreground w-16 shrink-0 pt-0.5">Other</span>
                          <div className="flex flex-wrap gap-1">
                            {ex.other_muscles.map(m => <MusclePill key={m} name={m} role="other" />)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-1">Instructions</h4>
                    <p className="text-xs text-foreground/80">{ex.instructions}</p>
                  </div>

                  {/* Sets/Reps + Clinical */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="inner-elevated !p-3">
                      <p className="text-[10px] text-muted-foreground uppercase">Sets & Reps</p>
                      <p className="text-xs font-medium text-primary">{ex.sets_reps}</p>
                    </div>
                    {ex.clinical_notes && (
                      <div className="inner-elevated !p-3">
                        <p className="text-[10px] text-muted-foreground uppercase">Clinical Notes</p>
                        <p className="text-xs text-foreground/80">{ex.clinical_notes}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedExercise(ex); setPanelOpen(true); }}
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    View Full Details →
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No exercises match your filters</p>
          </div>
        )}
      </div>

      <DetailPanel
        open={panelOpen}
        onClose={() => { setPanelOpen(false); setSelectedExercise(null); }}
        type="exercise"
        data={selectedExercise}
      />
    </div>
  );
}
