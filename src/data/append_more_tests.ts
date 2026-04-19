import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const newTests = [
  {
    name: "Homan's Sign",
    region: "Lower Extremity",
    category: "Vascular",
    condition: "Deep Vein Thrombosis (DVT)",
    purpose: "Assess for deep vein thrombosis in the calf.",
    position: "Patient supine or seated with knee extended.",
    procedure: "Examiner forcefully and abruptly dorsiflexes the patient's foot while squeezing the calf.",
    positive_finding: "Deep calf pain.",
    sensitivity: "50%",
    specificity: "Low",
    clinical_pearls: "Not reliable on its own. Strongly advised to use the Wells Criteria for DVT instead due to low accuracy and risk of clot dislodgement.",
    related_impairments: ["Deep Vein Thrombosis (DVT)"],
    related_muscles: ["Gastrocnemius", "Soleus"],
    related_exercises: [],
    source_books: ["Magee's Orthopedic Physical Assessment"],
    evidence_level: "Weak"
  },
  {
    name: "Slocum Test",
    region: "Knee",
    category: "Ligament / Instability",
    condition: "Anterolateral / Anteromedial Rotatory Instability (ALRI/AMRI)",
    purpose: "Test for rotatory instability of the knee.",
    position: "Supine with knee flexed to 90° and hip flexed to 45°.",
    procedure: "For ALRI, foot is internally rotated 30°. For AMRI, foot is externally rotated 15°. Examiner sits on the foot and applies an anterior drawer force.",
    positive_finding: "Excessive anterior tibial translation compared to the unaffected side.",
    sensitivity: "Moderate",
    specificity: "High",
    clinical_pearls: "Used to differentiate single-plane instability from multi-plane rotatory instabilities common with combined ACL/MCL or ACL/LCL injuries.",
    related_impairments: ["ACL Tear", "MCL Tear", "LCL Tear"],
    related_muscles: ["Quadriceps", "Hamstrings"],
    related_exercises: ["Closed Chain Knee Extension"],
    source_books: ["Special Tests in Musculoskeletal Examination"],
    evidence_level: "Moderate"
  },
  {
    name: "Dial Test",
    region: "Knee",
    category: "Ligament / Instability",
    condition: "Posterolateral Corner (PLC) Injury",
    purpose: "Assess for posterolateral rotatory instability (PLC vs PCL involvement).",
    position: "Prone or supine. Heels/ankles extended off the table.",
    procedure: "Examiner externally rotates bilateral tibias at both 30° and 90° of knee flexion.",
    positive_finding: ">10° increase in external rotation on the involved side compared with the contralateral side.",
    sensitivity: "Moderate",
    specificity: "High",
    clinical_pearls: "Difference at 30° only = isolated PLC. Difference at 30° AND 90° = combined PLC and PCL injury.",
    related_impairments: ["Posterolateral Corner (PLC) Injury", "PCL Tear"],
    related_muscles: ["Popliteus", "Biceps Femoris"],
    related_exercises: ["Hamstring Curls", "Popliteus Strengthening"],
    source_books: ["Magee's Orthopedic Physical Assessment"],
    evidence_level: "Strong"
  },
  {
    name: "Quadriceps Active Test",
    region: "Knee",
    category: "Ligament / Instability",
    condition: "PCL Tear",
    purpose: "Evaluate posterior cruciate ligament integrity via the posterior sag.",
    position: "Supine with knee flexed to 90°.",
    procedure: "With foot stabilized on table, ask patient to actively slide foot forward down the table (isometric quadriceps contraction).",
    positive_finding: "Anterior reduction of the posteriorly subluxed tibia.",
    sensitivity: "98%",
    specificity: "100%",
    clinical_pearls: "Excellent to confirm PCL insufficiency when combined with Godfrey's Posterior Sag Sign.",
    related_impairments: ["PCL Tear"],
    related_muscles: ["Quadriceps"],
    related_exercises: ["Isometric Quad Setting"],
    source_books: ["Magee's Orthopedic Physical Assessment", "Brukner & Khan"],
    evidence_level: "Strong"
  },
  {
    name: "Bounce Home Test",
    region: "Knee",
    category: "Cartilage / Meniscus",
    condition: "Meniscal Tear",
    purpose: "Assess for mechanical block of knee extension, often meniscal.",
    position: "Patient supine.",
    procedure: "Examiner cups the heel and passively flexes the knee, then allows it to passively drop into extension.",
    positive_finding: "Inability to reach full extension, or a rubbery end-feel with pain in the joint line.",
    sensitivity: "47%",
    specificity: "67%",
    clinical_pearls: "Good for identifying loose bodies or 'bucket handle' meniscal tears locking the joint.",
    related_impairments: ["Medial Meniscus Tear", "Lateral Meniscus Tear"],
    related_muscles: ["Popliteus"],
    related_exercises: ["AAROM Knee Extension"],
    source_books: ["Special Tests in Musculoskeletal Examination"],
    evidence_level: "Moderate"
  },
  {
    name: "Ege's Test",
    region: "Knee",
    category: "Cartilage / Meniscus",
    condition: "Meniscal Tear",
    purpose: "Weight-bearing assessment for meniscal tears.",
    position: "Standing with feet 30-40cm apart.",
    procedure: "Medial Meniscus: Feet fully externally rotated, squat down then up. Lateral Meniscus: Feet fully internally rotated, squat.",
    positive_finding: "Pain or a palpable/audible click over the joint line.",
    sensitivity: "67%",
    specificity: "81%",
    clinical_pearls: "A weight-bearing equivalent of the McMurray Test. Often more clinically relevant as it replicates functional loading.",
    related_impairments: ["Medial Meniscus Tear", "Lateral Meniscus Tear"],
    related_muscles: ["Quadriceps"],
    related_exercises: ["Shallow Squats"],
    source_books: ["Special Tests in Musculoskeletal Examination"],
    evidence_level: "Moderate-Strong"
  },
  {
    name: "Thumb CMC Grind Test",
    region: "Wrist/Hand",
    category: "Provocation",
    condition: "Thumb CMC Osteoarthritis",
    purpose: "Assess for arthritis/degeneration of the 1st carpometacarpal joint.",
    position: "Sitting.",
    procedure: "Examiner grips the patient's 1st metacarpal and applies axial compression while rotating against the trapezium.",
    positive_finding: "Pain, crepitus, or grinding at the CMC joint.",
    sensitivity: "42-53%",
    specificity: "80-93%",
    clinical_pearls: "High specificity makes it useful for ruling in CMC OA. Differentiate from De Quervain's given the proximity.",
    related_impairments: ["Thumb CMC Osteoarthritis"],
    related_muscles: ["Abductor Pollicis Longus", "Extensor Pollicis Brevis"],
    related_exercises: ["Thumb Radial Abduction Isometrics"],
    source_books: ["Magee's Orthopedic Physical Assessment"],
    evidence_level: "Strong"
  },
  {
    name: "Lunotriquetral Ballottement Test (Reagan's)",
    region: "Wrist/Hand",
    category: "Instability",
    condition: "Lunotriquetral Instability",
    purpose: "Assess the stability of the lunotriquetral interosseous ligament.",
    position: "Sitting.",
    procedure: "Examiner grasps the lunate between thumb/index finger of one hand, and the triquetrum with the other. Apply dorsal-volar glides of the triquetrum on the lunate.",
    positive_finding: "Excessive laxity, pain, or crepitus.",
    sensitivity: "Good",
    specificity: "Moderate",
    clinical_pearls: "Important for diagnosing ulnar-sided wrist pain. Compare to the uninjured side.",
    related_impairments: ["Wrist Instability", "TFCC Injury"],
    related_muscles: ["Extensor Carpi Ulnaris"],
    related_exercises: ["Wrist Stabilization with Dart Throws"],
    source_books: ["Special Tests in Musculoskeletal Examination"],
    evidence_level: "Moderate"
  },
  {
    name: "Sign of the Buttock",
    region: "Hip/Pelvis",
    category: "Red Flag",
    condition: "Gluteal/Pelvic Serious Pathology",
    purpose: "Differentiate between lumbar/sciatic pain and serious posterior hip/pelvic pathology.",
    position: "Supine.",
    procedure: "Perform an SLR. If restricted, flex the knee and see if hip flexion increases. If hip flexion remains the same/restricted, it is a positive sign.",
    positive_finding: "No increase in hip flexion when the knee is flexed.",
    sensitivity: "High for major pathology",
    specificity: "High",
    clinical_pearls: "A critical Red Flag test for conditions like osteomyelitis, infectious sacroiliitis, fracture, or neoplasm. Requires immediate medical referral.",
    related_impairments: ["Sacroiliitis", "Pelvic Neoplasm", "Gluteal Abscess"],
    related_muscles: ["Gluteus Maximus"],
    related_exercises: [],
    source_books: ["Magee's Orthopedic Physical Assessment"],
    evidence_level: "Strong"
  },
  {
    name: "Fulcrum Test",
    region: "Hip/Femur",
    category: "Red Flag",
    condition: "Femoral Neck / Shaft Stress Fracture",
    purpose: "Assess for stress fracture of the femoral shaft.",
    position: "Patient seated on the edge of the bed.",
    procedure: "Examiner places forearm under the distal thigh to act as a fulcrum, and applies downward pressure on the anterior distal femur.",
    positive_finding: "Sharp pain mimicking the patient's symptoms.",
    sensitivity: "High",
    specificity: "High",
    clinical_pearls: "Excellent screening tool before functional hop tests if stress fracture is suspected. Positive test mandates imaging.",
    related_impairments: ["Stress Fracture (Femur)"],
    related_muscles: ["Quadriceps", "Hamstrings"],
    related_exercises: [],
    source_books: ["Special Tests in Musculoskeletal Examination"],
    evidence_level: "Strong"
  }
];

const testsPath = path.join(__dirname, 'special-tests.ts');
let testsDataStr = fs.readFileSync(testsPath, 'utf8');

const searchStr = 'export const specialTests: SpecialTest[] = [';
const insertIndex = testsDataStr.indexOf(searchStr) + searchStr.length;

let appendedStr = '\n';
newTests.forEach((t, i) => {
    // Arbitrary id
    const objStr = JSON.stringify({ ...t, id: 20000 + i }, null, 2);
    appendedStr += objStr + ',\n';
});

const updatedDataStr = testsDataStr.slice(0, insertIndex) + appendedStr + testsDataStr.slice(insertIndex);
fs.writeFileSync(testsPath, updatedDataStr);

console.log('Successfully appended more tests.');
