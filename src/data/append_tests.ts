import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const newTests = [
  {
    name: "Biceps Load Test II",
    region: "Shoulder",
    category: "Labral/SLAP",
    condition: "SLAP Lesion",
    purpose: "Detect SLAP lesions, especially in the presence of recurrent anterior instability.",
    position: "Supine with shoulder initially abducted to 120°, externally rotated to maximal point, elbow flexed to 90°, and forearm supinated.",
    procedure: "The examiner resists the patient's active elbow flexion.",
    positive_finding: "Reproduction of pain deep in the shoulder during resisted elbow flexion.",
    sensitivity: "89.7%",
    specificity: "96.9%",
    clinical_pearls: "Excellent test for identifying SLAP lesions Type II. Often used in throwing athletes.",
    related_impairments: ["SLAP Tear", "Biceps Tendinopathy"],
    related_muscles: ["Biceps Brachii"],
    related_exercises: ["Biceps Curls", "Shoulder Stability Exercises"],
    source_books: ["Magee's Orthopedic Physical Assessment"],
    evidence_level: "Strong"
  },
  {
    name: "Kim Test",
    region: "Shoulder",
    category: "Instability",
    condition: "Posterior-Inferior Labral Tear",
    purpose: "Detect posterior-inferior labral lesions.",
    position: "Seated. Arm abducted to 90° with a flexed elbow.",
    procedure: "Examiner elevates arm 45° diagonally upward while simultaneously applying axial load to the elbow and a posteroinferior force to the proximal humerus.",
    positive_finding: "Sudden onset of posterior shoulder pain, accompanied by clicking/clunking.",
    sensitivity: "80%",
    specificity: "94%",
    clinical_pearls: "Use in conjunction with the Jerk Test. Highly accurate for identifying posterior capsulolabral lesions.",
    related_impairments: ["Posterior Labral Tear", "Posterior Shoulder Instability"],
    related_muscles: ["Infraspinatus", "Teres Minor", "Posterior Deltoid"],
    related_exercises: ["External Rotation (Resisted)", "Rowing"],
    source_books: ["Special Tests in Musculoskeletal Examination"],
    evidence_level: "Strong"
  },
  {
    name: "Jerk Test",
    region: "Shoulder",
    category: "Instability",
    condition: "Posterior Labral Tear",
    purpose: "Detect posterior instability and posterior labral tears.",
    position: "Seated. Arm internally rotated and forward flexed to 90°.",
    procedure: "Examiner applies an axial load to the elbow and horizontally adducts the arm across the body.",
    positive_finding: "Sudden jerk or clunk as the humeral head subluxates posteriorly. A second clunk may occur upon returning to the start position.",
    sensitivity: "73%",
    specificity: "98%",
    clinical_pearls: "Combines well with the Kim Test; a positive test with pain strongly indicates a posteroinferior labral lesion.",
    related_impairments: ["Posterior Labral Tear", "Posterior Shoulder Instability"],
    related_muscles: ["Infraspinatus", "Posterior Deltoid"],
    related_exercises: ["Scapular Retraction", "External Rotation"],
    source_books: ["Special Tests in Musculoskeletal Examination"],
    evidence_level: "Strong"
  },
  {
    name: "Posterior Apprehension Test",
    region: "Shoulder",
    category: "Instability",
    condition: "Posterior Instability / Reverse Bankart",
    purpose: "Assess posterior instability of the glenohumeral joint.",
    position: "Supine or seated. Shoulder elevated to 90° in the scapular plane with internal rotation.",
    procedure: "Examiner applies a posterior force through the humerus.",
    positive_finding: "Apprehension or resistance from the patient, not just pain.",
    sensitivity: "19%",
    specificity: "99%",
    clinical_pearls: "High specificity but low sensitivity. Best used to confirm suspected severe posterior instability.",
    related_impairments: ["Reverse Bankart Tear", "Posterior Shoulder Instability"],
    related_muscles: ["Subscapularis", "Infraspinatus"],
    related_exercises: ["Dynamic Stabilization", "Closed Kinetic Chain Shoulder"],
    source_books: ["Magee's Orthopedic Physical Assessment"],
    evidence_level: "Moderate"
  },
  {
    name: "Crossed Straight Leg Raise",
    region: "Lumbar Spine",
    category: "Neurological",
    condition: "Lumbar Disc Herniation",
    purpose: "Identify large disc herniation or space-occupying lesion.",
    position: "Supine.",
    procedure: "Examiner performs a straight leg raise on the ASYMPTOMATIC leg.",
    positive_finding: "Reproduction of sciatic pain symptoms down the SYMPTOMATIC (opposite) leg.",
    sensitivity: "28%",
    specificity: "90%",
    clinical_pearls: "Very high specificity for a large central or axillary disc protrusion. If positive, strong indicator of disc path.",
    related_impairments: ["Lumbar Disc Herniation (HNP)", "Sciatica"],
    related_muscles: ["Hamstrings", "Piriformis"],
    related_exercises: ["Nerve Glides", "McKenzie Extension"],
    source_books: ["Magee's Orthopedic Physical Assessment"],
    evidence_level: "Strong"
  },
  {
    name: "Wells Criteria for DVT",
    region: "Lower Extremity",
    category: "Vascular",
    condition: "Deep Vein Thrombosis",
    purpose: "Clinical prediction rule to estimate the pre-test probability of DVT.",
    position: "Various (primarily observation and palpation).",
    procedure: "Score based on parameters: Active cancer, paralysis/paresis/plaster, recent immobilization/surgery, localized tenderness along deep venous system, entire leg swollen, calf swelling >3cm vs asymptomatic side, pitting edema, collateral non-varicose superficial veins, and alternative diagnosis as likely or more likely.",
    positive_finding: "Score > 2 indicates high probability of DVT.",
    sensitivity: "High (when combined with D-Dimer)",
    specificity: "Moderate",
    clinical_pearls: "Critical red-flag screen for patients indicating acute calf pain and swelling.",
    related_impairments: ["Deep Vein Thrombosis (DVT)"],
    related_muscles: ["Gastrocnemius", "Soleus"],
    related_exercises: ["Ankle Pumps (post-clearance)"],
    source_books: ["Current Medical Diagnosis & Treatment"],
    evidence_level: "Strong"
  },
  {
    name: "SCAT5 (Sport Concussion Assessment Tool)",
    region: "Systemic/Any",
    category: "Neurological",
    condition: "Concussion",
    purpose: "Assess athletes for sports-related concussion.",
    position: "Seated/Standing.",
    procedure: "Includes symptom evaluation, cognitive screening (Maddocks questions, SAC), neurological screening, and balance testing.",
    positive_finding: "Deficits in any domains compared to baseline, or presence of concussion symptoms.",
    sensitivity: "High",
    specificity: "Moderate",
    clinical_pearls: "Recommended to be used by trained medical professionals within acute phase of injury.",
    related_impairments: ["Concussion", "Post-Concussion Syndrome"],
    related_muscles: ["Suboccipitals", "Cervical Paraspinals"],
    related_exercises: ["Vestibular Rehab", "Buffalo Concussion Protocol"],
    source_books: ["Consensus statement on concussion in sport"],
    evidence_level: "Strong"
  },
  {
    name: "VOMS (Vestibular/Ocular Motor Screening)",
    region: "Systemic/Any",
    category: "Neurological",
    condition: "Concussion",
    purpose: "Assess vestibular and ocular motor impairments commonly seen post-concussion.",
    position: "Seated.",
    procedure: "Tests Smooth Pursuits, Saccades (horizontal/vertical), Near Point of Convergence, VOR (horizontal/vertical), and Visual Motion Sensitivity.",
    positive_finding: "Provocation of symptoms (headache, dizziness, nausea, fogginess) > 2 points from baseline, or abnormal convergence distance.",
    sensitivity: "High",
    specificity: "Moderate-High",
    clinical_pearls: "Highly sensitive for detecting concussion compared to SCAT5 alone. Vital for guiding vestibular PT interventions.",
    related_impairments: ["Concussion", "Vestibular Dysfunction"],
    related_muscles: ["Extraocular Muscles"],
    related_exercises: ["Brock String", "Gaze Stabilization (VOR X1)"],
    source_books: ["Clinical practice guidelines for concussion"],
    evidence_level: "Strong"
  },
  {
    name: "Balance Error Scoring System (BESS)",
    region: "Systemic/Any",
    category: "Neurological / Balance",
    condition: "Concussion / Postural Instability",
    purpose: "Objective assessment of postural stability.",
    position: "Standing on firm and foam surfaces.",
    procedure: "Three stances (double leg, single leg, tandem) tested with eyes closed for 20 seconds. Count errors (e.g., opening eyes, stepping out, hip >30deg flexion).",
    positive_finding: "Increased error count indicating balance deficits.",
    sensitivity: "Moderate",
    specificity: "High",
    clinical_pearls: "Excellent for establishing baselines and tracking progress in safe return to play for athletes.",
    related_impairments: ["Concussion", "Ankle Sprain"],
    related_muscles: ["Lower Extremity Stabilizers", "Core"],
    related_exercises: ["Single Leg Stance", "Proprioceptive Board"],
    source_books: ["Sports Physical Therapy"],
    evidence_level: "Strong"
  },
  {
    name: "Single Leg Decline Squat",
    region: "Knee",
    category: "Provocation",
    condition: "Patellar Tendinopathy",
    purpose: "Provoke symptoms associated with patellar 'Jumper's Knee'.",
    position: "Standing on a 25-degree decline board.",
    procedure: "Patient performs a single leg squat to 60-90 degrees flexion.",
    positive_finding: "Pain located specifically at the inferior pole of the patella.",
    sensitivity: "High",
    specificity: "High",
    clinical_pearls: "Better at provoking pathology than a flat-surface squat because it isolates the extensor mechanism by reducing calf/ankle joint contribution.",
    related_impairments: ["Patellar Tendinopathy (Jumper's Knee)"],
    related_muscles: ["Quadriceps"],
    related_exercises: ["Eccentric Decline Squat", "Isometric Knee Extension"],
    source_books: ["Clinical Sports Medicine (Brukner & Khan)"],
    evidence_level: "Strong"
  }
];

