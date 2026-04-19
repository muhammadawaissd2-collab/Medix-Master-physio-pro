import { useState } from "react";
import { getDailyFlashcards } from "@/data/flashcards";
import { Sparkles, ChevronLeft, ChevronRight, Eye, EyeOff, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useBookmarks } from "@/contexts/BookmarkContext";

export function DailyFlashcards() {
  const cards = getDailyFlashcards();
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const card = cards[idx];
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const next = () => { setRevealed(false); setIdx((idx + 1) % cards.length); };
  const prev = () => { setRevealed(false); setIdx((idx - 1 + cards.length) % cards.length); };
  
  const bookmarked = isBookmarked(card.id, "flashcard");

  return (
    <div className="elevated !p-6 border border-primary/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-sm font-light text-foreground flex items-center gap-2">
          Daily Flashcards
        </h2>
        <div className="flex items-center gap-3">
          <button 
             onClick={() => toggleBookmark({ id: card.id, type: "flashcard", name: "Flashcard: " + card.question })}
             className={`${bookmarked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          >
             <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
          <span className="text-xs font-light text-muted-foreground">{idx + 1}/{cards.length}</span>
        </div>
      </div>

      <p className="text-lg font-light text-foreground/90 mb-4 leading-snug">{card.question}</p>

      {revealed ? (
        <div className="inner-elevated rounded-lg p-4 mb-4">
          <p className="text-sm font-light text-primary leading-relaxed">{card.answer}</p>
          {card.source && (
            <p className="text-xs text-foreground/40 mt-3 italic">— {card.source}</p>
          )}
        </div>
      ) : (
        <button onClick={() => setRevealed(true)}
          className="w-full py-3 rounded-lg elevated-icon text-primary/80 text-sm font-light hover:text-primary transition-colors flex items-center justify-center gap-1.5 mb-4">
          <Eye className="h-4 w-4" /> Reveal Answer
        </button>
      )}

      <div className="flex items-center justify-between pt-2">
        <button onClick={prev} className="text-sm text-foreground/50 hover:text-primary flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" /> Prev
        </button>
        {revealed && (
          <button onClick={() => setRevealed(false)}
            className="text-sm text-foreground/50 hover:text-foreground flex items-center gap-1">
            <EyeOff className="h-4 w-4" /> Hide
          </button>
        )}
        <button onClick={next} className="text-sm text-foreground/50 hover:text-primary flex items-center gap-1">
          Next <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
