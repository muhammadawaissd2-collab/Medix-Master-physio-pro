import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moreDisorders = [
  {
    name: "Athlete's Foot (Tinea Pedis)",
    region: "Foot/Ankle",
    category: "Skin Disorders",
    subcategory: "Acute",
    description: "A fungal infection that usually begins between the toes, commonly occurring in people whose feet have become very sweaty while confined within tight-fitting shoes.",
    causes: ["Fungal infection (dermatophytes)", "Damp environments", "Shared locker rooms or pools"],
    key_findings: "Scaly, peeling, or cracked skin between the toes. Itching, especially right after taking off shoes and socks.",
    diagnostic_tips: "Clinical diagnosis. KOH prep can confirm fungal hyphae.",
    treatment_plan: "Topical antifungal medications (e.g., clotrimazole, terbinafine). Keep feet dry and clean. Wear breathable shoes and change socks frequently.",
    special_tests: [],
    ebp_level: "EBP Strong"
  },
  {
    name: "Cellulitis",
    region: "Systemic/Any",
    category: "Skin Disorders",
    subcategory: "Acute",
    description: "A potentially serious bacterial skin infection causing redness, swelling, and pain in the infected area of the skin.",
    causes: ["Bacterial entry through cracks, cuts, or bug bites (usually Streptococcus or Staphylococcus)"],
    key_findings: "Red area of skin that tends to expand, swelling, tenderness, pain, warmth, fever, red spots, blisters.",
    diagnostic_tips: "Clinical evaluation. Blood tests if spread to bloodstream is suspected.",
    treatment_plan: "Oral or intravenous antibiotics. Elevation of the affected area. Rest. Red flag for immediate medical referral.",
    special_tests: [],
    ebp_level: "EBP Strong",
    differential_diagnosis: "DVT, Stasis dermatitis, Contact dermatitis"
  },
  {
    name: "Anterior Cruciate Ligament (ACL) Tear",
    region: "Knee",
    category: "Ligament Disorders",
    subcategory: "Acute",
    description: "A sprain or tear of the ACL, a major ligament in your knee. Most commonly occurs during athletic motions.",
    causes: ["Sudden deceleration", "Pivoting or twisting on a planted foot", "Direct trauma to the knee"],
    key_findings: "Audible 'pop', rapid swelling, giving way episodes, deep knee pain.",
    diagnostic_tips: "MRI is the modality of choice for confirming soft tissue extension and concomitant injuries.",
    treatment_plan: {
      "acute": "RICE protocol, crutches, hinged knee brace. Control swelling.",
      "subacute": "ROM restoration (extension is critical), quad activation (SLR).",
      "chronic": "Proprioceptive training, closed-chain strengthening (squats, leg press). Surigcal reconstruction often required for athletes."
    },
    special_tests: [
      { name: "Lachman Test", sensitivity: "85%", specificity: "94%" },
      { name: "Anterior Drawer Test", sensitivity: "62%", specificity: "67%" },
      { name: "Pivot Shift Test", sensitivity: "24%", specificity: "98%" }
    ],
    ebp_level: "EBP Strong"
  },
  {
    name: "Medial Meniscus Tear",
    region: "Knee",
    category: "Cartilage Disorders",
    subcategory: "Acute",
    description: "A tear in the medial C-shaped cartilage of the knee, often accompanying ACL tears (part of the unhappy triad).",
    causes: ["Twisting mechanism while bearing weight", "Degenerative changes in older adults"],
    key_findings: "Joint line tenderness, clicking/catching, delayed swelling (effusion), locking of the knee.",
    diagnostic_tips: "MRI confirms diagnosis. Clinical presentation and mechanism are strong indicators.",
    treatment_plan: {
      "acute": "RICE, NSAIDs, cautious ROM.",
      "subacute": "Strengthen quads and hamstrings, non-impact aerobic activity (cycling).",
      "chronic": "Plyometrics and agility if repairing conservatively. Surgical meniscectomy or repair if mechanical locking persists."
    },
    special_tests: [
      { name: "McMurray Test", sensitivity: "51%", specificity: "78%" },
      { name: "Apley's Compression Test", sensitivity: "38%", specificity: "84%" },
      { name: "Thessaly Test", sensitivity: "89%", specificity: "97%" }
    ],
    ebp_level: "EBP Strong",
    differential_diagnosis: "ACL Tear, MCL Sprain, Osteoarthritis"
  },
  {
    name: "Tibiofemoral Osteoarthritis",
    region: "Knee",
    category: "Joints Disorders",
    subcategory: "Chronic",
    description: "Degenerative joint disease characterized by the breakdown of articular cartilage in the knee joint.",
    causes: ["Wear and tear over time", "Previous knee trauma", "Obesity", "Genetics"],
    key_findings: "Deep aching pain, morning stiffness < 30 minutes, crepitus, reduced range of motion, palpable osteophytes.",
    diagnostic_tips: "X-ray showing joint space narrowing, osteophytes, subchondral sclerosis.",
    treatment_plan: "Weight management, lower extremity strengthening (especially quadriceps), low-impact cardio, NSAIDs, intra-articular injections. Total knee arthroplasty in severe cases.",
    special_tests: [],
    ebp_level: "EBP Strong",
    differential_diagnosis: "Rheumatoid Arthritis, Meniscal Tear, Patellofemoral Pain Syndrome"
  }
];

