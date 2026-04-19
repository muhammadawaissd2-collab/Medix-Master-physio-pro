import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { books, bookCategories } from "@/data/books";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, BookOpen, Library } from "lucide-react";
import { BookCard } from "@/components/BookCard";

export default function BooksPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const q = searchParams.get("search");
    if (q) setSearch(q);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return books.filter(b => {
      const matchesCategory = category === "all" || b.category === category;
      const matchesSearch = !q ||
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some(t => t.toLowerCase().includes(q)) ||
        b.chapters.some(ch =>
          ch.title.toLowerCase().includes(q) ||
          ch.topics?.some(t => t.toLowerCase().includes(q))
        );
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-display text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          <Library className="h-6 w-6 text-primary" />
          Books & eBooks Library
        </h1>
        <p className="text-muted-foreground text-xs mt-1">
          {books.length} reference books · Tap a chapter then a topic for description, key points, clinical relevance & in-app search
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books, chapters, topics, authors..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 bg-secondary/50 border-border/50 h-10 font-body"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-secondary/50 border-border/50 h-10">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {bookCategories.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {bookCategories.map(c => {
          const count = books.filter(b => b.category === c).length;
          return (
            <button key={c}
              onClick={() => setCategory(category === c ? "all" : c)}
              className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                category === c
                  ? "bg-primary/20 text-primary border-primary/40"
                  : "bg-secondary/50 text-muted-foreground border-border/50 hover:bg-accent/30"
              }`}
            >
              {c} ({count})
            </button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mb-3">
        {filtered.length} book{filtered.length !== 1 ? "s" : ""} found
      </p>

      <div className="space-y-3">
        {filtered.map(book => (
          <BookCard
            key={book.id}
            book={book}
            expanded={expandedId === book.id}
            onToggle={() => setExpandedId(expandedId === book.id ? null : book.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">No books found matching your search.</p>
        </div>
      )}
    </div>
  );
}
