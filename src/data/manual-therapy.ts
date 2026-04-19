// Manual Therapy & Physical Techniques — sourced/synthesised from the Books library
// (Maitland, Mulligan, McKenzie/MDT, Cyriax, Kaltenborn, Travell/Simons, Chaitow,
//  Brotzman, Magee, Dommerholt, Hattam & Smeatham — see /books)

export interface ManualTechnique {
  id: number;
  name: string;
  category: string;
  region: string;
  description: string;
  indications: string[];
  contraindications: string[];
  procedure: string;
  evidence: string;
  source_books: string[];
  related_pages: { label: string; path: string }[];
  // Expanded clinical metadata
  mechanism: string;
  dosage: string;
  progressions: string[];
  clinical_pearls: string;
  home_self_care: string;
  key_references: string[];
}

export const manualTechniques: ManualTechnique[] = [
  {
    "id": 1,
    "name": "Maitland Grade I-IV Mobilisations",
    "category": "Joint Mobilisation",
    "region": "All Regions",
    "description": "Oscillatory passive accessory or physiological joint movements graded by amplitude and position in the available range.",
    "indications": [
      "Pain dominant disorders (Grades I-II)",
      "Stiffness dominant disorders (Grades III-IV)",
      "Hypomobile joints",
      "Capsular restriction"
    ],
    "contraindications": [
      "Joint instability",
      "Fracture",
      "Acute inflammation",
      "Malignancy at site",
      "Vertebrobasilar insufficiency (cervical)"
    ],
    "procedure": "Position joint in resting/loose-packed position. Apply rhythmic oscillations 2-3/sec for 30-60 sec. Reassess after each set.",
    "evidence": "Strong for short-term pain & ROM gains; combine with active exercise (Bialosky 2009).",
    "source_books": [
      "Maitland's Vertebral Manipulation",
      "Magee's Orthopedic Physical Assessment"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments"
      },
      {
        "label": "Books",
        "path": "/books"
      }
    ],
    "mechanism": "Stimulates joint mechanoreceptors and inhibits nociceptive transmission via gate-control and descending modulation. Improves synovial fluid distribution and capsular extensibility.",
    "dosage": "Grade I-II: 30-60 sec, 2-3 oscillations/sec for pain. Grade III-IV: 30 sec, 2 oscillations/sec for stiffness. 3-5 sets, reassess between.",
    "progressions": [
      "Grade I → II for irritability",
      "Grade III → IV as tolerated",
      "Add physiological movement (combined techniques)",
      "Self-mobilisation home program"
    ],
    "clinical_pearls": "Always re-assess the comparable sign after each set. If pain worsens, reduce grade. Combine with active exercise — manual therapy alone has limited carryover.",
    "home_self_care": "Self-mobilisation with belt or strap; gentle ROM exercises 3x/day.",
    "key_references": [
      "Maitland GD. Vertebral Manipulation, 8th ed.",
      "Bialosky JE. Mechanisms of Manual Therapy. JOSPT 2009;39(4)."
    ]
  },
  {
    "id": 2,
    "name": "Mulligan Mobilisation with Movement (MWM)",
    "category": "Joint Mobilisation",
    "region": "All Regions",
    "description": "Sustained passive accessory glide combined with active patient movement (NAGs, SNAGs, MWMs).",
    "indications": [
      "Painful active movement with mechanical block",
      "Loss of joint glide",
      "Sub-acute and chronic conditions"
    ],
    "contraindications": [
      "Pain reproduction during the technique",
      "Acute inflammation",
      "Fracture",
      "Joint instability"
    ],
    "procedure": "Apply pain-free accessory glide; patient performs previously painful active movement. Repeat 3 sets x 10 reps if pain-free.",
    "evidence": "Strong for lateral epicondylalgia, ankle sprain & cervicogenic headache (Hing 2015).",
    "source_books": [
      "Mulligan's Manual Therapy NAGs SNAGs MWMs"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments"
      },
      {
        "label": "Books",
        "path": "/books"
      }
    ],
    "mechanism": "Restores normal arthrokinematic glide that compensates for restricted accessory motion; immediate motor cortex re-mapping suggested.",
    "dosage": "3 sets x 10 pain-free repetitions. If symptoms increase, abandon. Apply 1-2 times per session.",
    "progressions": [
      "Therapist MWM → self-MWM with belt",
      "Add load (weight/resistance)",
      "Functional task integration"
    ],
    "clinical_pearls": "Pain-free RULE is non-negotiable. If you cannot find a pain-free direction of glide, MWM is not indicated.",
    "home_self_care": "Self-SNAGs with belt for cervical/lumbar spine; self-MWM with strap for ankle and shoulder.",
    "key_references": [
      "Hing W. The Mulligan Concept of Manual Therapy, 2015.",
      "Vicenzino B. Lateral Epicondylalgia. Manual Therapy 2003;8(2)."
    ]
  },
  {
    "id": 3,
    "name": "McKenzie MDT — Repeated End-Range Loading",
    "category": "Mechanical Diagnosis & Therapy",
    "region": "Spine",
    "description": "Mechanical Diagnosis and Therapy uses repeated end-range movements to identify a directional preference and centralise symptoms.",
    "indications": [
      "Mechanical low back pain",
      "Cervical radiculopathy with directional preference",
      "Disc-related pain (centralisers)"
    ],
    "contraindications": [
      "Cauda equina",
      "Progressive neurological deficit",
      "Suspected fracture/red flags",
      "Non-mechanical pain pattern"
    ],
    "procedure": "Assess baseline. Perform 10 repetitions of test movement (e.g., prone press-up). Reassess pain location, intensity, ROM. Prescribe directional preference if centralisation occurs.",
    "evidence": "Strong for centralisation responders; superior to general exercise in this subgroup (Long 2004).",
    "source_books": [
      "The McKenzie Method (Mechanical Diagnosis & Therapy)"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments?region=Lumbar+Spine"
      },
      {
        "label": "EBP",
        "path": "/ebp"
      }
    ],
    "mechanism": "Repeated end-range loading hypothesised to reduce posterior disc displacement, restore nuclear hydration and re-train spinal motor control.",
    "dosage": "10 reps every 2 hours; 7-10 sessions. Self-treatment is the cornerstone.",
    "progressions": [
      "Patient-generated forces → therapist overpressure → manipulation if needed",
      "Combine with directional preference exercise"
    ],
    "clinical_pearls": "Centralisation of symptoms is the strongest predictor of good outcome (Long 2004). Document baseline pain location before each set.",
    "home_self_care": "Prone press-ups, lumbar extension in standing, prone-on-elbows; 10 reps every 2 hours.",
    "key_references": [
      "McKenzie R, May S. The Lumbar Spine: MDT, 2nd ed.",
      "Long A et al. Spine 2004;29(23)."
    ]
  },
  {
    "id": 4,
    "name": "Cyriax Deep Transverse Friction Massage",
    "category": "Soft Tissue",
    "region": "All Regions",
    "description": "Deep friction perpendicular to fibre direction of tendon/ligament to mobilise tissue and stimulate orderly collagen alignment.",
    "indications": [
      "Chronic tendinopathy",
      "Ligament sprain (sub-acute/chronic)",
      "Muscle belly lesions"
    ],
    "contraindications": [
      "Acute inflammation",
      "Bursitis (acute)",
      "Skin infections",
      "Calcified lesions"
    ],
    "procedure": "Locate lesion precisely. Apply firm transverse friction with finger/thumb 5-15 min until analgesia. Follow with active loading.",
    "evidence": "Limited high-quality RCT evidence; combine with eccentric loading for tendinopathy.",
    "source_books": [
      "Cyriax's Illustrated Manual of Orthopaedic Medicine"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments"
      },
      {
        "label": "Books",
        "path": "/books"
      }
    ],
    "mechanism": "Mechanical disruption of cross-fibre adhesions; stimulates inflammatory healing response and orderly collagen deposition.",
    "dosage": "5-15 min per lesion. 3 sessions/week for 2-3 weeks. Combine with eccentric loading.",
    "progressions": [
      "Pain-free → mild discomfort → graded loading post-friction",
      "Add ECC exercise immediately after"
    ],
    "clinical_pearls": "Cyriax's hallmark: 'Friction must reach the lesion.' If you cannot palpate it precisely, do not friction.",
    "home_self_care": "Eccentric loading exercises specific to the involved tendon (e.g., Alfredson protocol for Achilles).",
    "key_references": [
      "Cyriax J. Textbook of Orthopaedic Medicine.",
      "Brosseau L. Cochrane Database Syst Rev. 2002;(4)."
    ]
  },
  {
    "id": 5,
    "name": "Kaltenborn-Evjenth Joint Traction & Glides",
    "category": "Joint Mobilisation",
    "region": "All Regions",
    "description": "Translatoric (linear) joint movements (traction Grade I-III, glides) based on the convex-concave rule.",
    "indications": [
      "Hypomobility",
      "Capsular restriction",
      "Loss of accessory motion"
    ],
    "contraindications": [
      "Joint hypermobility/instability",
      "Fracture",
      "Acute inflammation",
      "Bone disease"
    ],
    "procedure": "Position joint in resting position. Stabilise proximal segment. Apply traction or glide opposite to restricted movement (convex moving) or same direction (concave moving).",
    "evidence": "Moderate for ROM gain; should be combined with active rehabilitation.",
    "source_books": [
      "Magee's Orthopedic Physical Assessment",
      "Maitland's Vertebral Manipulation"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments"
      }
    ],
    "mechanism": "Translatoric movement reproduces accessory glides lost in capsular restriction; improves nutrition and reduces capsular shortening.",
    "dosage": "Grade I (pain): 30 sec; Grade II-III (stiffness): 7 sec hold + 3 sec rest, 6-10 reps.",
    "progressions": [
      "Traction → glide combinations → end-range glides → manipulation if appropriate"
    ],
    "clinical_pearls": "Identify the convex/concave rule for the joint to choose glide direction.",
    "home_self_care": "Self-glides with strap (e.g., posterior shoulder glide for OA shoulder).",
    "key_references": [
      "Kaltenborn FM. Manual Mobilization of the Joints, 8th ed."
    ]
  },
  {
    "id": 6,
    "name": "Trigger Point Release (Ischaemic Compression)",
    "category": "Soft Tissue",
    "region": "All Regions",
    "description": "Sustained pressure on a myofascial trigger point until the referred pain pattern releases (typically 30-90 sec).",
    "indications": [
      "Myofascial pain syndrome",
      "Active or latent trigger points",
      "Referred pain"
    ],
    "contraindications": [
      "Skin lesions",
      "Anticoagulation (caution)",
      "Acute injury at site",
      "Malignancy"
    ],
    "procedure": "Identify taut band. Apply pressure to elicit referred pain at 5-7/10 intensity. Maintain until release (~30-90 sec). Follow with stretching.",
    "evidence": "Moderate for short-term pain & disability reduction (Cagnie 2013).",
    "source_books": [
      "Travell, Simons & Simons' Myofascial Pain and Dysfunction",
      "Trigger Point Dry Needling"
    ],
    "related_pages": [
      {
        "label": "Muscles",
        "path": "/muscles"
      },
      {
        "label": "Impairments",
        "path": "/impairments"
      }
    ],
    "mechanism": "Sustained pressure causes local ischaemia → reactive hyperaemia → reduced muscle tone via Golgi tendon organ inhibition.",
    "dosage": "30-90 sec per point, pain rating 5-7/10, until release felt. 2-3 sessions/week.",
    "progressions": [
      "Manual TrP release → dry needling for resistant TrPs",
      "Add active stretch immediately after"
    ],
    "clinical_pearls": "Always reproduce the patient's referred pain pattern to confirm an active trigger point.",
    "home_self_care": "Tennis/lacrosse ball self-release; foam roller; specific stretches for involved muscle.",
    "key_references": [
      "Travell & Simons. Myofascial Pain & Dysfunction, 2nd ed.",
      "Cagnie B. J Manipulative Physiol Ther. 2013;36(7)."
    ]
  },
  {
    "id": 7,
    "name": "Trigger Point Dry Needling",
    "category": "Needling",
    "region": "All Regions",
    "description": "Insertion of a thin filiform needle into a myofascial trigger point to elicit a local twitch response and reduce muscle tone.",
    "indications": [
      "Myofascial pain",
      "Persistent muscle hypertonicity",
      "Referred pain not responsive to manual release"
    ],
    "contraindications": [
      "Needle phobia",
      "Local infection",
      "Lymphoedema in region",
      "Bleeding disorders/anticoagulation (caution)",
      "Pneumothorax risk areas (caution)"
    ],
    "procedure": "Clean skin. Insert needle into taut band aiming for local twitch response. May leave in situ 10-15 min or pistoning technique.",
    "evidence": "Strong short-term pain reduction; equivalent to manual trigger point release at 4 weeks (Gattie 2017).",
    "source_books": [
      "Trigger Point Dry Needling"
    ],
    "related_pages": [
      {
        "label": "Muscles",
        "path": "/muscles"
      },
      {
        "label": "Impairments",
        "path": "/impairments"
      }
    ],
    "mechanism": "Local twitch response disrupts dysfunctional motor end-plate activity; reduces spontaneous electrical activity and muscle nociception.",
    "dosage": "1-3 needling sites per session; 1-2 sessions/week. Effects usually within 24-72h.",
    "progressions": [
      "Single needle → multiple sites → electrical stimulation (electroacupuncture)"
    ],
    "clinical_pearls": "Always perform a thorough screening (anatomy, anticoagulation, pneumothorax risk over thorax).",
    "home_self_care": "Light active movement, hydration, and avoid intensive loading for 24h post-needling.",
    "key_references": [
      "Dommerholt J. Trigger Point Dry Needling, 2nd ed.",
      "Gattie E et al. JOSPT 2017;47(3)."
    ]
  },
  {
    "id": 8,
    "name": "Muscle Energy Technique (MET)",
    "category": "Soft Tissue",
    "region": "All Regions",
    "description": "Patient-active isometric or eccentric contraction against clinician resistance to improve ROM and reduce muscle tone (post-isometric relaxation).",
    "indications": [
      "Hypertonic muscles",
      "Restricted ROM",
      "Muscle imbalance",
      "SIJ dysfunction"
    ],
    "contraindications": [
      "Acute strain (Grade II/III)",
      "Fracture",
      "Severe osteoporosis"
    ],
    "procedure": "Position muscle at end of available range. Patient contracts at 20-30% MVIC for 5 sec, then relaxes. Take up new slack. Repeat 3-5 cycles.",
    "evidence": "Moderate for short-term ROM gain; comparable to static stretching.",
    "source_books": [
      "Modern Neuromuscular Techniques (Chaitow)"
    ],
    "related_pages": [
      {
        "label": "Muscles",
        "path": "/muscles"
      },
      {
        "label": "Exercises",
        "path": "/exercises"
      }
    ],
    "mechanism": "Post-isometric relaxation via Golgi tendon organ inhibition; reciprocal inhibition of antagonist; viscoelastic creep.",
    "dosage": "20-30% MVIC isometric for 5 sec → relax 2 sec → take up slack → repeat 3-5 cycles.",
    "progressions": [
      "Increase contraction intensity 25→50% MVIC",
      "Combine with active assisted ROM"
    ],
    "clinical_pearls": "Patient effort and timing of relaxation are critical — coach the breath cycle.",
    "home_self_care": "Self-MET with strap or doorframe; integrated into daily mobility routine.",
    "key_references": [
      "Chaitow L. Modern Neuromuscular Techniques, 4th ed.",
      "Sharman MJ. Sports Med 2006;36(11)."
    ]
  },
  {
    "id": 9,
    "name": "Neural Mobilisation (Sliders & Tensioners)",
    "category": "Neurodynamics",
    "region": "All Regions",
    "description": "Movement techniques to restore neurodynamic mobility of the peripheral nervous system. Sliders glide neural tissue; tensioners load it.",
    "indications": [
      "Cervical or lumbar radiculopathy",
      "Carpal tunnel syndrome",
      "Neural tension after surgery",
      "Sciatica"
    ],
    "contraindications": [
      "Acute nerve injury",
      "Cauda equina",
      "Acute inflammatory neuropathy",
      "Spinal cord compression"
    ],
    "procedure": "Position to bias the relevant nerve (e.g., median ULNT1). Apply oscillatory sliders pain-free, 10 reps x 3 sets. Progress to tensioners as tolerated.",
    "evidence": "Moderate for CTS, cervicobrachial pain & sciatica when combined with other care (Basson 2017).",
    "source_books": [
      "Magee's Orthopedic Physical Assessment",
      "Special Tests in Musculoskeletal Examination"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments"
      },
      {
        "label": "Exercises",
        "path": "/exercises"
      }
    ],
    "mechanism": "Restores neural mechanosensitivity and excursion; reduces intraneural oedema; modulates dorsal horn nociception.",
    "dosage": "Sliders: 10 reps x 3 sets, 2-3x/day. Tensioners: 5-10 reps as tolerated.",
    "progressions": [
      "Sliders (pain-free) → tensioners (mild discomfort acceptable) → functional integration"
    ],
    "clinical_pearls": "Always start with sliders. If the nerve is highly sensitised, even sliders can flare — start with 1-2 reps.",
    "home_self_care": "Patient-led nerve glides, 5 reps x 3-4x/day. Avoid prolonged tensioning.",
    "key_references": [
      "Butler DS. The Sensitive Nervous System.",
      "Basson A et al. JOSPT 2017;47(9)."
    ]
  },
  {
    "id": 10,
    "name": "High-Velocity Low-Amplitude (HVLA) Manipulation",
    "category": "Manipulation",
    "region": "Spine",
    "description": "Single, brief, fast thrust technique applied at end of available passive range, often producing an audible cavitation.",
    "indications": [
      "Mechanical neck or back pain",
      "Hypomobility unresponsive to mobilisation"
    ],
    "contraindications": [
      "Vertebrobasilar insufficiency (cervical)",
      "Fracture/instability",
      "Inflammatory arthropathy at level",
      "Osteoporosis",
      "Anticoagulation (caution)"
    ],
    "procedure": "Screen for red flags & VBI. Position to lock segments above and below. Apply controlled HVLA thrust within physiological barrier.",
    "evidence": "Moderate for acute mechanical neck/back pain when combined with exercise (Coulter 2018).",
    "source_books": [
      "Maitland's Vertebral Manipulation",
      "Greenman's Principles of Manual Medicine"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments?region=Cervical+Spine"
      },
      {
        "label": "EBP",
        "path": "/ebp"
      }
    ],
    "mechanism": "Cavitation of synovial fluid; rapid joint distraction stimulates Type I and II mechanoreceptors → reflex muscle inhibition and pain modulation.",
    "dosage": "1-2 thrusts per segment per session. Maximum 1 region per visit recommended.",
    "progressions": [
      "Mobilisation Grade IV → manipulation Grade V if Grade IV insufficient"
    ],
    "clinical_pearls": "MUST screen for cervical artery dysfunction (Kerry & Taylor framework) and red flags.",
    "home_self_care": "Active ROM, postural correction and strengthening to maintain gains.",
    "key_references": [
      "Maitland GD. Vertebral Manipulation, 8th ed.",
      "Coulter ID. Spine J 2018;18(5)."
    ]
  },
  {
    "id": 11,
    "name": "Myofascial Release",
    "category": "Soft Tissue",
    "region": "All Regions",
    "description": "Sustained low-load stretch applied to fascial restrictions to allow viscoelastic creep and tissue elongation.",
    "indications": [
      "Fascial restrictions",
      "Chronic pain syndromes",
      "Post-surgical adhesions",
      "Generalised stiffness"
    ],
    "contraindications": [
      "Acute inflammation",
      "Open wounds",
      "DVT",
      "Severe osteoporosis"
    ],
    "procedure": "Engage fascial barrier with light pressure. Sustain 90-120 sec until tissue release/creep occurs. Move to next restriction.",
    "evidence": "Limited but emerging; useful adjunct in chronic pain (Ajimsha 2015 SR).",
    "source_books": [
      "Modern Neuromuscular Techniques (Chaitow)"
    ],
    "related_pages": [
      {
        "label": "Muscles",
        "path": "/muscles"
      }
    ],
    "mechanism": "Sustained low-load deformation produces viscoelastic creep and breaks fascial cross-links; modulates fascial mechanoreceptors.",
    "dosage": "90-180 sec sustained per restriction; 3-5 areas per session.",
    "progressions": [
      "Cross-hand → tool-assisted (IASTM)",
      "Combine with active movement (active release variant)"
    ],
    "clinical_pearls": "Engage the barrier — do NOT push through it. Wait for the release.",
    "home_self_care": "Foam rolling 1-2 min per area; 3-5x/week.",
    "key_references": [
      "Chaitow L. Fascial Dysfunction.",
      "Ajimsha MS. J Bodyw Mov Ther 2015;19(1)."
    ]
  },
  {
    "id": 12,
    "name": "Instrument-Assisted Soft Tissue Mobilisation (IASTM)",
    "category": "Soft Tissue",
    "region": "All Regions",
    "description": "Use of specially designed stainless-steel/ceramic instruments (Graston, FAKTR, HawkGrips) to detect and treat soft tissue restrictions.",
    "indications": [
      "Tendinopathy",
      "Scar tissue/adhesions",
      "Chronic muscle restrictions",
      "Plantar fasciitis",
      "Lateral epicondylalgia"
    ],
    "contraindications": [
      "Open wounds",
      "Acute injury (< 72h)",
      "Anticoagulation",
      "Skin infections",
      "Active malignancy at site"
    ],
    "procedure": "Apply emollient. Use instrument at 30-60° angle; sweep over tissue 30-60 sec per area, 1-2 passes. Follow with active loading.",
    "evidence": "Limited but emerging; comparable to manual STM (Cheatham 2016 SR).",
    "source_books": [
      "Clinical Orthopaedic Rehabilitation"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments"
      }
    ],
    "mechanism": "Mechanical microtrauma stimulates fibroblastic activity, neovascularisation and collagen remodelling.",
    "dosage": "30-60 sec per area, 1-2 passes; 6-8 sessions over 4-6 weeks.",
    "progressions": [
      "Light pressure (early) → moderate (week 2+) with active loading",
      "Stop if excessive bruising"
    ],
    "clinical_pearls": "Petechiae are expected; large haematomas are not — reduce pressure.",
    "home_self_care": "Active loading exercises and avoid heavy provocative activity for 24h post-treatment.",
    "key_references": [
      "Cheatham SW et al. J Can Chiropr Assoc 2016;60(3).",
      "Loghmani MT. JOSPT 2009;39(7)."
    ]
  },
  {
    "id": 13,
    "name": "Positional Release / Strain-Counterstrain",
    "category": "Soft Tissue",
    "region": "All Regions",
    "description": "Passive positioning of a body segment into a position of comfort (~70% pain reduction) to reduce nociception and muscle tone.",
    "indications": [
      "Acute muscle spasm",
      "Tender points",
      "Pain-dominant presentations",
      "Post-injury guarding"
    ],
    "contraindications": [
      "Vascular compromise",
      "Acute fracture",
      "Severe osteoporosis"
    ],
    "procedure": "Identify tender point. Position to reduce tenderness by ≥70%. Hold 90 sec. Slowly return to neutral.",
    "evidence": "Limited evidence; safe & well tolerated for acute pain.",
    "source_books": [
      "Modern Neuromuscular Techniques (Chaitow)"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments"
      }
    ],
    "mechanism": "Position of comfort reduces afferent firing from gamma motor neurons; resets muscle spindle bias.",
    "dosage": "Hold 90 sec per tender point; slow return to neutral over 5-10 sec.",
    "progressions": [
      "Single TP → multiple TPs in same session",
      "Combine with active gentle ROM"
    ],
    "clinical_pearls": "Use a numerical scale — 70-100% reduction in tenderness must be achieved at the tender point in the position.",
    "home_self_care": "Patient education on positions of comfort during acute episodes.",
    "key_references": [
      "Chaitow L. Positional Release Techniques, 4th ed."
    ]
  },
  {
    "id": 14,
    "name": "Kinesio Taping (Functional Taping)",
    "category": "Taping & Bracing",
    "region": "All Regions",
    "description": "Application of elastic therapeutic tape to provide proprioceptive input, support muscle function, and influence fascia.",
    "indications": [
      "Acute & sub-acute soft tissue injury",
      "Proprioceptive feedback",
      "Muscle facilitation/inhibition",
      "Post-exercise oedema"
    ],
    "contraindications": [
      "Skin allergy to adhesive",
      "Open wounds",
      "Fragile skin",
      "Active malignancy at site"
    ],
    "procedure": "Clean & dry skin. Apply tape with appropriate tension (15-50%) based on goal: facilitation (origin → insertion), inhibition (insertion → origin), space-correction (lift technique).",
    "evidence": "Mixed; small effect sizes but useful adjunct (Williams 2012 SR).",
    "source_books": [
      "Clinical Orthopaedic Rehabilitation"
    ],
    "related_pages": [
      {
        "label": "Exercises",
        "path": "/exercises"
      },
      {
        "label": "Impairments",
        "path": "/impairments"
      }
    ],
    "mechanism": "Cutaneous afferent stimulation modulates pain (gate-control); proprioceptive feedback; lymphatic facilitation via skin lift.",
    "dosage": "Tape worn 3-5 days; reapplied as needed.",
    "progressions": [
      "Inhibition → facilitation taping",
      "Combine with rehab exercise progression"
    ],
    "clinical_pearls": "Always test for skin reaction with a small piece first. Avoid over-stretching anchor ends.",
    "home_self_care": "Patient self-application after demonstration; remove if itching/redness develops.",
    "key_references": [
      "Williams S. BMC Sports Sci Med Rehabil 2012;4:24.",
      "Kase K. Clinical Therapeutic Applications."
    ]
  },
  {
    "id": 15,
    "name": "Pain Neuroscience Education (PNE)",
    "category": "Education & Cognitive",
    "region": "All Regions",
    "description": "Patient education about the biology of pain to reduce threat perception, catastrophising and promote self-management.",
    "indications": [
      "Chronic/persistent pain",
      "High pain catastrophising",
      "Fear-avoidance behaviours",
      "Central sensitisation"
    ],
    "contraindications": [
      "None — adapt content to patient literacy & beliefs"
    ],
    "procedure": "30-60 min explanation of pain biology using metaphors and visuals. Reinforce with handouts/videos. Combine with graded activity & exposure.",
    "evidence": "Strong reduction in pain, disability, catastrophising in chronic pain (Louw 2016 SR).",
    "source_books": [
      "Explain Pain",
      "The Sensitive Nervous System"
    ],
    "related_pages": [
      {
        "label": "EBP",
        "path": "/ebp"
      },
      {
        "label": "Impairments",
        "path": "/impairments"
      }
    ],
    "mechanism": "Reduces threat perception → reduces facilitation in dorsal horn → reduces output of nociceptive system; promotes top-down inhibition.",
    "dosage": "30-60 min initial session; reinforced over 4-8 sessions; supplemented with handouts/videos.",
    "progressions": [
      "Group → individualised education → integration into graded exposure"
    ],
    "clinical_pearls": "Use metaphors (alarm system, smoke detector) — avoid jargon. Tailor depth to patient literacy.",
    "home_self_care": "Recommend 'Explain Pain' book/app; self-paced reading and video review.",
    "key_references": [
      "Moseley GL & Butler DS. Explain Pain, 2nd ed.",
      "Louw A. Physiother Theory Pract 2016;32(5)."
    ]
  },
  {
    "id": 16,
    "name": "Soft Tissue Release (STR)",
    "category": "Soft Tissue",
    "region": "All Regions",
    "description": "Active or passive stretching combined with sustained pressure on the muscle to lengthen specific fibres and release adhesions.",
    "indications": [
      "Localised muscle tightness",
      "Chronic muscle adhesions",
      "Sports recovery",
      "Restricted ROM not improving with stretching"
    ],
    "contraindications": [
      "Acute strain",
      "Open wounds",
      "Bruising",
      "Anticoagulation"
    ],
    "procedure": "Place muscle in shortened position. Apply firm anchor pressure. Patient (active) or therapist (passive) lengthens the muscle while pressure is maintained. 3-5 reps per area.",
    "evidence": "Limited RCT evidence; positive clinical reports for sports populations.",
    "source_books": [
      "Modern Neuromuscular Techniques (Chaitow)",
      "Clinical Orthopaedic Rehabilitation"
    ],
    "related_pages": [
      {
        "label": "Muscles",
        "path": "/muscles"
      },
      {
        "label": "Exercises",
        "path": "/exercises"
      }
    ],
    "mechanism": "Mechanical loading of targeted tissue structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Acute strain is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Modern Neuromuscular Techniques (Chaitow)",
      "Clinical Orthopaedic Rehabilitation"
    ]
  },
  {
    "id": 17,
    "name": "PNF Stretching (Contract-Relax / Hold-Relax)",
    "category": "Stretching & Flexibility",
    "region": "All Regions",
    "description": "Proprioceptive Neuromuscular Facilitation stretching uses isometric contraction of the target muscle followed by relaxation and further stretch.",
    "indications": [
      "Restricted muscle length",
      "Pre-/post-event flexibility",
      "Post-immobilisation stiffness",
      "Hamstring/hip flexor tightness"
    ],
    "contraindications": [
      "Acute muscle strain",
      "Recent fracture in region",
      "Severe osteoporosis",
      "Joint instability"
    ],
    "procedure": "Lengthen target muscle to first stretch barrier. Patient performs 6 sec isometric contraction at 50-75% MVIC. Relax 2 sec, then increase stretch 30 sec. Repeat 3 cycles.",
    "evidence": "Strong for short-term ROM gain — superior to static stretching (Sharman 2006 SR).",
    "source_books": [
      "Modern Neuromuscular Techniques (Chaitow)",
      "Clinical Orthopaedic Rehabilitation"
    ],
    "related_pages": [
      {
        "label": "Muscles",
        "path": "/muscles"
      },
      {
        "label": "Exercises",
        "path": "/exercises"
      }
    ],
    "mechanism": "Mechanical loading of targeted tissue structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Acute muscle strain is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Modern Neuromuscular Techniques (Chaitow)",
      "Clinical Orthopaedic Rehabilitation"
    ]
  },
  {
    "id": 18,
    "name": "Static Stretching (Long-Duration)",
    "category": "Stretching & Flexibility",
    "region": "All Regions",
    "description": "Sustained low-load stretch held at the point of mild tension for 30-60 sec to increase tissue extensibility.",
    "indications": [
      "Loss of muscle length",
      "Post-exercise cool-down",
      "Postural retraining",
      "Muscle imbalance"
    ],
    "contraindications": [
      "Acute strain",
      "Hypermobility syndromes",
      "Recent surgical repair of the muscle"
    ],
    "procedure": "Lengthen muscle to mild stretch sensation (4-5/10). Hold 30-60 sec, breathe normally. 3-4 reps per muscle, 3-5 days/week.",
    "evidence": "Strong for ROM; effects on injury prevention modest.",
    "source_books": [
      "Clinical Orthopaedic Rehabilitation"
    ],
    "related_pages": [
      {
        "label": "Muscles",
        "path": "/muscles"
      },
      {
        "label": "Exercises",
        "path": "/exercises"
      }
    ],
    "mechanism": "Mechanical loading of targeted tissue structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Acute strain is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Clinical Orthopaedic Rehabilitation"
    ]
  },
  {
    "id": 19,
    "name": "Cervical Mechanical Traction",
    "category": "Traction & Decompression",
    "region": "Cervical Spine",
    "description": "Mechanical or manual longitudinal distraction of the cervical spine to reduce neural compression, intradiscal pressure and unload joints.",
    "indications": [
      "Cervical radiculopathy",
      "Discogenic neck pain",
      "Facet joint compression",
      "Foraminal stenosis"
    ],
    "contraindications": [
      "Cervical instability/RA",
      "Vertebrobasilar insufficiency",
      "Spinal cord compression",
      "Acute whiplash"
    ],
    "procedure": "Patient supine or seated. Cervical spine in 15-25° flexion. Apply intermittent traction 11-25 lb (5-12 kg) for 15-20 min, 30-sec on/15-sec off cycles.",
    "evidence": "Moderate when combined with exercise for radicular symptoms (Wainner cluster responders).",
    "source_books": [
      "Maitland's Vertebral Manipulation",
      "Magee's Orthopedic Physical Assessment"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments?region=Cervical+Spine"
      }
    ],
    "mechanism": "Mechanical loading of cervical spine structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Cervical instability/RA is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Maitland's Vertebral Manipulation",
      "Magee's Orthopedic Physical Assessment"
    ]
  },
  {
    "id": 20,
    "name": "Lumbar Mechanical Traction",
    "category": "Traction & Decompression",
    "region": "Lumbar Spine",
    "description": "Mechanical longitudinal distraction of the lumbar spine to reduce intradiscal pressure and decompress nerve roots.",
    "indications": [
      "Lumbar radiculopathy with positive crossed-SLR",
      "Disc herniation with peripheralisation on extension",
      "Stenosis with neurogenic claudication"
    ],
    "contraindications": [
      "Spinal infection/tumour",
      "Severe osteoporosis",
      "Cauda equina",
      "Acute fracture",
      "Pregnancy"
    ],
    "procedure": "Patient prone or supine. Pelvic harness applied. Begin 25-50% bodyweight pull, 15-20 min, intermittent (60-sec on/20-sec off).",
    "evidence": "Subgroup-specific benefit for centralisers with extension preference (Fritz 2007).",
    "source_books": [
      "Maitland's Vertebral Manipulation",
      "The McKenzie Method (Mechanical Diagnosis & Therapy)"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments?region=Lumbar+Spine"
      }
    ],
    "mechanism": "Mechanical loading of lumbar spine structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Spinal infection/tumour is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Maitland's Vertebral Manipulation",
      "The McKenzie Method (Mechanical Diagnosis & Therapy)"
    ]
  },
  {
    "id": 21,
    "name": "Thoracic Spine Manipulation",
    "category": "Manipulation",
    "region": "Thoracic Spine",
    "description": "HVLA thrust applied to the thoracic spine — commonly used as regional interdependence intervention for cervical and shoulder disorders.",
    "indications": [
      "Mechanical neck pain (regional interdependence)",
      "Subacromial pain syndrome",
      "Thoracic hypomobility",
      "Mid-back stiffness"
    ],
    "contraindications": [
      "Osteoporosis",
      "Spinal tumour/infection",
      "Acute fracture",
      "Inflammatory arthropathy at level"
    ],
    "procedure": "Position patient supine with arms crossed. Localise thrust segment with therapist's fist. Apply HVLA thrust through patient's elbows in P-A direction.",
    "evidence": "Strong for short-term improvement in neck pain & shoulder impingement (Cleland 2007, Mintken 2010).",
    "source_books": [
      "Maitland's Vertebral Manipulation",
      "Greenman's Principles of Manual Medicine"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments?region=Cervical+Spine"
      },
      {
        "label": "Impairments",
        "path": "/impairments?region=Shoulder"
      }
    ],
    "mechanism": "Mechanical loading of thoracic spine structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Osteoporosis is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Maitland's Vertebral Manipulation",
      "Greenman's Principles of Manual Medicine"
    ]
  },
  {
    "id": 22,
    "name": "Sacroiliac Joint (SIJ) Manipulation",
    "category": "Manipulation",
    "region": "Pelvis",
    "description": "HVLA or Grade V mobilisation directed at the sacroiliac joint to restore symmetry and reduce pain in confirmed SIJ dysfunction.",
    "indications": [
      "Positive Laslett SIJ cluster (3+ tests)",
      "SIJ pain with mechanical features",
      "Post-partum pelvic girdle pain"
    ],
    "contraindications": [
      "Pregnancy (third trimester)",
      "Pelvic fracture",
      "Inflammatory sacroiliitis",
      "Severe osteoporosis"
    ],
    "procedure": "Patient supine. Therapist stabilises contralateral ASIS, applies overpressure into hip flexion + adduction, then HVLA thrust through femur.",
    "evidence": "Moderate for SIJ-positive subgroup (Laslett 2008); short-term pain reduction.",
    "source_books": [
      "Greenman's Principles of Manual Medicine",
      "Maitland's Vertebral Manipulation"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments?region=Pelvis"
      }
    ],
    "mechanism": "Mechanical loading of pelvis structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Pregnancy (third trimester) is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Greenman's Principles of Manual Medicine",
      "Maitland's Vertebral Manipulation"
    ]
  },
  {
    "id": 23,
    "name": "Wrist Mobilisation (Mulligan & Maitland)",
    "category": "Joint Mobilisation",
    "region": "Wrist & Hand",
    "description": "Accessory glides and Mobilisation-with-Movement applied to the radiocarpal and intercarpal joints for stiffness and pain.",
    "indications": [
      "Post-Colles fracture stiffness",
      "Carpal tunnel adjunct",
      "Wrist sprain (sub-acute)",
      "TFCC dysfunction"
    ],
    "contraindications": [
      "Unhealed fracture",
      "Acute RA flare",
      "Joint instability",
      "Vascular compromise"
    ],
    "procedure": "Stabilise distal radius. Apply A-P or P-A glide of carpus while patient performs previously painful active wrist movement (Mulligan MWM).",
    "evidence": "Moderate; effective adjunct for post-fracture stiffness.",
    "source_books": [
      "Mulligan's Manual Therapy NAGs SNAGs MWMs",
      "Magee's Orthopedic Physical Assessment"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments?region=Wrist+%26+Hand"
      }
    ],
    "mechanism": "Mechanical loading of wrist & hand structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Unhealed fracture is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Mulligan's Manual Therapy NAGs SNAGs MWMs",
      "Magee's Orthopedic Physical Assessment"
    ]
  },
  {
    "id": 24,
    "name": "Ankle Mobilisation with Movement",
    "category": "Joint Mobilisation",
    "region": "Ankle & Foot",
    "description": "Mulligan posterior talar glide combined with weight-bearing dorsiflexion to restore range after ankle sprain.",
    "indications": [
      "Reduced dorsiflexion post-ankle sprain",
      "Stiff talocrural joint",
      "Chronic ankle instability"
    ],
    "contraindications": [
      "Acute fracture",
      "Syndesmosis injury (acute)",
      "Joint infection"
    ],
    "procedure": "Patient in standing lunge. Therapist applies posterior glide of talus on tibia using mobilisation belt while patient performs weight-bearing dorsiflexion. 3 sets x 10 reps.",
    "evidence": "Strong evidence for improving DF ROM post-sprain (Loudon 2014 SR).",
    "source_books": [
      "Mulligan's Manual Therapy NAGs SNAGs MWMs",
      "Clinical Orthopaedic Rehabilitation"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments?region=Ankle+%26+Foot"
      }
    ],
    "mechanism": "Mechanical loading of ankle & foot structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Acute fracture is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Mulligan's Manual Therapy NAGs SNAGs MWMs",
      "Clinical Orthopaedic Rehabilitation"
    ]
  },
  {
    "id": 25,
    "name": "McConnell Patellar Taping",
    "category": "Taping & Bracing",
    "region": "Knee",
    "description": "Rigid (zinc-oxide) taping applied to the patella to correct medial-lateral glide, tilt and rotation in patellofemoral pain.",
    "indications": [
      "Patellofemoral pain syndrome",
      "Patellar maltracking",
      "Post-arthroscopy pain",
      "Sports populations with anterior knee pain"
    ],
    "contraindications": [
      "Skin allergy to rigid tape",
      "Open wound",
      "Skin fragility",
      "Active patellar dislocation"
    ],
    "procedure": "Identify maltracking component (lateral glide most common). Apply hypoallergenic underwrap. Apply rigid tape from lateral border of patella across to medial femoral condyle, drawing patella medially.",
    "evidence": "Moderate; immediate pain reduction with combined taping + exercise (Callaghan 2012 SR).",
    "source_books": [
      "Clinical Orthopaedic Rehabilitation"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments?region=Knee"
      },
      {
        "label": "Exercises",
        "path": "/exercises?region=Knee"
      }
    ],
    "mechanism": "Mechanical loading of knee structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Skin allergy to rigid tape is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Clinical Orthopaedic Rehabilitation"
    ]
  },
  {
    "id": 26,
    "name": "Manual Lymphatic Drainage (MLD)",
    "category": "Soft Tissue",
    "region": "All Regions",
    "description": "Light, slow, rhythmic strokes following lymphatic drainage pathways to reduce oedema and promote lymphatic return.",
    "indications": [
      "Post-surgical oedema",
      "Lymphoedema",
      "Post-mastectomy upper limb swelling",
      "Acute soft-tissue swelling"
    ],
    "contraindications": [
      "Acute infection/cellulitis",
      "DVT",
      "Acute cardiac failure",
      "Active malignancy in region (specialist only)"
    ],
    "procedure": "Begin proximal (clear central nodes), progress distally then back. Pressure < 30 mmHg, slow circular strokes 5-7 reps per area. 30-45 min session.",
    "evidence": "Moderate for post-surgical & lymphoedema oedema reduction; component of Complete Decongestive Therapy.",
    "source_books": [
      "Clinical Orthopaedic Rehabilitation"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments"
      }
    ],
    "mechanism": "Mechanical loading of targeted tissue structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Acute infection/cellulitis is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Clinical Orthopaedic Rehabilitation"
    ]
  },
  {
    "id": 27,
    "name": "Acupuncture / Western Medical Acupuncture",
    "category": "Needling",
    "region": "All Regions",
    "description": "Insertion of fine needles into traditional acupoints or trigger points for pain modulation via segmental and supraspinal mechanisms.",
    "indications": [
      "Chronic musculoskeletal pain",
      "Tension-type & cervicogenic headache",
      "Knee OA",
      "Chronic low back pain"
    ],
    "contraindications": [
      "Bleeding disorders",
      "Needle phobia",
      "Pregnancy (specific points)",
      "Local infection or cellulitis"
    ],
    "procedure": "Clean skin. Insert sterile single-use needle 5-25 mm to obtain de qi sensation. Retain 15-30 min, with manual or electrical stimulation as indicated.",
    "evidence": "Strong for chronic LBP, knee OA & chronic headache (NICE & WHO guidelines).",
    "source_books": [
      "Trigger Point Dry Needling"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments"
      },
      {
        "label": "EBP",
        "path": "/ebp"
      }
    ],
    "mechanism": "Mechanical loading of targeted tissue structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Bleeding disorders is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Trigger Point Dry Needling"
    ]
  },
  {
    "id": 28,
    "name": "Cupping Therapy (Myofascial Decompression)",
    "category": "Soft Tissue",
    "region": "All Regions",
    "description": "Negative pressure applied via cups to lift skin and superficial fascia — promotes blood flow, reduces myofascial tension.",
    "indications": [
      "Chronic muscle tightness",
      "Myofascial restriction",
      "Post-exercise recovery",
      "Subacute muscle pain"
    ],
    "contraindications": [
      "Skin lesions/infection",
      "Anticoagulation",
      "Severe varicose veins",
      "Bleeding disorders"
    ],
    "procedure": "Apply emollient. Place cup, create suction (manual or pump), retain stationary 5-10 min OR slide along tissue. Bruising/petechiae expected.",
    "evidence": "Limited but emerging; positive small-RCT effects for chronic musculoskeletal pain.",
    "source_books": [
      "Modern Neuromuscular Techniques (Chaitow)"
    ],
    "related_pages": [
      {
        "label": "Muscles",
        "path": "/muscles"
      }
    ],
    "mechanism": "Mechanical loading of targeted tissue structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Skin lesions/infection is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Modern Neuromuscular Techniques (Chaitow)"
    ]
  },
  {
    "id": 29,
    "name": "Spinal Mobilisation (Central P-A)",
    "category": "Joint Mobilisation",
    "region": "Spine",
    "description": "Posteroanterior pressure applied centrally over a spinous process to assess and treat segmental hypomobility (Maitland concept).",
    "indications": [
      "Segmental spinal stiffness",
      "Mechanical spinal pain",
      "Pre-thrust assessment"
    ],
    "contraindications": [
      "Spinal instability",
      "Acute fracture",
      "Inflammatory arthropathy at level",
      "Severe osteoporosis"
    ],
    "procedure": "Patient prone. Therapist's pisiform on spinous process. Apply rhythmic P-A oscillations Grade I-IV based on irritability. 30-60 sec, reassess.",
    "evidence": "Strong as part of multimodal care for mechanical spinal pain.",
    "source_books": [
      "Maitland's Vertebral Manipulation"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments"
      }
    ],
    "mechanism": "Mechanical loading of spine structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Spinal instability is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Maitland's Vertebral Manipulation"
    ]
  },
  {
    "id": 30,
    "name": "Functional Fascial Taping (Dynamic Tape)",
    "category": "Taping & Bracing",
    "region": "All Regions",
    "description": "Strong elastomeric tape that absorbs load and provides mechanical decompression — biomechanical not proprioceptive.",
    "indications": [
      "Tendon overload",
      "Postural off-loading",
      "Subacromial impingement",
      "Patellofemoral pain"
    ],
    "contraindications": [
      "Skin allergy",
      "Open wounds",
      "Fragile/sensitive skin"
    ],
    "procedure": "Apply tape with 50-200% stretch from insertion to origin (off-loading). Anchors with no tension. Can be left in situ 3-5 days.",
    "evidence": "Limited but growing; useful adjunct in tendinopathy & overload presentations.",
    "source_books": [
      "Clinical Orthopaedic Rehabilitation"
    ],
    "related_pages": [
      {
        "label": "Impairments",
        "path": "/impairments"
      }
    ],
    "mechanism": "Mechanical loading of targeted tissue structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Skin allergy is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Clinical Orthopaedic Rehabilitation"
    ]
  },
  {
    "id": 31,
    "name": "Therapeutic Massage (Swedish/Sports)",
    "category": "Soft Tissue",
    "region": "All Regions",
    "description": "Manual stroking, kneading and friction techniques to relax muscle, improve circulation and reduce delayed onset muscle soreness.",
    "indications": [
      "DOMS",
      "Generalised muscle tension",
      "Sports recovery",
      "Stress-related muscular tension"
    ],
    "contraindications": [
      "Acute injury (< 48 h)",
      "DVT",
      "Skin infection",
      "Bleeding disorders"
    ],
    "procedure": "Effleurage (gliding) → petrissage (kneading) → friction → tapotement → vibration. Pressure adapted to tissue tolerance, 30-60 min session.",
    "evidence": "Moderate for DOMS, anxiety reduction; limited for chronic pain.",
    "source_books": [
      "Modern Neuromuscular Techniques (Chaitow)"
    ],
    "related_pages": [
      {
        "label": "Muscles",
        "path": "/muscles"
      }
    ],
    "mechanism": "Mechanical loading of targeted tissue structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Acute injury (< 48 h) is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Modern Neuromuscular Techniques (Chaitow)"
    ]
  },
  {
    "id": 32,
    "name": "Active Release Technique (ART)",
    "category": "Soft Tissue",
    "region": "All Regions",
    "description": "Active patient movement combined with sustained therapist pressure to break adhesions between muscles, fascia and nerves.",
    "indications": [
      "Chronic muscle adhesions",
      "Nerve entrapment (CTS, piriformis)",
      "Repetitive strain injuries",
      "Post-injury scar tissue"
    ],
    "contraindications": [
      "Acute injury",
      "Open wounds",
      "Anticoagulation",
      "Skin pathology"
    ],
    "procedure": "Place tissue in shortened position. Apply firm pressure over lesion. Patient actively lengthens tissue while pressure maintained. 3-5 reps per area.",
    "evidence": "Limited high-quality RCT evidence; widely used clinically with reported benefit.",
    "source_books": [
      "Modern Neuromuscular Techniques (Chaitow)",
      "Clinical Orthopaedic Rehabilitation"
    ],
    "related_pages": [
      {
        "label": "Muscles",
        "path": "/muscles"
      },
      {
        "label": "Impairments",
        "path": "/impairments"
      }
    ],
    "mechanism": "Mechanical loading of targeted tissue structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Acute injury is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Modern Neuromuscular Techniques (Chaitow)",
      "Clinical Orthopaedic Rehabilitation"
    ]
  },
  {
    "id": 33,
    "name": "Cognitive Functional Therapy (CFT)",
    "category": "Education & Cognitive",
    "region": "All Regions",
    "description": "Multidimensional behavioural approach addressing cognitive, emotional and lifestyle factors driving persistent musculoskeletal pain (O'Sullivan).",
    "indications": [
      "Chronic non-specific low back pain",
      "High-impact persistent pain",
      "Significant psychosocial drivers",
      "Failed previous interventions"
    ],
    "contraindications": [
      "Active red flags requiring medical care",
      "Severe untreated mental health condition"
    ],
    "procedure": "Stage 1: making sense of pain (PNE). Stage 2: exposure with control (graded movement). Stage 3: lifestyle change (sleep, activity, stress). Sessions 60 min, 5-8 visits.",
    "evidence": "Strong — clinically meaningful improvements in chronic LBP vs usual care (RESTORE trial 2023).",
    "source_books": [
      "Explain Pain",
      "The Sensitive Nervous System"
    ],
    "related_pages": [
      {
        "label": "EBP",
        "path": "/ebp"
      },
      {
        "label": "Impairments",
        "path": "/impairments?region=Lumbar+Spine"
      }
    ],
    "mechanism": "Mechanical loading of targeted tissue structures producing tissue-specific physiological adaptation; combined with neurophysiological effects of input modulation and patient expectation.",
    "dosage": "Apply 30-90 sec per region; 2-3 sets; 2-3 times per week. Adapt dose to patient irritability.",
    "progressions": [
      "Low-grade / pain-free → higher amplitude as tolerated",
      "Combine with active movement or loading",
      "Transition to home self-management"
    ],
    "clinical_pearls": "Always reassess the comparable sign after each application. Active red flags requiring medical care is the most common reason to abandon technique.",
    "home_self_care": "Provide a self-management strategy (self-mobilisation, stretch, foam roll) so the patient can maintain gains between visits.",
    "key_references": [
      "Explain Pain",
      "The Sensitive Nervous System"
    ]
  }
];

export const manualTherapyCategories = [...new Set(manualTechniques.map(t => t.category))].sort();
export const manualTherapyRegions = [...new Set(manualTechniques.map(t => t.region))].sort();
