export interface Exercise {
  id: number;
  name: string;
  description: string;
  region: string;
  category: string;
  difficulty: string;
  ebp_level: string;
  target_muscles: string[];
  primary_muscles: string[];
  secondary_muscles: string[];
  tertiary_muscles: string[];
  other_muscles: string[];
  instructions: string;
  sets_reps: string;
  clinical_notes: string;
}

export interface Muscle {
  name: string;
  origin: string;
  insertion: string;
  action?: string;
  primary_action?: string;
  secondary_action?: string;
  innervation: string;
  primary_exercises?: string[];
  other_exercises?: string[];
}

export interface MuscleGroup {
  id: number;
  name: string;
  region: string;
  muscles: Muscle[];
}

export interface SpecialTest {
  name: string;
  sensitivity: string;
  specificity: string;
}

export interface TreatmentPlan {
  acute: string;
  subacute: string;
  chronic: string;
}

export interface Disorder {
  id: number;
  name: string;
  region: string;
  category: string;
  subcategory: string;
  description: string;
  causes: string[];
  key_findings: string;
  diagnostic_tips: string;
  treatment_plan: TreatmentPlan | string;
  special_tests: SpecialTest[];
  msk_tests?: string[];
  red_flags?: string[];
  ebp_level?: string;
  differential_diagnosis?: string;
  related_exercises?: number[];
  related_muscles?: string[];
}

// Keep backward compat
export type Impairment = Disorder;

export interface EBPIntervention {
  intervention: string;
  evidence: string;
}

export interface EBPGuideline {
  id: number;
  condition: string;
  region: string;
  grade: string;
  summary: string;
  key_interventions: EBPIntervention[];
  outcome_measures: string[];
  key_references: string[];
}

export interface SportsInjury {
  id: number;
  name: string;
  sport: string;
  region: string;
  category: string;
  subcategory: string;
  description: string;
  causes: string[];
  mechanism: string;
  signs_symptoms: string[];
  msk_tests?: string[];
  diagnostic_tips?: string;
  pt_plan: {
    acute: string;
    subacute: string;
    return_to_sport: string;
  };
  prevention: string[];
  severity: string;
  recovery_time: string;
  ebp_level: string;
  related_exercises?: number[];
  related_disorders?: number[];
}

export interface DifferentialDiagnosis {
  id: number;
  name: string;
  body_region: string;
  category: string;
  description: string;
  red_flags: string[];
  key_findings: string;
  diagnostic_tests: string[];
  msk_tests: string[];
  differential_conditions: string[];
  referral_criteria: string;
  related_disorders?: number[];
  related_exercises?: number[];
}
