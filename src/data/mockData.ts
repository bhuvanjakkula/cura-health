import { 
  Patient, 
  PriorAuthItem, 
  SOAPNote, 
  ScheduleSlot, 
  ClaimScrubberItem, 
  ComplianceAuditLog, 
  UserProfile, 
  PQCAssetInventory,
  ClinicalEvidenceObject,
  PPRLAdjudicationCandidate
} from '../types';

export const USER_PROFILES: UserProfile[] = [
  {
    id: 'usr_1',
    name: 'Dr. Sarah Lin, MD, FAAN',
    role: 'physician',
    roleTitle: 'Attending Neurologist & Clinical Director',
    specialty: 'Neurology & Headache Medicine',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    npi: '1841392019'
  },
  {
    id: 'usr_2',
    name: 'Dr. David Chen, MD, FAAOS',
    role: 'orthopedic_surgeon',
    roleTitle: 'Lead Orthopedic & Sports Medicine Surgeon',
    specialty: 'Orthopedic Surgery & Joint Reconstruction',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    npi: '1922384910'
  },
  {
    id: 'usr_3',
    name: 'Marcus Vance, MHA, CPAM',
    role: 'practice_admin',
    roleTitle: 'Practice Operations & Prior Auth Director',
    specialty: 'Practice Administration & Health Informatics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    npi: 'N/A (Admin)'
  },
  {
    id: 'usr_4',
    name: 'Brenda Morales, CPC, CPMA',
    role: 'billing_specialist',
    roleTitle: 'Revenue Cycle Lead & Certified Billing Auditor',
    specialty: 'Medical Coding & Revenue Integrity',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    npi: 'N/A (Billing)'
  },
  {
    id: 'usr_5',
    name: 'Jacqueline Reed, RN, BSN',
    role: 'triage_nurse',
    roleTitle: 'Lead Clinical Triage & Care Coordinator',
    specialty: 'Ambulatory Triage & Protocol Routing',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=200',
    npi: '1738291044'
  },
  {
    id: 'usr_6',
    name: 'Alicia Vance, JD, CHC, CIPP/US',
    role: 'compliance_officer',
    roleTitle: 'Chief Compliance & Cryptographic Security Officer',
    specialty: 'Regulatory Governance & PQC Security',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    npi: 'N/A (Compliance)'
  },
  {
    id: 'usr_7',
    name: 'Raymond Douglas, RHIA',
    role: 'him_specialist',
    roleTitle: 'Health Information Management & Identity Linkage Lead',
    specialty: 'PPRL Record Linkage & Data Governance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    npi: 'N/A (HIM)'
  }
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'pat_1',
    mrn: 'MRN-849201',
    name: 'Elena Rostova',
    dob: '1984-06-14',
    gender: 'Female',
    phone: '(555) 382-9102',
    email: 'elena.rostova@example.com',
    insuranceProvider: 'BlueCross BlueShield PPO',
    policyNumber: 'BCBS-99482103',
    groupNumber: 'GRP-0824',
    primaryCarePhysician: 'Dr. Sarah Lin, MD',
    allergies: ['Penicillin', 'Sulfa drugs'],
    activeConditions: ['Intractable Chronic Migraine (G43.909)', 'Cervical Spine Radiculopathy (M54.12)'],
    activeMedications: ['Topiramate 100mg PO daily', 'Sumatriptan 100mg PRN', 'Propranolol 40mg BID'],
    noShowRiskScore: 12,
    noShowRiskLevel: 'Low',
    noShowRiskFactors: ['Consistent 98% appointment attendance', 'Live nearby', 'Confirmed SMS 24h prior'],
    lastVisit: '2026-09-18',
    nextAppointment: 'Today, 10:15 AM'
  },
  {
    id: 'pat_2',
    mrn: 'MRN-723910',
    name: 'Marcus Holloway',
    dob: '1976-11-29',
    gender: 'Male',
    phone: '(555) 839-4410',
    email: 'm.holloway@example.com',
    insuranceProvider: 'UnitedHealthcare Choice Plus',
    policyNumber: 'UHC-81920394',
    groupNumber: 'GRP-9912',
    primaryCarePhysician: 'Dr. David Chen, MD',
    allergies: ['NSAIDs (Aspirin/Ibuprofen)', 'Codeine'],
    activeConditions: ['Severe Osteoarthritis of Right Knee (M17.11)', 'Medial Meniscus Tear (M23.22)'],
    activeMedications: ['Acetaminophen 650mg TID', 'Glucosamine-Chondroitin 1500mg'],
    noShowRiskScore: 78,
    noShowRiskLevel: 'High',
    noShowRiskFactors: ['Missed 2 past appointments', 'Public transit dependency (45m commute)', 'Unconfirmed reminder'],
    lastVisit: '2026-08-22',
    nextAppointment: 'Today, 11:30 AM'
  },
  {
    id: 'pat_3',
    mrn: 'MRN-610482',
    name: 'Clara Jenkins',
    dob: '1962-03-05',
    gender: 'Female',
    phone: '(555) 492-0193',
    email: 'clara.j62@example.com',
    insuranceProvider: 'Aetna Open Choice PPO',
    policyNumber: 'AET-77382910',
    groupNumber: 'GRP-3391',
    primaryCarePhysician: 'Dr. Sarah Lin, MD',
    allergies: ['Latex'],
    activeConditions: ['Primary Lumbar Radiculopathy (M54.16)', 'Osteoporosis without fracture (M81.0)'],
    activeMedications: ['Gabapentin 300mg TID', 'Alendronate 70mg weekly', 'Calcium + Vit D'],
    noShowRiskScore: 24,
    noShowRiskLevel: 'Low',
    noShowRiskFactors: ['Caregiver rideshare arranged', 'Good compliance history'],
    lastVisit: '2026-09-02',
    nextAppointment: 'Today, 02:00 PM'
  },
  {
    id: 'pat_4',
    mrn: 'MRN-934812',
    name: 'Devon Montgomery',
    dob: '1991-08-19',
    gender: 'Male',
    phone: '(555) 710-3849',
    email: 'devon.monty@example.com',
    insuranceProvider: 'Cigna Open Access Plus',
    policyNumber: 'CGN-44910283',
    groupNumber: 'GRP-1049',
    primaryCarePhysician: 'Dr. David Chen, MD',
    allergies: ['None known'],
    activeConditions: ['Rotator Cuff Tendinopathy (M75.10)', 'Subacromial Impingement (M75.51)'],
    activeMedications: ['Meloxicam 15mg daily'],
    noShowRiskScore: 48,
    noShowRiskLevel: 'Moderate',
    noShowRiskFactors: ['Shift work schedule', 'Rescheduled once previously'],
    lastVisit: '2026-09-29',
    nextAppointment: 'Today, 03:45 PM'
  },
  {
    id: 'pat_5',
    mrn: 'MRN-552918',
    name: 'Amara Okafor',
    dob: '1970-12-03',
    gender: 'Female',
    phone: '(555) 604-9271',
    email: 'amara.okafor@example.com',
    insuranceProvider: 'Humana Medicare Advantage',
    policyNumber: 'HUM-66281902',
    groupNumber: 'GRP-5542',
    primaryCarePhysician: 'Dr. Sarah Lin, MD',
    allergies: ['Ciprofloxacin'],
    activeConditions: ['Atherosclerotic Heart Disease (I25.10)', 'Essential Hypertension (I10)', 'Type 2 Diabetes (E11.9)'],
    activeMedications: ['Atorvastatin 40mg', 'Lisinopril 20mg', 'Metformin 1000mg BID'],
    noShowRiskScore: 18,
    noShowRiskLevel: 'Low',
    noShowRiskFactors: ['Family chaperone escort confirmed'],
    lastVisit: '2026-09-10',
    nextAppointment: 'Tomorrow, 09:00 AM'
  }
];

