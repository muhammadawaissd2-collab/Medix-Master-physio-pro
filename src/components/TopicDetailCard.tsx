import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopicDetail } from "@/data/topic-details";
import { Search, Lightbulb, Stethoscope, BookOpen, ChevronDown, ChevronRight, Layers } from "lucide-react";

interface TopicDetailCardProps {
  topic: string;
  onClose?: () => void;
}

/**
 * Inline detail card shown when a user taps a topic chip in a Book's Table of Contents.
 * Renders description, key points, clinical relevance, expandable subtopics and a
 * "Search in App" CTA that deep-links into the app's AI search.
 */
export function TopicDetailCard({ topic }: TopicDetailCardProps) {
  const navigate = useNavigate();
  const detail = getTopicDetail(topic);
  const searchKey = detail.searchKeyword || topic;
  const [openSub, setOpenSub] = useState<string | null>(null);

  return (
    <div className="mt-2 rounded-lg border border-primary/30 bg-primary/5 p-3 animate-fade-in">
      <div className="flex items-center gap-1.5 mb-2">
        <BookOpen className="h-3.5 w-3.5 text-primary" />
        <p className="text-xs font-display font-semibold text-primary">{topic}</p>
      </div>

      <p className="text-xs text-foreground/85 leading-relaxed mb-2.5">{detail.description}</p>

      <div className="mb-2.5">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground/80 mb-1 flex items-center gap-1">
          <Lightbulb className="h-3 w-3" /> Key Points
        </p>
        <ul className="text-xs text-foreground/85 list-disc pl-5 space-y-0.5">
          {detail.keyPoints.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>

      <div className="mb-2.5">
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground/80 mb-1 flex items-center gap-1">
          <Stethoscope className="h-3 w-3" /> Clinical Relevance
        </p>
        <p className="text-xs text-foreground/85 leading-relaxed">{detail.clinicalRelevance}</p>
      </div>

      {detail.subtopics && detail.subtopics.length > 0 && (
        <div className="mb-2.5">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground/80 mb-1.5 flex items-center gap-1">
            <Layers className="h-3 w-3" /> Subtopics — tap to expand
          </p>
          <div className="space-y-1.5">
            {detail.subtopics.map((sub) => {
              const isOpen = openSub === sub.name;
              return (
                <div key={sub.name} className="rounded-md border border-border/40 bg-secondary/40 overflow-hidden">
                  <button
                    onClick={(e) => { e.stopPropagation(); setOpenSub(isOpen ? null : sub.name); }}
                    className="w-full text-left px-2.5 py-1.5 flex items-center justify-between gap-2 hover:bg-accent/30 transition-colors"
                  >
                    <span className="text-[11px] font-medium text-foreground">{sub.name}</span>
                    {isOpen
                      ? <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0" />
                      : <ChevronRight className="h-3 w-3 text-muted-foreground shrink-0" />
                    }
                  </button>
                  {isOpen && (
                    <div className="px-2.5 pb-2.5 pt-1 border-t border-border/30 animate-fade-in">
                      <p className="text-[11px] text-foreground/85 leading-relaxed mb-1.5">{sub.description}</p>
                      <ul className="text-[11px] text-foreground/80 list-disc pl-4 space-y-0.5 mb-1.5">
                        {sub.keyPoints.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/80 mt-1.5 mb-0.5">Clinical Relevance</p>
                      <p className="text-[11px] text-foreground/80 leading-relaxed mb-1.5">{sub.clinicalRelevance}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/search?q=${encodeURIComponent(sub.searchKeyword || sub.name)}`); }}
                        className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline"
                      >
                        <Search className="h-2.5 w-2.5" /> AI search "{sub.searchKeyword || sub.name}"
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); navigate(`/search?q=${encodeURIComponent(searchKey)}`); }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
      >
        <Search className="h-3 w-3" /> AI search "{searchKey}"
      </button>
    </div>
  );
}
