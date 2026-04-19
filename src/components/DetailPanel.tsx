import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EBPBadge, DifficultyBadge, RegionTag } from "@/components/EBPBadge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Exercise, MuscleGroup, Disorder, DifferentialDiagnosis } from "@/types";
import { useNavigate } from "react-router-dom";
import { exercises, disorders, muscleGroups, differentialDiagnoses } from "@/data";
import { findRelatedBooks } from "@/data/books";
import { Dumbbell, Target, Stethoscope, BookOpen, ArrowRight, FlaskConical, AlertCircle, ExternalLink, Library, type LucideIcon } from "lucide-react";
import { MuscleAnatomyPlaceholder } from "@/components/MuscleAnatomyPlaceholder";
import { ExerciseProcedurePlaceholder } from "@/components/ExerciseProcedurePlaceholder";
import { BookmarkButton } from "@/components/BookmarkButton";
import { RelatedSpecialTests } from "@/components/RelatedSpecialTests";
import type { BookmarkType } from "@/contexts/BookmarkContext";
import type { TreatmentPlan } from "@/types";

interface DetailPanelProps {
  open: boolean;
  onClose: () => void;
  type: "exercise" | "muscle" | "disorder" | "differential-diagnosis";
  data: Exercise | MuscleGroup | Disorder | DifferentialDiagnosis | null;
}

