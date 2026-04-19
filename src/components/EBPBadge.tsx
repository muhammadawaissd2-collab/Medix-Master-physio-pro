interface EBPBadgeProps {
  level: string;
  className?: string;
}

export function EBPBadge({ level, className = "" }: EBPBadgeProps) {
  const normalized = level?.toLowerCase() || "";
  if (normalized.includes("strong")) return <span className={`ebp-badge-strong ${className}`}>EBP Strong</span>;
  if (normalized.includes("moderate")) return <span className={`ebp-badge-moderate ${className}`}>EBP Moderate</span>;
  if (normalized.includes("limited")) return <span className={`ebp-badge-limited ${className}`}>EBP Limited</span>;
  return <span className={`ebp-badge-moderate ${className}`}>{level}</span>;
}

export function DifficultyBadge({ difficulty, className = "" }: { difficulty: string; className?: string }) {
  const normalized = difficulty?.toLowerCase() || "";
  if (normalized.includes("beginner")) return <span className={`difficulty-beginner ${className}`}>Beginner</span>;
  if (normalized.includes("intermediate")) return <span className={`difficulty-intermediate ${className}`}>Intermediate</span>;
  if (normalized.includes("advanced")) return <span className={`difficulty-advanced ${className}`}>Advanced</span>;
  return <span className={`difficulty-beginner ${className}`}>{difficulty}</span>;
}

export function RegionTag({ region, className = "" }: { region: string; className?: string }) {
  return <span className={`region-tag ${className}`}>{region}</span>;
}
