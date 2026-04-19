import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { muscleGroups as importedMuscles, exercises } from "@/data";
import { RegionTag } from "@/components/EBPBadge";
import { DetailPanel } from "@/components/DetailPanel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronDown, ChevronRight, Dumbbell, Zap } from "lucide-react";
import { BookmarkButton } from "@/components/BookmarkButton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Exercise } from "@/types";

// Because musclesData is a flat array of muscles, we need to group them.
const muscleGroups = (() => {
  const groups: Record<string, any> = {};
  
  // @ts-expect-error - importedMuscles is actually flat array
  importedMuscles.forEach((m: { region: string; name: string }, index: number) => {
    const region = m.region || "Other";
    if (!groups[region]) {
      groups[region] = {
        id: index + 1000,
        name: `${region} Muscles`,
        region: region,
        muscles: []
      };
    }
    groups[region].muscles.push(m);
  });
  
  return Object.values(groups);
})();


function getExercisesForMuscleGroup(groupName: string, muscleNames: string[]) {
  const names = muscleNames.map(n => n.toLowerCase());
  const gName = groupName.toLowerCase();

  return exercises.filter(ex => {
    const allMuscles = [
      ...(ex.primary_muscles || []),
      ...(ex.secondary_muscles || []),
      ...(ex.tertiary_muscles || []),
      ...(ex.other_muscles || []),
      ...(ex.target_muscles || []),
    ].map(m => m.toLowerCase());

    return allMuscles.some(m =>
      names.some(n => m.includes(n.split(" ")[0]) || n.includes(m.split(" ")[0])) ||
      m.includes(gName.split(" ")[0]) || gName.includes(m.split(" ")[0])
    );
  });
}

function classifyExerciseForMuscle(ex: Exercise, muscleName: string): "primary" | "secondary" | "other" {
  const mLower = muscleName.toLowerCase();
  const check = (arr: string[]) => arr?.some(m => m.toLowerCase().includes(mLower.split(" ")[0]) || mLower.includes(m.toLowerCase().split(" ")[0]));
  if (check(ex.primary_muscles || [])) return "primary";
  if (check(ex.secondary_muscles || []) || check(ex.tertiary_muscles || [])) return "secondary";
  return "other";
}

export default function MusclesPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [regionFilter, setRegionFilter] = useState("all");
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(() => {
    const id = searchParams.get("id");
    return id ? new Set([Number(id)]) : new Set();
  });
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) setExpandedGroups(prev => new Set([...prev, Number(id)]));
  }, [searchParams]);

  const regions = [...new Set(muscleGroups.map((m: { region: string }) => m.region))].sort();
  const totalMuscles = muscleGroups.reduce((a: number, g: { muscles: any[] }) => a + g.muscles.length, 0);

  const filtered = useMemo(() => {
    return muscleGroups.filter((g: { name: string; muscles: { name: string }[]; region: string }) => {
      const matchSearch = !search ||
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.muscles.some((m: { name: string }) => m.name.toLowerCase().includes(search.toLowerCase()));
      const matchRegion = regionFilter === "all" || g.region === regionFilter;
      return matchSearch && matchRegion;
    });
  }, [search, regionFilter]);

  const filteredMuscleCount = filtered.reduce((a: number, g: { muscles: any[] }) => a + g.muscles.length, 0);

  const toggleGroup = (id: number) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpandedGroups(new Set(filtered.map(g => g.id)));
  const collapseAll = () => setExpandedGroups(new Set());

  const handleExerciseClick = (ex: Exercise) => {
    setSelectedExercise(ex);
    setPanelOpen(true);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Muscle Atlas
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {muscleGroups.length} groups · {totalMuscles} individual muscles
          {search || regionFilter !== "all" ? ` · Showing ${filteredMuscleCount} muscles` : ""}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-end">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search muscles..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50" />
        </div>
        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger className="w-[160px] bg-secondary/50 border-border/50 h-10 text-xs">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="flex gap-1">
          <button onClick={expandAll} className="px-3 py-2 text-xs rounded bg-secondary/60 border border-border/50 hover:bg-primary/10 transition-colors">Expand All</button>
          <button onClick={collapseAll} className="px-3 py-2 text-xs rounded bg-secondary/60 border border-border/50 hover:bg-primary/10 transition-colors">Collapse All</button>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((group) => {
          const isExpanded = expandedGroups.has(group.id);
          const groupExercises = isExpanded ? getExercisesForMuscleGroup(group.name, group.muscles.map(m => m.name)) : [];
          const primaryExercises = groupExercises.filter(ex =>
            group.muscles.some(m => classifyExerciseForMuscle(ex, m.name) === "primary")
          );
          const otherExercises = groupExercises.filter(ex =>
            !primaryExercises.some(p => p.id === ex.id)
          );

          return (
            <div key={group.id} className="elevated !p-0 overflow-hidden mb-3">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full text-left p-4 flex items-center justify-between group hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isExpanded ? <ChevronDown className="h-4 w-4 text-primary" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{group.name}</p>
                    <p className="text-xs text-muted-foreground">{group.muscles.length} muscles</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookmarkButton id={group.id} type="muscle" name={group.name} />
                  <RegionTag region={group.region} />
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-border/30">
                  {/* Muscles table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary/20">
                          <TableHead className="text-xs font-semibold min-w-[150px]">Muscle</TableHead>
                          <TableHead className="text-xs font-semibold min-w-[140px]">Origin</TableHead>
                          <TableHead className="text-xs font-semibold min-w-[140px]">Insertion</TableHead>
                          <TableHead className="text-xs font-semibold min-w-[140px]">
                            <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-primary" />Primary Function</span>
                          </TableHead>
                          <TableHead className="text-xs font-semibold min-w-[140px]">Secondary Function</TableHead>
                          <TableHead className="text-xs font-semibold min-w-[100px]">Innervation</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {group.muscles.map((muscle, idx) => (
                          <TableRow key={muscle.name} className={idx % 2 === 0 ? "bg-background" : "bg-secondary/10"}>
                            <TableCell className="text-xs font-medium text-foreground">{muscle.name}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{muscle.origin}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{muscle.insertion}</TableCell>
                            <TableCell className="text-xs text-foreground/90 font-medium">{muscle.primary_action}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{muscle.secondary_action}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{muscle.innervation}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Exercises for this muscle group */}
                  {groupExercises.length > 0 && (
                    <div className="border-t border-border/30 p-4 space-y-3">
                      <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Dumbbell className="h-3.5 w-3.5 text-primary" />
                        Exercises for {group.name} ({groupExercises.length})
                      </h4>

                      {primaryExercises.length > 0 && (
                        <div>
                          <p className="text-[10px] font-semibold text-primary uppercase mb-1.5">Primary Exercises</p>
                          <div className="flex flex-wrap gap-1.5">
                            {primaryExercises.slice(0, 20).map(ex => (
                              <button
                                key={ex.id}
                                onClick={() => handleExerciseClick(ex)}
                                className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
                              >
                                {ex.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {otherExercises.length > 0 && (
                        <div>
                          <p className="text-[10px] font-semibold text-muted-foreground uppercase mb-1.5">Other Exercises</p>
                          <div className="flex flex-wrap gap-1.5">
                            {otherExercises.slice(0, 20).map(ex => (
                              <button
                                key={ex.id}
                                onClick={() => handleExerciseClick(ex)}
                                className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md bg-secondary/60 text-muted-foreground border border-border/40 hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                              >
                                {ex.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
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