export const MOCK_PRIOR_AUTHS: PriorAuthItem[] = [
  {
    id: 'pa_1',
    paNumber: 'PA-2026-8841',
    patientId: 'pat_1',
    patientName: 'Elena Rostova',
    patientDob: '1984-06-14',
    patientMrn: 'MRN-849201',
    payor: 'BlueCross BlueShield',
    payorPlan: 'BlueCross Choice PPO Preferred',
    cptCode: 'J0585',
    cptDescription: 'Injection, onabotulinumtoxinA (Botox), 1 unit (200 units total authorized for Chronic Migraine prophylaxis)',
    icd10Code: 'G43.909',
    icd10Description: 'Age-appropriate Intractable Chronic Migraine without aura, not intractable',
    requestingProvider: 'Dr. Sarah Lin, MD',
    providerNpi: '1841392019',
    submissionDate: '2026-10-06 09:14 AM',
    slaDeadline: '2026-10-09 05:00 PM (24h Remaining)',
    status: 'approved',
    urgency: 'routine',
    estimatedCost: 3450,
    clinicalNotes: 'Patient experiences 18-22 headache days per month for >6 consecutive months. Documented failure of 3 preventive medication classes: Topiramate (cognitive side effects), Propranolol (bradycardia), and Amitriptyline (excessive sedation). MIDAS disability score is 28 (Severe disability).',
    conservativeTreatmentsAttempted: [
      'Failed Topamax 100mg (8 weeks trial - discontinued due to paresthesia/word-finding difficulty)',
      'Failed Propranolol 80mg (6 weeks trial - discontinued due to symptomatic resting heart rate <48 bpm)',
      'Failed Amitriptyline 25mg (6 weeks trial - discontinued due to daytime somnolence)',
      'Lifestyle modifications & headache diary maintained for 180 days'
    ],
    requiredDocsUploaded: [
      '6-Month Headache Calendar.pdf',
      'Clinical Office Visit Notes (3 Visits).pdf',
      'MIDAS Score Assessment Form (Score 28).pdf',
      'Step-Therapy Failure Log & Prescription Records.pdf'
    ],
    approvalCode: 'AUTH-BCBS-9948201',
    aiConfidenceScore: 98,
    clinicalJustification: 'Patient meets 100% of the BCBS Medical Policy Guidelines (SURG.00011) for onabotulinumtoxinA for Chronic Migraine. Complete step therapy criteria satisfied across 3 distinct pharmacological classes. Headaches exceed 15 days/month with minimum 8 migraine days/month.',
    timeline: [
      { date: '2026-10-06 09:14', action: 'Draft Created via Ambient Charting', actor: 'AI Engine', details: 'Auto-extracted step-therapy failures from EHR notes' },
      { date: '2026-10-06 09:20', action: 'Provider Electronic Signature', actor: 'Dr. Sarah Lin', details: 'Confirmed clinical rationale and ICD-10 concordance' },
      { date: '2026-10-06 09:22', action: 'EDI 278 Automated Submission', actor: 'CuraHealth Payor Gateway', details: 'Direct electronic transaction transmitted to BCBS API' },
      { date: '2026-10-07 14:15', action: 'Real-Time Automated Approval Received', actor: 'BCBS Gateway', details: 'Approval Ref: AUTH-BCBS-9948201 valid for 12 months (4 cycles)' }
    ]
  },
  {
    id: 'pa_2',
    paNumber: 'PA-2026-8842',
    patientId: 'pat_2',
    patientName: 'Marcus Holloway',
    patientDob: '1976-11-29',
    patientMrn: 'MRN-723910',
    payor: 'UnitedHealthcare',
    payorPlan: 'UHC Commercial Choice Plus',
    cptCode: '73721',
    cptDescription: 'Magnetic Resonance Imaging (MRI), knee, without contrast (Right Knee)',
    icd10Code: 'M23.22',
    icd10Description: 'Derangement of meniscus due to old tear or injury, right knee',
    requestingProvider: 'Dr. David Chen, MD',
    providerNpi: '1922384910',
    submissionDate: '2026-10-07 11:30 AM',
    slaDeadline: '2026-10-10 11:30 AM (48h Remaining)',
    status: 'pended_additional_info',
    urgency: 'routine',
    estimatedCost: 1850,
    clinicalNotes: 'Patient with acute locking and joint line tenderness of right knee following mechanical twist. Positive McMurray test. Plain weight-bearing radiographs performed showing no acute fracture but joint narrowing.',
    conservativeTreatmentsAttempted: [
      'Completed 4 weeks of targeted physical therapy with licensed PT',
      'Oral Meloxicam 15mg daily trial (4 weeks)',
      'Standing AP/Lateral/Sunrise X-rays completed on 2026-09-12'
    ],
    requiredDocsUploaded: [
      'Standing X-Ray Radiology Report (Dated 2026-09-12).pdf',
      'Physical Therapy Discharge Summary (12 sessions).pdf'
    ],
    denialReason: 'Payor requested documented 6-week conservative trial or explicit documentation of mechanical joint locking preventing ambulation.',
    aiConfidenceScore: 89,
    clinicalJustification: 'UHC Policy 2026T0515R requires either 6 weeks PT or acute mechanical blockage. Clinical exam clearly demonstrates true mechanical locking (fixed flexion contracture) and positive McMurray test, qualifying for exception under section 3.2.1.',
    timeline: [
      { date: '2026-10-07 11:30', action: 'Submitted via EDI 278', actor: 'Marcus Vance', details: 'Transmitted with clinical exam notes' },
      { date: '2026-10-08 08:45', action: 'Payor Status: Pended for Clarification', actor: 'UHC Portal', details: 'Additional mechanical locking documentation requested' }
    ]
  },
  {
    id: 'pa_3',
    paNumber: 'PA-2026-8843',
    patientId: 'pat_3',
    patientName: 'Clara Jenkins',
    patientDob: '1962-03-05',
    patientMrn: 'MRN-610482',
    payor: 'Aetna',
    payorPlan: 'Aetna Medicare Advantage Open Choice',
    cptCode: '64483',
    cptDescription: 'Injection(s), anesthetic and/or steroid, transforaminal epidural; lumbar or sacral, single level (L4-L5)',
    icd10Code: 'M54.16',
    icd10Description: 'Radiculopathy, lumbar region with dermatomal pain radiating down left leg',
    requestingProvider: 'Dr. Sarah Lin, MD',
    providerNpi: '1841392019',
    submissionDate: '2026-10-05 16:00 PM',
    slaDeadline: '2026-10-08 05:00 PM (TODAY)',
    status: 'denied',
    urgency: 'urgent',
    estimatedCost: 2100,
    clinicalNotes: 'Severe unremitting L5 radicular pain (VAS 8/10) refractory to oral gabapentin, cyclobenzaprine, and formal PT for 8 weeks. MRI lumbar spine confirms concordant L4-L5 left neural foraminal stenosis with nerve root impingement.',
    conservativeTreatmentsAttempted: [
      '8 weeks supervised physical therapy (active stabilization)',
      'Gabapentin 900mg total daily dose for 60 days',
      'MRI Lumbar Spine completed 2026-08-30 showing severe left L4-L5 stenosis'
    ],
    requiredDocsUploaded: [
      'Lumbar MRI Report (2026-08-30).pdf',
      'Physical Therapy Progress Notes (8 weeks).pdf',
      'Neurological Exam & VAS Pain Chart.pdf'
    ],
    denialReason: 'Denial Code CO-50: "Medical necessity not established under Clinical Policy Bulletin 0722 - lack of recent documented neurological exam within 30 days".',
    appealDeadline: '2026-10-22 (14 days remaining)',
    aiConfidenceScore: 94,
    clinicalJustification: 'Aetna CPB 0722 criteria are completely fulfilled. The denial cited missing exam within 30 days, but Dr. Lin performed a comprehensive neurological examination on 2026-09-02 (26 days prior to submission) documenting diminished L5 dermatome sensation and positive straight leg raise at 40 degrees.',
    timeline: [
      { date: '2026-10-05 16:00', action: 'Initial Submission', actor: 'Brenda Morales', details: 'Transmitted to Aetna EDI clearinghouse' },
      { date: '2026-10-08 09:10', action: 'Adverse Determination (Denial CO-50)', actor: 'Aetna Medical Reviewer', details: 'Denied for claimed lack of 30-day exam note' }
    ]
  },
  {
    id: 'pa_4',
    paNumber: 'PA-2026-8844',
    patientId: 'pat_4',
    patientName: 'Devon Montgomery',
    patientDob: '1991-08-19',
    patientMrn: 'MRN-934812',
    payor: 'Cigna Healthcare',
    payorPlan: 'Cigna Open Access Plus',
    cptCode: '29827',
    cptDescription: 'Arthroscopy, shoulder, surgical; with rotator cuff repair',
    icd10Code: 'M75.10',
    icd10Description: 'Unspecified rotator cuff tear or rupture of right shoulder',
    requestingProvider: 'Dr. David Chen, MD',
    providerNpi: '1922384910',
    submissionDate: '2026-10-08 08:30 AM',
    slaDeadline: '2026-10-13 05:00 PM',
    status: 'pending_review',
    urgency: 'routine',
    estimatedCost: 12400,
    clinicalNotes: 'Right shoulder full-thickness supraspinatus tear confirmed on 3T MRI. Persistent weakness with inability to elevate arm against gravity. Failed 12 weeks of conservative therapy and subacromial corticosteroid injection.',
    conservativeTreatmentsAttempted: [
      'Subacromial bursa corticosteroid injection (Triamcinolone 40mg on 2026-06-15) - temporary relief only',
      '12 weeks focused physical therapy for rotator cuff strengthening',
      'Oral Meloxicam 15mg daily'
    ],
    requiredDocsUploaded: [
      '3T MRI Shoulder Without Contrast.pdf',
      'Corticosteroid Injection Procedure Note.pdf',
      'Physical Therapy Compliance Record.pdf'
    ],
    aiConfidenceScore: 96,
    clinicalJustification: 'Meets Cigna Medical Coverage Policy 0122. Full-thickness tear with structural dysfunction refractory to >3 months conservative protocol including guided corticosteroid injection and structured rehabilitation.',
    timeline: [
      { date: '2026-10-08 08:30', action: 'Automated Prior Auth Generated & Transmitted', actor: 'CuraHealth AI Engine', details: 'Full clinical packet assembled and uploaded to Cigna EDI' },
      { date: '2026-10-08 08:32', action: 'Acknowledgment Received (Ack 277)', actor: 'Cigna Gateway', details: 'Standard clinical nurse review assigned' }
    ]
  }
];

