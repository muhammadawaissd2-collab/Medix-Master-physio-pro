import { Bookmark } from "lucide-react";
import { useBookmarks, BookmarkType } from "@/contexts/BookmarkContext";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  id: number;
  type: BookmarkType;
  name: string;
  className?: string;
  size?: "sm" | "md";
}

export function BookmarkButton({ id, type, name, className, size = "sm" }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(id, type);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleBookmark(id, type, name);
      }}
      className={cn(
        "transition-colors",
        bookmarked ? "text-primary" : "text-muted-foreground/50 hover:text-primary/70",
        className
      )}
      title={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark
        className={cn(
          size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4",
          bookmarked && "fill-primary"
        )}
      />
    </button>
  );
}
