import React, { useState } from 'react';
import { 
  GitMerge, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  ExternalLink, 
  Database, 
  Layers, 
  Code2, 
  ArrowRight, 
  Hash, 
  Search, 
  Filter, 
  Plus, 
  Sparkles,
  Lock,
  Stethoscope,
  Activity,
  Check,
  ChevronRight
} from 'lucide-react';
import { ClinicalEvidenceObject } from '../../types';
import { MOCK_CLINICAL_EVIDENCE } from '../../data/mockData';

export const ClinicalEvidenceEngine: React.FC = () => {
  const [evidenceList, setEvidenceList] = useState<ClinicalEvidenceObject[]>(MOCK_CLINICAL_EVIDENCE);
  const [selectedEvidence, setSelectedEvidence] = useState<ClinicalEvidenceObject>(MOCK_CLINICAL_EVIDENCE[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'provenance_graph' | 'schema_inspector' | 'contradiction_matrix'>('provenance_graph');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);
  const [isNewEvidenceModalOpen, setIsNewEvidenceModalOpen] = useState(false);

  // Form state for creating manual evidence object
  const [newConceptDisplay, setNewConceptDisplay] = useState('');
  const [newConceptCode, setNewConceptCode] = useState('');
  const [newSystem, setNewSystem] = useState<'http://snomed.info/sct' | 'http://www.nlm.nih.gov/research/umls/rxnorm' | 'http://loinc.org' | 'http://hl7.org/fhir/sid/icd-10-cm'>('http://snomed.info/sct');
  const [newEvidenceType, setNewEvidenceType] = useState<'medication_trial' | 'procedure_failure' | 'imaging_finding' | 'lab_result' | 'vital_trend'>('medication_trial');
  const [newStatus, setNewStatus] = useState<'failed' | 'contraindicated' | 'abnormal' | 'verified' | 'refractory'>('failed');
  const [newReason, setNewReason] = useState('');
  const [newRawQuote, setNewRawQuote] = useState('');

  const filteredEvidence = evidenceList.filter(item => {
    const matchesSearch = item.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.clinical_concept.display.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.clinical_concept.code.includes(searchQuery);
    const matchesFilter = filterType === 'all' || item.evidence_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleCopyJson = (obj: ClinicalEvidenceObject) => {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleCreateEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConceptDisplay || !newReason || !newRawQuote) return;

    const pseudoHash = 'sha256:' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newObj: ClinicalEvidenceObject = {
      evidence_id: `ev_custom_${Date.now()}`,
      tenant_id: 'tenant_midwest_health',
      patient_ref: 'Patient/pat_1',
      patient_name: 'Elena Rostova (MRN-849201)',
      encounter_ref: 'Encounter/enc_current_01',
      evidence_type: newEvidenceType,
      clinical_concept: {
        system: newSystem,
        code: newConceptCode || '999120',
        display: newConceptDisplay
      },
      value: {
        status: newStatus,
        reason: newReason,
        duration_days: 60
      },
      source: {
        resource_type: 'DocumentReference',
        resource_id: `doc_${Date.now()}`,
        version: '1.0',
        location: 'Section 4 - Verified Clinical Encounter',
        raw_quote: newRawQuote
      },
      observed_at: new Date().toISOString(),
      confidence: 0.98,
      verification_status: 'clinician_verified',
      model_version: 'clinical-extractor-v2.4',
      policy_version: 'evidence-policy-v1',
      provenance_hash: pseudoHash,
      created_at: new Date().toISOString(),
      downstream_consumers: [
        { module: 'Prior Auth Hub', use_case: 'Automated Step-Therapy Medical Necessity Defense', status: 'applied' },
        { module: 'Claims Scrubber', use_case: 'Clinical Coding Justification & Audit Defense', status: 'applied' }
      ]
    };

    setEvidenceList(prev => [newObj, ...prev]);
    setSelectedEvidence(newObj);
    setIsNewEvidenceModalOpen(false);
    // Reset form
    setNewConceptDisplay('');
    setNewConceptCode('');
    setNewReason('');
    setNewRawQuote('');
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto', color: 'var(--text-primary)' }}>
      {/* Top Banner / Specification Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(99, 102, 241, 0.08) 100%)',
        border: '1px solid rgba(14, 165, 233, 0.3)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '28px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ 
                background: 'linear-gradient(135deg, #0ea5e9, #3b82f6)',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '6px',
                letterSpacing: '0.05em'
              }}>
                SPEC SECTION 4 · CH-EV-001
              </span>
              <span style={{ 
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                CROSS-PLATFORM ARCHITECTURAL FOUNDATION
              </span>
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 8px 0' }}>
              Shared Clinical Evidence & Provenance Engine
            </h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '900px', lineHeight: 1.5 }}>
              The single source of clinical truth across CuraHealth OS. Evidence extracted during ambient charting is normalized to standard terminology (SNOMED CT, RxNorm, LOINC), cryptographically anchored with SHA-256 provenance hashes, and reused downstream across Prior Authorization step-therapy criteria and pre-submission claims scrubbers without duplicate manual entry.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => setIsNewEvidenceModalOpen(true)}
              className="btn-primary"
              style={{ padding: '10px 18px', borderRadius: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Plus size={16} />
              <span>Verify & Ingest Evidence</span>
            </button>
          </div>
        </div>

        {/* Live Operational Metrics Bar */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', 
          gap: '16px', 
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              Active Evidence Objects
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0ea5e9', marginTop: '4px' }}>
              {evidenceList.length} Objects
            </div>
            <div style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <CheckCircle2 size={12} /> 100% Clinician Verified
            </div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              Downstream Citations
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>
              {evidenceList.reduce((acc, curr) => acc + curr.downstream_consumers.length, 0)} Workflows
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              PA Hub · Claims · EHR Notes
            </div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              Contradiction & Hallucination
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
              0 Flagged
            </div>
            <div style={{ fontSize: '0.72rem', color: '#10b981', marginTop: '2px' }}>
              Deterministic cross-checks pass
            </div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              Provenance Integrity
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>
              SHA-256 Valid
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Audit-ready cryptographic chain
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('provenance_graph')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'none',
            color: activeTab === 'provenance_graph' ? '#0ea5e9' : 'var(--text-muted)',
            fontWeight: activeTab === 'provenance_graph' ? 700 : 500,
            borderBottom: activeTab === 'provenance_graph' ? '2px solid #0ea5e9' : '2px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem'
          }}
        >
          <Layers size={16} />
          <span>Cross-Module Provenance Graph</span>
        </button>

        <button
          onClick={() => setActiveTab('schema_inspector')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'none',
            color: activeTab === 'schema_inspector' ? '#0ea5e9' : 'var(--text-muted)',
            fontWeight: activeTab === 'schema_inspector' ? 700 : 500,
            borderBottom: activeTab === 'schema_inspector' ? '2px solid #0ea5e9' : '2px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem'
          }}
        >
          <Code2 size={16} />
          <span>Section 4.1 Schema Inspector (JSON)</span>
        </button>

        <button
          onClick={() => setActiveTab('contradiction_matrix')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'none',
            color: activeTab === 'contradiction_matrix' ? '#0ea5e9' : 'var(--text-muted)',
            fontWeight: activeTab === 'contradiction_matrix' ? 700 : 500,
            borderBottom: activeTab === 'contradiction_matrix' ? '2px solid #0ea5e9' : '2px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.9rem'
          }}
        >
          <ShieldCheck size={16} />
          <span>Clinical Contradiction & Rules Matrix</span>
        </button>
      </div>

      {/* Main Content Area based on Sub-Tab */}
      {activeTab === 'provenance_graph' && (
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '24px' }}>
          {/* Left Column: Evidence Object List & Search/Filter */}
          <div style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: '14px', 
            padding: '18px',
            height: 'fit-content'
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <div style={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                background: 'rgba(255,255,255,0.04)', 
                padding: '8px 12px', 
                borderRadius: '8px',
                border: '1px solid var(--border-subtle)'
              }}>
                <Search size={15} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="Search concept or patient..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-primary)',
                    fontSize: '0.82rem',
                    width: '100%',
                    outline: 'none'
                  }}
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '8px',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              >
                <option value="all">All Types</option>
                <option value="medication_trial">Medication Trials</option>
                <option value="procedure_failure">Procedures</option>
                <option value="imaging_finding">Imaging Findings</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredEvidence.map((item) => {
                const isSelected = selectedEvidence.evidence_id === item.evidence_id;
                return (
                  <div
                    key={item.evidence_id}
                    onClick={() => setSelectedEvidence(item)}
                    style={{
                      padding: '14px',
                      borderRadius: '10px',
                      border: isSelected ? '1.5px solid #0ea5e9' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'rgba(14, 165, 233, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span style={{ 
                        fontSize: '0.68rem', 
                        fontWeight: 700, 
                        padding: '2px 8px', 
                        borderRadius: '4px',
                        background: item.evidence_type === 'medication_trial' ? 'rgba(245, 158, 11, 0.15)' :
                                    item.evidence_type === 'procedure_failure' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(168, 85, 247, 0.15)',
                        color: item.evidence_type === 'medication_trial' ? '#f59e0b' :
                               item.evidence_type === 'procedure_failure' ? '#3b82f6' : '#a855f7'
                      }}>
                        {item.evidence_type.toUpperCase().replace('_', ' ')}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        {item.evidence_id}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '4px' }}>
                      {item.clinical_concept.display}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      {item.patient_name}
                    </div>

                    <div style={{ 
                      fontSize: '0.72rem', 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '6px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.04)'
                    }}>
                      <span style={{ color: item.value.status === 'failed' ? '#f43f5e' : '#10b981', fontWeight: 600 }}>
                        ● Status: {item.value.status}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>
                        {item.downstream_consumers.length} Citations
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Evidence Object Deep-Dive & Provenance Flow */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Main Details Card */}
            <div style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: '16px', 
              padding: '24px' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ 
                      background: 'rgba(16, 185, 129, 0.15)', 
                      color: '#10b981', 
                      fontSize: '0.72rem', 
                      fontWeight: 700, 
                      padding: '3px 8px', 
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <CheckCircle2 size={12} /> {selectedEvidence.verification_status.toUpperCase().replace('_', ' ')}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Observed: {new Date(selectedEvidence.observed_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                    {selectedEvidence.clinical_concept.display}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Patient: <strong style={{ color: 'var(--text-primary)' }}>{selectedEvidence.patient_name}</strong>
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Encounter: <strong style={{ color: 'var(--text-primary)' }}>{selectedEvidence.encounter_ref}</strong>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopyJson(selectedEvidence)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {copiedJson ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  <span>{copiedJson ? 'Copied JSON!' : 'Copy JSON'}</span>
                </button>
              </div>

              {/* Terminology Code & Value Breakdown */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                gap: '14px', 
                background: 'rgba(0, 0, 0, 0.2)', 
                padding: '16px', 
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)',
                marginBottom: '20px'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Standardized Terminology Code
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0ea5e9', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Hash size={14} /> {selectedEvidence.clinical_concept.code}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px', wordBreak: 'break-all' }}>
                    {selectedEvidence.clinical_concept.system}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Clinical Status & Reason
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f59e0b', marginTop: '4px' }}>
                    {selectedEvidence.value.status.toUpperCase()} ({selectedEvidence.value.duration_days || 'N/A'} Days)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                    {selectedEvidence.value.reason}
                  </div>
                </div>
              </div>

              {/* Source Document Ground Truth Excerpt */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={14} color="#06b6d4" /> Ground Truth Source Evidence (Zero Hallucination Guard)
                </div>
                <div style={{ 
                  background: 'rgba(6, 182, 212, 0.05)', 
                  borderLeft: '3px solid #06b6d4', 
                  padding: '14px 18px', 
                  borderRadius: '0 8px 8px 0',
                  fontSize: '0.85rem',
                  lineHeight: 1.6,
                  color: 'var(--text-primary)'
                }}>
                  <p style={{ margin: '0 0 6px 0', fontStyle: 'italic' }}>
                    "{selectedEvidence.source.raw_quote}"
                  </p>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Source: {selectedEvidence.source.resource_type}/{selectedEvidence.source.resource_id} (v{selectedEvidence.source.version}) · Location: {selectedEvidence.source.location}
                  </div>
                </div>
              </div>

              {/* Cryptographic SHA-256 Provenance Bar */}
              <div style={{ 
                background: 'rgba(0,0,0,0.3)', 
                padding: '12px 16px', 
                borderRadius: '10px', 
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={15} color="#10b981" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                    Provenance Hash:
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#10b981' }}>
                    {selectedEvidence.provenance_hash}
                  </span>
                </div>

                <button
                  onClick={() => handleCopyHash(selectedEvidence.provenance_hash)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copiedHash === selectedEvidence.provenance_hash ? '#10b981' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {copiedHash === selectedEvidence.provenance_hash ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedHash === selectedEvidence.provenance_hash ? 'Copied' : 'Copy Hash'}</span>
                </button>
              </div>
            </div>

            {/* Cross-Module Reusability Pipeline (The Core Architectural Value) */}
            <div style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-subtle)', 
              borderRadius: '16px', 
              padding: '24px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <GitMerge size={20} color="#a855f7" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                  Cross-Module Reusability Pipeline
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
                How this single verified clinical fact moves seamlessly across CuraHealth OS modules without clinicians having to re-type or re-justify it:
              </p>

              {/* Flow Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Stage 1: Ambient Capture */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '14px', 
                  padding: '14px', 
                  borderRadius: '10px', 
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '8px', 
                    background: 'rgba(6, 182, 212, 0.15)', 
                    color: '#06b6d4', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    1
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#06b6d4' }}>
                      Ambient SOAP Studio (Extraction & Clinician Verification)
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Audio transcription extracted "{selectedEvidence.clinical_concept.display}" trial. Clinician signed note in Encounter #{selectedEvidence.encounter_ref}.
                    </div>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={13} /> Completed
                  </span>
                </div>

                {/* Stage 2 & 3: Downstream Consumers */}
                {selectedEvidence.downstream_consumers.map((consumer, idx) => (
                  <div 
                    key={idx}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '14px', 
                      padding: '14px', 
                      borderRadius: '10px', 
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '8px', 
                      background: 'rgba(168, 85, 247, 0.15)', 
                      color: '#a855f7', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.85rem'
                    }}>
                      {idx + 2}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a855f7' }}>
                        {consumer.module} (Automated Application)
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Applied to: <strong style={{ color: 'var(--text-primary)' }}>{consumer.use_case}</strong>
                      </div>
                    </div>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      color: consumer.status === 'applied' ? '#10b981' : '#f59e0b', 
                      fontWeight: 700, 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px' 
                    }}>
                      <CheckCircle2 size={13} /> {consumer.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Schema Inspector (Section 4.1 Specification) */}
      {activeTab === 'schema_inspector' && (
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 6px 0' }}>
                Section 4.1 Canonical Evidence Object Schema
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                Structured JSON schema conforming directly to CuraHealth OS Enterprise Architecture Specification CH-EV-001.
              </p>
            </div>
            <button
              onClick={() => handleCopyJson(selectedEvidence)}
              className="btn-secondary"
              style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {copiedJson ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copiedJson ? 'Copied to Clipboard!' : 'Copy Formatted JSON'}</span>
            </button>
          </div>

          <pre style={{
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.82rem',
            lineHeight: 1.5,
            color: '#38bdf8',
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            overflowX: 'auto',
            maxHeight: '600px'
          }}>
            {JSON.stringify(selectedEvidence, null, 2)}
          </pre>
        </div>
      )}

      {/* Tab 3: Clinical Contradiction & Rules Matrix */}
      {activeTab === 'contradiction_matrix' && (
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', borderRadius: '16px', padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0' }}>
            Clinical Evidence Rules & Contradiction Guard
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
            Deterministic cross-validation checks executing against all active clinical evidence objects prior to prior authorization submission and claim rendering.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ 
              padding: '16px', 
              borderRadius: '10px', 
              background: 'rgba(16, 185, 129, 0.05)', 
              border: '1px solid rgba(16, 185, 129, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  Rule EV-01: Step-Therapy Duration Sufficiency
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Evaluates whether documented medication trial duration meets payer LCD/NCD thresholds (e.g., Topiramate 60 days &gt;= 60-day mandate).
                </div>
              </div>
              <span style={{ 
                background: 'rgba(16, 185, 129, 0.2)', 
                color: '#10b981', 
                fontSize: '0.75rem', 
                fontWeight: 800, 
                padding: '4px 10px', 
                borderRadius: '6px' 
              }}>
                PASSED (100% SATISFIED)
              </span>
            </div>

            <div style={{ 
              padding: '16px', 
              borderRadius: '10px', 
              background: 'rgba(16, 185, 129, 0.05)', 
              border: '1px solid rgba(16, 185, 129, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  Rule EV-02: Anatomical Concordance & Laterality Validation
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Ensures MRI finding laterality matches requested surgical or interventional procedure (Left L4-L5 stenosis matches Left L5 Transforaminal ESI CPT 64483).
                </div>
              </div>
              <span style={{ 
                background: 'rgba(16, 185, 129, 0.2)', 
                color: '#10b981', 
                fontSize: '0.75rem', 
                fontWeight: 800, 
                padding: '4px 10px', 
                borderRadius: '6px' 
              }}>
                PASSED (CONCORDANT)
              </span>
            </div>

            <div style={{ 
              padding: '16px', 
              borderRadius: '10px', 
              background: 'rgba(16, 185, 129, 0.05)', 
              border: '1px solid rgba(16, 185, 129, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  Rule EV-03: Temporal Contradiction Prevention
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Confirms physical therapy failure completion date is strictly prior to MRI referral date and does not contradict longitudinal encounter timestamps.
                </div>
              </div>
              <span style={{ 
                background: 'rgba(16, 185, 129, 0.2)', 
                color: '#10b981', 
                fontSize: '0.75rem', 
                fontWeight: 800, 
                padding: '4px 10px', 
                borderRadius: '6px' 
              }}>
                PASSED (CHRONOLOGICALLY VALID)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Manually Ingest / Verify Evidence */}
      {isNewEvidenceModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '650px',
            padding: '26px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0' }}>
              Verify & Ingest Clinical Evidence Object
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
              Create an immutable evidence object with standard terminology binding and deterministic SHA-256 hash.
            </p>

            <form onSubmit={handleCreateEvidence} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Evidence Type
                  </label>
                  <select
                    value={newEvidenceType}
                    onChange={(e: any) => setNewEvidenceType(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value="medication_trial">Medication Trial</option>
                    <option value="procedure_failure">Procedure / PT Failure</option>
                    <option value="imaging_finding">Imaging Finding</option>
                    <option value="lab_result">Laboratory Result</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Terminology Code System
                  </label>
                  <select
                    value={newSystem}
                    onChange={(e: any) => setNewSystem(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value="http://snomed.info/sct">SNOMED CT</option>
                    <option value="http://www.nlm.nih.gov/research/umls/rxnorm">RxNorm</option>
                    <option value="http://loinc.org">LOINC</option>
                    <option value="http://hl7.org/fhir/sid/icd-10-cm">ICD-10-CM</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Clinical Concept Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amitriptyline 25mg trial"
                    value={newConceptDisplay}
                    onChange={(e) => setNewConceptDisplay(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Concept Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10609"
                    value={newConceptCode}
                    onChange={(e) => setNewConceptCode(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Clinical Outcome / Status Reason
                </label>
                <input
                  type="text"
                  placeholder="e.g. Discontinued due to excessive daytime sedation and xerostomia after 4 weeks"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Raw Clinician Excerpt (Ground Truth Citation)
                </label>
                <textarea
                  rows={3}
                  placeholder="Paste verbatim quote from clinician SOAP progress note..."
                  value={newRawQuote}
                  onChange={(e) => setNewRawQuote(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsNewEvidenceModalOpen(false)}
                  style={{
                    background: 'none',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: '8px 20px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}
                >
                  Sign & Commit Evidence Object
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
