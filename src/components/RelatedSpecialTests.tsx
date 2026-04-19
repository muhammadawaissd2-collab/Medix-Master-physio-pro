import { useNavigate } from "react-router-dom";
import { findRelatedTests } from "@/lib/related-tests";
import { ClipboardCheck, ArrowRight } from "lucide-react";

interface Props {
  region?: string;
  condition?: string;
  muscleNames?: string[];
  exerciseName?: string;
  limit?: number;
  compact?: boolean;
}

export function RelatedSpecialTests({ region, condition, muscleNames, exerciseName, limit = 5, compact = false }: Props) {
  const navigate = useNavigate();
  const tests = findRelatedTests({ region, condition, muscleNames, exerciseName, limit });
  if (tests.length === 0) return null;

  return (
    <div className={compact ? "" : "mt-3"}>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1.5 flex items-center gap-1.5">
        <ClipboardCheck className="h-3 w-3 text-primary" /> Relevant MSK Special Tests
      </p>
      <div className="space-y-1">
        {tests.map(t => (
          <button
            key={t.id}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/special-tests?search=${encodeURIComponent(t.name)}`);
            }}
            className="w-full text-left flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowRight className="h-3 w-3 shrink-0" />
            <span className="truncate flex-1">{t.name}</span>
            <span className="text-[10px] text-muted-foreground/60 shrink-0">Sn {t.sensitivity} · Sp {t.specificity}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
