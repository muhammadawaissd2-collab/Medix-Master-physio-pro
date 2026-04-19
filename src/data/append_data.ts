import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const labralTears = [
  {
    name: "SLAP Tear (Superior Labrum Anterior to Posterior)",
    region: "Shoulder",
    category: "Labral tears",
    subcategory: "Types of Given Injuries",
    description: "An injury to the superior part of the labrum from anterior to posterior, often affecting the biceps anchor.",
    causes: ["Repetitive overhead activity (throwing)", "Fall on outstretched arm", "Traction injury"],
    key_findings: "Deep shoulder pain, 'clicking' or 'catching' sensation, pain with overhead movement or throwing.",
    diagnostic_tips: "MRI Arthrography is gold standard. Often presents with concomitant rotator cuff or biceps pathology.",
    treatment_plan: {
      acute: "Sling for comfort, cryotherapy, NSAIDs, gentle PROM.",
      subacute: "Rotator cuff and scapular stabilizer strengthening, stretching of posterior capsule.",
      chronic: "Progress to overhead and sport-specific activities. Surgical repair if conservative fails."
    },
    special_tests: [
      { name: "O'Brien's Test", sensitivity: "54%", specificity: "47%" },
      { name: "Crank Test", sensitivity: "46%", specificity: "56%" },
      { name: "Biceps Load Test II", sensitivity: "90%", specificity: "97%" }
    ],
    ebp_level: "EBP Moderate",
    differential_diagnosis: "Biceps tendinopathy, Rotator cuff tear, AC joint sprain"
  },
  {
    name: "Bankart Tear (Anterior-Inferior Labrum)",
    region: "Shoulder",
    category: "Labral tears",
    subcategory: "Types of Given Injuries",
    description: "An injury to the anterior-inferior aspect of the glenoid labrum. Often occurs as a result of anterior shoulder dislocation.",
    causes: ["Acute anterior shoulder dislocation", "Repetitive anterior instability"],
    key_findings: "Apprehension with extreme external rotation and abduction. Sensation of shoulder instability.",
    diagnostic_tips: "X-ray may show bony Bankart. MRI Arthrography is best for soft tissue evaluation.",
    treatment_plan: {
       acute: "Immobilization in internal rotation (or external depending on protocol), avoid combined Abduction + ER.",
       subacute: "Closed kinetic chain exercises, subscapularis strengthening.",
       chronic: "Dynamic stabilization, plyometrics."
    },
    special_tests: [
      { name: "Apprehension Test", sensitivity: "65%", specificity: "95%" },
      { name: "Relocation Test", sensitivity: "50%", specificity: "90%" }
    ],
    ebp_level: "EBP Strong"
  },
  {
    name: "Posterior Labral Tear",
    region: "Shoulder",
    category: "Labral tears",
    subcategory: "Types of Given Injuries",
    description: "Injury to the posterior structural labrum, frequently leading to posterior shoulder instability.",
    causes: ["Direct trauma (MVA, fall on forward flexed arm)", "Repetitive microtrauma (bench press, offensive linemen)"],
    key_findings: "Posterior shoulder pain, mechanical symptoms, posterior instability.",
    diagnostic_tips: "Can be difficult to detect clinically; often misdiagnosed as posterior cuff tendinitis.",
    treatment_plan: {
      acute: "Immobilization, avoid end-range internal rotation and cross-body adduction.",
      subacute: "Posterior deltoid and infraspinatus/teres minor strengthening.",
      chronic: "Return to pressing activities with restricted depth."
    },
    special_tests: [
      { name: "Jerk Test", sensitivity: "73%", specificity: "98%" },
      { name: "Kim Test", sensitivity: "80%", specificity: "94%" }
    ],
    ebp_level: "EBP Moderate"
  },
  {
     name: "Reverse Bankart Tear",
     region: "Shoulder",
     category: "Labral tears",
     subcategory: "Types of Given Injuries",
     description: "A tear of the posterior-inferior labrum, associated with posterior shoulder dislocation.",
     causes: ["Posterior shoulder dislocation", "Seizure or electrical shock causing violent internal rotation"],
     key_findings: "Pain and apprehension when the arm is loaded in posterior direction (flexion, internal rotation).",
     diagnostic_tips: "Look for reverse Hill-Sachs lesion (McLaughlin lesion) on anterior humeral head.",
     treatment_plan: {
       acute: "Sling immobilization, caution with horizontal adduction and internal rotation.",
       subacute: "Rotator cuff strengthening emphasizing ER and scapular retractors.",
       chronic: "Rhythmic stabilization, perturbation training."
     },
     special_tests: [
       { name: "Posterior Apprehension Test", sensitivity: "19%", specificity: "99%" }
     ],
     ebp_level: "EBP Moderate"
  }
];

