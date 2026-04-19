import { ExternalLink, Dumbbell } from "lucide-react";

interface ExerciseProcedureProps {
  exerciseName: string;
  instructions: string;
  targetMuscles: string[];
  className?: string;
}

export function ExerciseProcedurePlaceholder({
  exerciseName,
  instructions,
  targetMuscles,
  className = "",
}: ExerciseProcedureProps) {
  const searchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(exerciseName + " exercise physiotherapy technique")}`;

  return (
    <div className={`relative ${className}`}>
      <div className="w-full aspect-[16/9] rounded-xl border border-border/50 bg-secondary/30 flex items-center justify-center overflow-hidden relative">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Dumbbell className="h-8 w-8 text-primary/40" />
          <p className="text-xs font-medium text-foreground/60">{exerciseName}</p>
          <p className="text-[10px] text-muted-foreground/60 text-center max-w-[200px]">
            Targets: {targetMuscles.slice(0, 3).join(", ")}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end mt-1">
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-[10px] text-primary/70 hover:text-primary transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          Search images online
        </a>
      </div>
    </div>
  );
}