export type UserRole = 
  | 'physician' 
  | 'practice_admin' 
  | 'billing_specialist' 
  | 'orthopedic_surgeon'
  | 'triage_nurse'
  | 'compliance_officer'
  | 'him_specialist';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  specialty: string;
  avatar: string;
  npi: string;
}

export type PriorAuthStatus = 
  | 'approved'
  | 'pending_review'
  | 'pended_additional_info'
  | 'denied'
  | 'appealing'
  | 'draft'
  | 'DRAFT'
  | 'EVIDENCE_REQUIRED'
  | 'READY_FOR_REVIEW'
  | 'SUBMITTED'
  | 'PENDING'
  | 'APPROVED'
  | 'DENIED';

export interface PriorAuthItem {
  id: string;
  paNumber: string;
  patientId: string;
  patientName: string;
  patientDob: string;
  patientMrn: string;
  payor: string;
  payorPlan: string;
  cptCode: string;
  cptDescription: string;
  icd10Code: string;
  icd10Description: string;
  requestingProvider: string;
  providerNpi: string;
  submissionDate: string;
  slaDeadline: string;
  status: PriorAuthStatus;
  urgency: 'routine' | 'urgent' | 'stat';
  estimatedCost: number;
  clinicalNotes: string;
  conservativeTreatmentsAttempted: string[];
  requiredDocsUploaded: string[];
  denialReason?: string;
  appealDeadline?: string;
  approvalCode?: string;
  aiConfidenceScore: number;
  clinicalJustification: string;
  timeline: {
    date: string;
    action: string;
    actor: string;
    details: string;
  }[];
}

export interface Patient {
  id: string;
  mrn: string;
  name: string;
  dob: string;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  email: string;
  insuranceProvider: string;
  policyNumber: string;
  groupNumber: string;
  primaryCarePhysician: string;
  allergies: string[];
  activeConditions: string[];
  activeMedications: string[];
  noShowRiskScore: number; // 0 - 100
  noShowRiskLevel: 'Low' | 'Moderate' | 'High';
  noShowRiskFactors: string[];
  lastVisit: string;
  nextAppointment?: string;
}

export interface SOAPNote {
  id: string;
  patientId: string;
  patientName: string;
  encounterDate: string;
  providerName: string;
  encounterType: 'In-Person Follow-Up' | 'New Patient Consult' | 'Post-Op Evaluation' | 'Telehealth Urgent';
  subjective: string;
  objective: {
    vitals: {
      bp: string;
      hr: string;
      temp: string;
      spo2: string;
      bmi: string;
    };
    physicalExam: string;
    diagnosticResults: string;
  };
  assessment: {
    primaryDiagnosis: { code: string; name: string; hcc: boolean };
    secondaryDiagnoses: { code: string; name: string; hcc: boolean }[];
    clinicalRationale: string;
  };
  plan: {
    medications: string[];
    proceduresOrOrders: string[];
    patientInstructions: string[];
    followUp: string;
  };
  suggestedCptCodes: { code: string; desc: string; rvus: number; feeEst: number }[];
  emLevel: '99213 (Level 3)' | '99214 (Level 4)' | '99215 (Level 5)' | '99204 (New L4)' | '99205 (New L5)';
  auditRisk: 'Low' | 'Medium' | 'High';
  ehrSyncStatus: 'synced' | 'pending' | 'draft';
  syncedEhr?: 'Epic Systems' | 'Cerner Oracle' | 'Athenahealth' | 'eClinicalWorks';
}

export interface ScheduleSlot {
  id: string;
  time: string;
  patientId: string;
  patientName: string;
  appointmentType: string;
  providerId: string;
  providerName: string;
  status: 'confirmed' | 'checked_in' | 'in_room' | 'completed' | 'no_show_risk' | 'cancelled';
  durationMin: number;
  noShowRiskScore: number;
  room?: string;
  notes?: string;
  telehealth?: boolean;
}

