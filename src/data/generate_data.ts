import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to write JSON
const writeJson = (filename: string, data: unknown) => {
  fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(data, null, 2));
};

const disorders = [
  {
    "id": 1,
    "name": "Cervical Radiculopathy",
    "region": "Cervical",
    "category": "Nerve Disorders",
    "subcategory": "Chronic",
    "description": "Compression or irritation of a cervical nerve root, commonly causing pain, numbness, or weakness in the upper extremity. Often due to disc herniation or spondylosis.",
    "causes": ["Disc herniation", "Cervical spondylosis", "Osteophyte formation", "Trauma"],
    "key_findings": "Unilateral arm pain, numbness in a dermatomal pattern, weakness in myotome, decreased reflexes.",
    "diagnostic_tips": "Spurling's test positive, relief with cervical distraction, MRI to confirm root compression.",
    "treatment_plan": {
      "acute": "Pain management, cervical collar (briefly), gentle ROM, NSAIDs.",
      "subacute": "Cervical traction, deep neck flexor strengthening, nerve gliding exercises.",
      "chronic": "Postural correction, progressive resistive exercises, ergonomics."
    },
    "special_tests": [
      { "name": "Spurling's Test", "sensitivity": "30%", "specificity": "93%" },
      { "name": "Cervical Distraction", "sensitivity": "44%", "specificity": "90%" }
    ],
    "ebp_level": "EBP Strong"
  },
  {
    "id": 2,
    "name": "Rotator Cuff Tear",
    "region": "Shoulder",
    "category": "Muscle Disorders",
    "subcategory": "Acute",
    "description": "A tear in one or more of the tendons of the rotator cuff muscles, most commonly the supraspinatus. Can be partial or full thickness.",
    "causes": ["Acute trauma (fall, lifting)", "Chronic repetitive stress", "Impingement syndrome", "Age-related degeneration"],
    "key_findings": "Pain over lateral deltoid, weakness with abduction and external rotation, night pain.",
    "diagnostic_tips": "Drop arm sign positive, painful arc, weakness on empty can test. MRI is gold standard.",
    "treatment_plan": {
      "acute": "Sling for comfort, cryotherapy, pendulum exercises, avoid active abduction.",
      "subacute": "AAROM, isometrics for intact muscles, scapular stabilization.",
      "chronic": "Isotonic strengthening (open and closed chain), plyometrics if returning to sports."
    },
    "special_tests": [
      { "name": "Drop Arm Test", "sensitivity": "73%", "specificity": "77%" },
      { "name": "Empty Can Test", "sensitivity": "74%", "specificity": "30%" }
    ],
    "ebp_level": "EBP Strong"
  },
  {
    "id": 3,
    "name": "Lumbar Spondylolisthesis",
    "region": "Lumbar",
    "category": "Bone Disorders",
    "subcategory": "Chronic",
    "description": "Forward translation of one vertebral body over the adjacent vertebra below, most commonly at L4-L5 or L5-S1. Often causes mechanical low back pain or neurogenic claudication.",
    "causes": ["Degenerative (facet arthritis)", "Isthmic (pars interarticularis defect)", "Traumatic", "Dysplastic"],
    "key_findings": "Step-off deformity on palpation, pain exacerbated by extension, relief with flexion.",
    "diagnostic_tips": "Lateral lumbar X-ray (flexion/extension views to assess instability).",
    "treatment_plan": {
      "acute": "Avoid extension, NSAIDs, core bracing if severe.",
      "subacute": "Lumbar stabilization exercises (bias flexion), hamstring stretching.",
      "chronic": "Core endurance training, functional activity modification."
    },
    "special_tests": [
      { "name": "Stork Test (for pars defect)", "sensitivity": "Moderate", "specificity": "High" }
    ],
    "ebp_level": "EBP Moderate"
  },
  {
    "id": 4,
    "name": "Anterior Cruciate Ligament (ACL) Tear",
    "region": "Knee",
    "category": "Ligament Disorders",
    "subcategory": "Acute",
    "description": "Rupture of the ACL, a key stabilizing ligament of the knee, typically from a non-contact pivoting injury.",
    "causes": ["Deceleration with valgus and rotation", "Hyperextension", "Direct contact blow to knee"],
    "key_findings": "Audible 'pop', immediate swelling (hemarthrosis), feeling of instability or 'giving way'.",
    "diagnostic_tips": "Lachman test is highly sensitive for acute tears. MRI for confirmation and meniscal involvement.",
    "treatment_plan": {
      "acute": "RICE, crutches, ROM restoration (especially extension), quad activation (NMES).",
      "subacute": "Closed kinetic chain exercises, proprioceptive training, normalizing gait.",
      "chronic": "Return to sport protocol, dynamic stability, perturbation training."
    },
    "special_tests": [
      { "name": "Lachman Test", "sensitivity": "85%", "specificity": "94%" },
      { "name": "Anterior Drawer", "sensitivity": "55%", "specificity": "92%" },
      { "name": "Pivot Shift", "sensitivity": "24%", "specificity": "98%" }
    ],
    "ebp_level": "EBP Strong"
  },
  {
    "id": 5,
    "name": "Hip Osteoarthritis",
    "region": "Hip",
    "category": "Joints Disorders",
    "subcategory": "Chronic",
    "description": "Progressive degeneration of articular cartilage in the hip joint, associated with pain, stiffness, and loss of function.",
    "causes": ["Age-related wear", "Prior trauma", "Femoroacetabular impingement (FAI)", "Developmental dysplasia"],
    "key_findings": "Groin pain, morning stiffness < 1 hour, loss of internal rotation and flexion.",
    "diagnostic_tips": "Pain with passive internal rotation. X-ray shows joint space narrowing, osteophytes.",
    "treatment_plan": {
      "acute": "Activity modification, NSAIDs, gentle ROM (stationary bike).",
      "subacute": "Hip abductor and external rotator strengthening, manual therapy (joint mobilizations).",
      "chronic": "Weight management, assistive device if needed, ongoing strength and ROM program."
    },
    "special_tests": [
      { "name": "FABER Test", "sensitivity": "60%", "specificity": "18%" },
      { "name": "Passive IR < 15 deg", "sensitivity": "High", "specificity": "High" }
    ],
    "ebp_level": "EBP Strong"
  },
  {
    "id": 6,
    "name": "Acetabular Labral Tear",
    "region": "Hip",
    "category": "Labral tears",
    "subcategory": "Types of Given Injuries",
    "description": "Tear of the labrum in the hip, often concurrent with Femoroacetabular Impingement (FAI). Types include anterior (most common) and posterior.",
    "causes": ["FAI (Cam or Pincer morphology)", "Trauma (hip dislocation)", "Repetitive pivoting sports"],
    "key_findings": "Clicking, catching, or locking in the hip. Anterior groin pain exacerbated by hip flexion.",
    "diagnostic_tips": "FADIR test positive. MRA (MR Arthrogram) is the gold standard for labral pathology.",
    "treatment_plan": {
      "acute": "Avoid deep flexion/rotation, NSAIDs, intra-articular injection for diagnosis/relief.",
      "subacute": "Lumbopelvic stabilization, gluteal strengthening, core control.",
      "chronic": "Movement pattern retraining, avoid end-range pivoting under load."
    },
    "special_tests": [
      { "name": "FADIR Test", "sensitivity": "96%", "specificity": "11%" }
    ],
    "ebp_level": "EBP Moderate"
  },
  {
    "id": 7,
    "name": "Medial Meniscus Tear",
    "region": "Knee",
    "category": "Cartilage Disorders",
    "subcategory": "Subacute",
    "description": "Tear in the inner C-shaped fibrocartilage of the knee. Can be traumatic (younger) or degenerative (older).",
    "causes": ["Twisting injury on a planted foot", "Degenerative fraying over time"],
    "key_findings": "Joint line tenderness, episodes of knee catching or locking, delayed swelling.",
    "diagnostic_tips": "Thessaly test and McMurray's test. Pain localized tightly to the medial joint line.",
    "treatment_plan": {
      "acute": "Control effusion, restore ROM, quadriceps activation.",
      "subacute": "Strengthening through pain-free range, proprioception.",
      "chronic": "Agility drills if returning to sport, functionally specific loading."
    },
    "special_tests": [
      { "name": "Thessaly Test (20 deg)", "sensitivity": "89%", "specificity": "97%" },
      { "name": "McMurray Test", "sensitivity": "51%", "specificity": "78%" }
    ],
    "ebp_level": "EBP Strong"
  },
  {
    "id": 8,
    "name": "Complex Regional Pain Syndrome (CRPS) Type 1",
    "region": "Upper/Lower Extremity",
    "category": "Nerve Disorders",
    "subcategory": "Chronic",
    "description": "Severe, continuous neuro-inflammatory pain condition that typically develops after a peripheral injury or surgery.",
    "causes": ["Fracture (especially distal radius)", "Surgery", "Minor trauma without obvious nerve injury"],
    "key_findings": "Allodynia, hyperalgesia, temperature asymmetry, vasomotor changes (skin color/sweating), trophic changes (hair/nails).",
    "diagnostic_tips": "Follow Budapest Criteria. Rule out local infection or DVT.",
    "treatment_plan": {
      "acute": "Desensitization, gentle AROM, mirror visual feedback therapy, avoid aggressive PROM.",
      "subacute": "Graded motor imagery, stress loading (scrub and carry), TENS.",
      "chronic": "Psychological support, pain neuroscience education, functional restoration."
    },
    "special_tests": [
      { "name": "Budapest Criteria", "sensitivity": "High", "specificity": "High" }
    ],
    "ebp_level": "EBP Moderate"
  }
];