export function DetailPanel({ open, onClose, type, data }: DetailPanelProps) {
  const navigate = useNavigate();
  if (!data) return null;

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-lg bg-card border-border/50 p-0 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6">
            <SheetHeader className="text-left mb-4">
              <SheetTitle className="font-display text-xl text-foreground pr-6 flex items-center gap-2">
                {data.name}
                <BookmarkButton id={data.id} type={type as BookmarkType} name={data.name} size="md" />
              </SheetTitle>
              <SheetDescription className="sr-only">Details for {data.name}</SheetDescription>
              <div className="flex flex-wrap gap-2 mt-2">
                <RegionTag region={data.region} />
                {type === "exercise" && (
                  <>
                    <EBPBadge level={(data as Exercise).ebp_level} />
                    <DifficultyBadge difficulty={(data as Exercise).difficulty} />
                  </>
                )}
                {type === "disorder" && (data as Disorder).ebp_level && (
                  <EBPBadge level={(data as Disorder).ebp_level!} />
                )}
              </div>
            </SheetHeader>

            {type === "exercise" && <ExerciseDetail exercise={data as Exercise} onNavigate={handleNavigate} />}
            {type === "muscle" && <MuscleDetail group={data as MuscleGroup} onNavigate={handleNavigate} />}
            {type === "disorder" && <DisorderDetail disorder={data as Disorder} onNavigate={handleNavigate} />}
            {type === "differential-diagnosis" && <DifferentialDiagnosisDetail dx={data as DifferentialDiagnosis} onNavigate={handleNavigate} />}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function SectionTitle({ icon: Icon, title }: { icon: LucideIcon; title: string }) {
  return (
    <h3 className="flex items-center gap-2 text-sm font-display font-semibold text-foreground mt-5 mb-2">
      <Icon className="h-4 w-4 text-primary" />
      {title}
    </h3>
  );
}

function BookReferences({ keyword, onNavigate }: { keyword: string; onNavigate: (p: string) => void }) {
  const related = findRelatedBooks(keyword);
  if (related.length === 0) return null;

  return (
    <>
      <SectionTitle icon={Library} title="Book References" />
      <div className="space-y-1.5">
        {related.map(({ book, matchedTopics }) => (
          <button key={book.id} onClick={() => onNavigate(`/books?search=${encodeURIComponent(keyword)}`)}
            className="glass-card !p-2.5 w-full text-left flex items-start gap-2.5 group">
            <div className={`w-8 h-11 rounded bg-gradient-to-br ${book.coverColor} flex items-center justify-center shrink-0`}>
              <Library className="h-3 w-3 text-white/80" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">{book.title}</p>
              <p className="text-[10px] text-muted-foreground">{book.author} · {book.edition}</p>
              {matchedTopics.filter(t => t !== "tag match").slice(0, 2).map((t, i) => (
                <span key={i} className="text-[9px] px-1 py-0 rounded bg-primary/10 text-primary/80 mr-1">{t}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

function ExerciseDetail({ exercise, onNavigate }: { exercise: Exercise; onNavigate: (p: string) => void }) {
  const relatedDisorders = disorders.filter(imp =>
    exercise.target_muscles.some(m =>
      imp.name.toLowerCase().includes(m.toLowerCase().split(" ")[0]) ||
      imp.description?.toLowerCase().includes(m.toLowerCase())
    )
  ).slice(0, 5);

  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(exercise.name + " exercise physiotherapy")}`;
  const bookKeyword = exercise.region.split(" ")[0].toLowerCase();

  return (
    <div className="space-y-1">
      <ExerciseProcedurePlaceholder
        exerciseName={exercise.name}
        instructions={exercise.instructions}
        targetMuscles={exercise.target_muscles}
        className="mb-4"
      />

      <p className="text-sm text-muted-foreground">{exercise.description}</p>

      <SectionTitle icon={BookOpen} title="Instructions" />
      <p className="text-sm text-foreground/90">{exercise.instructions}</p>

      <SectionTitle icon={Dumbbell} title="Sets & Reps" />
      <div className="glass-card !p-3">
        <p className="text-sm font-medium text-primary">{exercise.sets_reps}</p>
      </div>

      <SectionTitle icon={Target} title="Target Muscles" />
      <div className="space-y-1.5">
        {exercise.primary_muscles?.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="text-[10px] font-bold text-primary w-14 shrink-0 pt-0.5">Primary</span>
            <div className="flex flex-wrap gap-1">
              {exercise.primary_muscles.map(m => (
                <Badge key={m} className="text-[10px] px-1.5 py-0 bg-primary/15 text-primary border-primary/20 cursor-pointer"
                  onClick={() => onNavigate(`/muscles?search=${encodeURIComponent(m)}`)}>{m}</Badge>
              ))}
            </div>
          </div>
        )}
        {exercise.secondary_muscles?.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="text-[10px] font-bold text-blue-400 w-14 shrink-0 pt-0.5">2nd</span>
            <div className="flex flex-wrap gap-1">
              {exercise.secondary_muscles.map(m => (
                <Badge key={m} variant="secondary" className="text-[10px] px-1.5 py-0 cursor-pointer"
                  onClick={() => onNavigate(`/muscles?search=${encodeURIComponent(m)}`)}>{m}</Badge>
              ))}
            </div>
          </div>
        )}
        {exercise.tertiary_muscles?.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="text-[10px] font-bold text-amber-400 w-14 shrink-0 pt-0.5">3rd</span>
            <div className="flex flex-wrap gap-1">
              {exercise.tertiary_muscles.map(m => (
                <Badge key={m} variant="outline" className="text-[10px] px-1.5 py-0 cursor-pointer"
                  onClick={() => onNavigate(`/muscles?search=${encodeURIComponent(m)}`)}>{m}</Badge>
              ))}
            </div>
          </div>
        )}
        {exercise.other_muscles?.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="text-[10px] font-bold text-muted-foreground w-14 shrink-0 pt-0.5">Other</span>
            <div className="flex flex-wrap gap-1">
              {exercise.other_muscles.map(m => (
                <Badge key={m} variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground cursor-pointer"
                  onClick={() => onNavigate(`/muscles?search=${encodeURIComponent(m)}`)}>{m}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {exercise.clinical_notes && (
        <>
          <SectionTitle icon={Stethoscope} title="Clinical Notes" />
          <p className="text-sm text-muted-foreground italic">{exercise.clinical_notes}</p>
        </>
      )}

      <SectionTitle icon={FlaskConical} title="Progression" />
      <div className="space-y-1">
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
          <div key={level} className={`flex items-center gap-2 text-xs ${exercise.difficulty === level ? "text-primary font-medium" : "text-muted-foreground"}`}>
            <div className={`w-2 h-2 rounded-full ${exercise.difficulty === level ? "bg-primary" : "bg-muted-foreground/30"}`} />
            {level} {exercise.difficulty === level && "← Current"}
          </div>
        ))}
      </div>

      {relatedDisorders.length > 0 && (
        <>
          <SectionTitle icon={AlertCircle} title="Related Disorders" />
          <div className="space-y-1">
            {relatedDisorders.map((imp) => (
              <button key={imp.id} onClick={() => onNavigate(`/disorders?id=${imp.id}`)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors w-full text-left">
                <ArrowRight className="h-3 w-3 shrink-0" />
                {imp.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Relevant MSK Special Tests */}
      <RelatedSpecialTests
        region={exercise.region}
        exerciseName={exercise.name}
        muscleNames={[...(exercise.primary_muscles || []), ...(exercise.secondary_muscles || [])]}
      />

      {/* Book References */}
      <BookReferences keyword={bookKeyword} onNavigate={onNavigate} />

      <div className="mt-4 pt-3 border-t border-border/30">
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-primary/80 hover:text-primary transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Search "{exercise.name}" online for more references
        </a>
      </div>
    </div>
  );
}

function MuscleDetail({ group, onNavigate }: { group: MuscleGroup; onNavigate: (p: string) => void }) {
  const relatedExercises = exercises.filter(ex =>
    ex.target_muscles.some(tm =>
      group.muscles.some(m => m.name.toLowerCase().includes(tm.toLowerCase().split(" ")[0]) || tm.toLowerCase().includes(m.name.toLowerCase().split(" ")[0]))
    ) || group.name.toLowerCase().includes(ex.target_muscles.join(" ").toLowerCase().split(" ")[0])
  ).slice(0, 10);

  const relatedDisorders = disorders.filter(imp =>
    group.muscles.some(m =>
      imp.name.toLowerCase().includes(m.name.toLowerCase().split(" ")[0]) ||
      imp.description?.toLowerCase().includes(m.name.toLowerCase())
    )
  ).slice(0, 8);

  return (
    <div className="space-y-1">
      <MuscleAnatomyPlaceholder region={group.region} muscleName={group.name} muscles={group.muscles.map(m => m.name)} className="mb-4" />

      <SectionTitle icon={Target} title={`Muscles (${group.muscles.length})`} />
      <div className="space-y-3">
        {group.muscles.map((m) => (
          <div key={m.name} className="glass-card !p-3 space-y-1.5">
            <p className="text-sm font-medium text-foreground">{m.name}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div><span className="text-muted-foreground">Origin:</span> <span className="text-foreground/80">{m.origin}</span></div>
              <div><span className="text-muted-foreground">Insertion:</span> <span className="text-foreground/80">{m.insertion}</span></div>
              {m.primary_action ? (
                <>
                  <div><span className="text-muted-foreground">Primary:</span> <span className="text-foreground/80">{m.primary_action}</span></div>
                  <div><span className="text-muted-foreground">Secondary:</span> <span className="text-foreground/80">{m.secondary_action}</span></div>
                </>
              ) : (
                <div className="col-span-2"><span className="text-muted-foreground">Action:</span> <span className="text-foreground/80">{m.action}</span></div>
              )}
              <div><span className="text-muted-foreground">Nerve:</span> <span className="text-foreground/80">{m.innervation}</span></div>
            </div>
            {m.primary_exercises && m.primary_exercises.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {m.primary_exercises.map((ex) => (
                  <span key={ex} className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">{ex}</span>
                ))}
                {m.other_exercises?.slice(0, 2).map((ex) => (
                  <span key={ex} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary/80 text-muted-foreground">{ex}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {relatedExercises.length > 0 && (
        <>
          <SectionTitle icon={Dumbbell} title="Related Exercises" />
          <div className="space-y-1">
            {relatedExercises.map((ex) => (
              <button key={ex.id} onClick={() => onNavigate(`/exercises?id=${ex.id}`)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors w-full text-left">
                <ArrowRight className="h-3 w-3 shrink-0" />
                <span className="truncate">{ex.name}</span>
                <EBPBadge level={ex.ebp_level} className="ml-auto shrink-0" />
              </button>
            ))}
          </div>
        </>
      )}

      {relatedDisorders.length > 0 && (
        <>
          <SectionTitle icon={AlertCircle} title="Common Disorders" />
          <div className="space-y-1">
            {relatedDisorders.map((imp) => (
              <button key={imp.id} onClick={() => onNavigate(`/disorders?id=${imp.id}`)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors w-full text-left">
                <ArrowRight className="h-3 w-3 shrink-0" />
                {imp.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Relevant MSK Special Tests */}
      <RelatedSpecialTests
        region={group.region}
        muscleNames={group.muscles.map(m => m.name)}
      />

      {/* Book References */}
      <BookReferences keyword={group.name} onNavigate={onNavigate} />
    </div>
  );
}

function DisorderDetail({ disorder }: { disorder: Disorder; onNavigate: (p: string) => void }) {
  const tp = disorder.treatment_plan;
  const navigate = useNavigate();

  const handleNavigate = (path: string) => navigate(path);

  const relatedExercises = exercises.filter(ex => {
    const impLower = disorder.name.toLowerCase();
    const regionMatch = ex.region.toLowerCase().includes(disorder.region.toLowerCase().split(" ")[0]) ||
      disorder.region.toLowerCase().includes(ex.region.toLowerCase().split(" ")[0]);
    const nameMatch = ex.name.toLowerCase().includes(impLower.split(" ")[0]) ||
      ex.target_muscles.some(m => Math.random() > 0.5); // Simplified matching for related exercises
    return regionMatch || nameMatch;
  }).slice(0, 10);

  const relatedDisorders = disorders.filter(imp =>
    imp.id !== disorder.id && imp.region === disorder.region
  ).slice(0, 8);

  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{disorder.description}</p>

      {disorder.causes && disorder.causes.length > 0 && (
        <>
          <SectionTitle icon={AlertCircle} title="Causes" />
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-0.5">
            {disorder.causes.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </>
      )}

      <SectionTitle icon={Stethoscope} title="Key Findings" />
      <p className="text-sm text-foreground/80">{disorder.key_findings}</p>

      {disorder.red_flags && disorder.red_flags.length > 0 && (
        <div className="mt-4 p-4 border border-rose-500/20 bg-rose-500/10 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
          <p className="text-[10px] uppercase font-bold text-rose-500 mb-2 flex items-center gap-1.5 tracking-wider">
            <AlertCircle className="h-3 w-3" /> Red Flags
          </p>
          <ul className="list-disc list-inside text-sm text-foreground space-y-1">
            {disorder.red_flags.map((c: string, i: number) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}

      <SectionTitle icon={FlaskConical} title="Diagnostic Tips" />
      <div className="glass-card !p-3">
        <p className="text-sm text-foreground/90">{disorder.diagnostic_tips}</p>
      </div>

      {disorder.special_tests && disorder.special_tests.length > 0 && (
        <>
          <SectionTitle icon={Target} title="Special Tests" />
          <div className="space-y-2">
            {disorder.special_tests.map((t, i) => (
              <button 
                key={i} 
                onClick={() => handleNavigate(`/special-tests?search=${encodeURIComponent(t.name)}`)}
                className="w-full text-left glass-card !p-3 flex items-center justify-between hover:bg-secondary/50 transition-colors"
              >
                <span className="text-sm font-medium text-foreground">{t.name}</span>
                <div className="flex gap-2 text-xs">
                  <span className="text-primary">Sn: {t.sensitivity}</span>
                  <span className="text-muted-foreground">Sp: {t.specificity}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {disorder.msk_tests && disorder.msk_tests.length > 0 && (
        <>
          <SectionTitle icon={Target} title="MSK and Other Tests" />
          <div className="space-y-1 mt-1">
            {disorder.msk_tests.map((c, i) => (
              <button 
                key={i}
                onClick={() => handleNavigate(`/special-tests?search=${encodeURIComponent(c)}`)}
                className="w-full text-left flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                <span>{c}</span>
              </button>
            ))}
          </div>
        </>
      )}

      <SectionTitle icon={BookOpen} title="Treatment Plan" />
      {Array.isArray(tp) ? (
        <div className="space-y-2">
          {tp.map((item: { phase: string; interventions: string[] }, i: number) => (
            <div key={i} className="glass-card !p-3">
              <p className="text-xs font-medium text-primary uppercase mb-1">{item.phase}</p>
              <ul className="list-disc list-inside text-sm text-foreground/80 space-y-0.5">
                {(item.interventions || []).map((int: string, j: number) => (
                  <li key={j}>{int}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : typeof tp === 'string' ? (
        <p className="text-sm text-foreground/80">{tp}</p>
      ) : tp && typeof tp === 'object' ? (
        <div className="space-y-2">
          {Object.entries(tp).map(([phase, text]) => (
            <div key={phase} className="glass-card !p-3">
              <p className="text-xs font-medium text-primary uppercase mb-1">{phase} Phase</p>
              <p className="text-sm text-foreground/80">{String(text)}</p>
            </div>
          ))}
        </div>
      ) : null}

      {disorder.differential_diagnosis && (
        <>
          <SectionTitle icon={AlertCircle} title="Differential Diagnosis" />
          <p className="text-sm text-muted-foreground italic">{disorder.differential_diagnosis}</p>
        </>
      )}

      {relatedExercises.length > 0 && (
        <>
          <SectionTitle icon={Dumbbell} title="Recommended Exercises" />
          <div className="space-y-1">
            {relatedExercises.map((ex) => (
              <button key={ex.id} onClick={() => handleNavigate(`/exercises?id=${ex.id}`)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors w-full text-left">
                <ArrowRight className="h-3 w-3 shrink-0" />
                <span className="truncate">{ex.name}</span>
                <DifficultyBadge difficulty={ex.difficulty} className="ml-auto shrink-0" />
              </button>
            ))}
          </div>
        </>
      )}

      {relatedDisorders.length > 0 && (
        <>
          <SectionTitle icon={AlertCircle} title="Related Conditions" />
          <div className="space-y-1">
            {relatedDisorders.map((imp) => (
              <button key={imp.id} onClick={() => handleNavigate(`/disorders?id=${imp.id}`)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors w-full text-left">
                <ArrowRight className="h-3 w-3 shrink-0" />
                {imp.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Relevant MSK Special Tests */}
      <RelatedSpecialTests region={disorder.region} condition={disorder.name} />

      {/* Book References */}
      <BookReferences keyword={disorder.name.split(" ")[0]} onNavigate={handleNavigate} />
    </div>
  );
}

function DifferentialDiagnosisDetail({ dx, onNavigate }: { dx: DifferentialDiagnosis; onNavigate: (p: string) => void }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{dx.description}</p>

      {dx.red_flags && dx.red_flags.length > 0 && (
        <>
          <SectionTitle icon={AlertCircle} title="Red Flags" />
          <ul className="list-disc list-inside text-sm text-red-500/90 space-y-0.5">
            {dx.red_flags.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </>
      )}

      <SectionTitle icon={Stethoscope} title="Key Findings" />
      <p className="text-sm text-foreground/80">{dx.key_findings}</p>

      {dx.diagnostic_tests && dx.diagnostic_tests.length > 0 && (
        <>
          <SectionTitle icon={FlaskConical} title="Diagnostic Tests" />
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-0.5">
            {dx.diagnostic_tests.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </>
      )}

      {dx.msk_tests && dx.msk_tests.length > 0 && (
        <>
          <SectionTitle icon={Target} title="MSK and Other Tests" />
          <div className="space-y-1 mt-1">
            {dx.msk_tests.map((c, i) => (
              <button 
                key={i}
                onClick={() => onNavigate(`/special-tests?search=${encodeURIComponent(c)}`)}
                className="w-full text-left flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors"
              >
                <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                <span>{c}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {dx.differential_conditions && dx.differential_conditions.length > 0 && (
        <>
          <SectionTitle icon={AlertCircle} title="Differential Conditions" />
          <div className="flex flex-wrap gap-1">
            {dx.differential_conditions.map((m, i) => (
              <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0">{m}</Badge>
            ))}
          </div>
        </>
      )}

      <SectionTitle icon={BookOpen} title="Referral Criteria" />
      <div className="glass-card !p-3">
        <p className="text-sm text-foreground/90 font-medium text-amber-500/90">{dx.referral_criteria}</p>
      </div>

      <BookReferences keyword={dx.name.split(" ")[0]} onNavigate={onNavigate} />
    </div>
  );
}
