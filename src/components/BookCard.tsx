import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Book } from "@/data/books";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, ChevronDown, ChevronRight, ExternalLink,
  Tag, Link2, List
} from "lucide-react";
import { TopicDetailCard } from "./TopicDetailCard";

interface BookCardProps {
  book: Book;
  expanded: boolean;
  onToggle: () => void;
  /** Force expanded state (used inline in Search results) */
  forceOpen?: boolean;
}

/**
 * Reusable expandable Book card with interactive Table of Contents.
 * Tap a chapter → expands its topics; tap a topic → reveals TopicDetailCard.
 * Shared between /books and /search pages.
 */
export function BookCard({ book, expanded, onToggle, forceOpen }: BookCardProps) {
  const navigate = useNavigate();
  const isOpen = forceOpen ?? expanded;
  const [openChapter, setOpenChapter] = useState<number | null>(null);
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  return (
    <div className="glass-card !p-0 overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full text-left p-4 flex items-start gap-4 hover:bg-accent/30 transition-colors"
        aria-expanded={isOpen}
      >
        <div className={`w-16 h-22 md:w-20 md:h-28 rounded-lg bg-gradient-to-br ${book.coverColor} flex items-center justify-center shrink-0 shadow-lg`}>
          <BookOpen className="h-6 w-6 md:h-8 md:w-8 text-white/90" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display font-bold text-foreground text-sm md:text-base leading-tight">{book.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{book.author}</p>
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">{book.edition}</Badge>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border/50 text-muted-foreground">{book.category}</Badge>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-border/50 text-muted-foreground">{book.year}</Badge>
              </div>
            </div>
            {isOpen
              ? <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
              : <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
            }
          </div>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{book.description}</p>
        </div>
      </button>

      {/* Expanded body */}
      {isOpen && (
        <div className="border-t border-border/50 bg-secondary/20">
          {/* Book meta */}
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs border-b border-border/30">
            <div>
              <span className="text-muted-foreground">Publisher</span>
              <p className="text-foreground font-medium">{book.publisher}</p>
            </div>
            <div>
              <span className="text-muted-foreground">ISBN</span>
              <p className="text-foreground font-medium font-mono text-[10px]">{book.isbn}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Chapters</span>
              <p className="text-foreground font-medium">{book.chapters.length}</p>
            </div>
            {book.googleBooksUrl && (
              <div>
                <a href={book.googleBooksUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline">
                  <ExternalLink className="h-3 w-3" /> View Online
                </a>
              </div>
            )}
          </div>

          {/* Interactive Table of Contents */}
          <div className="p-4 border-b border-border/30">
            <h4 className="font-display font-semibold text-foreground text-xs mb-3 flex items-center gap-1.5">
              <List className="h-3.5 w-3.5 text-primary" /> Table of Contents
              <span className="text-[10px] text-muted-foreground/70 font-normal">(tap chapter, then topic)</span>
            </h4>
            <div className="space-y-2">
              {book.chapters.map((ch, i) => {
                const chapterOpen = openChapter === i;
                return (
                  <div key={i} className="rounded-lg bg-secondary/40 overflow-hidden border border-border/30">
                    <button
                      onClick={() => { setOpenChapter(chapterOpen ? null : i); setOpenTopic(null); }}
                      className="w-full text-left p-2.5 flex items-center justify-between gap-2 hover:bg-accent/20 transition-colors"
                    >
                      <p className="text-xs font-medium text-foreground">{ch.title}</p>
                      {chapterOpen
                        ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      }
                    </button>

                    {chapterOpen && ch.topics && (
                      <div className="px-2.5 pb-2.5 border-t border-border/30 pt-2">
                        <div className="flex flex-wrap gap-1">
                          {ch.topics.map((topic, j) => {
                            const topicKey = `${i}-${topic}`;
                            const isActive = openTopic === topicKey;
                            return (
                              <button
                                key={j}
                                onClick={() => setOpenTopic(isActive ? null : topicKey)}
                                className={`text-[10px] px-1.5 py-0.5 rounded border transition-colors ${
                                  isActive
                                    ? "bg-primary/20 text-primary border-primary/50"
                                    : "bg-accent/20 text-accent-foreground/80 border-border/30 hover:bg-primary/15 hover:text-primary hover:border-primary/30"
                                }`}
                              >
                                {topic}
                              </button>
                            );
                          })}
                        </div>
                        {openTopic?.startsWith(`${i}-`) && (
                          <TopicDetailCard topic={openTopic.slice(openTopic.indexOf("-") + 1)} />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="p-4 border-b border-border/30">
            <h4 className="font-display font-semibold text-foreground text-xs mb-2 flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-primary" /> Tags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {book.tags.map((tag, i) => (
                <button key={i}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/60 border border-border/50 text-foreground/70 hover:bg-primary/15 hover:text-primary hover:border-primary/30 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Related */}
          <div className="p-4">
            <h4 className="font-display font-semibold text-foreground text-xs mb-2 flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5 text-primary" /> Related Sections
            </h4>
            <div className="flex flex-wrap gap-2">
              {book.relatedPages.map((link, i) => (
                <button key={i}
                  onClick={() => navigate(link.path)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors font-medium"
                >
                  {link.label} →
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
