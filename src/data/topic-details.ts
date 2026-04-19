// Enriched topic details for book TOC topics.
// Each topic now includes optional `subtopics` — tappable items that open a deeper detail card
// with description, key points and clinical relevance for that specific subtopic.
// Used by Books page and Search page interactive Table of Contents.

export interface SubtopicDetail {
  name: string;
  description: string;
  keyPoints: string[];
  clinicalRelevance: string;
  searchKeyword?: string;
}

export interface TopicDetail {
  description: string;
  keyPoints: string[];
  clinicalRelevance: string;
  searchKeyword?: string;
  subtopics?: SubtopicDetail[];
}

// Generic fallback used when a topic isn't explicitly mapped.
function generic(topic: string): TopicDetail {
  return {
    description: `${topic} is covered in this chapter as a core clinical concept relevant to musculoskeletal assessment, treatment planning and evidence-based practice.`,
    keyPoints: [
      `Definition, anatomy & pathomechanics of ${topic}`,
      `Subjective & objective examination findings`,
      `Differential diagnosis & special tests`,
      `Stage-based treatment & rehabilitation principles`,
      `Outcome measures & return-to-activity criteria`,
    ],
    clinicalRelevance: `Understanding ${topic} supports accurate clinical reasoning, targeted intervention selection and effective patient education in physiotherapy practice.`,
    searchKeyword: topic,
    subtopics: [
      {
        name: "Anatomy & Biomechanics",
        description: `Structural and functional anatomy underlying ${topic}.`,
        keyPoints: ["Bony landmarks & articulations", "Soft tissue contributors", "Force transmission & load distribution"],
        clinicalRelevance: "Foundational knowledge guiding palpation, examination and intervention selection.",
      },
      {
        name: "Examination",
        description: `Subjective and objective examination approach for ${topic}.`,
        keyPoints: ["Symptom behaviour & aggravators", "Range of motion & strength", "Special tests & clinical clusters"],
        clinicalRelevance: "Drives accurate clinical reasoning and prognosis.",
      },
      {
        name: "Management",
        description: `Evidence-informed treatment options for ${topic}.`,
        keyPoints: ["Education & load management", "Manual therapy & exercise", "Progression criteria"],
        clinicalRelevance: "Stage-appropriate intervention selection optimises recovery.",
      },
    ],
  };
}