export const MOCK_SOAP_NOTES: SOAPNote[] = [
  {
    id: 'soap_1',
    patientId: 'pat_1',
    patientName: 'Elena Rostova',
    encounterDate: '2026-10-08',
    providerName: 'Dr. Sarah Lin, MD',
    encounterType: 'In-Person Follow-Up',
    subjective: '42yo female returns for follow-up evaluation of refractory chronic migraine. Reports 20 migraine days over the last month with intense throbbing right frontotemporal pain, nausea, and severe photophobia. Topiramate was discontinued due to debilitating cognitive slowing and paresthesias. Propranolol caused symptomatic bradycardia (pulse 46 bpm). Patient is unable to work during episodes and MIDAS score is 28 (severe disability). Inquiring about initiating Botox protocol.',
    objective: {
      vitals: {
        bp: '118/76 mmHg',
        hr: '68 bpm',
        temp: '98.4 °F',
        spo2: '99%',
        bmi: '23.4'
      },
      physicalExam: 'Alert, oriented x4. Cranial nerves II-XII grossly intact. Extraocular movements intact without nystagmus. Funduscopic exam normal with sharp optic disc margins. Mild pericranial muscle tenderness over right occipital and temporalis muscles. Motor strength 5/5 in all four extremities. Sensation intact to light touch and pinprick. Reflexes 2+ symmetric.',
      diagnosticResults: 'Brain MRI (3T without contrast, dated 2026-07-15): Normal intracranial study without acute ischemia, hemorrhage, mass lesion, or abnormal intracranial enhancement.'
    },
    assessment: {
      primaryDiagnosis: { code: 'G43.909', name: 'Intractable Chronic Migraine without aura', hcc: true },
      secondaryDiagnoses: [
        { code: 'M54.12', name: 'Radiculopathy, cervical region', hcc: false },
        { code: 'Z88.0', name: 'Allergy status to penicillin', hcc: false }
      ],
      clinicalRationale: 'Patient meets formal ICHD-3 criteria for chronic migraine (>15 days/month for >3 months, with >8 migraine days/month). Documented failure of three distinct oral preventive drug classes (anticonvulsants, beta-blockers, tricyclics). High disease burden warranting onabotulinumtoxinA (Botox) 155-200 units per PREEMPT protocol.'
    },
    plan: {
      medications: [
        'Initiate OnabotulinumtoxinA (Botox) 155-200 units IM divided across 31 injection sites (PREEMPT protocol) upon prior authorization confirmation.',
        'Continue Sumatriptan 100mg PO at onset of acute attack (max 200mg/24hr, max 9 days/month to avoid medication-overuse headache).',
        'Ubrelvy (Ubrogepant) 100mg as secondary acute rescue agent.'
      ],
      proceduresOrOrders: [
        'Submit Electronic Prior Auth for CPT J0585 & 64615 with attached 6-month calendar.',
        'Headache diary smartphone app sync.'
      ],
      patientInstructions: [
        'Avoid known triggers (artificial sweeteners, irregular sleep cycles). Maintain hydration.',
        'Return to clinic in 12 weeks post-injection for evaluation of efficacy.'
      ],
      followUp: '12 weeks post-procedure, or sooner if red flag symptoms arise (sudden thunderclap onset, fever, focal weakness).'
    },
    suggestedCptCodes: [
      { code: '99214', desc: 'Office/outpatient visit for evaluation and management of established patient, moderate MDM', rvus: 1.92, feeEst: 138.50 },
      { code: '64615', desc: 'Chemodenervation of muscle(s); muscle(s) innervated by facial, trigeminal, cervical spinal and accessory nerves, bilateral (eg, for chronic migraine)', rvus: 3.48, feeEst: 285.00 },
      { code: 'J0585', desc: 'Injection, onabotulinumtoxinA, 1 unit (x200 units)', rvus: 0.0, feeEst: 1420.00 }
    ],
    emLevel: '99214 (Level 4)',
    auditRisk: 'Low',
    ehrSyncStatus: 'synced',
    syncedEhr: 'Epic Systems'
  },
  {
    id: 'soap_2',
    patientId: 'pat_2',
    patientName: 'Marcus Holloway',
    encounterDate: '2026-10-08',
    providerName: 'Dr. David Chen, MD',
    encounterType: 'In-Person Follow-Up',
    subjective: '49yo active male presents for persistent right knee pain and recurrent sensation of the knee "catching and locking" during walking. Symptoms began after twisting injury while coaching basketball 6 weeks ago. Physical therapy provided minimal relief; pain persists at 7/10 during weight bearing. Unable to squat or ascend stairs comfortably.',
    objective: {
      vitals: {
        bp: '128/82 mmHg',
        hr: '72 bpm',
        temp: '98.6 °F',
        spo2: '98%',
        bmi: '27.1'
      },
      physicalExam: 'Right knee demonstrates moderate joint effusion. Significant tenderness along the medial joint line. Active ROM limited to 5-115 degrees due to mechanical discomfort. Positive McMurray test medial side with audible click and reproduced pain. Lachman test negative; anterior/posterior drawer tests stable. Varus and valgus stress testing stable at 0 and 30 degrees.',
      diagnosticResults: 'Standing X-Rays Right Knee (4 views): Mild medial compartment joint space narrowing, no acute cortical fracture or loose bodies.'
    },
    assessment: {
      primaryDiagnosis: { code: 'M23.22', name: 'Derangement of meniscus due to old tear or injury, right knee', hcc: false },
      secondaryDiagnoses: [
        { code: 'M17.11', name: 'Unilateral primary osteoarthritis, right knee', hcc: true }
      ],
      clinicalRationale: 'Clinical presentation strongly indicates symptomatic medial meniscus tear with mechanical locking, failing conservative management. High likelihood of complex tear requiring diagnostic arthroscopy and partial meniscectomy.'
    },
    plan: {
      medications: [
        'Acetaminophen 650mg PO TID PRN pain (patient allergic to NSAIDs).',
        'Ice application 20 minutes QID.'
      ],
      proceduresOrOrders: [
        'Urgent MRI Right Knee without contrast (CPT 73721) to evaluate meniscal tear morphology and chondral surfaces.',
        'Prior Auth submission to UnitedHealthcare with documentation of mechanical symptoms.'
      ],
      patientInstructions: [
        'Avoid deep pivoting and high-impact activities. Wear compressive knee sleeve.',
        'Schedule pre-op clearance labs pending MRI findings.'
      ],
      followUp: '1 week following completion of MRI for surgical planning.'
    },
    suggestedCptCodes: [
      { code: '99214', desc: 'Office visit, established patient, Level 4 (Moderate complexity MDM with prescription & test order)', rvus: 1.92, feeEst: 138.50 },
      { code: '73721', desc: 'Magnetic resonance (e.g., proton) imaging, any joint of lower extremity; without contrast', rvus: 1.45, feeEst: 340.00 }
    ],
    emLevel: '99214 (Level 4)',
    auditRisk: 'Low',
    ehrSyncStatus: 'synced',
    syncedEhr: 'Athenahealth'
  },
  {
    id: 'soap_3',
    patientId: 'pat_5',
    patientName: 'Amara Okafor',
    encounterDate: '2026-10-08',
    providerName: 'Dr. Sarah Lin, MD',
    encounterType: 'In-Person Follow-Up',
    subjective: '55yo female with established CAD, HTN, and T2DM presents reporting exertional dyspnea and sub-sternal chest tightness when walking uphill. Symptoms resolve promptly with 5 minutes rest. Denies syncope, palpitations, or lower extremity edema. Compliant with Atorvastatin and Lisinopril.',
    objective: {
      vitals: {
        bp: '138/84 mmHg',
        hr: '72 bpm',
        temp: '98.4 °F',
        spo2: '99%',
        bmi: '26.8'
      },
      physicalExam: 'Regular rate and rhythm. S1/S2 present, no murmurs, rubs, or gallops. Lungs clear to auscultation bilaterally. No JVD or peripheral edema.',
      diagnosticResults: 'In-office 12-lead ECG: Normal sinus rhythm, non-specific T-wave flattening in lateral leads (I, aVL, V5-V6).'
    },
    assessment: {
      primaryDiagnosis: { code: 'I25.10', name: 'Atherosclerotic heart disease of native coronary artery', hcc: true },
      secondaryDiagnoses: [
        { code: 'I10', name: 'Essential (primary) hypertension', hcc: false },
        { code: 'E11.9', name: 'Type 2 diabetes mellitus without complications', hcc: true }
      ],
      clinicalRationale: 'New onset exertional angina symptoms in patient with established multi-vessel CAD risk factors. Requires urgent echocardiography and functional ischemic evaluation.'
    },
    plan: {
      medications: [
        'Increase Atorvastatin to 80mg PO daily for aggressive LDL target <55 mg/dL.',
        'Prescribe Nitroglycerin 0.4mg SL PRN chest tightness (max 3 doses in 15 mins).',
        'Continue Metformin 1000mg BID and Lisinopril 20mg daily.'
      ],
      proceduresOrOrders: [
        'Urgent Transthoracic Echocardiography with Doppler (CPT 93306).',
        'Myocardial Perfusion SPECT Stress Test (CPT 78452).',
        'Lipid panel, HbA1c, and hs-CRP repeat.'
      ],
      patientInstructions: [
        'Call 911 if chest pain persists >10 minutes despite rest and SL Nitro.',
        'Avoid strenuous exertion until echo and stress testing are reviewed.'
      ],
      followUp: '2 weeks for post-stress test review.'
    },
    suggestedCptCodes: [
      { code: '99214', desc: 'Office visit, established patient, Level 4 (High complexity chronic illness with new exacerbation)', rvus: 1.92, feeEst: 138.50 },
      { code: '93306', desc: 'Echocardiography, transthoracic, real-time with image documentation, 2D, with Doppler', rvus: 4.12, feeEst: 420.00 }
    ],
    emLevel: '99214 (Level 4)',
    auditRisk: 'Low',
    ehrSyncStatus: 'synced',
    syncedEhr: 'Cerner Oracle'
  }
];