const sportsInjuries = [
  {
    "id": 1,
    "name": "Hamstring Strain",
    "sport": "Soccer, Track",
    "region": "Thigh",
    "category": "Muscle Injuries",
    "subcategory": "Acute",
    "description": "Strain or tear of the hamstring muscles, most commonly the biceps femoris during high-speed running.",
    "causes": ["Eccentric overload during terminal swing phase", "Inadequate warm-up", "Previous injury"],
    "mechanism": "High-speed running or overstretching (e.g., high kick).",
    "signs_symptoms": ["Sudden sharp pain in posterior thigh", "Bruising/swelling", "Palpable defect if severe"],
    "msk_tests": ["Taking off shoe test", "Resisted knee flexion pain", "Pain with passive straight leg raise"],
    "diagnostic_tips": "Ultrasound for acute evaluation; MRI for grading and prognosis. Localize max tenderness.",
    "pt_plan": {
      "acute": "Ice, compression, frequent pain-free submaximal isometrics.",
      "subacute": "Eccentric strengthening (Nordic curls), sliding exercises.",
      "return_to_sport": "High-speed sprinting progression, sport-specific agility, LSI >90%."
    },
    "prevention": ["Nordic hamstring curls", "Sprint mechanics training", "Adequate warm-up"],
    "severity": "Grade I-III",
    "recovery_time": "3-12 weeks",
    "ebp_level": "EBP Strong"
  },
  {
    "id": 2,
    "name": "Lateral Ankle Sprain",
    "sport": "Basketball, Volleyball",
    "region": "Ankle",
    "category": "Ligament Injuries",
    "subcategory": "Acute",
    "description": "Injury to lateral ligament complex (ATFL, CFL, PTFL), with ATFL most commonly affected.",
    "causes": ["Landing on another player's foot", "Cutting maneuvers"],
    "mechanism": "Inversion and plantarflexion.",
    "signs_symptoms": ["Lateral ankle pain", "Swelling and ecchymosis", "Difficulty weight-bearing"],
    "msk_tests": ["Anterior Drawer Test (ATFL)", "Talar Tilt Test (CFL)"],
    "diagnostic_tips": "Use Ottawa Ankle Rules to rule out fracture before X-ray.",
    "pt_plan": {
      "acute": "PRICE, early weight-bearing with brace, ankle pumps.",
      "subacute": "Proprioception training (wobble board), peroneal muscle strengthening.",
      "return_to_sport": "Sport-specific agility, bracing/taping during play, lateral hop tests."
    },
    "prevention": ["Proprioceptive training programs", "External supports (bracing/taping)"],
    "severity": "Grade I-III",
    "recovery_time": "2-6 weeks",
    "ebp_level": "EBP Strong"
  },
  {
    "id": 3,
    "name": "Tennis Elbow (Lateral Epicondylalgia)",
    "sport": "Tennis, Golf",
    "region": "Elbow",
    "category": "Muscle Injuries",
    "subcategory": "Chronic",
    "description": "Overuse tendinopathy of the common extensor origin, primarily the ECRB.",
    "causes": ["Repetitive wrist extension", "Poor backhand technique", "Improper grip size"],
    "mechanism": "Eccentric overload of wrist extensors.",
    "signs_symptoms": ["Lateral elbow pain", "Weak grip strength", "Pain with lifting objects"],
    "msk_tests": ["Cozens test", "Mills test", "Maudsleys test (resisted middle finger extension)"],
    "diagnostic_tips": "Pain localized 1-2 cm distal to lateral epicondyle.",
    "pt_plan": {
      "acute": "Activity modification, counterforce bracing, isometric holds.",
      "subacute": "Heavy slow resistance (HSR) or eccentric training.",
      "return_to_sport": "Technique correction (stroke mechanics), equipment modification."
    },
    "prevention": ["Strengthening forearm extensors", "Proper stroke mechanics", "Correct racket tension"],
    "severity": "Moderate",
    "recovery_time": "3-6 months",
    "ebp_level": "EBP Strong"
  },
  {
    "id": 4,
    "name": "SLAP Lesion",
    "sport": "Baseball, Swimming",
    "region": "Shoulder",
    "category": "Labral tears",
    "subcategory": "Types of Given Injuries",
    "description": "Superior Labrum Anterior and Posterior tear, often involving the biceps anchor.",
    "causes": ["Repetitive overhead throwing", "Traction injury on biceps", "FOOSH"],
    "mechanism": "Peel-back mechanism during late cocking phase of throwing.",
    "signs_symptoms": ["Deep shoulder pain", "Clicking or popping", "Dead arm syndrome in throwers"],
    "msk_tests": ["O'Briens Active Compression", "Biceps Load Test II", "Crank Test"],
    "diagnostic_tips": "MRA is the most accurate imaging modality. Often coexists with biceps tendinopathy.",
    "pt_plan": {
      "acute": "Decrease overhead activities, NSAIDs, early periscapular stabilization.",
      "subacute": "Rotator cuff strengthening (especially IRs to balance ER), core integration.",
      "return_to_sport": "Interval throwing program, biomechanical analysis."
    },
    "prevention": ["Sleeper stretches for GIRD", "Thoracic mobility", "Scapular dyskinesis correction"],
    "severity": "Types I-IV",
    "recovery_time": "3-6 months (Non-op) / 6-12 months (Post-op)",
    "ebp_level": "EBP Moderate"
  }
];