// Curated map with rich detail and tappable subtopics.
const map: Record<string, TopicDetail> = {
  "Rotator Cuff": {
    description: "The rotator cuff comprises supraspinatus, infraspinatus, teres minor and subscapularis — providing dynamic glenohumeral stability and initiating shoulder elevation.",
    keyPoints: [
      "Supraspinatus is most commonly torn (anterior cable region)",
      "Painful arc 60-120° suggests subacromial impingement",
      "Empty Can, Hawkins-Kennedy, External Rotation Lag are key tests",
      "Eccentric loading + scapular control is first-line conservative care",
      "Surgical repair indicated for full-thickness tears in active patients",
    ],
    clinicalRelevance: "Rotator cuff disorders are the leading cause of shoulder pain in adults — early loading-based rehabilitation prevents chronicity and surgery.",
    subtopics: [
      {
        name: "Supraspinatus",
        description: "Initiates first 15° of shoulder abduction; tendon passes under acromion making it vulnerable to impingement and tears.",
        keyPoints: ["Empty Can / Jobe test isolates supraspinatus", "Most common rotator cuff tendon torn", "Eccentric loading first-line"],
        clinicalRelevance: "Targeted assessment guides graded loading vs surgical referral.",
      },
      {
        name: "Infraspinatus & Teres Minor",
        description: "Primary external rotators of the glenohumeral joint; weakness contributes to anterior humeral head migration.",
        keyPoints: ["External Rotation Lag Sign", "Hornblower's sign for teres minor", "ER strength deficit predicts re-injury"],
        clinicalRelevance: "Strengthening these correctly restores glenohumeral centring.",
      },
      {
        name: "Subscapularis",
        description: "Largest cuff muscle, internal rotator and dynamic stabiliser of the anterior shoulder.",
        keyPoints: ["Lift-off & Belly Press tests", "Often torn with anterior dislocation", "Critical for force couple with infraspinatus"],
        clinicalRelevance: "Often missed on examination; tear changes surgical planning.",
      },
      {
        name: "Conservative Rehab",
        description: "Structured loading programme combining isometric, eccentric and scapular control work.",
        keyPoints: ["12-week minimum protocol", "Pain ≤ 5/10 acceptable during loading", "Avoid overhead provocation early"],
        clinicalRelevance: "70-80% of cuff tendinopathy responds to structured loading without surgery.",
      },
    ],
  },
  "ACL Reconstruction": {
    description: "Surgical reconstruction of the anterior cruciate ligament using BPTB, hamstring or quadriceps autograft — followed by structured criteria-based rehabilitation.",
    keyPoints: [
      "Phase 1 (0-2w): protect graft, restore extension, quadriceps activation",
      "Phase 2 (2-12w): full ROM, gait normalisation, neuromuscular control",
      "Phase 3 (3-6m): strength, plyometrics, sport-specific drills",
      "Phase 4 (6-9m): return-to-sport testing (LSI ≥ 90%, hop tests, IKDC)",
      "Re-injury risk reduced by passing battery of RTS criteria, not time alone",
    ],
    clinicalRelevance: "Criteria-based progression (not time-based) reduces re-rupture risk by ~50% — every clinician must know the RTS test battery.",
    subtopics: [
      {
        name: "Graft Choice",
        description: "BPTB, hamstring (STG) and quadriceps tendon autografts each have distinct rehab considerations.",
        keyPoints: ["BPTB: anterior knee pain risk", "Hamstring: protect HS strength early", "Quad: vastus medialis activation focus"],
        clinicalRelevance: "Graft choice changes early loading strategy and donor-site precautions.",
      },
      {
        name: "Phase 1 (0-2 weeks)",
        description: "Protect graft, restore full passive extension, control swelling, activate quadriceps.",
        keyPoints: ["Heel slides, patellar mobs", "Quad sets, SLR", "Cryotherapy, weight-bearing as tolerated with brace"],
        clinicalRelevance: "Loss of extension at 2 weeks is the single biggest predictor of poor outcome.",
      },
      {
        name: "Return-to-Sport Criteria",
        description: "Battery of objective tests required before clearance for cutting/pivoting sport.",
        keyPoints: ["LSI ≥ 90% on quads/HS", "Single, triple, crossover, 6m timed hop", "IKDC ≥ 85%, psychological readiness (ACL-RSI)"],
        clinicalRelevance: "Passing criteria reduces re-rupture by ~50% vs time-based clearance alone.",
      },
    ],
  },
  "Lachman": {
    description: "Lachman test — gold standard manual test for ACL integrity. Knee at 20-30° flexion, examiner translates tibia anteriorly on stabilised femur.",
    keyPoints: [
      "Sensitivity 85%, Specificity 94% (highest of all ACL tests)",
      "Grade 1: 1-5mm, Grade 2: 6-10mm, Grade 3: >10mm translation",
      "Soft endpoint = positive even without large translation",
      "More accurate than Anterior Drawer (less hamstring guarding)",
      "Pivot shift adds rotational instability assessment",
    ],
    clinicalRelevance: "First-line ACL test in acute and chronic settings; combines with MRI for surgical planning.",
    subtopics: [
      {
        name: "Technique",
        description: "Patient supine, knee at 20-30° flexion, one hand stabilises femur, other lifts tibia anteriorly.",
        keyPoints: ["Examiner thumb on joint line", "Grade endpoint quality", "Compare bilaterally"],
        clinicalRelevance: "Correct positioning is essential — examiner experience improves accuracy.",
      },
      {
        name: "Grading",
        description: "Graded by anterior translation magnitude and endpoint feel.",
        keyPoints: ["Grade 1: 1-5mm, firm", "Grade 2: 6-10mm, soft", "Grade 3: >10mm, no endpoint"],
        clinicalRelevance: "Soft endpoint with any translation indicates ACL insufficiency.",
      },
    ],
  },
  "Hawkins-Kennedy": {
    description: "Provocation test for subacromial impingement. Shoulder flexed 90°, elbow 90°, examiner internally rotates the humerus.",
    keyPoints: [
      "Sensitivity ~80%, Specificity ~50% — good screening test",
      "Compresses supraspinatus under coracoacromial arch",
      "Combine with Neer & Painful Arc for cluster (Park 2005)",
      "Positive cluster = high post-test probability of impingement",
      "Negative cluster largely rules out subacromial pathology",
    ],
    clinicalRelevance: "Use as part of a 3-test cluster — single-test interpretation is unreliable.",
    subtopics: [
      {
        name: "Park Cluster",
        description: "Hawkins-Kennedy + Neer + Painful Arc cluster boosts diagnostic accuracy.",
        keyPoints: ["3/3 positive = +LR 2.9 for impingement", "Adds drop-arm for full-thickness tear", "Cluster outperforms any single test"],
        clinicalRelevance: "Best evidence-based shoulder impingement screen.",
      },
    ],
  },
  "Carpal Tunnel": {
    description: "Median nerve compression at the wrist within the carpal tunnel — most common upper limb entrapment neuropathy.",
    keyPoints: [
      "Nocturnal paraesthesia in median distribution",
      "Phalen's & Tinel's at wrist — moderate likelihood ratios",
      "Thenar wasting & weakness = late sign, surgical indication",
      "Conservative: night splinting, neural sliders, ergonomic modification",
      "Surgical release indicated for persistent symptoms or motor loss",
    ],
    clinicalRelevance: "Early diagnosis and conservative management can avoid surgery; once thenar wasting appears, decompression is urgent.",
    subtopics: [
      {
        name: "Phalen's Test",
        description: "Sustained wrist flexion 60s — reproduces median paraesthesia.",
        keyPoints: ["Sensitivity 68%, Specificity 73%", "Time to onset < 60s = stronger positive"],
        clinicalRelevance: "Quick screening test, more reliable than Tinel's.",
      },
      {
        name: "Conservative Management",
        description: "Night splinting in neutral, neural mobilisation, activity modification.",
        keyPoints: ["6-week trial appropriate for mild-moderate", "Neural sliders, NOT tensioners early", "Ergonomic & posture education"],
        clinicalRelevance: "Strong evidence for splinting + neural mobilisation as first-line.",
      },
    ],
  },
  "Plantar Fasciitis": {
    description: "Degenerative enthesopathy of the plantar fascia at the medial calcaneal tubercle — characterised by first-step morning pain.",
    keyPoints: [
      "Risk factors: obesity, prolonged standing, pes planus/cavus, tight gastroc-soleus",
      "Windlass test reproduces pain on great toe extension",
      "First-line: load management, calf stretching, plantar fascia stretch, heel cup",
      "High-load strength training (Rathleff 2015) effective at 3 months",
      "ESWT for refractory cases; injection short-term only",
    ],
    clinicalRelevance: "Most cases resolve in 6-12 months — patient education on natural history and load management is critical.",
    subtopics: [
      {
        name: "High-Load Strength Training",
        description: "Heavy slow resistance heel raises with toe extension (Rathleff protocol).",
        keyPoints: ["Towel under toes for windlass tension", "3 sec up / 2 sec hold / 3 sec down", "Every other day x 12 weeks"],
        clinicalRelevance: "Superior to stretching alone at 3-month follow-up.",
      },
      {
        name: "Adjuncts",
        description: "Heel cups, taping, night splints, ESWT and injection in selected cases.",
        keyPoints: ["Low-Dye taping for short-term relief", "Night splint for AM pain", "Cortisone — risk of fascia rupture"],
        clinicalRelevance: "Adjuncts complement loading; rarely curative on their own.",
      },
    ],
  },
  "Low Back Pain": {
    description: "Non-specific low back pain accounts for 90% of LBP — biopsychosocial framework guides screening, classification and management.",
    keyPoints: [
      "Screen red flags: cauda equina, fracture, malignancy, infection",
      "Yellow flags identify psychosocial chronicity risk (STarT Back tool)",
      "Stay active — bed rest harmful (NICE 2020, ACP 2017)",
      "Exercise + manual therapy + education — first-line care",
      "Avoid early imaging in absence of red flags",
    ],
    clinicalRelevance: "Most acute LBP resolves in 6 weeks; the clinician's role is to reassure, screen, and prevent chronicity.",
    subtopics: [
      {
        name: "Red Flags",
        description: "Cauda equina (saddle anaesthesia, bowel/bladder), fracture (trauma, osteoporosis), malignancy (history, weight loss), infection (fever, IVDU).",
        keyPoints: ["Cauda equina = surgical emergency", "Fracture risk in elderly with low-trauma onset", "Night pain + weight loss = oncology screen"],
        clinicalRelevance: "Identification triggers urgent referral and changes management entirely.",
      },
      {
        name: "STarT Back Tool",
        description: "9-item screen stratifying patients into low, medium, high risk for chronicity.",
        keyPoints: ["Low = self-management & advice", "Medium = physiotherapy", "High = combined physical + psychological therapy"],
        clinicalRelevance: "Stratified care improves outcomes and reduces costs vs usual care.",
      },
    ],
  },
  "Disc Herniation": {
    description: "Displacement of nucleus pulposus through annular fibres — may compress nerve root producing radicular symptoms.",
    keyPoints: [
      "L5 & S1 nerve roots most commonly affected (sciatica)",
      "SLR positive 30-70° → root tension; crossed SLR more specific",
      "MRI confirms but findings common in asymptomatic adults",
      "Most resolve with conservative care over 6-12 weeks",
      "Surgical referral: cauda equina, progressive deficit, intractable pain",
    ],
    clinicalRelevance: "MRI findings must correlate with clinical picture — asymptomatic disc bulges are common.",
    subtopics: [
      {
        name: "Radiculopathy Signs",
        description: "Dermatomal sensation loss, myotomal weakness, diminished reflex.",
        keyPoints: ["L5: EHL weakness, dorsum of foot", "S1: gastroc weakness, lateral foot, ↓ ankle jerk", "Crossed SLR specificity 90%"],
        clinicalRelevance: "Localises affected level; guides imaging and surgical decisions.",
      },
    ],
  },
  "ACL Prevention": {
    description: "Neuromuscular training programmes (FIFA 11+, PEP, KIPP) reduce ACL injury risk by 50-70% in pivoting sports.",
    keyPoints: [
      "Components: plyometrics, strength, balance, agility, core",
      "≥ 2 sessions/week, ≥ 20 min, sustained ≥ 6 weeks",
      "Female athletes benefit most (4-6× higher risk than males)",
      "Compliance is the key barrier — coach buy-in essential",
      "Implementation reduces all lower limb injuries, not only ACL",
    ],
    clinicalRelevance: "Prescribed and supervised by physiotherapists; should be part of every team's warm-up.",
  },
  "Frozen Shoulder": {
    description: "Adhesive capsulitis — progressive global loss of glenohumeral motion (especially external rotation) with capsular contracture.",
    keyPoints: [
      "Three stages: freezing, frozen, thawing — 18-30 months",
      "Diabetes increases risk 2-4× and worsens prognosis",
      "Loss of passive ER < 50% of contralateral side — diagnostic clue",
      "Intra-articular corticosteroid early reduces pain & hastens recovery",
      "Hydrodilatation, MUA, capsular release for refractory cases",
    ],
    clinicalRelevance: "Recognise stages — gentle pain-free movement in freezing stage, progressive stretching in frozen/thawing.",
    subtopics: [
      {
        name: "Staging",
        description: "Freezing (painful, 2-9 months), Frozen (stiff, 4-12 months), Thawing (recovery, 12-42 months).",
        keyPoints: ["Treatment differs per stage", "Aggressive stretching in freezing worsens pain", "Thawing focus on restoring function"],
        clinicalRelevance: "Stage-matched treatment is the key clinical decision.",
      },
    ],
  },
  "Achilles Tendon": {
    description: "Achilles tendinopathy — overuse condition affecting mid-portion (2-6cm above insertion) or insertional tendon.",
    keyPoints: [
      "Heavy slow resistance and Alfredson eccentric protocol — Grade A evidence",
      "12-week minimum loading programme; pain ≤ 5/10 acceptable",
      "Insertional: avoid dorsiflexion-loaded eccentrics, use isometrics",
      "Imaging not required for diagnosis",
      "Rupture: Thompson test — absent plantarflexion on calf squeeze",
    ],
    clinicalRelevance: "Patient education on load tolerance and timeline (3-6 months) is critical for adherence.",
    subtopics: [
      {
        name: "Alfredson Protocol",
        description: "180 eccentric heel drops daily (3x15 straight knee, 3x15 bent knee), straight or off step.",
        keyPoints: ["12 weeks minimum", "Continue despite mild pain", "Off step adds dorsiflexion load"],
        clinicalRelevance: "Original landmark protocol — basis for modern HSR alternatives.",
      },
      {
        name: "Insertional vs Mid-Portion",
        description: "Insertional involves enthesis at calcaneus; mid-portion is 2-6cm above insertion.",
        keyPoints: ["Insertional: avoid below-neutral DF", "Mid-portion: full-range eccentrics OK", "Insertional often slower to respond"],
        clinicalRelevance: "Different loading parameters required — wrong choice worsens pain.",
      },
    ],
  },
  "McKenzie": {
    description: "Mechanical Diagnosis & Therapy (MDT) — repeated end-range loading to identify directional preference and centralise symptoms.",
    keyPoints: [
      "Centralisation = symptoms move proximally with movement → favourable prognosis",
      "Directional preference (most often extension) guides home exercise",
      "Effective for 60-70% of acute LBP & cervical radiculopathy",
      "Self-management focus reduces dependence on passive care",
      "Requires McKenzie-trained clinician for full assessment classification",
    ],
    clinicalRelevance: "Identifies the substantial subgroup of LBP/neck patients who respond rapidly to directional exercise.",
  },
  "Maitland": {
    description: "Maitland concept — passive accessory and physiological joint mobilisations graded I-IV based on amplitude and position in range.",
    keyPoints: [
      "Grades I-II for pain (small amplitude, early range)",
      "Grades III-IV for stiffness (large amplitude, end range)",
      "Grade V = manipulation (HVLA thrust at end range)",
      "Continuous reassessment of comparable sign drives technique selection",
      "Combine with active exercise — mobilisation alone insufficient",
    ],
    clinicalRelevance: "Foundation of musculoskeletal physiotherapy — used worldwide for spinal and peripheral joint disorders.",
  },
  "Dry Needling": {
    description: "Insertion of monofilament needle into myofascial trigger point to produce local twitch response and reduce muscle tone.",
    keyPoints: [
      "Local twitch response (LTR) reflects taut band engagement",
      "Equivalent short-term benefit to manual trigger point release",
      "Pneumothorax precaution for thoracic & shoulder needling",
      "Post-needling soreness common 24-48 hours",
      "Combine with active loading for sustained benefit",
    ],
    clinicalRelevance: "Useful adjunct for myofascial pain when manual techniques have plateaued.",
  },
  "Sciatica": {
    description: "Radicular pain along sciatic nerve distribution — most often from L4-L5 or L5-S1 disc herniation or foraminal stenosis.",
    keyPoints: [
      "Pain below the knee in dermatomal pattern = true radiculopathy",
      "Positive SLR 30-70° supports nerve root involvement",
      "Most cases improve in 6-12 weeks with conservative care",
      "Neural mobilisation, McKenzie extension exercises commonly indicated",
      "Surgical referral for progressive deficit or refractory pain > 6 weeks",
    ],
    clinicalRelevance: "Distinguish radiculopathy from referred pain — guides treatment direction.",
  },
  "Patellofemoral": {
    description: "Patellofemoral pain syndrome — anterior knee pain aggravated by loaded knee flexion (squats, stairs, prolonged sitting).",
    keyPoints: [
      "Hip strengthening + quadriceps strengthening — strongest evidence",
      "Patellar taping & foot orthoses adjunct in selected cases",
      "Avoid open-chain knee extension at high knee flexion angles initially",
      "Address gluteal weakness, dynamic knee valgus, foot pronation",
      "Education on load management & graded return critical",
    ],
    clinicalRelevance: "Most common knee complaint in young active adults — proximal control is key, not just quad strength.",
  },
  "Ankle Sprain": {
    description: "Lateral ligament sprain (ATFL most commonly) following inversion injury — high recurrence without proper rehabilitation.",
    keyPoints: [
      "Ottawa Ankle Rules guide imaging decision",
      "Early functional rehabilitation > immobilisation (Cochrane 2014)",
      "Balance training (4 weeks) reduces recurrence by 35%",
      "High ankle sprain (syndesmosis) = longer recovery, different rehab",
      "Chronic ankle instability requires neuromuscular & strength training",
    ],
    clinicalRelevance: "30-70% develop chronic instability — full rehab including proprioception is non-negotiable.",
    subtopics: [
      {
        name: "Ottawa Ankle Rules",
        description: "Decision rule for ankle X-ray after acute injury.",
        keyPoints: ["Bony tenderness at posterior edge of malleoli", "Inability to weight-bear 4 steps", "Sensitivity ~98% for fracture"],
        clinicalRelevance: "Reduces unnecessary imaging by 30-40%.",
      },
    ],
  },
  "Tennis Elbow": {
    description: "Lateral epicondylalgia — degenerative tendinopathy of common extensor origin (ECRB primarily).",
    keyPoints: [
      "Cozen's & Mill's tests reproduce lateral elbow pain",
      "Heavy slow resistance / eccentric wrist extensor loading — first-line",
      "Mulligan MWM produces immediate grip strength improvement",
      "Counterforce brace adjunct for activity",
      "Corticosteroid: short-term relief but worse 1-year outcome (Coombes 2010)",
    ],
    clinicalRelevance: "Avoid corticosteroid as primary treatment — load management and exercise produce best long-term outcomes.",
  },
  "Special Tests": {
    description: "Standardised orthopaedic tests with established sensitivity, specificity and likelihood ratios — used in clinical reasoning clusters.",
    keyPoints: [
      "Use clusters, not single tests, for diagnostic accuracy",
      "Pre-test probability (history) drives post-test interpretation",
      "Sensitivity rules out (SnNout); Specificity rules in (SpPin)",
      "Likelihood ratios > 10 or < 0.1 produce large probability shifts",
      "Always interpret in clinical context — no test is 100% accurate",
    ],
    clinicalRelevance: "Backbone of evidence-based MSK examination — every clinician should know the high-value tests for each region.",
    subtopics: [
      {
        name: "Cluster Approach",
        description: "Combining 3+ tests with shared diagnostic target outperforms any single test.",
        keyPoints: ["Park (shoulder), Wainner (cervical), Laslett (SIJ)", "Improves +LR/-LR", "Reduces false positives"],
        clinicalRelevance: "Modern EBP standard — cluster, never rely on single test.",
      },
      {
        name: "Likelihood Ratios",
        description: "Combine sensitivity + specificity into a single decision-useful number.",
        keyPoints: ["+LR > 10 = strong rule-in", "-LR < 0.1 = strong rule-out", "1-2 = minimal change in probability"],
        clinicalRelevance: "Lets you update pre-test probability with each test result.",
      },
    ],
  },
  "Sensitivity & Specificity": {
    description: "Diagnostic test properties — Sensitivity = % of true positives detected; Specificity = % of true negatives correctly excluded.",
    keyPoints: [
      "SnNout: highly Sensitive, Negative result rules Out",
      "SpPin: highly Specific, Positive result rules In",
      "Likelihood ratios combine both for clinical decision making",
      "PPV & NPV depend on disease prevalence",
      "No test should be used in isolation — always cluster",
    ],
    clinicalRelevance: "Foundation of evidence-based examination; guides whether to confirm or exclude a diagnosis.",
  },
  "SLR (Lasègue)": {
    description: "Straight Leg Raise — passive hip flexion with knee extended, assessing lumbar nerve root tension (sciatic nerve / L4-S2).",
    keyPoints: [
      "Positive 30-70° with leg pain below the knee",
      "Sensitivity 91%, Specificity 26% for disc herniation",
      "Crossed SLR — much more specific (88%), less sensitive",
      "Bragard sign (dorsiflexion) sensitises the test",
      "Combine with slump test for clinical reasoning cluster",
    ],
    clinicalRelevance: "Primary screen for lumbar nerve root involvement in suspected radiculopathy.",
  },
  "Spurling's": {
    description: "Cervical compression test — extension, ipsilateral side-bend, axial compression to provoke nerve root symptoms.",
    keyPoints: [
      "Sensitivity 30-50%, Specificity 89-95%",
      "Positive = reproduction of radicular symptoms in arm",
      "Part of Wainner cluster (with distraction, ULTT, < 60° rotation)",
      "All 4 positive: post-test probability of cervical radiculopathy ~90%",
      "Stop immediately if dizziness, nausea, or central symptoms",
    ],
    clinicalRelevance: "Highly specific test — when positive in suspected radiculopathy, diagnosis is largely confirmed.",
  },
  "FABER": {
    description: "Flexion-Abduction-External Rotation (Patrick's test) — figure-4 position to provoke hip or sacroiliac joint pain.",
    keyPoints: [
      "Anterior groin pain → hip joint pathology",
      "Posterior pain → sacroiliac joint or lumbar referral",
      "Sensitivity 70%, Specificity 86% for hip OA",
      "Part of Laslett SIJ cluster (3+ of 5 tests positive)",
      "Always assess bilaterally for comparison",
    ],
    clinicalRelevance: "Differentiates hip vs SIJ vs lumbar pain in groin/buttock presentations.",
  },
  "McMurray": {
    description: "McMurray test — knee flexion with rotation to load and provoke meniscal lesions; click or pain reproduces symptoms.",
    keyPoints: [
      "External rotation + valgus → medial meniscus",
      "Internal rotation + varus → lateral meniscus",
      "Sensitivity 53%, Specificity 59% — modest accuracy alone",
      "Thessaly more accurate; combine multiple tests",
      "Joint line tenderness + McMurray + Apley = clinical cluster",
    ],
    clinicalRelevance: "Use as part of meniscal cluster, not alone; MRI for confirmation if surgery considered.",
  },
  "Thompson Test (Achilles)": {
    description: "Calf squeeze test for Achilles tendon rupture — patient prone, feet over edge; absent plantarflexion = positive.",
    keyPoints: [
      "Sensitivity 96%, Specificity 93% for complete rupture",
      "Combine with palpable gap and weak plantarflexion",
      "Negative test largely rules out complete rupture",
      "Partial tears may have positive test but some movement",
      "Refer to surgery promptly — repair within 2 weeks improves outcome",
    ],
    clinicalRelevance: "Highly accurate bedside test — every clinician must know it for acute calf injury.",
  },
};

export function getTopicDetail(topic: string): TopicDetail {
  if (map[topic]) return map[topic];
  const lower = topic.toLowerCase();
  for (const key of Object.keys(map)) {
    if (key.toLowerCase() === lower) return map[key];
  }
  // contains-match for related variants (e.g. "Phalen's" → "Carpal Tunnel")
  for (const key of Object.keys(map)) {
    if (key.toLowerCase().includes(lower) || lower.includes(key.toLowerCase())) return map[key];
  }
  return generic(topic);
}