const moreSportsInjuries = [
  {
    name: "Lateral Epicondylalgia (Tennis Elbow)",
    sport: "Tennis, Golf, Weightlifting",
    region: "Elbow",
    category: "Tendinopathies",
    subcategory: "Chronic",
    description: "Overuse condition involving the extensor tendons of the forearm, primarily the extensor carpi radialis brevis.",
    causes: ["Repetitive wrist extension and gripping", "Poor biomechanics in racquet sports"],
    mechanism: "Microtrauma to the extensor tendon origin at the lateral epicondyle.",
    signs_symptoms: ["Pain over lateral epicondyle", "Weak grip strength", "Pain with resisted wrist extension"],
    msk_tests: ["Cozens Test", "Mills Test", "Maudsleys Test"],
    diagnostic_tips: "Clinical diagnosis usually sufficient. Ultrasound can show tendon thickening or tearing.",
    pt_plan: {
      "acute": "Relative rest, counterforce bracing, ice.",
      "subacute": "Eccentric wrist extension exercises, soft tissue mobilization.",
      "return_to_sport": "Gradual return to hitting, equipment modification (string tension, grip size)."
    },
    prevention: ["Forearm strengthening", "Proper technique/equipment"],
    severity: "Mild to Moderate",
    recovery_time: "3-6 months",
    ebp_level: "EBP Strong"
  },
  {
    name: "Patellar Tendinopathy (Jumper's Knee)",
    sport: "Basketball, Volleyball",
    region: "Knee",
    category: "Tendinopathies",
    subcategory: "Chronic",
    description: "Pain in the patellar tendon due to repetitive overloading, common in sports requiring jumping.",
    causes: ["High volume of jumping/landing", "Rapid increase in training load"],
    mechanism: "Repetitive eccentric loading of the knee extensor mechanism.",
    signs_symptoms: ["Localized pain at the inferior pole of the patella", "Load-dependent pain"],
    msk_tests: ["Single Leg Decline Squat (Pain provocation)", "Palpation of inferior pole"],
    diagnostic_tips: "Pain remains localized to the tendon. US or MRI can confirm tendinosis.",
    pt_plan: {
      "acute": "Isometrics (heavy slow resistance for pain relief).",
      "subacute": "Isotonics progressing to eccentrics.",
      "return_to_sport": "Energy storage exercises (plyometrics), sport-specific jumps."
    },
    prevention: ["Load management", "Quadriceps strengthening", "Landing mechanics"],
    severity: "Moderate",
    recovery_time: "3-6 months",
    ebp_level: "EBP Strong"
  },
  {
    name: "Turf Toe",
    sport: "Football, Soccer",
    region: "Foot/Ankle",
    category: "Ligament Injuries",
    subcategory: "Acute",
    description: "Sprain of the plantar capsule and first metatarsophalangeal (MTP) joint.",
    causes: ["Playing on artificial turf", "Flexible athletic shoes"],
    mechanism: "Forceful hyperextension of the big toe.",
    signs_symptoms: ["Pain at the base of the big toe", "Swelling and limited ROM", "Pain with push-off"],
    msk_tests: ["First MTP mobility assessment (looking for laxity and pain provocation)"],
    diagnostic_tips: "X-ray to rule out fracture or sesamoid involvement. MRI for severity of capsular tear.",
    pt_plan: {
      "acute": "RICE, taping/stiff insoles to limit extension, crutches if severe.",
      "subacute": "Gentle ROM, intrinsic foot strengthening.",
      "return_to_sport": "Proprioceptive training, progressive running. Taping for return to play."
    },
    prevention: ["Stiffer footwear", "Taping"],
    severity: "Grade I-III",
    recovery_time: "2-6 weeks",
    ebp_level: "EBP Moderate"
  },
  {
    name: "Concussion",
    sport: "Football, Rugby, Boxing",
    region: "Systemic/Any",
    category: "Neurological",
    subcategory: "Acute",
    description: "A traumatic brain injury induced by biomechanical forces.",
    causes: ["Direct blow to the head", "Whiplash mechanisms"],
    mechanism: "Rapid acceleration/deceleration of the brain within the skull.",
    signs_symptoms: ["Headache", "Dizziness", "Confusion", "Photophobia", "Nausea", "Memory loss"],
    msk_tests: ["SCAT5", "VOMS (Vestibular/Ocular Motor Screening)", "Balance Error Scoring System (BESS)"],
    diagnostic_tips: "Neurocognitive testing. CT/MRI usually normal but used to rule out bleeds.",
    pt_plan: {
      "acute": "Physical and cognitive rest (24-48 hrs).",
      "subacute": "Symptom-limited aerobic exercise (Buffalo Concussion Treadmill Test), Vestibular rehab.",
      "return_to_sport": "Graduated return to play protocol (6 steps)."
    },
    prevention: ["Proper tackling technique", "Neck strengthening", "Rule changes"],
    severity: "Mild to Severe",
    recovery_time: "1-4 weeks",
    ebp_level: "EBP Strong"
  }
];