export interface ClaimScrubberItem {
  id: string;
  claimId: string;
  patientName: string;
  dos: string; // Date of service
  provider: string;
  payor: string;
  totalBilled: number;
  status: 'flagged' | 'scrubbed_clean' | 'submitted' | 'denied_prevented';
  issues: {
    severity: 'critical' | 'warning' | 'info';
    type: 'Missing Modifier' | 'NCCI Unbundling' | 'LCD/NCD Mismatch' | 'Prior Auth Missing' | 'Diagnosis Pointer Error';
    description: string;
    suggestedFix: string;
    cptInvolved: string;
  }[];
  autoFixAvailable: boolean;
}

export interface ComplianceAuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: 'EHR_ACCESS' | 'PRIOR_AUTH_SUBMITTED' | 'EXPORT_PHI' | 'CLAIM_SCRUBBED' | 'CONSENT_VERIFIED' | 'POLICY_UPDATE' | 'PQC_KEY_ROTATED' | 'PQC_ENCRYPTION_EXECUTED';
  patientMrn?: string;
  ipAddress: string;
  encryptionStatus: 'TLS 1.3 - Hybrid (X25519 + Kyber-768)' | 'AES-256-GCM (Quantum Wrapped)' | 'ML-DSA-65 Signed';
  status: 'COMPLIANT' | 'FLAGGED_ANOMALY';
  details: string;
  pqcAlgorithm?: 'ML-KEM-768 (Kyber)' | 'ML-DSA-65 (Dilithium)' | 'SLH-DSA (SPHINCS+)';
  quantumSecurityBits?: number;
}

export interface PQCAssetInventory {
  id: string;
  endpoint: string;
  protocol: string;
  classicalAlgorithm: string;
  pqcAlgorithm: string;
  quantumReadiness: 'PQC_IMMUNE' | 'HYBRID_ACTIVE' | 'MIGRATING';
  securityLevel: 'NIST Level 3 (AES-192 equivalent)' | 'NIST Level 5 (AES-256 equivalent)';
  lastQuantumAudit: string;
  hndlProtection: boolean; // Harvest Now Decrypt Later protected
}

// Section 4: Shared Clinical Evidence Object Schema (CH-EV-001)
export interface ClinicalEvidenceObject {
  evidence_id: string;
  tenant_id: string;
  patient_ref: string;
  patient_name: string;
  encounter_ref: string;
  evidence_type: 'medication_trial' | 'procedure_failure' | 'imaging_finding' | 'lab_result' | 'vital_trend';
  clinical_concept: {
    system: 'http://snomed.info/sct' | 'http://www.nlm.nih.gov/research/umls/rxnorm' | 'http://loinc.org' | 'http://hl7.org/fhir/sid/icd-10-cm';
    code: string;
    display: string;
  };
  value: {
    status: 'failed' | 'contraindicated' | 'abnormal' | 'verified' | 'refractory';
    reason: string;
    duration_days?: number;
  };
  source: {
    resource_type: 'DocumentReference' | 'Observation' | 'MedicationStatement';
    resource_id: string;
    version: string;
    location: string;
    raw_quote: string;
  };
  observed_at: string;
  confidence: number;
  verification_status: 'clinician_verified' | 'pending_review' | 'rule_derived';
  model_version: string;
  policy_version: string;
  provenance_hash: string;
  created_at: string;
  downstream_consumers: {
    module: 'Ambient SOAP Studio' | 'Prior Auth Hub' | 'Claims Scrubber' | 'PPRL Engine';
    use_case: string;
    status: 'applied' | 'pending';
  }[];
}

// Section 3.5: PPRL Candidate Adjudication & Identity Reconciliation
export interface PPRLAdjudicationCandidate {
  id: string;
  source_record_a: {
    system: string;
    mrn: string;
    name_masked: string;
    dob_masked: string;
    postal_masked: string;
    clks_bits_set: number;
  };
  source_record_b: {
    system: string;
    mrn: string;
    name_masked: string;
    dob_masked: string;
    postal_masked: string;
    clks_bits_set: number;
  };
  dice_similarity: number;
  confidence_level: 'High' | 'Ambiguous (Requires Review)' | 'Low';
  status: 'PENDING_ADJUDICATION' | 'MERGED' | 'REJECTED_UNMERGED';
  adjudicated_by?: string;
  adjudicated_at?: string;
  provenance_log: string;
}