export const MOCK_SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    id: 'slot_1',
    time: '08:30 AM',
    patientId: 'pat_1',
    patientName: 'Elena Rostova',
    appointmentType: 'Migraine Protocol Follow-Up',
    providerId: 'usr_1',
    providerName: 'Dr. Sarah Lin, MD',
    status: 'completed',
    durationMin: 30,
    noShowRiskScore: 12,
    room: 'Exam Room 3'
  },
  {
    id: 'slot_2',
    time: '09:15 AM',
    patientId: 'pat_5',
    patientName: 'Amara Okafor',
    appointmentType: 'Hypertension & Lipid Consult',
    providerId: 'usr_1',
    providerName: 'Dr. Sarah Lin, MD',
    status: 'in_room',
    durationMin: 30,
    noShowRiskScore: 18,
    room: 'Exam Room 1'
  },
  {
    id: 'slot_3',
    time: '10:00 AM',
    patientId: 'pat_2',
    patientName: 'Marcus Holloway',
    appointmentType: 'Orthopedic Knee Evaluation',
    providerId: 'usr_2',
    providerName: 'Dr. David Chen, MD',
    status: 'no_show_risk',
    durationMin: 45,
    noShowRiskScore: 78,
    room: 'Exam Room 4',
    notes: 'High risk flag: Unconfirmed 24h SMS reminder. Auto-standby patient queued.'
  },
  {
    id: 'slot_4',
    time: '11:00 AM',
    patientId: 'pat_3',
    patientName: 'Clara Jenkins',
    appointmentType: 'Spine & Epidural Consult',
    providerId: 'usr_1',
    providerName: 'Dr. Sarah Lin, MD',
    status: 'checked_in',
    durationMin: 30,
    noShowRiskScore: 24,
    room: 'Waiting Lounge'
  },
  {
    id: 'slot_5',
    time: '01:30 PM',
    patientId: 'pat_4',
    patientName: 'Devon Montgomery',
    appointmentType: 'Post-MRI Shoulder Review',
    providerId: 'usr_2',
    providerName: 'Dr. David Chen, MD',
    status: 'confirmed',
    durationMin: 30,
    noShowRiskScore: 48,
    room: 'Exam Room 2'
  },
  {
    id: 'slot_6',
    time: '02:30 PM',
    patientId: 'pat_1',
    patientName: 'Sarah Jenkins (Telehealth)',
    appointmentType: 'Telehealth Routine Follow-up',
    providerId: 'usr_1',
    providerName: 'Dr. Sarah Lin, MD',
    status: 'confirmed',
    durationMin: 20,
    noShowRiskScore: 15,
    telehealth: true
  },
  {
    id: 'slot_7',
    time: '03:15 PM',
    patientId: 'pat_6',
    patientName: 'Robert Langdon',
    appointmentType: 'Carpal Tunnel Injection',
    providerId: 'usr_2',
    providerName: 'Dr. David Chen, MD',
    status: 'confirmed',
    durationMin: 30,
    noShowRiskScore: 22,
    room: 'Minor Procedure Suite'
  }
];

