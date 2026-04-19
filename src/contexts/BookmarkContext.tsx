import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type BookmarkType =
  | "exercise"
  | "muscle"
  | "impairment"
  | "disorder"
  | "sports-injury"
  | "special-test"
  | "manual-technique"
  | "ebp-guideline"
  | "differential-diagnosis";

interface Bookmark {
  id: number;
  type: BookmarkType;
  name: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  isBookmarked: (id: number, type: BookmarkType) => boolean;
  toggleBookmark: (id: number, type: BookmarkType, name: string) => void;
  getBookmarksByType: (type: BookmarkType) => Bookmark[];
  clearAll: () => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const stored = localStorage.getItem("physio-bookmarks");
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("physio-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (id: number, type: BookmarkType) =>
    bookmarks.some(b => b.id === id && b.type === type);

  const toggleBookmark = (id: number, type: BookmarkType, name: string) => {
    setBookmarks(prev =>
      isBookmarked(id, type)
        ? prev.filter(b => !(b.id === id && b.type === type))
        : [...prev, { id, type, name }]
    );
  };

  const getBookmarksByType = (type: BookmarkType) =>
    bookmarks.filter(b => b.type === type);

  const clearAll = () => setBookmarks([]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, isBookmarked, toggleBookmark, getBookmarksByType, clearAll }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error("useBookmarks must be used within BookmarkProvider");
  return context;
}
