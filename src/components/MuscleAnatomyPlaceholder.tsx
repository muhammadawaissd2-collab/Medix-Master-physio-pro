import { ImageIcon } from "lucide-react";

interface MuscleAnatomyProps {
  region: string;
  muscleName: string;
  muscles?: string[];
  className?: string;
}

const regionSvgs: Record<string, { viewBox: string; paths: string[] }> = {
  "Lower Extremity": {
    viewBox: "0 0 120 200",
    paths: [
      "M50 10 Q60 10 65 30 L70 80 Q72 100 68 120 L65 160 Q63 180 60 195 L55 195 Q52 180 50 160 L47 120 Q43 100 45 80 L50 30 Z",
      "M55 30 Q60 35 62 50 L64 80 Q65 90 63 100 L60 80 Q58 60 55 30 Z",
    ],
  },
  "Upper Extremity": {
    viewBox: "0 0 120 200",
    paths: [
      "M40 20 Q55 15 70 20 L80 30 Q90 40 85 60 L82 80 Q80 100 78 120 L76 140 Q74 155 72 170 L68 170 Q66 155 64 140 L62 120 Q60 100 58 80 L55 60 Q50 40 40 30 Z",
      "M55 40 Q65 35 72 45 L75 60 Q77 75 74 85 L70 75 Q65 55 55 40 Z",
    ],
  },
  Spine: {
    viewBox: "0 0 120 200",
    paths: [
      "M55 10 Q62 10 65 15 L67 40 Q68 60 67 80 L66 120 Q65 150 64 175 L62 190 Q60 195 58 190 L56 175 Q55 150 54 120 L53 80 Q52 60 53 40 L55 15 Z",
    ],
  },
  Core: {
    viewBox: "0 0 120 200",
    paths: [
      "M35 20 Q60 15 85 20 L88 40 Q90 60 88 80 L85 100 Q82 120 80 140 L40 140 Q38 120 35 100 L32 80 Q30 60 32 40 Z",
    ],
  },
};

export function MuscleAnatomyPlaceholder({
  region,
  muscleName,
  muscles,
  className = "",
}: MuscleAnatomyProps) {
  const svg = regionSvgs[region] || regionSvgs["Lower Extremity"];

  return (
    <div className={`relative ${className}`}>
      <div className="w-full aspect-[3/4] rounded-xl border border-border/50 bg-secondary/30 flex items-center justify-center overflow-hidden relative">
        <svg viewBox={svg.viewBox} className="w-3/4 h-3/4 opacity-60">
          {svg.paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill={i === 0 ? "hsl(var(--muted-foreground) / 0.15)" : "hsl(var(--primary) / 0.3)"}
              stroke="hsl(var(--primary) / 0.5)"
              strokeWidth="1"
            />
          ))}
          <text x="60" y="195" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontSize="6" fontFamily="sans-serif">
            {muscleName.length > 20 ? muscleName.slice(0, 18) + "…" : muscleName}
          </text>
        </svg>
      </div>
      <p className="text-[10px] text-center text-muted-foreground/60 mt-1">Anatomical reference</p>
    </div>
  );
}