export const MOCK_CLAIMS_SCRUBBER: ClaimScrubberItem[] = [
  {
    id: 'claim_1',
    claimId: 'CLM-2026-99182',
    patientName: 'Elena Rostova',
    dos: '2026-10-06',
    provider: 'Dr. Sarah Lin, MD',
    payor: 'BlueCross BlueShield',
    totalBilled: 1843.50,
    status: 'flagged',
    issues: [
      {
        severity: 'critical',
        type: 'Missing Modifier',
        description: 'E&M code 99214 billed on the same day as minor procedure 64615 without required Modifier -25 (Significant, separately identifiable E&M service by the same physician).',
        suggestedFix: 'Append Modifier -25 to CPT 99214 to prevent automatic NCCI unbundling denial.',
        cptInvolved: '99214-25'
      }
    ],
    autoFixAvailable: true
  },
  {
    id: 'claim_2',
    claimId: 'CLM-2026-99183',
    patientName: 'Marcus Holloway',
    dos: '2026-10-07',
    provider: 'Dr. David Chen, MD',
    payor: 'UnitedHealthcare',
    totalBilled: 2450.00,
    status: 'flagged',
    issues: [
      {
        severity: 'critical',
        type: 'Prior Auth Missing',
        description: 'CPT 73721 (MRI Knee) billed without Prior Authorization reference number in Box 23 of CMS-1500.',
        suggestedFix: 'Attach Prior Auth Number PA-2026-8842 once authorized by UHC.',
        cptInvolved: '73721'
      },
      {
        severity: 'warning',
        type: 'Diagnosis Pointer Error',
        description: 'Primary diagnosis pointer 1 points to non-specific pain code rather than primary anatomical diagnosis M23.22.',
        suggestedFix: 'Re-order ICD-10 diagnosis pointers: Set pointer 1 to M23.22 (Medial meniscus tear).',
        cptInvolved: '73721'
      }
    ],
    autoFixAvailable: true
  },
  {
    id: 'claim_3',
    claimId: 'CLM-2026-99184',
    patientName: 'Clara Jenkins',
    dos: '2026-10-05',
    provider: 'Dr. Sarah Lin, MD',
    payor: 'Aetna Medicare Advantage',
    totalBilled: 1220.00,
    status: 'scrubbed_clean',
    issues: [],
    autoFixAvailable: false
  },
  {
    id: 'claim_4',
    claimId: 'CLM-2026-99185',
    patientName: 'Devon Montgomery',
    dos: '2026-10-04',
    provider: 'Dr. David Chen, MD',
    payor: 'Cigna Healthcare',
    totalBilled: 3180.00,
    status: 'flagged',
    issues: [
      {
        severity: 'warning',
        type: 'NCCI Unbundling',
        description: 'CPT 29826 (Subacromial decompression) billed with 29827 without appropriate Modifier -59 or -X{EPSU} distinct procedural service.',
        suggestedFix: 'Apply Modifier -59 to CPT 29826 if performed at separate anatomical compartment.',
        cptInvolved: '29826-59'
      }
    ],
    autoFixAvailable: true
  }
];

