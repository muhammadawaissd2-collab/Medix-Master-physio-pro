// Daily clinical pearls — rotates based on day-of-year
export interface Flashcard {
  id: number;
  category: string;
  question: string;
  answer: string;
  source?: string;
}

export const flashcards: Flashcard[] = [
  { id: 1, category: "Special Tests", question: "What does a positive Lachman test indicate?", answer: "Anterior cruciate ligament (ACL) tear. Sensitivity ~85%, specificity ~94% — most accurate clinical test for ACL.", source: "Hattam & Smeatham" },
  { id: 2, category: "EBP", question: "First-line treatment for chronic low back pain?", answer: "Exercise therapy + patient education. NICE NG59 recommends combined physical and psychological approaches.", source: "NICE 2020" },
  { id: 3, category: "Anatomy", question: "Which muscle initiates shoulder abduction?", answer: "Supraspinatus (first 0-15°), then deltoid takes over. Innervated by suprascapular nerve (C5, C6).", source: "Netter's Atlas" },
  { id: 4, category: "Tendinopathy", question: "Best loading protocol for chronic Achilles tendinopathy?", answer: "Heavy Slow Resistance (HSR) or Alfredson eccentric — both effective at 12 weeks; HSR has better compliance.", source: "Beyer 2015" },
  { id: 5, category: "Red Flags", question: "Cauda equina red flags?", answer: "Saddle anaesthesia, bilateral leg weakness/pain, urinary retention/incontinence, bowel dysfunction. Urgent MRI & surgical referral.", source: "NICE NG59" },
  { id: 6, category: "Special Tests", question: "What does FADIR test screen for?", answer: "Femoroacetabular impingement (FAI) and acetabular labral tears. Flexion-Adduction-Internal Rotation provokes anterior hip pain.", source: "Magee's Assessment" },
  { id: 7, category: "Sports", question: "Best evidence-based exercise to prevent hamstring injury?", answer: "Nordic Hamstring Exercise — 51% reduction in hamstring injuries (Petersen 2011 RCT).", source: "BJSM" },
  { id: 8, category: "Anatomy", question: "Innervation of the deep posterior compartment of the leg?", answer: "Tibial nerve (L4-S3). Contains tibialis posterior, FDL, FHL and popliteus.", source: "Gray's Anatomy" },
  { id: 9, category: "Manual Therapy", question: "Mulligan MWM key principle?", answer: "Apply sustained pain-free accessory glide while patient performs previously painful active movement. If pain returns — adjust glide.", source: "Mulligan" },
  { id: 10, category: "Neurology", question: "Which dermatome covers the lateral foot?", answer: "S1 dermatome. Tested with light touch on lateral border of foot and 5th toe.", source: "Magee's Assessment" },
  { id: 11, category: "Special Tests", question: "Empty Can (Jobe) test target?", answer: "Supraspinatus tendon. Pain or weakness in 90° abduction + 30° horizontal flexion + internal rotation.", source: "Hattam & Smeatham" },
  { id: 12, category: "EBP", question: "Should you order imaging for acute non-specific low back pain?", answer: "No. Avoid routine imaging in absence of red flags (Strong recommendation, NICE & ACP).", source: "NICE NG59" },
  { id: 13, category: "Rehab", question: "Quad strength criterion before ACL return-to-sport?", answer: "≥90% Limb Symmetry Index (LSI) on isokinetic testing, plus criteria-based functional tests.", source: "van Melick 2016" },
  { id: 14, category: "Anatomy", question: "Action of the popliteus muscle?", answer: "Unlocks the knee from terminal extension by medially rotating tibia on femur. Innervated by tibial nerve.", source: "Netter's" },
  { id: 15, category: "Tendinopathy", question: "Treatment of choice for lateral epicondylalgia long-term?", answer: "Wait-and-see or exercise therapy — corticosteroid injection has worse 12-month outcomes (Coombes 2013 JAMA).", source: "JAMA" },
  { id: 16, category: "Red Flags", question: "Vertebrobasilar insufficiency (VBI) screening symptoms?", answer: "5 D's And 3 N's: Dizziness, Drop attacks, Diplopia, Dysarthria, Dysphagia + Numbness, Nausea, Nystagmus.", source: "IFOMPT" },
  { id: 17, category: "Sports", question: "Most common ACL injury mechanism?", answer: "Non-contact pivoting with knee valgus, internal tibial rotation, near-extended knee — typically deceleration/cutting.", source: "BJSM" },
  { id: 18, category: "Anatomy", question: "Which nerve is most commonly entrapped at the elbow?", answer: "Ulnar nerve at the cubital tunnel — second most common upper limb entrapment after carpal tunnel.", source: "Gray's" },
  { id: 19, category: "Manual Therapy", question: "Centralisation in McKenzie MDT means?", answer: "Distal symptoms moving proximally toward the spine in response to repeated end-range loading — predicts good prognosis.", source: "McKenzie MDT" },
  { id: 20, category: "EBP", question: "Best test for ankle syndesmosis injury?", answer: "Squeeze test (proximal compression) plus external rotation stress test. MRI if positive and high suspicion.", source: "Hattam & Smeatham" },
  { id: 21, category: "Special Tests", question: "Thessaly test purpose?", answer: "Meniscus tear screening. Patient stands on affected leg, knee flexed 20°, rotates 3 times. Pain or catching = positive.", source: "Magee's" },
  { id: 22, category: "Rehab", question: "Frozen shoulder phases?", answer: "1) Painful (freezing) 2-9 mo; 2) Stiff (frozen) 4-12 mo; 3) Resolution (thawing) 5-24 mo. Total 1-3 years.", source: "Kelley 2013 APTA" },
  { id: 23, category: "Anatomy", question: "Rotator cuff muscles & function summary?", answer: "Supraspinatus (abduction initiator), Infraspinatus & Teres Minor (ER), Subscapularis (IR). All depress humeral head.", source: "Netter's" },
  { id: 24, category: "Sports", question: "RED-S stands for?", answer: "Relative Energy Deficiency in Sport — broader replacement for Female Athlete Triad. Affects bone, endocrine, immune, cardiovascular health.", source: "IOC 2018" },
  { id: 25, category: "Manual Therapy", question: "Maitland Grade III mobilisation amplitude?", answer: "Large amplitude oscillation up to the limit of available range — used for stiffness-dominant problems.", source: "Maitland" },
  { id: 26, category: "EBP", question: "First-line for knee osteoarthritis?", answer: "Land-based exercise + weight loss + education. Avoid arthroscopy for degenerative changes (Thorlund 2015).", source: "OARSI 2019" },
  { id: 27, category: "Neurology", question: "Tinel's sign at the wrist tests?", answer: "Median nerve at carpal tunnel. Tapping over tunnel reproduces paraesthesia in median distribution. Sens ~50%, Spec ~77%.", source: "Hattam & Smeatham" },
  { id: 28, category: "Anatomy", question: "What innervates the diaphragm?", answer: "Phrenic nerve (C3, C4, C5 — 'C3,4,5 keeps the diaphragm alive'). Sole motor supply.", source: "Gray's" },
  { id: 29, category: "Rehab", question: "Plantar heel pain first-line treatment?", answer: "Plantar fascia & calf stretching, manual therapy, taping/orthoses (short-term), patient education on natural history.", source: "APTA CPG 2023" },
  { id: 30, category: "Special Tests", question: "What does the Slump test assess?", answer: "Neural mobility of dural & sciatic nerve system. Sequential cervical flexion → thoracic/lumbar flexion → knee extension → ankle DF.", source: "Hattam & Smeatham" },
];

/** Returns 3 flashcards rotating by day-of-year */
export function getDailyFlashcards(date: Date = new Date()): Flashcard[] {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const idx = day % flashcards.length;
  return [
    flashcards[idx],
    flashcards[(idx + 1) % flashcards.length],
    flashcards[(idx + 2) % flashcards.length],
  ];
}
