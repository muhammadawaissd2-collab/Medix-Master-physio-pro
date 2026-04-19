import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { differentialDiagnoses } from "@/data";
import { DetailPanel } from "@/components/DetailPanel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Stethoscope, Filter, AlertCircle } from "lucide-react";
import { BookmarkButton } from "@/components/BookmarkButton";
import type { DifferentialDiagnosis } from "@/types";

export default function DifferentialDiagnosisPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [regionFilter, setRegionFilter] = useState(searchParams.get("region") || "all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedDx, setSelectedDx] = useState<DifferentialDiagnosis | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const regions = [...new Set(differentialDiagnoses.map(d => d.body_region))].filter(Boolean).sort();
  const categories = [...new Set(differentialDiagnoses.map(d => d.category))].filter(Boolean).sort();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const dx = differentialDiagnoses.find(i => i.id === Number(id));
      if (dx) { setSelectedDx(dx); setPanelOpen(true); }
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return differentialDiagnoses.filter(d => {
      const matchSearch = !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase()) ||
        d.body_region.toLowerCase().includes(search.toLowerCase());
      const matchRegion = regionFilter === "all" || d.body_region === regionFilter;
      const matchCategory = categoryFilter === "all" || d.category === categoryFilter;
      return matchSearch && matchRegion && matchCategory;
    });
  }, [search, regionFilter, categoryFilter]);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-indigo-500" />
          Differential Diagnosis
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{differentialDiagnoses.length} conditions · {filtered.length} shown</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search conditions, regions, symptoms..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-[160px] flex-1 min-w-[140px] bg-secondary/50 border-border/50 h-8 text-xs">
              <SelectValue placeholder="Body Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
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
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((dx) => (
          <button
            key={dx.id}
            onClick={() => { setSelectedDx(dx); setPanelOpen(true); }}
            className="elevated !p-3 w-full text-left group flex flex-col mb-3"
          >
            <div className="flex items-start justify-between gap-2 w-full">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{dx.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">{dx.body_region}</span>
                  {dx.category && <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded-full text-muted-foreground">{dx.category}</span>}
                </div>
                <p className="text-xs text-muted-foreground truncate mt-1">{dx.description.slice(0, 80)}...</p>
              </div>
              <div className="flex gap-1 shrink-0 items-center">
                <BookmarkButton id={dx.id} type="differential-diagnosis" name={dx.name} />
              </div>
            </div>
            {dx.red_flags && dx.red_flags.length > 0 && (
              <div className="flex items-center gap-1 mt-2 text-[10px] text-red-500/80 bg-red-500/10 px-2 py-1 rounded w-fit">
                <AlertCircle className="h-3 w-3" />
                <span>{dx.red_flags.length} Red Flags</span>
              </div>
            )}
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No conditions match your search</p>
          </div>
        )}
      </div>

      <DetailPanel
        open={panelOpen}
        onClose={() => { setPanelOpen(false); setSelectedDx(null); }}
        type="differential-diagnosis"
        data={selectedDx}
      />
    </div>
  );
}