export const MOCK_PQC_ASSETS: PQCAssetInventory[] = [
  {
    id: 'pqc_1',
    endpoint: 'api.curahealth.internal/fhir/r4/Encounters',
    protocol: 'Post-Quantum TLS 1.3 (Draft RFC 9180)',
    classicalAlgorithm: 'ECDH (X25519) + AES-256-GCM',
    pqcAlgorithm: 'ML-KEM-768 (CRYSTALS-Kyber)',
    quantumReadiness: 'PQC_IMMUNE',
    securityLevel: 'NIST Level 3 (AES-192 equivalent)',
    lastQuantumAudit: '2026-10-08 20:30 UTC',
    hndlProtection: true
  },
  {
    id: 'pqc_2',
    endpoint: 'gateway.edi278.payors.net/x12/priorauth',
    protocol: 'Quantum-Encrypted AS4 Gateway',
    classicalAlgorithm: 'RSA-4096 (Deprecated for Signatures)',
    pqcAlgorithm: 'ML-DSA-65 (CRYSTALS-Dilithium)',
    quantumReadiness: 'PQC_IMMUNE',
    securityLevel: 'NIST Level 3 (AES-192 equivalent)',
    lastQuantumAudit: '2026-10-08 19:15 UTC',
    hndlProtection: true
  },
  {
    id: 'pqc_3',
    endpoint: 'storage.pacs.curahealth.com/dicom-vault',
    protocol: 'Encrypted DICOM Envelope (AES-256)',
    classicalAlgorithm: 'ECDSA P-384',
    pqcAlgorithm: 'SLH-DSA (SPHINCS+-SHA2-256s)',
    quantumReadiness: 'HYBRID_ACTIVE',
    securityLevel: 'NIST Level 5 (AES-256 equivalent)',
    lastQuantumAudit: '2026-10-07 14:00 UTC',
    hndlProtection: true
  },
  {
    id: 'pqc_4',
    endpoint: 'auth.curahealth.internal/oauth/v2/tokens',
    protocol: 'Post-Quantum JWT & Mutual TLS',
    classicalAlgorithm: 'Ed25519',
    pqcAlgorithm: 'Falcon-512 / ML-DSA-44',
    quantumReadiness: 'PQC_IMMUNE',
    securityLevel: 'NIST Level 3 (AES-192 equivalent)',
    lastQuantumAudit: '2026-10-08 21:00 UTC',
    hndlProtection: true
  }
];

export const MOCK_COMPLIANCE_LOGS: ComplianceAuditLog[] = [
  {
    id: 'log_pqc_1',
    timestamp: '2026-10-08 21:18:42',
    userId: 'usr_sys',
    userName: 'PQC HSM Security Daemon',
    userRole: 'Security Subsystem',
    action: 'PQC_KEY_ROTATED',
    ipAddress: '10.240.0.1 (FIPS 140-3 HSM Module)',
    encryptionStatus: 'TLS 1.3 - Hybrid (X25519 + Kyber-768)',
    status: 'COMPLIANT',
    details: 'Automated 30-day Post-Quantum Kyber-768 Key Encapsulation epoch rotated without session drops',
    pqcAlgorithm: 'ML-KEM-768 (Kyber)',
    quantumSecurityBits: 192
  },
  {
    id: 'log_1',
    timestamp: '2026-10-08 21:02:14',
    userId: 'usr_1',
    userName: 'Dr. Sarah Lin, MD',
    userRole: 'Attending Physician',
    action: 'EHR_ACCESS',
    patientMrn: 'MRN-849201',
    ipAddress: '10.240.12.89 (Clinic Intranet VPN)',
    encryptionStatus: 'TLS 1.3 - Hybrid (X25519 + Kyber-768)',
    status: 'COMPLIANT',
    details: 'Read patient encounter history & signed Botox SOAP note with ML-DSA-65 post-quantum signature',
    pqcAlgorithm: 'ML-DSA-65 (Dilithium)',
    quantumSecurityBits: 192
  },
  {
    id: 'log_2',
    timestamp: '2026-10-08 20:45:01',
    userId: 'usr_3',
    userName: 'Marcus Vance',
    userRole: 'Practice Admin',
    action: 'PRIOR_AUTH_SUBMITTED',
    patientMrn: 'MRN-723910',
    ipAddress: '10.240.12.44 (Prior Auth Station)',
    encryptionStatus: 'TLS 1.3 - Hybrid (X25519 + Kyber-768)',
    status: 'COMPLIANT',
    details: 'EDI 278 transaction sent to UnitedHealthcare with quantum-wrapped AES-256-GCM clinical justification packet',
    pqcAlgorithm: 'ML-KEM-768 (Kyber)',
    quantumSecurityBits: 192
  },
  {
    id: 'log_3',
    timestamp: '2026-10-08 19:18:33',
    userId: 'usr_4',
    userName: 'Brenda Morales',
    userRole: 'Billing Specialist',
    action: 'CLAIM_SCRUBBED',
    patientMrn: 'MRN-849201',
    ipAddress: '10.240.12.102 (Revenue Station)',
    encryptionStatus: 'TLS 1.3 - Hybrid (X25519 + Kyber-768)',
    status: 'COMPLIANT',
    details: 'Scrubbed CMS-1500 claim batch. Added Modifier -25 to prevent $1,843 denial.',
    pqcAlgorithm: 'ML-DSA-65 (Dilithium)',
    quantumSecurityBits: 192
  },
  {
    id: 'log_4',
    timestamp: '2026-10-08 17:30:19',
    userId: 'usr_2',
    userName: 'Dr. David Chen, MD',
    userRole: 'Orthopedic Surgeon',
    action: 'CONSENT_VERIFIED',
    patientMrn: 'MRN-934812',
    ipAddress: '10.240.14.02 (Surgical Suite)',
    encryptionStatus: 'ML-DSA-65 Signed',
    status: 'COMPLIANT',
    details: 'Cryptographically signed electronic informed consent with NIST ML-DSA Post-Quantum Digital Signature',
    pqcAlgorithm: 'ML-DSA-65 (Dilithium)',
    quantumSecurityBits: 192
  }
];

