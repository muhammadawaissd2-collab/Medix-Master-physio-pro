import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. More MSK Tests
const newTests = [
  {
    name: "Cozen's Test",
    region: "Elbow/Wrist/Hand",
    category: "Provocation",
    condition: "Lateral Epicondylitis",
    purpose: "Assess for lateral epicondylalgia (tennis elbow).",
    position: "Seated.",
    procedure: "Examiner stabilizes elbow, patient makes a fist, pronates, radially deviates and extends wrist against resistance.",
    positive_finding: "Sudden severe pain in lateral epicondyle area.",
    sensitivity: "High",
    specificity: "Moderate",
    clinical_pearls: "Classic test for tennis elbow.",
    related_impairments: ["Lateral Epicondylalgia"],
    related_muscles: ["Extensor Carpi Radialis Brevis"],
    related_exercises: ["Eccentric Wrist Extension"],
    source_books: ["Magee's Orthopedic Physical Assessment"],
    evidence_level: "Moderate"
  },
  {
    name: "Mill's Test",
    region: "Elbow/Wrist/Hand",
    category: "Stretching",
    condition: "Lateral Epicondylitis",
    purpose: "Assess for lateral epicondylalgia.",
    position: "Seated.",
    procedure: "Examiner passively pronates patient's forearm, flexes wrist fully, and extends elbow.",
    positive_finding: "Pain over the lateral epicondyle.",
    sensitivity: "High",
    specificity: "Low",
    clinical_pearls: "Often performed alongside Cozen's test.",
    related_impairments: ["Lateral Epicondylalgia"],
    related_muscles: ["Extensor Carpi Radialis Brevis"],
    related_exercises: ["Wrist Extensor Stretch"],
    source_books: ["Special Tests in Musculoskeletal Examination"],
    evidence_level: "Moderate"
  },
  {
    name: "Apley's Scratch Test",
    region: "Shoulder",
    category: "Mobility",
    condition: "General Shoulder ROM",
    purpose: "Assess combined overhead and behind-back shoulder ranges.",
    position: "Standing/Seated.",
    procedure: "Patient reaches behind head and down spine (Flex/ABD/ER) and behind back and up spine (Ext/ADD/IR).",
    positive_finding: "Asymmetry, pain, or restriction.",
    sensitivity: "Varies",
    specificity: "Varies",
    clinical_pearls: "Great functional screen before precise goniometry.",
    related_impairments: ["Adhesive Capsulitis", "Rotator Cuff Tendinopathy"],
    related_muscles: ["Subscapularis", "Infraspinatus"],
    related_exercises: ["Wall Walk", "Sleeper Stretch"],
    source_books: ["Magee's Orthopedic Physical Assessment"],
    evidence_level: "Moderate"
  }
];

// 2. More Exercises
const newExercises = [
  {
    name: "Wall Sit with Calf Raise",
    description: "Isometric quad combined with active calf.",
    region: "Lower Extremity",
    category: "Strengthening",
    difficulty: "Intermediate",
    ebp_level: "EBP Moderate",
    target_muscles: ["Quadriceps", "Gastrocnemius", "Soleus"],
    instructions: "Hold wall sit position at 90 deg and perform calf raises.",
    sets_reps: "3 x 15 reps",
    clinical_notes: "Increases lower leg demand during isometric knee hold.",
    primary_muscles: ["Quadriceps"],
    secondary_muscles: ["Gastrocnemius"],
    tertiary_muscles: ["Soleus"],
    other_muscles: []
  },
  {
    name: "Prone Swimmers",
    description: "Alternating arm/leg extension for posterior chain.",
    region: "Full Body",
    category: "Strengthening",
    difficulty: "Beginner",
    ebp_level: "EBP Limited",
    target_muscles: ["Erector Spinae", "Gluteus Maximus", "Posterior Shoulder"],
    instructions: "Prone, alternately lift opposite arm and leg.",
    sets_reps: "3 x 20 reps",
    clinical_notes: "Gentle posterior chain exercise.",
    primary_muscles: ["Erector Spinae"],
    secondary_muscles: ["Gluteus Maximus"],
    tertiary_muscles: ["Posterior Deltoid"],
    other_muscles: []
  }
];

