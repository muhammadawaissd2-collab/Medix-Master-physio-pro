import exercisesData from './exercises.json';
import musclesData from './muscles.json';
import disordersData from './disorders.json';
import differentialDiagnosisData from './differential-diagnosis.json';
import ebpData from './ebp-guidelines.json';
import sportsInjuriesData from './sports-injuries.json';
import { books, searchBooks } from './books';
import type { Exercise, MuscleGroup, Disorder, EBPGuideline, SportsInjury, DifferentialDiagnosis } from '@/types';

export const exercises: Exercise[] = exercisesData as Exercise[];
export const muscleGroups: MuscleGroup[] = musclesData as MuscleGroup[];
export const disorders: Disorder[] = disordersData as Disorder[];
export const differentialDiagnoses: DifferentialDiagnosis[] = differentialDiagnosisData as DifferentialDiagnosis[];
export const ebpGuidelines: EBPGuideline[] = ebpData as EBPGuideline[];
export const sportsInjuries: SportsInjury[] = sportsInjuriesData as SportsInjury[];

// Keep backwards compatibility aliases
export const impairments = disorders;

export const getExercisesByRegion = (region: string) =>
  exercises.filter(e => e.region === region);

export const getExercisesByMuscle = (muscle: string) =>
  exercises.filter(e => e.target_muscles.some(m => m.toLowerCase().includes(muscle.toLowerCase())));

export const getDisordersByRegion = (region: string) =>
  disorders.filter(i => i.region === region);

// Legacy compat
export const getImpairmentsByRegion = getDisordersByRegion;

export const getMuscleGroupsByRegion = (region: string) =>
  muscleGroups.filter(m => m.region === region);

export const getSportsInjuriesBySport = (sport: string) =>
  sportsInjuries.filter(i => i.sport.toLowerCase().includes(sport.toLowerCase()));

export const getSportsInjuriesByRegion = (region: string) =>
  sportsInjuries.filter(i => i.region === region);

export const searchAll = (query: string) => {
  const q = query.toLowerCase();
  return {
    exercises: exercises.filter(e => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.target_muscles.some(m => m.toLowerCase().includes(q))),
    disorders: disorders.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.region.toLowerCase().includes(q)),
    muscles: muscleGroups.filter(mg => mg.name.toLowerCase().includes(q) || mg.muscles.some(m => m.name.toLowerCase().includes(q))),
    guidelines: ebpGuidelines.filter(g => g.condition.toLowerCase().includes(q) || g.summary.toLowerCase().includes(q)),
    sportsInjuries: sportsInjuries.filter(s => s.name.toLowerCase().includes(q) || s.sport.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)),
    differentialDiagnoses: differentialDiagnoses.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)),
    books: searchBooks(q),
  };
};

export const allRegions = [...new Set([
  ...exercises.map(e => e.region),
  ...disorders.map(i => i.region),
])].sort();

export const allCategories = [...new Set(exercises.map(e => e.category))].sort();
export const allDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
export const allEBPLevels = ['EBP Strong', 'EBP Moderate', 'EBP Limited'];
export const allSports = [...new Set(sportsInjuries.map(s => s.sport))].sort();