const testsPath = path.join(__dirname, 'special-tests.ts');
let testsDataStr = fs.readFileSync(testsPath, 'utf8');

// The file exports 'export const specialTests: SpecialTest[] = ['
// Let's find the closing brace of the array
const searchStr = 'export const specialTests: SpecialTest[] = [';
const insertIndex = testsDataStr.indexOf(searchStr) + searchStr.length;

// Ensure we get dynamic ID
// Wait, doing this via string manipulation could be very error prone since the file is 5600 lines.
// Let's instead write a quick node script that reads it, but since it's a TS file maybe we can just do regex or split?
// Actually, it's easier to append the string format of the objects after the opening bracket.

// Instead of parsing, we will format our newTests as a string
let appendedStr = '\n';
newTests.forEach((t, i) => {
    // Generate an arbitrary high ID to avoid collisions, or we can just omit id and let the object be as is
    // The interface requires an ID, so let's give it 10000 + i
    const objStr = JSON.stringify({ ...t, id: 10000 + i }, null, 2);
    appendedStr += objStr + ',\n';
});

const updatedDataStr = testsDataStr.slice(0, insertIndex) + appendedStr + testsDataStr.slice(insertIndex);
fs.writeFileSync(testsPath, updatedDataStr);

console.log('Successfully appended tests.');