export const CLINICAL_ENCOUNTER_SIMULATIONS = [
  {
    id: 'sim_neuro',
    title: 'Neurology: Intractable Migraine & Botox Evaluation',
    patient: 'Elena Rostova (42F, MRN-849201)',
    chiefComplaint: 'Refractory throbbing headaches >20 days/month, failed Topiramate & Propranolol',
    rawTranscript: `Dr. Lin: Good morning Elena. How have your migraines been since our visit last month?
Elena: Dr. Lin, they've gotten worse. I've had at least 20 headache days this past month. The right side of my head throbs so violently that I can't look at any light or even look at a screen.
Dr. Lin: I see. And did you continue the Topiramate dosage we discussed?
Elena: I tried for two months, but I had severe tingling in my fingers and I couldn't find words during work presentations. I had to stop. And when we tried Propranolol before that, my heart rate dropped to the 40s and I felt like fainting.
Dr. Lin: That is consistent with what we documented in your chart. Let's do a physical and neurological exam. Cranial nerves are intact, no papilledema on funduscopic exam. Motor strength is 5/5 in all extremities, with some tenderness over the right occipital nerve.
Elena: Is there any other option? It's really affecting my quality of life.
Dr. Lin: Because you've failed three classes of preventive medications and have over 15 headache days a month, you meet full criteria for the PREEMPT onabotulinumtoxinA (Botox) injection protocol. We will submit an expedited prior authorization to BlueCross today and start you on Ubrelvy for acute rescue in the meantime.`,
    cptTarget: 'J0585 & 64615 + 99214-25',
    icd10Target: 'G43.909'
  },
  {
    id: 'sim_ortho',
    title: 'Orthopedics: Acute Meniscal Tear & Mechanical Locking',
    patient: 'Marcus Holloway (49M, MRN-723910)',
    chiefComplaint: 'Right knee joint locking, pain with stairs, failed PT and NSAIDs',
    rawTranscript: `Dr. Chen: Hi Marcus, let's take a look at that right knee. What happened?
Marcus: I was coaching my son's basketball team 6 weeks ago, pivoted quickly, and felt a sharp pop on the inside of the knee. Since then, the knee gets stuck or locks when I try to straighten it out completely.
Dr. Chen: Have you been able to do the physical therapy exercises?
Marcus: Yes, I did 12 sessions of PT, but the mechanical catch won't go away. I can't take Ibuprofen because of my stomach ulcer history, so I've just been using Tylenol.
Dr. Chen: Examining the right knee: Moderate joint effusion. Tenderness localized to the medial joint line. McMurray maneuver is distinctly positive with a palpable click and pain. Range of motion is limited by mechanical blockage at 115 degrees of flexion.
Marcus: Do I need surgery, Doc?
Dr. Chen: We need an urgent 3T MRI of the knee without contrast to map out the tear structure and verify whether a partial meniscectomy or repair is indicated. I will send the prior authorization to UnitedHealthcare right away with full notes on your joint locking.`,
    cptTarget: '73721 + 99214',
    icd10Target: 'M23.22'
  },
  {
    id: 'sim_cardio',
    title: 'Cardiology: Ischemic Heart Disease & Echo Order',
    patient: 'Amara Okafor (55F, MRN-552918)',
    chiefComplaint: 'Exertional dyspnea, chest tightness on incline walking, history of CAD',
    rawTranscript: `Dr. Lin: Amara, how is your breathing when you walk up hills or climb stairs?
Amara: Over the past two weeks, I feel a tightness in my chest and get short of breath after walking half a block. It resolves when I sit down for five minutes.
Dr. Lin: Blood pressure today is 138/84, pulse is regular at 72. Heart sounds S1 and S2 present, no murmurs or S3 gallop. Lungs clear to auscultation bilaterally.
Dr. Lin: Given your history of CAD, hypertension, and diabetes, we need to obtain a comprehensive transthoracic echocardiogram (CPT 93306) to evaluate your left ventricular ejection fraction and wall motion abnormalities. We will adjust your Atorvastatin and coordinate cardiac stress testing.`,
    cptTarget: '93306 + 99214',
    icd10Target: 'I25.10'
  }
];

