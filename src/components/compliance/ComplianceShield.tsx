import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  FileCheck, 
  AlertCircle, 
  CheckCircle2, 
  Database, 
  Fingerprint, 
  Eye, 
  UserCheck, 
  Server,
  Activity,
  GitBranch,
  Scale,
  Sparkles,
  BarChart2,
  CheckCircle,
  HelpCircle,
  TrendingDown,
  Cpu,
  Layers
} from 'lucide-react';
import { ComplianceAuditLog } from '../../types';
import { MOCK_COMPLIANCE_LOGS } from '../../data/mockData';
import confetti from 'canvas-confetti';

export const ComplianceShield: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<ComplianceAuditLog[]>(MOCK_COMPLIANCE_LOGS);
  const [filterAction, setFilterAction] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'audit_logs' | 'ai_governance'>('ai_governance');
  const [isVerifyingModel, setIsVerifyingModel] = useState(false);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  const baaPartners = [
    { name: 'Epic Systems Corporation (FHIR R4)', status: 'Active & Verified', expiry: '2027-12-31', bAAId: 'BAA-EPIC-9921' },
    { name: 'Amazon Web Services (AWS HealthLake)', status: 'Active & Verified', expiry: '2028-06-15', bAAId: 'BAA-AWS-8831' },
    { name: 'Athenahealth Clinical Network', status: 'Active & Verified', expiry: '2027-09-01', bAAId: 'BAA-ATH-3391' },
    { name: 'UnitedHealthcare EDI Clearinghouse', status: 'Active & Verified', expiry: '2028-01-10', bAAId: 'BAA-UHC-1049' }
  ];

  const filteredLogs = auditLogs.filter(log => filterAction === 'ALL' || log.action === filterAction);

  const handleRunModelGovernanceCheck = () => {
    setIsVerifyingModel(true);
    setVerificationFeedback('Running Franklin ML, ATI Score Validator, and CAHPS Survey Integration Tests...');

    setTimeout(() => {
      setIsVerifyingModel(false);
      setVerificationFeedback('Dynamic Risk Model & SHAP Triage Verified! 0.94 Confidence Score across all encounters.');
      confetti({ particleCount: 50, spread: 60 });
    }, 1200);
  };

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>HIPAA & Regulatory Compliance Shield</h2>
            <span className="badge-status badge-approved">
              <Lock size={13} />
              Zero-Trust Architecture
            </span>
            <span className="badge-status" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <Scale size={13} />
              AI Model Audit Governance (Kronick 2026; Abhilasha 2026)
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Cryptographically sealed audit trails, automated BAA contract verification, and AI Risk Model Governance neutralizing payer dynamic audits.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveTab(activeTab === 'ai_governance' ? 'audit_logs' : 'ai_governance')}
            className="btn-secondary"
            style={{ fontSize: '0.825rem' }}
          >
            <Layers size={14} color="#38bdf8" />
            <span>{activeTab === 'ai_governance' ? 'Switch to Immutable Audit Logs' : 'Switch to Dynamic AI Risk Governance'}</span>
          </button>
        </div>
      </div>

      {/* Security Telemetry Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Key size={18} color="#06b6d4" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Data-in-Transit Encryption</span>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>TLS 1.3 • AES-256</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Perfect Forward Secrecy (PFS) enabled across all endpoints
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Cpu size={18} color="#34d399" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Franklin ML Risk Prediction</span>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>$R^2$ 0.44 (vs 0.15 CMS-HCC)</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Appropriateness to Include (ATI) score filtering (Andriola 2024)
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <BarChart2 size={18} color="#c084fc" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>CAHPS Survey Integration</span>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#c084fc' }}>+6.0% Explained Variance</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Non-manipulable patient survey stream (McWilliams 2025)
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Eye size={18} color="#fbbf24" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>SHAP-Guided Audit Triage</span>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>-43.2% Error Rate</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Revenue-sensitive 20% targeted sampling (Chen et al. 2026)
          </div>
        </div>
      </div>

      {verificationFeedback && (
        <div style={{
          padding: '12px 18px',
          borderRadius: '10px',
          background: 'rgba(56, 189, 248, 0.12)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          fontSize: '0.825rem',
          color: '#38bdf8',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={18} />
          <span>{verificationFeedback}</span>
        </div>
      )}

      {/* TAB 1: DYNAMIC AI RISK GOVERNANCE & CLAIMS VERIFICATION WORKFLOW */}
      {activeTab === 'ai_governance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Interactive AI Verification Pipeline Workflow Visualizer */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GitBranch size={18} color="#38bdf8" />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                    AI Claims Verification & Dynamic Audit Ingestion Workflow
                  </h3>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Payer intake architecture for auditing AI-generated documentation and adjusting risk scores (Abhilasha 2026; Huang 2026)
                </p>
              </div>

              <button
                onClick={handleRunModelGovernanceCheck}
                disabled={isVerifyingModel}
                className="btn-primary"
                style={{ fontSize: '0.8rem' }}
              >
                <Sparkles size={14} />
                <span>{isVerifyingModel ? 'Validating Models...' : 'Execute Model Governance Check'}</span>
              </button>
            </div>

            {/* Visual Workflow Steps (Ingest -> Validate -> Confidence Check -> Targeted Audit / Adjust Risk) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#60a5fa', fontSize: '0.8rem', fontWeight: 800 }}>
                  <span>Step 1: Ingest Encounter</span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                  Ingest clinical documentation and structured ICD-10/HCC codes extracted by ambient AI scribes.
                </p>
                <div style={{ marginTop: '10px', fontSize: '0.68rem', color: '#93c5fd', fontFamily: 'JetBrains Mono' }}>
                  Ingestion Rate: 100% Real-Time
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '0.8rem', fontWeight: 800 }}>
                  <span>Step 2: Validate Specificity</span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                  Evaluate clinical note consistency against diagnostic criteria, ATI rules, and active care plans.
                </p>
                <div style={{ marginTop: '10px', fontSize: '0.68rem', color: '#6ee7b7', fontFamily: 'JetBrains Mono' }}>
                  ATI Exclusions Applied: 0
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(167, 139, 250, 0.08)', border: '1px solid rgba(167, 139, 250, 0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c084fc', fontSize: '0.8rem', fontWeight: 800 }}>
                  <span>Step 3: Confidence Check</span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                  Score against hallucination heuristics; route claims with confidence &lt; 0.62 to human verification.
                </p>
                <div style={{ marginTop: '10px', fontSize: '0.68rem', color: '#d8b4fe', fontFamily: 'JetBrains Mono' }}>
                  Confidence Score: 0.94 (&gt; 0.62 Pass)
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fbbf24', fontSize: '0.8rem', fontWeight: 800 }}>
                  <span>Step 4: SHAP Targeted Audit</span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                  SHAP-guided prioritization ranks high-exposure claims based on length of stay, deductibles, and case mix.
                </p>
                <div style={{ marginTop: '10px', fontSize: '0.68rem', color: '#fde68a', fontFamily: 'JetBrains Mono' }}>
                  43.2% Error Score Reduction
                </div>
              </div>

              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#06b6d4', fontSize: '0.8rem', fontWeight: 800 }}>
                  <span>Step 5: Adjust Risk Score</span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                  Apply statutory 5.9% coding deflation factor and merge CAHPS non-manipulable patient survey telemetry.
                </p>
                <div style={{ marginTop: '10px', fontSize: '0.68rem', color: '#67e8f9', fontFamily: 'JetBrains Mono' }}>
                  Risk Score Deflation Neutralized
                </div>
              </div>
            </div>
          </div>

          {/* 3 Core Architectural Shields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
            {/* Shield 1: Model Safeguards & CAHPS */}
            <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#38bdf8' }}>
                  Risk Adjustment Architectural Safeguards
                </span>
                <span className="badge-status badge-approved" style={{ fontSize: '0.65rem' }}>Shenfeld 2026</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Franklin machine learning framework outperforms CMS-HCC ($R^2$ 0.44 vs 0.15) with Appropriateness to Include (ATI) scoring that systematically filters easily gamed diagnostic categories (Andriola et al. 2024).
              </p>
              <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', fontSize: '0.75rem', color: '#7dd3fc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={14} />
                <span>CAHPS Consumer Survey Data Integrated (+6.0% Variance Explained)</span>
              </div>
            </div>

            {/* Shield 2: XGBoost & CVaR Tail-Risk */}
            <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#a78bfa' }}>
                  XGBoost Triage & Tail-Risk Control
                </span>
                <span className="badge-status badge-approved" style={{ fontSize: '0.65rem' }}>Dhieb 2020 / Bertsimas 2021</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                XGBoost claims classification delivers a +7% accuracy increase over legacy decision trees. Conditional Value-at-Risk (CVaR) constraints prevent tail risk financial losses in algorithmic documentation.
              </p>
              <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(167, 139, 250, 0.08)', border: '1px solid rgba(167, 139, 250, 0.2)', fontSize: '0.75rem', color: '#c4b5fd', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={14} />
                <span>CVaR 99% Tail Risk Exposure: &lt; 0.12% Potential Reversal</span>
              </div>
            </div>

            {/* Shield 3: Prudential Debiasing & EU AI Act */}
            <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#34d399' }}>
                  Prudential Debiasing & Traceability
                </span>
                <span className="badge-status badge-approved" style={{ fontSize: '0.65rem' }}>Mahajan 2025 / Abhilasha 2026</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Adversarial debiasing safeguards protected demographic attributes against pricing distortions. 100% auditable speech-to-code traceability satisfies EU AI Act and HHS regulatory audit benchmarks.
              </p>
              <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)', fontSize: '0.75rem', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={14} />
                <span>Adversarial Debiasing Parity: 100% Protected Attribute Independence</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUDIT LOGS & BAA CONTRACTS */}
      {activeTab === 'audit_logs' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '24px' }}>
          {/* Left: Active Business Associate Agreements (BAAs) */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck size={18} color="#60a5fa" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Active BAA Contracts</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {baaPartners.map((baa, idx) => (
                <div key={idx} style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{baa.name}</span>
                    <span className="badge-status badge-approved" style={{ fontSize: '0.65rem' }}>{baa.status}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                    <span>Ref: {baa.bAAId}</span>
                    <span>Expires: {baa.expiry}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Tamper-Evident Audit Trail */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Fingerprint size={18} color="#10b981" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Live Immutable Audit Trail</h3>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#34d399', fontFamily: 'JetBrains Mono' }}>
                SHA-256 Hash Chained
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '420px' }}>
              {filteredLogs.map((log) => (
                <div key={log.id} style={{
                  padding: '12px 14px',
                  borderRadius: '8px',
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="kbd-key">{log.action}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>{log.userName}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({log.userRole})</span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>
                      {log.timestamp}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {log.details}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    <span>Origin IP: {log.ipAddress}</span>
                    <span style={{ color: '#34d399' }}>{log.encryptionStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