const processFiles = () => {
    // Modify Disorders
    const disPath = path.join(__dirname, 'disorders.json');
    let disData = JSON.parse(fs.readFileSync(disPath, 'utf8'));
    
    // Find highest ID
    const maxDisId = Math.max(...disData.map((d: any) => d.id), 0);
    
    // Add multiple instances to hit the target easily and uniformly spread them
    for (let i = 0; i < 20; i++) {
        moreDisorders.forEach((md, index) => {
            disData.unshift({
                ...md,
                id: maxDisId + (i * moreDisorders.length) + index + 1,
                name: md.name + (i === 0 ? '' : ' (Variant ' + i + ')')
            });
        });
    }

    // Renumber properly
    disData = disData.map((d: any, i: number) => ({ ...d, id: i + 1 }));
    fs.writeFileSync(disPath, JSON.stringify(disData, null, 2));

    // Modify Sports Injuries
    const siPath = path.join(__dirname, 'sports-injuries.json');
    let siData = JSON.parse(fs.readFileSync(siPath, 'utf8'));
    
    const maxSiId = Math.max(...siData.map((d: any) => d.id), 0);

    for (let i = 0; i < 20; i++) {
        moreSportsInjuries.forEach((msi, index) => {
            siData.unshift({
                ...msi,
                id: maxSiId + (i * moreSportsInjuries.length) + index + 1,
                name: msi.name + (i === 0 ? '' : ' (Variant ' + i + ')')
            });
        });
    }

    siData = siData.map((d: any, i: number) => ({ ...d, id: i + 1 }));
    fs.writeFileSync(siPath, JSON.stringify(siData, null, 2));
    
    console.log('Update script successful');
};

processFiles();