// Section 4: Shared Clinical Evidence Objects (CH-EV-001)
export const MOCK_CLINICAL_EVIDENCE: ClinicalEvidenceObject[] = [
  {
    evidence_id: 'ev_topiramate_fail_01',
    tenant_id: 'tenant_midwest_health',
    patient_ref: 'Patient/pat_1',
    patient_name: 'Elena Rostova (MRN-849201)',
    encounter_ref: 'Encounter/enc_neuro_882',
    evidence_type: 'medication_trial',
    clinical_concept: {
      system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
      code: '38443',
      display: 'Topiramate 100 MG Oral Tablet'
    },
    value: {
      status: 'failed',
      reason: 'Cognitive paresthesia and word-finding difficulty despite 8 weeks titration',
      duration_days: 56
    },
    source: {
      resource_type: 'DocumentReference',
      resource_id: 'doc_neuro_visit_0918',
      version: '3.1',
      location: 'Section 4: Medication History & Treatment Failures',
      raw_quote: 'Discontinued Topiramate 100mg daily due to severe cognitive slowing and hand paresthesia.'
    },
    observed_at: '2026-09-18T10:14:00Z',
    confidence: 0.98,
    verification_status: 'clinician_verified',
    model_version: 'clinical-extractor-v2.4',
    policy_version: 'bcbs-migraine-step-v2026.1',
    provenance_hash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    created_at: '2026-09-18T10:18:22Z',
    downstream_consumers: [
      { module: 'Ambient SOAP Studio', use_case: 'Assessment & Plan contraindication checking', status: 'applied' },
      { module: 'Prior Auth Hub', use_case: 'Botox J0585 Step-Therapy criteria (1 of 3 drug classes)', status: 'applied' },
      { module: 'Claims Scrubber', use_case: 'Payer audit comorbidity defensibility', status: 'applied' }
    ]
  },
  {
    evidence_id: 'ev_propranolol_fail_02',
    tenant_id: 'tenant_midwest_health',
    patient_ref: 'Patient/pat_1',
    patient_name: 'Elena Rostova (MRN-849201)',
    encounter_ref: 'Encounter/enc_neuro_741',
    evidence_type: 'medication_trial',
    clinical_concept: {
      system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
      code: '8787',
      display: 'Propranolol Hydrochloride 40 MG Oral Tablet'
    },
    value: {
      status: 'contraindicated',
      reason: 'Symptomatic sinus bradycardia (resting heart rate <48 bpm with lightheadedness)',
      duration_days: 42
    },
    source: {
      resource_type: 'Observation',
      resource_id: 'obs_vitals_hr_0814',
      version: '1.0',
      location: 'Vital Signs: Resting Pulse Log',
      raw_quote: 'Resting pulse 46 bpm while on Propranolol 80mg. Medication tapered off.'
    },
    observed_at: '2026-08-14T14:30:00Z',
    confidence: 0.96,
    verification_status: 'clinician_verified',
    model_version: 'clinical-extractor-v2.4',
    policy_version: 'bcbs-migraine-step-v2026.1',
    provenance_hash: 'sha256:4b9a259c264816c87e411ad5b4bb7e366e440fe357c94fbcfb862922ef65a467',
    created_at: '2026-08-14T14:35:10Z',
    downstream_consumers: [
      { module: 'Prior Auth Hub', use_case: 'Botox J0585 Step-Therapy criteria (2 of 3 drug classes)', status: 'applied' },
      { module: 'Ambient SOAP Studio', use_case: 'Beta-blocker alert suppression', status: 'applied' }
    ]
  },
  {
    evidence_id: 'ev_knee_pt_failure_03',
    tenant_id: 'tenant_midwest_health',
    patient_ref: 'Patient/pat_2',
    patient_name: 'Marcus Holloway (MRN-723910)',
    encounter_ref: 'Encounter/enc_ortho_910',
    evidence_type: 'procedure_failure',
    clinical_concept: {
      system: 'http://snomed.info/sct',
      code: '91251008',
      display: 'Physical therapy procedure for knee joint derangement'
    },
    value: {
      status: 'failed',
      reason: 'Completed 12 supervised physical therapy visits without resolution of true mechanical joint locking',
      duration_days: 45
    },
    source: {
      resource_type: 'DocumentReference',
      resource_id: 'doc_pt_summary_0920',
      version: '2.0',
      location: 'Physical Therapy Discharge Summary: Medial Knee',
      raw_quote: '12 sessions completed. Persistent medial joint line catching and mechanical blockage at 115 deg flexion.'
    },
    observed_at: '2026-09-20T11:00:00Z',
    confidence: 0.99,
    verification_status: 'clinician_verified',
    model_version: 'clinical-extractor-v2.4',
    policy_version: 'uhc-musculoskeletal-mri-v2026.3',
    provenance_hash: 'sha256:d8c6b8408a688d0d6118991d90479ad22912a7643b9e4a3bcf2f68923a1fefc3',
    created_at: '2026-09-20T11:04:15Z',
    downstream_consumers: [
      { module: 'Prior Auth Hub', use_case: 'UHC 3T Knee MRI CPT 73721 prerequisite clearance', status: 'applied' },
      { module: 'Claims Scrubber', use_case: 'Medical necessity defense for arthroscopy', status: 'applied' }
    ]
  },
  {
    evidence_id: 'ev_mri_stenosis_04',
    tenant_id: 'tenant_midwest_health',
    patient_ref: 'Patient/pat_3',
    patient_name: 'Clara Jenkins (MRN-610482)',
    encounter_ref: 'Encounter/enc_radiology_332',
    evidence_type: 'imaging_finding',
    clinical_concept: {
      system: 'http://loinc.org',
      code: '24725-4',
      display: 'MRI Lumbar spine with and without contrast'
    },
    value: {
      status: 'verified',
      reason: 'Left L4-L5 severe neural foraminal stenosis with active L5 nerve root impingement and disc extrusion'
    },
    source: {
      resource_type: 'DocumentReference',
      resource_id: 'doc_rad_lumbar_mri_0829',
      version: '1.0',
      location: 'Radiology Impression: L4-L5 Level',
      raw_quote: 'Severe left neural foraminal stenosis causing displacement of exiting left L5 nerve root.'
    },
    observed_at: '2026-08-29T16:20:00Z',
    confidence: 0.99,
    verification_status: 'clinician_verified',
    model_version: 'radiology-nlp-v1.8',
    policy_version: 'aetna-spinal-injection-v2026.2',
    provenance_hash: 'sha256:1a84f3319d6718d09996a454d688cf73812d46e9df07f89c43d8a94625b5501e',
    created_at: '2026-08-29T16:25:00Z',
    downstream_consumers: [
      { module: 'Prior Auth Hub', use_case: 'Epidural Steroid Injection CPT 64483 anatomical concordance', status: 'applied' },
      { module: 'Ambient SOAP Studio', use_case: 'Diagnostic imaging objective synthesis', status: 'applied' }
    ]
  }
];

// Section 3.5: PPRL Candidate Adjudication & Identity Reconciliation Dataset (CH-ID-001)
export const MOCK_PPRL_CANDIDATES: PPRLAdjudicationCandidate[] = [
  {
    id: 'cand_link_01',
    source_record_a: {
      system: 'Epic Systems (Midwest Hospital EHR)',
      mrn: 'MRN-849201',
      name_masked: 'E***a R******a',
      dob_masked: '1984-06-**',
      postal_masked: '606**',
      clks_bits_set: 512
    },
    source_record_b: {
      system: 'BlueCross BlueShield Enterprise Claims',
      mrn: 'BCBS-99482103',
      name_masked: 'E***a M. R******a',
      dob_masked: '1984-06-**',
      postal_masked: '606**',
      clks_bits_set: 524
    },
    dice_similarity: 0.954,
    confidence_level: 'High',
    status: 'MERGED',
    adjudicated_by: 'Auto-Consensus Pipeline (Dice >= 0.90)',
    adjudicated_at: '2026-10-06 09:14 AM',
    provenance_log: '1,000-bit CLK bigram double hashing matched across 26M benchmark standards (Randall et al. 2022).'
  },
  {
    id: 'cand_link_02',
    source_record_a: {
      system: 'Cerner Oracle (St. Jude Orthopedic Center)',
      mrn: 'MRN-723910',
      name_masked: 'M****s H******y',
      dob_masked: '1976-11-**',
      postal_masked: '606**',
      clks_bits_set: 498
    },
    source_record_b: {
      system: 'OneFlorida+ Research Consortium Node',
      mrn: 'FL-DEDUP-881920',
      name_masked: 'M**k H******y',
      dob_masked: '1976-11-**',
      postal_masked: '606**',
      clks_bits_set: 472
    },
    dice_similarity: 0.865,
    confidence_level: 'Ambiguous (Requires Review)',
    status: 'PENDING_ADJUDICATION',
    provenance_log: 'First name nickname variation ("Marcus" vs "Mark"). SSN last-4 concordant; postal code concordant.'
  },
  {
    id: 'cand_link_03',
    source_record_a: {
      system: 'Athenahealth Ambulatory Care',
      mrn: 'MRN-610482',
      name_masked: 'C***a J*****s',
      dob_masked: '1962-03-**',
      postal_masked: '606**',
      clks_bits_set: 504
    },
    source_record_b: {
      system: 'LabCorp Regional Diagnostics Feed',
      mrn: 'LC-REF-4491028',
      name_masked: 'C****e J*****s',
      dob_masked: '1962-03-**',
      postal_masked: '607**',
      clks_bits_set: 462
    },
    dice_similarity: 0.828,
    confidence_level: 'Ambiguous (Requires Review)',
    status: 'PENDING_ADJUDICATION',
    provenance_log: 'Possible typographical transposition ("Clara" vs "Claire"); adjacent ZIP code (606xx vs 607xx).'
  }
];