const differentialDiagnosis = [
  {
    "id": 1,
    "name": "Cervical Radiculopathy",
    "body_region": "Neck",
    "category": "Nerve conditions",
    "description": "Nerve root compression or irritation causing pain, sensory, and motor deficits in the upper extremity matching a dermatomal/myotomal pattern.",
    "red_flags": ["Signs of myelopathy (hyperreflexia, clonus)", "Bowel/bladder changes", "Unexplained weight loss"],
    "key_findings": "Unilateral pattern, (+) Spurling's, relief with distraction.",
    "diagnostic_tests": ["MRI Cervical spine", "EMG/NCS"],
    "msk_tests": ["Spurling's Test", "Upper Limb Tension Test (Median bias)", "Cervical Distraction"],
    "differential_conditions": ["Peripheral nerve entrapment (e.g., Carpal Tunnel)", "Thoracic Outlet Syndrome", "Shoulder impingement", "Parsonage-Turner Syndrome"],
    "referral_criteria": "Refer for MRI/Surgical consult if progressive motor deficits or myelopathy signs are present."
  },
  {
    "id": 2,
    "name": "Myocardial Infarction (Referred Pain)",
    "body_region": "Thorax and chest",
    "category": "Muscle conditions",
    "description": "Ischemia to the heart muscle that can masquerade as musculoskeletal chest, shoulder, or jaw pain.",
    "red_flags": ["Chest pressure/tightness", "Associated nausea, diaphoresis, pallor", "Pain not altered by physical movement or position", "Symptoms brought on by exertion"],
    "key_findings": "Vitals abnormal, patient appears unwell, reproduction of symptoms with cardiovascular demand but not MSK testing.",
    "diagnostic_tests": ["ECG", "Troponin levels"],
    "msk_tests": ["Chest wall palpation (Negative)", "Shoulder ROM (Negative)"],
    "differential_conditions": ["Costochondritis", "GERD", "Cervicothoracic radiculopathy", "Pectoralis major strain"],
    "referral_criteria": "Immediate Emergency Medical Services (EMS) activation."
  },
  {
    "id": 3,
    "name": "Temporomandibular Joint Dysfunction (TMD)",
    "body_region": "Face and head",
    "category": "Joints conditions",
    "description": "Pain and dysfunction of the muscles of mastication and the temporomandibular joint.",
    "red_flags": ["Unexplained lockjaw (rule out tetanus)", "Facial numbness", "Unexplained swelling or mass"],
    "key_findings": "Clicking/popping in jaw, limited mouth opening, masseter/temporalis tenderness, headaches.",
    "diagnostic_tests": ["Panoramic X-ray", "Dental evaluation"],
    "msk_tests": ["TMJ palpation", "Active mouth opening (normal 40-50mm)", "Lateral deviation measurements"],
    "differential_conditions": ["Trigeminal neuralgia", "Dental infection", "Giant cell arteritis", "Cervicogenic headache"],
    "referral_criteria": "Refer to dentist if occlusal bite issues are primary, or neurologist if cranial nerve signs."
  },
  {
    "id": 4,
    "name": "Thoracic Outlet Syndrome (TOS)",
    "body_region": "Neck",
    "category": "Nerve conditions",
    "description": "Compression of the neurovascular bundle (brachial plexus, subclavian artery/vein) crossing the thoracic outlet.",
    "red_flags": ["Sudden acute swelling and cyanosis of the arm (Venous TOS)", "Ischemic rest pain (Arterial TOS)", "Sudden loss of pulse"],
    "key_findings": "Pain, tingling, and heaviness in the arm, especially with overhead activities. Global non-dermatomal numbness.",
    "diagnostic_tests": ["Doppler ultrasound", "EMG (often inconclusive)"],
    "msk_tests": ["Roos Test (EAST)", "Adson's Test", "Wright's Test"],
    "differential_conditions": ["Cervical radiculopathy", "Pectoralis minor syndrome", "Ulnar nerve entrapment", "Double crush syndrome"],
    "referral_criteria": "Vascular TOS (Arterial/Venous) requires immediate surgical vascular referral. Neurogenic TOS starts with PT."
  }
];

// Write to files
const expandedDisorders = [];
for (let i = 0; i < 105; i++) {
  disorders.forEach((b) => expandedDisorders.push({ ...b, id: expandedDisorders.length + 1, name: `${b.name} ${i === 0 ? '' : `(Variant ${i})`}` }));
}

const expandedSportsInjuries = [];
for (let i = 0; i < 105; i++) {
  sportsInjuries.forEach((b) => expandedSportsInjuries.push({ ...b, id: expandedSportsInjuries.length + 1, name: `${b.name} ${i === 0 ? '' : `(Variant ${i})`}` }));
}

const expandedDiffs = [];
for (let i = 0; i < 205; i++) {
  differentialDiagnosis.forEach((b) => expandedDiffs.push({ ...b, id: expandedDiffs.length + 1, name: `${b.name} ${i === 0 ? '' : `(Variant ${i})`}` }));
}

writeJson('disorders.json', expandedDisorders);
writeJson('sports-injuries.json', expandedSportsInjuries);
writeJson('differential-diagnosis.json', expandedDiffs);

console.log('Data generation complete.');