const diffDiagnoses = [
  {
    name: "Lumbar Disc Herniation (HNP)",
    body_region: "Lower Back",
    category: "Neuromusculoskeletal",
    description: "Extrusion of the nucleus pulposus through the annulus fibrosus, frequently compressing a nerve root.",
    red_flags: ["Saddle anesthesia", "Bowel/bladder dysfunction (Cauda Equina)", "Progressive neurological deficit"],
    key_findings: "Unilateral radiating leg pain (sciatica) below the knee, worse with flexion, better with extension.",
    diagnostic_tests: ["MRI without contrast (Gold Standard)", "EMG/NCS for nerve involvement"],
    msk_tests: ["Straight Leg Raise (SLR)", "Slump Test", "Crossed SLR"],
    differential_conditions: ["Lumbar Spondylosis", "Piriformis Syndrome", "SI Joint Dysfunction"],
    referral_criteria: "Immediate referral to ED for Cauda Equina symptoms or rapid neurological decline."
  },
  {
    name: "Lumbar Spinal Stenosis",
    body_region: "Lower Back",
    category: "Degenerative",
    description: "Narrowing of the spinal canal or intervertebral foramina, resulting in neurogenic claudication.",
    red_flags: ["Major motor weakness", "Bilateral severe radiating symptoms"],
    key_findings: "Bilateral leg pain/heaviness with walking or standing, relieved by sitting or lumbar flexion (shopping cart sign).",
    diagnostic_tests: ["MRI", "CT Myelogram"],
    msk_tests: ["Bicycle Test (van Gelderen)"],
    differential_conditions: ["Vascular Claudication (PAD)", "Lumbar Disc Herniation", "Diabetic Neuropathy"],
    referral_criteria: "Refer to neuro/ortho spine if conservative management fails after 6-12 weeks."
  },
  {
    name: "Carpal Tunnel Syndrome",
    body_region: "Upper Extremity",
    category: "Nerve conditions",
    description: "Compression neuropathic condition of the median nerve at the wrist.",
    red_flags: ["Severe thenar atrophy", "Complete sensory loss"],
    key_findings: "Numbness/tingling in the thumb, index, middle, and half of ring finger. Night pain. Dropping objects.",
    diagnostic_tests: ["EMG/NCS", "Ultrasound"],
    msk_tests: ["Phalen's Test", "Tinel's Sign at wrist", "Carpal Compression Test"],
    differential_conditions: ["Cervical Radiculopathy (C6-C7)", "Median Nerve Entrapment (Pronator Teres Syndrome)"],
    referral_criteria: "Refer for surgical decompression if thenar atrophy or severe EMG findings are present."
  },
  {
    name: "Cubital Tunnel Syndrome",
    body_region: "Upper Extremity",
    category: "Nerve conditions",
    description: "Ulnar nerve compression at the elbow.",
    red_flags: ["Intrinsic muscle wasting (claw hand)", "Loss of hand dexterity"],
    key_findings: "Numbness/tingling in pinky and medial half of ring finger, elbow pain, worsened by elbow flexion.",
    diagnostic_tests: ["EMG/NCS"],
    msk_tests: ["Tinel's at Cubital Tunnel", "Elbow Flexion Test"],
    differential_conditions: ["C8-T1 Radiculopathy", "Thoracic Outlet Syndrome", "Guyon's Canal Syndrome"],
    referral_criteria: "Refer to hand surgeon if constant numbness or intrinsic muscle weakness is present."
  },
  {
    name: "Deep Vein Thrombosis (DVT)",
    body_region: "Lower Extremity",
    category: "Vascular",
    description: "Formation of a blood clot in a deep vein, most commonly the calf or thigh.",
    red_flags: ["Sudden intense unilateral leg swelling", "Chest pain or shortness of breath (Pulmonary Embolism)"],
    key_findings: "Unilateral leg swelling, warmth, redness, and deep calf pain.",
    diagnostic_tests: ["Venous Doppler Ultrasound", "D-dimer assay"],
    msk_tests: ["Wells Criteria for DVT", "Homans' Sign (low reliability but classical)"],
    differential_conditions: ["Cellulitis", "Baker's Cyst Rupture", "Gastrocnemius Tear (Tennis Leg)"],
    referral_criteria: "IMMEDIATE Emergency Department referral if suspected."
  },
  {
    name: "Peripheral Artery Disease (PAD)",
    body_region: "Lower Extremity",
    category: "Vascular",
    description: "Atherosclerotic narrowing of peripheral arteries, causing ischemia.",
    red_flags: ["Rest pain suggesting critical limb ischemia", "Non-healing foot ulcers"],
    key_findings: "Intermittent claudication (cramping pain in calf with consistently reproducible exertion, improving with rest).",
    diagnostic_tests: ["Ankle-Brachial Index (ABI) < 0.9", "Doppler Ultrasound"],
    msk_tests: ["Pulse palpation (pedal, posterior tibial)", "Capillary refill"],
    differential_conditions: ["Lumbar Spinal Stenosis (Neurogenic Claudication)", "DVT", "Chronic Venous Insufficiency"],
    referral_criteria: "Refer to vascular specialist if ABI < 0.9 or evidence of critical limb ischemia."
  }
];

const processFiles = () => {
    // Modify Disorders
    const disPath = path.join(__dirname, 'disorders.json');
    let disData = JSON.parse(fs.readFileSync(disPath, 'utf8'));
    // Map existing IDs
    const maxDisId = Math.max(...disData.map((d: { id: number }) => d.id));
    labralTears.forEach((lt, i) => {
        disData.unshift({ ...lt, id: maxDisId + i + 1 });
    });
    // Renumber to ensure proper sequence
    disData = disData.map((d: { id: number }, i: number) => ({ ...d, id: i + 1 }));
    fs.writeFileSync(disPath, JSON.stringify(disData, null, 2));

    // Modify Differential Diagnoses
    const diffPath = path.join(__dirname, 'differential-diagnosis.json');
    let diffData = JSON.parse(fs.readFileSync(diffPath, 'utf8'));
    const maxDiffId = Math.max(...diffData.map((d: { id: number }) => d.id));
    diffDiagnoses.forEach((dd, i) => {
        diffData.unshift({ ...dd, id: maxDiffId + i + 1 });
    });
    // Renumber
    diffData = diffData.map((d: { id: number }, i: number) => ({ ...d, id: i + 1 }));
    fs.writeFileSync(diffPath, JSON.stringify(diffData, null, 2));
    
    console.log('Update script successful');
};

processFiles();
