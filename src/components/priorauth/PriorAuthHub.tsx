import React, { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Send, 
  FileText, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Paperclip, 
  ExternalLink,
  History,
  RotateCcw,
  Zap,
  Check,
  Award,
  Network,
  Cpu,
  ArrowRightCircle,
  FileCode2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PriorAuthItem, PriorAuthStatus } from '../../types';

interface PriorAuthHubProps {
  priorAuths: PriorAuthItem[];
  selectedPaId?: string;
  onUpdatePriorAuth: (updated: PriorAuthItem) => void;
  onOpenNewModal: () => void;
  onOpenAppealModal: (pa: PriorAuthItem) => void;
}

export const PriorAuthHub: React.FC<PriorAuthHubProps> = ({
  priorAuths,
  selectedPaId,
  onUpdatePriorAuth,
  onOpenNewModal,
  onOpenAppealModal
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPa, setSelectedPa] = useState<PriorAuthItem | null>(
    priorAuths.find(p => p.id === selectedPaId) || priorAuths[0]
  );
  const [isSimulatingEdi, setIsSimulatingEdi] = useState(false);
  const [ediLog, setEdiLog] = useState<string | null>(null);
  const [showDaVinciPayload, setShowDaVinciPayload] = useState(false);

  const handleAdvanceStatus = (newStatus: PriorAuthStatus) => {
    if (!selectedPa) return;
    const updated: PriorAuthItem = {
      ...selectedPa,
      status: newStatus,
      timeline: [
        ...selectedPa.timeline,
        {
          date: new Date().toISOString().slice(0, 16).replace('T', ' '),
          action: `Workflow Advanced to ${newStatus}`,
          actor: 'Clinician / Coordinator Action',
          details: `Manual state advance per Section 3.2 Prior Auth State Machine`
        }
      ]
    };
    onUpdatePriorAuth(updated);
    setSelectedPa(updated);
  };

  // Sync selectedPa when selectedPaId changes
  React.useEffect(() => {
    if (selectedPaId) {
      const found = priorAuths.find(p => p.id === selectedPaId);
      if (found) setSelectedPa(found);
    }
  }, [selectedPaId, priorAuths]);

  const filteredItems = priorAuths.filter(item => {
    const matchesFilter = activeFilter === 'all' ? true : item.status === activeFilter;
    const matchesSearch = 
      item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.paNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cptCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.payor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSimulateEdiSubmission = () => {
    if (!selectedPa) return;
    setIsSimulatingEdi(true);
    setEdiLog('Initiating EDI 278 Healthcare Services Review transmission to ' + selectedPa.payor + ' Gateway...');

    setTimeout(() => {
      setEdiLog('EDI 278 Envelope Encrypted (X12 standard). Validating ICD-10 ' + selectedPa.icd10Code + ' with CPT ' + selectedPa.cptCode + '...');
    }, 900);

    setTimeout(() => {
      setEdiLog('Clinical Policy Match: All 3 step-therapy prerequisites verified. Payor Decision Engine: AUTO-APPROVAL GRANTED.');
      
      const updated: PriorAuthItem = {
        ...selectedPa,
        status: 'approved',
        approvalCode: 'AUTH-' + selectedPa.payor.slice(0, 3).toUpperCase() + '-' + Math.floor(100000 + Math.random() * 900000),
        timeline: [
          ...selectedPa.timeline,
          {
            date: new Date().toISOString().slice(0, 16).replace('T', ' '),
            action: 'Automated Real-Time EDI Approval',
            actor: selectedPa.payor + ' Instant Review Engine',
            details: 'Electronic authorization approved for full treatment course'
          }
        ]
      };
      
      onUpdatePriorAuth(updated);
      setSelectedPa(updated);
      setIsSimulatingEdi(false);

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2200);
  };

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>AI Prior Authorization Hub</h2>
            <span className="badge-status badge-approved">
              <Sparkles size={13} />
              Real-Time EDI 278 Direct Engine
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Automate payor clinical guideline checking, step-therapy aggregation, and 1-click electronic submission.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={onOpenNewModal}
            className="btn-primary"
          >
            <Plus size={16} />
            <span>New Auth Request</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
          {[
            { id: 'all', label: 'All Requests' },
            { id: 'approved', label: 'Approved' },
            { id: 'pending_review', label: 'Pending' },
            { id: 'pended_additional_info', label: 'Needs Info' },
            { id: 'denied', label: 'Denied / Escalated' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeFilter === tab.id ? 'var(--bg-elevated)' : 'transparent',
                color: activeFilter === tab.id ? '#60a5fa' : 'var(--text-secondary)',
                fontWeight: activeFilter === tab.id ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
          <input
            type="text"
            placeholder="Filter by patient, PA#, CPT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '8px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontSize: '0.825rem',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Master Detail Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '24px', minHeight: '600px' }}>
        {/* Left Column: Prior Auth List */}
        <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '4px 8px' }}>
            Authorization Records ({filteredItems.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '720px' }}>
            {filteredItems.map((item) => {
              const isSelected = selectedPa?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedPa(item)}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid #3b82f6' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: isSelected ? '#ffffff' : 'var(--text-primary)' }}>
                        {item.patientName}
                      </span>
                      <span className="kbd-key" style={{ marginLeft: '6px' }}>{item.paNumber}</span>
                    </div>
                    <span className={`badge-status ${
                      item.status === 'approved' ? 'badge-approved' : item.status === 'denied' ? 'badge-denied' : 'badge-pended'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    <strong style={{ color: '#60a5fa' }}>{item.cptCode}</strong> • {item.payor}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>Est. ${item.estimatedCost.toLocaleString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: item.aiConfidenceScore > 90 ? '#34d399' : '#fbbf24' }}>
                      <Sparkles size={12} />
                      {item.aiConfidenceScore}% Match Confidence
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Detail View & Electronic Actions */}
        {selectedPa ? (
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Detail Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{selectedPa.patientName}</h3>
                  <span className="kbd-key">{selectedPa.patientMrn}</span>
                  <span className={`badge-status ${
                    selectedPa.status === 'approved' ? 'badge-approved' : selectedPa.status === 'denied' ? 'badge-denied' : 'badge-pended'
                  }`}>
                    {selectedPa.status.replace('_', ' ')}
                  </span>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  DOB: {selectedPa.patientDob} • Requesting: <strong>{selectedPa.requestingProvider} (NPI: {selectedPa.providerNpi})</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setShowDaVinciPayload(!showDaVinciPayload)}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <FileCode2 size={14} />
                  <span>{showDaVinciPayload ? 'Hide Da Vinci Bundle' : 'Da Vinci FHIR PAS'}</span>
                </button>

                {selectedPa.status === 'denied' && (
                  <button
                    onClick={() => onOpenAppealModal(selectedPa)}
                    className="btn-danger"
                    style={{ fontSize: '0.8rem' }}
                  >
                    <Sparkles size={14} />
                    <span>Draft AI Appeal Letter</span>
                  </button>
                )}

                {selectedPa.status !== 'approved' && (
                  <button
                    onClick={handleSimulateEdiSubmission}
                    disabled={isSimulatingEdi}
                    className="btn-emerald"
                    style={{ fontSize: '0.8rem' }}
                  >
                    <Zap size={14} />
                    <span>{isSimulatingEdi ? 'Transmitting EDI 278...' : 'Simulate Payor Instant Approval'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Section 3.2 7-Stage State Machine Visualizer */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Section 3.2 Prior Auth State Machine
                </span>
                <span style={{ fontSize: '0.72rem', color: '#0ea5e9', fontWeight: 700 }}>
                  Active State: {String(selectedPa.status).toUpperCase()} (Click any step to test advance)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
                {['DRAFT', 'EVIDENCE_REQUIRED', 'READY_FOR_REVIEW', 'SUBMITTED', 'PENDING', selectedPa.status === 'denied' ? 'DENIED' : 'APPROVED'].map((step, idx) => {
                  const isCurrent = String(selectedPa.status).toUpperCase() === step || (selectedPa.status === 'approved' && step === 'APPROVED') || (selectedPa.status === 'denied' && step === 'DENIED');
                  return (
                    <React.Fragment key={step}>
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus(step as PriorAuthStatus)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          background: isCurrent ? 'linear-gradient(135deg, #0ea5e9, #2563eb)' : 'rgba(255,255,255,0.04)',
                          color: isCurrent ? '#fff' : 'var(--text-muted)',
                          border: isCurrent ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s'
                        }}
                      >
                        {step.replace('_', ' ')}
                      </button>
                      {idx < 5 && <ChevronRight size={12} color="var(--text-muted)" />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* HL7 Da Vinci Standards & Dual SLA Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gap: '12px'
            }}>
              {/* Standards Badges */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '12px 14px'
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
                  Supported Standards (CMS-0057-F Ready)
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8', fontWeight: 600 }}>
                    HL7 Da Vinci CRD
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8', fontWeight: 600 }}>
                    HL7 Da Vinci DTR
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 600 }}>
                    HL7 Da Vinci PAS
                  </span>
                  <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', fontWeight: 600 }}>
                    X12 278 Translation
                  </span>
                </div>
              </div>

              {/* Dual SLA Distinction (Section 3.2 Requirement) */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '12px 14px'
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
                  Dual-SLA Timing Telemetry
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>CuraHealth Prep</div>
                    <div style={{ fontWeight: 800, color: '#10b981' }}>38s <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>(p95 &lt;60s)</span></div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Payer Adjudication</div>
                    <div style={{ fontWeight: 800, color: '#f59e0b' }}>38h 12m <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>(SLA: 72h)</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expandable Da Vinci FHIR PAS Bundle Payload Inspector */}
            {showDaVinciPayload && (
              <div style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(14, 165, 233, 0.4)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8' }}>
                    FHIR R4 Claim (Da Vinci PAS Authorization Request Bundle)
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Resource: Bundle/pas-request-{selectedPa.paNumber}
                  </span>
                </div>
                <pre style={{
                  fontSize: '0.72rem',
                  color: '#94a3b8',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  margin: 0,
                  fontFamily: 'Consolas, monospace',
                  lineHeight: 1.4
                }}>
{JSON.stringify({
  resourceType: "Bundle",
  id: `pas-bundle-${selectedPa.paNumber}`,
  type: "collection",
  timestamp: new Date().toISOString(),
  entry: [
    {
      resource: {
        resourceType: "Claim",
        id: `claim-${selectedPa.id}`,
        status: "active",
        type: { coding: [{ system: "http://terminology.hl7.org/CodeSystem/claim-type", code: "professional" }] },
        use: "preauthorization",
        patient: { reference: `Patient/${selectedPa.patientId}`, display: selectedPa.patientName },
        insurer: { display: selectedPa.payor },
        provider: { reference: `Practitioner/${selectedPa.providerNpi}`, display: selectedPa.requestingProvider },
        diagnosis: [{ sequence: 1, diagnosisCodeableConcept: { coding: [{ code: selectedPa.icd10Code, display: selectedPa.icd10Description }] } }],
        item: [{ sequence: 1, productOrService: { coding: [{ code: selectedPa.cptCode, display: selectedPa.cptDescription }] } }]
      }
    }
  ]
}, null, 2)}
                </pre>
              </div>
            )}

            {/* EDI Simulation Log Banner */}
            {ediLog && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                fontSize: '0.8rem',
                color: '#38bdf8',
                fontFamily: 'JetBrains Mono, monospace'
              }}>
                {ediLog}
              </div>
            )}

            {/* Payor & Procedure Card */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Payor & Coverage Plan</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '4px' }}>{selectedPa.payor}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{selectedPa.payorPlan}</div>
                {selectedPa.approvalCode && (
                  <div style={{ marginTop: '8px', padding: '4px 8px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '6px', color: '#34d399', fontSize: '0.75rem', fontWeight: 700 }}>
                    Auth Code: {selectedPa.approvalCode}
                  </div>
                )}
              </div>

              <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Requested CPT & ICD-10 Crosswalk</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, marginTop: '4px', color: '#60a5fa' }}>
                  CPT {selectedPa.cptCode} • ICD-10 {selectedPa.icd10Code}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{selectedPa.cptDescription}</div>
              </div>
            </div>

            {/* Step Therapy & Conservative Treatment Checklist */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <ShieldCheck size={16} color="#10b981" />
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Payor Step-Therapy & Clinical Criteria Checklist
                </h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedPa.conservativeTreatmentsAttempted.map((treatment, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    fontSize: '0.8rem'
                  }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span style={{ color: 'var(--text-primary)' }}>{treatment}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Generated Clinical Justification */}
            <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.06)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={16} color="#60a5fa" />
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#93c5fd' }}>
                  AI Clinical Justification & Guideline Synthesis
                </span>
              </div>
              <p style={{ fontSize: '0.825rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {selectedPa.clinicalJustification}
              </p>
            </div>

            {/* Attached Clinical Evidence Documents */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Attached Clinical Evidence Packets ({selectedPa.requiredDocsUploaded.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedPa.requiredDocsUploaded.map((doc, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.75rem'
                  }}>
                    <FileText size={14} color="#06b6d4" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit & Payor EDI Transaction Timeline */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                EDI 278 Transmission History & Gateway Logs
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedPa.timeline.map((t, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.75rem' }}>
                    <div style={{ minWidth: '110px', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{t.date}</div>
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{t.action}</strong> ({t.actor}) — <span style={{ color: 'var(--text-secondary)' }}>{t.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Select an authorization record to view details
          </div>
        )}
      </div>
    </div>
  );
};