// 3. More Muscles
const newMuscles = [
  {
    name: "Brachialis",
    region: "Elbow/Wrist/Hand",
    action: "Elbow flexion",
    origin: "Distal half of anterior humerus",
    insertion: "Coronoid process and tuberosity of ulna",
    innervation: "Musculocutaneous nerve",
    blood_supply: "Brachial artery",
    clinical_notes: "Primary elbow flexor, active in all forearm positions.",
    antagonist: "Triceps Brachii",
    synergists: ["Biceps Brachii", "Brachioradialis"],
    common_injuries: ["Brachialis tendinopathy", "Climber's elbow"],
    stretches: ["Elbow extension stretch"],
    strengthening: ["Hammer curls", "Reverse curls"]
  }
];

// 4. More Disorders
const newDisorders = [
  {
    name: "De Quervain's Tenosynovitis",
    region: "Elbow/Wrist/Hand",
    category: "Tendon pathology",
    subcategory: "Tenosynovitis",
    description: "Inflammation of the synovial sheath surrounding the APL and EPB tendons at the radial styloid.",
    causes: ["Repetitive thumb/wrist use", "Postpartum lifting"],
    key_findings: "Pain at radial styloid, positive Finkelstein's test, swelling.",
    diagnostic_tips: "Clinical diagnosis. US can show fluid around tendons.",
    treatment_plan: {
      acute: "Thumb spica splint, ice, NSAIDs.",
      subacute: "Pain-free AROM, gentle isometric loading.",
      chronic: "Eccentric strengthening, functional returning."
    },
    special_tests: [
      { name: "Finkelstein's Test", sensitivity: "High", specificity: "Moderate" }
    ],
    ebp_level: "EBP Strong"
  }
];

// 5. Differential Diagnosis
const newDiffDiagnoses = [
  {
    name: "Scaphoid Fracture",
    body_region: "Elbow/Wrist/Hand",
    category: "Fractures",
    description: "Fracture of the scaphoid bone from FOOSH.",
    red_flags: ["Snuffbox tenderness", "Pain with axial loading of thumb"],
    key_findings: "Radial-sided wrist pain after trauma.",
    diagnostic_tests: ["X-ray (Scaphoid views)", "MRI if X-ray negative but symptoms persist"],
    msk_tests: ["Scaphoid compression test", "Snuffbox palpation"],
    differential_conditions: ["De Quervain's Tenosynovitis", "Distal Radius Fracture"],
    referral_criteria: "Refer to ortho/ED if snuffbox tenderness is present following FOOSH."
  }
];

// Helpers to inject data
const appendToJson = (filename: string, dataToAdd: any[]) => {
  const fPath = path.join(__dirname, filename);
  let data = JSON.parse(fs.readFileSync(fPath, 'utf8'));
  const maxId = Math.max(...data.map((d: any) => d.id || 0), 0);
  dataToAdd.forEach((item, i) => {
    data.unshift({ ...item, id: maxId + i + 1 });
  });
  data = data.map((d: any, i: number) => ({ ...d, id: i + 1 }));
  fs.writeFileSync(fPath, JSON.stringify(data, null, 2));
};

const appendToTsArray = (filename: string, arrayName: string, dataToAdd: any[]) => {
  const fPath = path.join(__dirname, filename);
  let content = fs.readFileSync(fPath, 'utf8');
  const searchStr = `export const ${arrayName}: `;
  const startIndex = content.indexOf(searchStr);
  const bracketIndex = content.indexOf('SpecialTest[]', startIndex);
  const finalStartIndex = bracketIndex > -1 ? bracketIndex : startIndex;
  const insertIndex = content.indexOf('[', finalStartIndex) + 1;

  let appendedStr = '\n';
  dataToAdd.forEach((item, i) => {
    const objStr = JSON.stringify({ ...item, id: 30000 + i }, null, 2);
    appendedStr += objStr + ',\n';
  });

  const updated = content.slice(0, insertIndex) + appendedStr + content.slice(insertIndex);
  fs.writeFileSync(fPath, updated);
};

appendToJson('exercises.json', newExercises);
appendToJson('muscles.json', newMuscles);
appendToJson('disorders.json', newDisorders);
appendToJson('differential-diagnosis.json', newDiffDiagnoses);
appendToTsArray('special-tests.ts', 'specialTests', newTests);

console.log('Appended all additional data successfully.');
