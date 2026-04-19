import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { disorders } from "@/data";
import { EBPBadge, RegionTag } from "@/components/EBPBadge";
import { DetailPanel } from "@/components/DetailPanel";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, AlertTriangle, Filter } from "lucide-react";
import { BookmarkButton } from "@/components/BookmarkButton";
import type { Disorder } from "@/types";

export default function DisordersPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [regionFilter, setRegionFilter] = useState(searchParams.get("region") || "all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subcategoryFilter, setSubcategoryFilter] = useState("all");
  const [selectedDisorder, setSelectedDisorder] = useState<Disorder | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const regions = [...new Set(disorders.map(d => d.region))].filter(Boolean).sort();
  const categories = [...new Set(disorders.map(d => d.category))].filter(Boolean).sort();
  const subcategories = [...new Set(disorders.map(d => d.subcategory))].filter(Boolean).sort();

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      const disorder = disorders.find(i => i.id === Number(id));
      if (disorder) { setSelectedDisorder(disorder); setPanelOpen(true); }
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    return disorders.filter(d => {
      const matchSearch = !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase()) ||
        d.region.toLowerCase().includes(search.toLowerCase());
      const matchRegion = regionFilter === "all" || d.region === regionFilter;
      const matchCategory = categoryFilter === "all" || d.category === categoryFilter;
      const matchSubcategory = subcategoryFilter === "all" || d.subcategory === subcategoryFilter;
      return matchSearch && matchRegion && matchCategory && matchSubcategory;
    });
  }, [search, regionFilter, categoryFilter, subcategoryFilter]);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-primary" />
          Disorders
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{disorders.length} conditions · {filtered.length} shown</p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search disorders..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-[160px] flex-1 min-w-[140px] bg-secondary/50 border-border/50 h-8 text-xs">
              <SelectValue placeholder="Region" />
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
        {filtered.map((disorder) => (
          <button
            key={disorder.id}
            onClick={() => { setSelectedDisorder(disorder); setPanelOpen(true); }}
            className="elevated !p-3 w-full text-left group flex flex-col mb-3"
          >
            <div className="flex items-start justify-between gap-2 w-full">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{disorder.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">{disorder.category}</span>
                  {disorder.subcategory && <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded-full text-muted-foreground">{disorder.subcategory}</span>}
                </div>
                <p className="text-xs text-muted-foreground truncate mt-1">{disorder.description.slice(0, 80)}...</p>
              </div>
              <div className="flex gap-1 shrink-0 items-center">
                <BookmarkButton id={disorder.id} type="disorder" name={disorder.name} />
                <RegionTag region={disorder.region} />
                {disorder.ebp_level && <EBPBadge level={disorder.ebp_level} />}
              </div>
            </div>
            {disorder.special_tests && disorder.special_tests.length > 0 && (
              <div className="flex gap-1 mt-2">
                {disorder.special_tests.slice(0, 2).map((t, i) => (
                  <span key={i} className="text-[10px] text-muted-foreground/70 bg-secondary/50 px-1.5 py-0.5 rounded">
                    {t.name}
                  </span>
                ))}
                {disorder.special_tests.length > 2 && (
                  <span className="text-[10px] text-primary/60">+{disorder.special_tests.length - 2} tests</span>
                )}
              </div>
            )}
          </button>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Filter className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No disorders match your search</p>
          </div>
        )}
      </div>

      <DetailPanel
        open={panelOpen}
        onClose={() => { setPanelOpen(false); setSelectedDisorder(null); }}
        type="disorder"
        data={selectedDisorder}
      />
    </div>
  );
}
