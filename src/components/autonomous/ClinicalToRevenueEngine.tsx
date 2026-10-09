import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  DollarSign, 
  Zap, 
  Layers, 
  Check, 
  RefreshCw, 
  Activity, 
  Clock, 
  Sliders, 
  Bot, 
  Send, 
  Lock,
  GitMerge,
  UserCheck,
  FileCheck,
  Award,
  ChevronRight,
  TrendingUp,
  ReceiptText,
  KeyRound,
  Database,
  Hash,
  Scale
} from 'lucide-react';
import confetti from 'canvas-confetti';

export type EngineStage = 'sign_off' | 'atomization' | 'multi_agent' | 'revenue';

interface AgentTask {
  id: string;
  agentName: string;
  agentRole: string;
  avatarColor: string;
  status: 'completed' | 'awaiting_human_approval' | 'in_progress' | 'queued';
  taskTitle: string;
  details: string;
  extractedFacts: string[];
  requiresConsequentialApproval: boolean;
  approvalActor?: string;
  financialImpact?: string;
}

const INITIAL_PIPELINE_TASKS: AgentTask[] = [
  {
    id: 'task_alpha',
    agentName: 'Agent Alpha (Clinical Extraction)',
    agentRole: 'Medical NLP & Evidence Structurer',
    avatarColor: '#0ea5e9',
    status: 'completed',
    taskTitle: 'Atomize Clinician-Approved SOAP Encounter',
    details: 'Dr. Sarah Lin cryptographically signed encounter note (ENC-91820). Extracted 4 reusable structured evidence units into Section 4.1 Schema.',
    extractedFacts: [
      'Refractory chronic migraine (ICD-10 G43.909) >6 months duration',
      'Documented trial & failure of topiramate 100mg daily (severe paresthesia)',
      'Documented trial & failure of propranolol 80mg daily (bradycardia)',
      'High-field 3T Brain MRI (CPT 70553) clinically indicated per AAN Guidelines'
    ],
    requiresConsequentialApproval: false,
    financialImpact: '$1,950 Ordered Value'
  },
  {
    id: 'task_beta',
    agentName: 'Agent Beta (Prior Auth Orchestrator)',
    agentRole: 'Payer Guideline & X12 278 Transmit',
    avatarColor: '#f59e0b',
    status: 'awaiting_human_approval',
    taskTitle: 'Prepare & Transmit Da Vinci PAS Electronic Auth',
    details: 'Matched BlueCross Medical Policy Guidelines #NEURO-402. All 3 step-therapy criteria proven with zero human transcription needed. Ready for electronic EDI 278 transmit.',
    extractedFacts: [
      'FHIR R4 Claim Bundle synthesized: pas-bundle-2026-9182',
      'Criteria Concordance: 100% (Confidence 96.8%)',
      'Dual-SLA Adjudication Target: Payer SLA 48h (Emergency fast-track)'
    ],
    requiresConsequentialApproval: true,
    approvalActor: 'Attending Physician or Prior Auth Specialist',
    financialImpact: '$1,950 Protected Reimbursement'
  },
  {
    id: 'task_gamma',
    agentName: 'Agent Gamma (Coding & NCCI Integrity)',
    agentRole: 'Revenue Integrity & Unbundling Guard',
    avatarColor: '#10b981',
    status: 'completed',
    taskTitle: 'NCCI Edits Pre-Scrub & Modifier Justification',
    details: 'Audited encounter for CPT 70553 with E&M 99214. Verified distinct procedural service. Automatically appended Modifier -25 with clinical rationale referencing encounter line 28.',
    extractedFacts: [
      'NCCI PTP Chapter 1 Edit evaluated: COMPLIANT with Modifier -25',
      'ICD-10 primary to secondary linkage: G43.909 -> R51.9',
      'Pre-Submission Clean Pass Probability: 99.2%'
    ],
    requiresConsequentialApproval: false,
    financialImpact: '$485 Added Claim Integrity'
  },
  {
    id: 'task_delta',
    agentName: 'Agent Delta (Revenue Forecaster)',
    agentRole: 'Contract Allowable & Leakage Estimator',
    avatarColor: '#a855f7',
    status: 'completed',
    taskTitle: 'Contracted Allowable & Cash Flow Projection',
    details: 'Queried BlueCross BlueShield fee schedule schedule_2026_midwest. Forecasted net allowable reimbursement: $1,680.00 within 14 days of EDI 837P clearinghouse acceptance.',
    extractedFacts: [
      'Gross Billed: $1,950.00 | Contracted Allowable: $1,680.00',
      'Patient Responsibility (Co-insurance 10%): $168.00',
      'Predicted Denial Probability: 1.8% (Negligible Risk)'
    ],
    requiresConsequentialApproval: false,
    financialImpact: '$1,680 Net Expected Cash'
  }
];

export const ClinicalToRevenueEngine: React.FC = () => {
  const [pipelineTasks, setPipelineTasks] = useState<AgentTask[]>(INITIAL_PIPELINE_TASKS);
  const [activeStage, setActiveStage] = useState<EngineStage>('sign_off');
  const [isSimulatingRun, setIsSimulatingRun] = useState(false);
  const [selectedTask, setSelectedTask] = useState<AgentTask>(pipelineTasks[1]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stage 1: Note Sign-off State
  const [isNoteSigned, setIsNoteSigned] = useState(true);
  const [signOffTimestamp, setSignOffTimestamp] = useState('Today at 09:14 AM');
  const [cryptoSignatureHash, setCryptoSignatureHash] = useState('sha256:8f2c01994b7e31d0449a88e9184fc0192');
  const [isSigningNote, setIsSigningNote] = useState(false);

  // Stage 2: Evidence Atomization State
  const [isAtomizing, setIsAtomizing] = useState(false);
  const [atomizationDone, setAtomizationDone] = useState(true);
  const [selectedEvidenceNode, setSelectedEvidenceNode] = useState<string>('ev_node_1');

  // Stage 3: Multi-Agent Dispatch State
  const [isDispatchingAgents, setIsDispatchingAgents] = useState(false);

  // Stage 4: Revenue Realization State
  const [isRealizingRevenue, setIsRealizingRevenue] = useState(false);
  const [revenueProtectedAmount, setRevenueProtectedAmount] = useState(2140);
  const [cleanClaimRate, setCleanClaimRate] = useState(98.4);

  // Cryptographic Human-Approval Audit Trail
  const [approvalLog, setApprovalLog] = useState<{ id: string; timestamp: string; actor: string; decision: string }[]>([
    {
      id: 'log_01',
      timestamp: 'Today at 09:14 AM',
      actor: 'Dr. Sarah Lin, MD (NPI: 1841392019)',
      decision: 'Clinician Encounter Note Encrypted & Signed (SHA-256: 8f2c01...)'
    }
  ]);

  const awaitingCount = pipelineTasks.filter(t => t.status === 'awaiting_human_approval').length;
  const completedCount = pipelineTasks.filter(t => t.status === 'completed').length;

  // 1. Clinician Note Sign-off Action Handler
  const handleSignClinicianNote = () => {
    setIsSigningNote(true);
    setToastMessage('Computing SHA-256 cryptographic hash over encounter note ENC-91820...');

    setTimeout(() => {
      const newHash = 'sha256:' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      setCryptoSignatureHash(newHash);
      setSignOffTimestamp(`Today at ${newTime}`);
      setIsNoteSigned(true);
      setIsSigningNote(false);
      
      const newLog = {
        id: `log_sign_${Date.now()}`,
        timestamp: `Today at ${newTime}`,
        actor: 'Dr. Sarah Lin, MD (NPI: 1841392019)',
        decision: `1-Click Cryptographic Signature Verified & Sealed (${newHash.slice(0, 18)}...)`
      };
      setApprovalLog(prev => [newLog, ...prev]);
      setToastMessage('Stage 1 Complete: Note Signed & Cryptographically Sealed! Section 4.1 Schema unlocked.');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }, 800);
  };

  // 2. Evidence Atomization Action Handler
  const handleExecuteAtomization = () => {
    setIsAtomizing(true);
    setToastMessage('Agent Alpha running Medical NLP extraction into Section 4.1 Schema Graph...');

    setTimeout(() => {
      setIsAtomizing(false);
      setAtomizationDone(true);
      setToastMessage('Stage 2 Complete: 4 clinical facts atomized into reusable FHIR/Section 4.1 evidence graph!');
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }, 900);
  };

  // 3. Multi-Agent Dispatch Action Handler
  const handleDispatchMultiAgents = () => {
    setIsDispatchingAgents(true);
    setToastMessage('Dispatching Agent Beta (Prior Auth) & Agent Gamma (NCCI Integrity)...');

    setTimeout(() => {
      setIsDispatchingAgents(false);
      setPipelineTasks(prev => prev.map(t => {
        if (t.id === 'task_beta') {
          return { ...t, status: 'awaiting_human_approval' };
        }
        return { ...t, status: 'completed' };
      }));
      setSelectedTask(pipelineTasks[1]);
      setToastMessage('Stage 3 Active: Agents dispatched! Consequential gate awaiting clinician authorization.');
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }, 1000);
  };

  // Human-in-the-Loop Consequential Action Approval
  const handleApproveConsequentialAction = (taskId: string) => {
    setPipelineTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'completed',
          details: t.details + ' [APPROVED & TRANSMITTED: Electronic EDI 278 sent to Payer Gateway]'
        };
      }
      return t;
    }));

    const newLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: 'Authorized Clinician (Human-in-the-Loop Gateway)',
      decision: `Consequential Action Approved: Transmit Electronic EDI 278 Authorization for ${selectedTask.financialImpact}`
    };

    setApprovalLog(prev => [newLog, ...prev]);
    setToastMessage('Human Approval Committed! Autonomous transmission dispatched with cryptographic audit record.');
    confetti({ particleCount: 70, spread: 75, origin: { y: 0.6 } });
  };

  // 4. Revenue Realization Action Handler
  const handleExecuteRevenueRealization = () => {
    setIsRealizingRevenue(true);
    setToastMessage('Agent Delta calculating fee schedule allowables and NCCI modifier clearance...');

    setTimeout(() => {
      setIsRealizingRevenue(false);
      setRevenueProtectedAmount(2140);
      setCleanClaimRate(98.4);
      setToastMessage('Stage 4 Complete: $2,140 Net Cash Protected! 98.4% Clean Claim Pass Rate Verified.');
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
    }, 900);
  };

  // Full End-to-End Pipeline Runner
  const handleSimulateAutonomousPipeline = () => {
    setIsSimulatingRun(true);
    setActiveStage('sign_off');
    setToastMessage('Step 1/4: Clinician Cryptographic Note Sign-off initiated...');

    setTimeout(() => {
      handleSignClinicianNote();
      setActiveStage('atomization');
      setToastMessage('Step 2/4: Atomizing into Section 4.1 Schema Graph...');
    }, 900);

    setTimeout(() => {
      handleExecuteAtomization();
      setActiveStage('multi_agent');
      setToastMessage('Step 3/4: Multi-Agent Swarm Dispatched (Agent Beta & Gamma)...');
    }, 1800);

    setTimeout(() => {
      handleDispatchMultiAgents();
      setActiveStage('revenue');
      setToastMessage('Step 4/4: Revenue Realization & Clean Claim Protection Verified!');
      setIsSimulatingRun(false);
      confetti({ particleCount: 90, spread: 100, origin: { y: 0.5 } });
    }, 2800);
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto', color: 'var(--text-primary)' }}>
      {/* Hero Product Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.22) 0%, rgba(99, 102, 241, 0.2) 50%, rgba(16, 185, 129, 0.15) 100%)',
        border: '1px solid rgba(14, 165, 233, 0.4)',
        borderRadius: '20px',
        padding: '28px 32px',
        marginBottom: '28px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '6px',
                letterSpacing: '0.05em'
              }}>
                CORE PRODUCT INNOVATION · C2R AUTONOMOUS ENGINE
              </span>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                HUMAN-IN-THE-LOOP (HITL) GUARDRAILS ACTIVE
              </span>
            </div>

            <h1 style={{ fontSize: '1.9rem', fontWeight: 800, margin: '6px 0 8px 0', letterSpacing: '-0.02em' }}>
              Clinical-to-Revenue <span className="gradient-text-blue">Autonomous AI Engine</span>
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '850px', margin: 0, lineHeight: 1.5 }}>
              Permanently breaks the healthcare silo between clinical documentation, prior authorization, and billing. Converts clinician-approved encounter charts into <strong>reusable, structured evidence objects</strong> that autonomously orchestrate X12 278 authorization requests, NCCI code justifications, and reimbursement forecasting—with mandatory human approval for consequential care decisions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleSimulateAutonomousPipeline}
              disabled={isSimulatingRun}
              className="btn-primary"
              style={{
                padding: '12px 18px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Zap size={16} />
              <span>{isSimulatingRun ? 'Executing End-to-End Pipeline...' : 'Run End-to-End Pipeline (Stages 1-4)'}</span>
            </button>
          </div>
        </div>

        {/* 4 Pipeline Interactive Milestones Navigation Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '14px',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Milestone 1 */}
          <button
            onClick={() => setActiveStage('sign_off')}
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              border: activeStage === 'sign_off' ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeStage === 'sign_off' ? 'rgba(14, 165, 233, 0.18)' : 'rgba(255, 255, 255, 0.03)',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
              boxShadow: activeStage === 'sign_off' ? '0 0 20px rgba(14, 165, 233, 0.3)' : 'none'
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(14, 165, 233, 0.2)',
              border: '1px solid rgba(14, 165, 233, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <FileCheck size={18} color="#38bdf8" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc' }}>1. Clinician Note Sign-off</span>
                <CheckCircle2 size={14} color="#10b981" />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 600 }}>1-click cryptographic signature</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>{signOffTimestamp}</div>
            </div>
          </button>

          {/* Milestone 2 */}
          <button
            onClick={() => setActiveStage('atomization')}
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              border: activeStage === 'atomization' ? '2px solid #818cf8' : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeStage === 'atomization' ? 'rgba(99, 102, 241, 0.18)' : 'rgba(255, 255, 255, 0.03)',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
              boxShadow: activeStage === 'atomization' ? '0 0 20px rgba(99, 102, 241, 0.3)' : 'none'
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <GitMerge size={18} color="#818cf8" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc' }}>2. Evidence Atomization</span>
                <CheckCircle2 size={14} color="#10b981" />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#818cf8', fontWeight: 600 }}>Section 4.1 Schema Graph</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>4 reusable evidence units</div>
            </div>
          </button>

          {/* Milestone 3 */}
          <button
            onClick={() => setActiveStage('multi_agent')}
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              border: activeStage === 'multi_agent' ? '2px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeStage === 'multi_agent' ? 'rgba(245, 158, 11, 0.18)' : 'rgba(255, 255, 255, 0.03)',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
              boxShadow: activeStage === 'multi_agent' ? '0 0 20px rgba(245, 158, 11, 0.3)' : 'none'
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Bot size={18} color="#fbbf24" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc' }}>3. Multi-Agent Dispatch</span>
                {awaitingCount > 0 ? (
                  <span style={{ fontSize: '0.6rem', padding: '1px 6px', borderRadius: '4px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', fontWeight: 700 }}>
                    GATE ACTIVE
                  </span>
                ) : (
                  <CheckCircle2 size={14} color="#10b981" />
                )}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 600 }}>Prior Auth & NCCI Scrubbing</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>HITL Consequential Approval</div>
            </div>
          </button>

          {/* Milestone 4 */}
          <button
            onClick={() => setActiveStage('revenue')}
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              border: activeStage === 'revenue' ? '2px solid #34d399' : '1px solid rgba(255, 255, 255, 0.1)',
              background: activeStage === 'revenue' ? 'rgba(16, 185, 129, 0.18)' : 'rgba(255, 255, 255, 0.03)',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'all 0.2s ease',
              boxShadow: activeStage === 'revenue' ? '0 0 20px rgba(16, 185, 129, 0.3)' : 'none'
            }}
          >
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <DollarSign size={18} color="#34d399" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc' }}>4. Revenue Realization</span>
                <CheckCircle2 size={14} color="#10b981" />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600 }}>{cleanClaimRate}% Clean Claim Protected</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>${revenueProtectedAmount.toLocaleString()} Net Expected Cash</div>
            </div>
          </button>
        </div>
      </div>

      {/* Global Interactive Notification Toast */}
      {toastMessage && (
        <div style={{
          padding: '12px 20px',
          borderRadius: '12px',
          background: 'rgba(14, 165, 233, 0.15)',
          border: '1px solid rgba(14, 165, 233, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          fontSize: '0.825rem',
          color: '#38bdf8'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={16} />
            <span style={{ fontWeight: 600 }}>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* STAGE-SPECIFIC INTERACTIVE FOCUS PANELS */}

      {/* Stage 1 Focus: Clinician Note Sign-off Station */}
      {activeStage === 'sign_off' && (
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', border: '1px solid rgba(14, 165, 233, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileCheck size={22} color="#38bdf8" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                  Stage 1: Clinician Note Sign-off & Cryptographic Sealing Station
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                  21 CFR Part 11 compliant digital signature applied to clinical encounter note ENC-91820
                </p>
              </div>
            </div>

            <button
              onClick={handleSignClinicianNote}
              disabled={isSigningNote}
              className="btn-primary"
              style={{ padding: '10px 18px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <KeyRound size={15} />
              <span>{isSigningNote ? 'Computing SHA-256...' : 'Execute 1-Click Cryptographic Signature'}</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
            {/* Signed Encounter Text */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '0.76rem',
              color: '#cbd5e1',
              lineHeight: 1.5
            }}>
              <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '8px' }}>
                [ENCOUNTER: ENC-91820] Patient: Elena Rostova (MRN-849201) • DOB: 1988-04-12
              </div>
              <div>SUBJECTIVE: 36yo female presents with intractable chronic migraine without aura (&gt;6 mos). Failed oral topiramate 100mg/day (severe paresthesia) and propranolol 80mg/day (symptomatic bradycardia).</div>
              <div style={{ marginTop: '8px' }}>OBJECTIVE: Cranial nerves II-XII intact. Fundoscopic exam normal. Reflexes 2+ symmetric. Vitals: BP 118/76, HR 64.</div>
              <div style={{ marginTop: '8px' }}>ASSESSMENT & PLAN: G43.909 Intractable migraine. Ordered High-Field 3T Brain MRI (CPT 70553) with and without contrast to rule out vascular malformation and intracranial lesion.</div>
            </div>

            {/* Cryptographic Seal Dossier */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: 700, fontSize: '0.8rem' }}>
                  <ShieldCheck size={16} />
                  <span>NIST FIPS Cryptographic Signature Valid</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>
                  Signer: <strong>Dr. Sarah Lin, MD</strong> (NPI: 1841392019)
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                  Hash: {cryptoSignatureHash}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Timestamp: {signOffTimestamp} • Dual-Key HSM Protected
                </div>
              </div>

              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)'
              }}>
                <strong>Downstream Propagation:</strong> This signed note unlocks the Section 4.1 Schema Graph, feeding directly into Prior Auth criteria verification and NCCI claims scrubbing.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2 Focus: Evidence Atomization Section 4.1 Schema Graph */}
      {activeStage === 'atomization' && (
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GitMerge size={22} color="#818cf8" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                  Stage 2: Section 4.1 Reusable Clinical Evidence Atomization Graph
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                  Transforms unstructured clinician narrative into discrete, verifiable clinical evidence tokens with SNOMED-CT & ICD-10 crosswalks
                </p>
              </div>
            </div>

            <button
              onClick={handleExecuteAtomization}
              disabled={isAtomizing}
              className="btn-primary"
              style={{ padding: '10px 18px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <RefreshCw size={15} className={isAtomizing ? 'spin-slow' : ''} />
              <span>{isAtomizing ? 'Synthesizing Graph...' : 'Re-Atomize Section 4.1 Graph'}</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {[
              {
                id: 'ev_node_1',
                title: 'Clinical Condition',
                code: 'ICD-10 G43.909',
                system: 'SNOMED 37796009',
                evidence: 'Refractory chronic migraine >6 months duration without aura',
                confidence: '99.4%',
                status: 'Verified'
              },
              {
                id: 'ev_node_2',
                title: 'Step Therapy 1 Failure',
                code: 'RxNorm 88249',
                system: 'Topiramate 100mg',
                evidence: 'Discontinued due to severe bilateral extremity paresthesias',
                confidence: '98.8%',
                status: 'Failed (Adverse Reaction)'
              },
              {
                id: 'ev_node_3',
                title: 'Step Therapy 2 Failure',
                code: 'RxNorm 8787',
                system: 'Propranolol 80mg',
                evidence: 'Discontinued due to symptomatic bradycardia (HR <52 bpm)',
                confidence: '97.9%',
                status: 'Contraindicated'
              },
              {
                id: 'ev_node_4',
                title: 'Diagnostic Order',
                code: 'CPT 70553',
                system: 'Brain MRI w/wo Contrast',
                evidence: 'Clinically indicated per AAN 2026 neuroimaging guidelines',
                confidence: '99.1%',
                status: 'Authorized'
              }
            ].map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedEvidenceNode(node.id)}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: selectedEvidenceNode === node.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: selectedEvidenceNode === node.id ? '2px solid #818cf8' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#818cf8', textTransform: 'uppercase' }}>
                    {node.title}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700 }}>{node.confidence}</span>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                  {node.code}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {node.system}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginTop: '4px', lineHeight: 1.35 }}>
                  {node.evidence}
                </div>
                <div style={{
                  marginTop: 'auto',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#34d399',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  alignSelf: 'flex-start'
                }}>
                  {node.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stage 3 Focus: Multi-Agent Dispatch & HITL Gate */}
      {activeStage === 'multi_agent' && (
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={22} color="#fbbf24" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                  Stage 3: Multi-Agent Dispatch & Human-in-the-Loop Consequential Gate
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                  Agent Beta prepares the Da Vinci PAS electronic prior auth; Agent Gamma scrubs NCCI code unbundling
                </p>
              </div>
            </div>

            <button
              onClick={handleDispatchMultiAgents}
              disabled={isDispatchingAgents}
              className="btn-primary"
              style={{ padding: '10px 18px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Zap size={15} />
              <span>{isDispatchingAgents ? 'Dispatching Agents...' : 'Re-Dispatch Multi-Agent Swarm'}</span>
            </button>
          </div>

          <div style={{
            padding: '16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <AlertTriangle size={16} color="#fbbf24" />
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fbbf24' }}>
                  Consequential Decision: Electronic Prior Auth Transmission Gate
                </span>
              </div>
              <p style={{ fontSize: '0.76rem', color: '#cbd5e1', margin: 0 }}>
                Electronic transmission of X12 278 Prior Authorization alters patient coverage status and legally represents the provider. Physician authorization required.
              </p>
            </div>

            {selectedTask.status === 'awaiting_human_approval' ? (
              <button
                onClick={() => handleApproveConsequentialAction(selectedTask.id)}
                className="btn-emerald"
                style={{ padding: '10px 18px', fontSize: '0.825rem', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <UserCheck size={16} />
                <span>Authorize Electronic Transmit (Human Approval)</span>
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: 700, fontSize: '0.82rem' }}>
                <CheckCircle2 size={18} />
                <span>Authorized & Transmitted by Clinician</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stage 4 Focus: Revenue Realization & Clean Claim Protection */}
      {activeStage === 'revenue' && (
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <DollarSign size={22} color="#34d399" />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                  Stage 4: Revenue Realization & Clean Claim Protection Station
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                  Pre-submission clearance locks in 98.4% clean claim pass rate and protects full contracted allowable payout
                </p>
              </div>
            </div>

            <button
              onClick={handleExecuteRevenueRealization}
              disabled={isRealizingRevenue}
              className="btn-primary"
              style={{ padding: '10px 18px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <CheckCircle2 size={15} />
              <span>{isRealizingRevenue ? 'Calculating Fee Schedules...' : 'Lock Revenue Protection'}</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Clean Claim Pass Rate</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', margin: '4px 0' }}>{cleanClaimRate}%</div>
              <div style={{ fontSize: '0.68rem', color: '#10b981' }}>+22% vs Industry Average (76%)</div>
            </div>

            <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Gross Billed Value</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', margin: '4px 0' }}>${revenueProtectedAmount.toLocaleString()}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>CPT 70553 + E&M 99214</div>
            </div>

            <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Contracted Allowable Cash</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', margin: '4px 0' }}>$1,680.00</div>
              <div style={{ fontSize: '0.68rem', color: '#38bdf8' }}>Payout SLA: 14 Days (Direct ACH)</div>
            </div>

            <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Predicted Denial Risk</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a855f7', margin: '4px 0' }}>1.2%</div>
              <div style={{ fontSize: '0.68rem', color: '#c084fc' }}>Negligible Payer Friction Risk</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Multi-Agent Execution Pipeline + HITL Consequential Approval & Audit Station */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Live Agent Task Swarm */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                Autonomous Healthcare Agent Swarm
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                4 specialized agents executing clinical-to-revenue atomization in parallel
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge-status badge-approved">
                {completedCount} Completed
              </span>
              {awaitingCount > 0 && (
                <span className="badge-status badge-pended">
                  {awaitingCount} Awaiting Human Review
                </span>
              )}
            </div>
          </div>

          {/* Task Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pipelineTasks.map((task) => {
              const isSelected = selectedTask.id === task.id;
              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? `2px solid ${task.avatarColor}` : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '8px',
                        background: `${task.avatarColor}22`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `1px solid ${task.avatarColor}44`
                      }}>
                        <Bot size={18} color={task.avatarColor} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                          {task.agentName}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {task.agentRole}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      {task.status === 'completed' && (
                        <span className="badge-status badge-approved" style={{ fontSize: '0.68rem' }}>
                          <CheckCircle2 size={12} /> Autonomous Complete
                        </span>
                      )}
                      {task.status === 'awaiting_human_approval' && (
                        <span className="badge-status badge-pended" style={{ fontSize: '0.68rem' }}>
                          <AlertTriangle size={12} /> Human Gate Pending
                        </span>
                      )}
                      <div style={{ fontSize: '0.7rem', color: task.avatarColor, fontWeight: 700, marginTop: '4px' }}>
                        {task.financialImpact}
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '6px' }}>
                    {task.taskTitle}
                  </div>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    {task.details}
                  </p>

                  {/* Fact Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                    {task.extractedFacts.slice(0, 2).map((fact, idx) => (
                      <span key={idx} style={{
                        fontSize: '0.68rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'var(--text-secondary)'
                      }}>
                        • {fact}
                      </span>
                    ))}
                    {task.extractedFacts.length > 2 && (
                      <span style={{ fontSize: '0.68rem', color: '#60a5fa', fontWeight: 600, alignSelf: 'center' }}>
                        +{task.extractedFacts.length - 2} more evidence facts
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Human-in-the-Loop Consequential Guardrail & Decision Station */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Task Inspector */}
          <div className="glass-panel" style={{ padding: '24px', border: selectedTask.requiresConsequentialApproval && selectedTask.status === 'awaiting_human_approval' ? '1px solid rgba(245, 158, 11, 0.4)' : undefined }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="#06b6d4" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Human-in-the-Loop Approval Station</h3>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Target: {selectedTask.agentName.split(' ')[1]}
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Selected Agent Execution
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>
                {selectedTask.taskTitle}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.45 }}>
                {selectedTask.details}
              </p>
            </div>

            {/* Extracted Evidence Graph Units */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '14px',
              borderRadius: '10px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '18px'
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Structured Clinical Evidence Units (Section 4.1 Specification)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedTask.extractedFacts.map((fact, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.74rem' }}>
                    <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: '#cbd5e1' }}>{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Consequential Action Button */}
            {selectedTask.requiresConsequentialApproval && selectedTask.status === 'awaiting_human_approval' ? (
              <div style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <AlertTriangle size={16} color="#f59e0b" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fbbf24' }}>
                    Consequential Decision Approval Required
                  </span>
                </div>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
                  Electronic transmission of X12 278 Prior Authorization alters patient coverage status and legally represents the provider. Physician or certified coordinator authorization required.
                </p>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleApproveConsequentialAction(selectedTask.id)}
                    className="btn-emerald"
                    style={{ flex: 1, padding: '10px', fontSize: '0.825rem', justifyContent: 'center' }}
                  >
                    <UserCheck size={16} />
                    <span>Authorize Electronic Transmit (Human Approval)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '10px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px'
              }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 600 }}>
                  Task verified. Zero outstanding consequential gates pending.
                </span>
              </div>
            )}
          </div>

          {/* Cryptographic Human-Approval Audit Trail */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Lock size={16} color="#818cf8" />
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>
                21 CFR Part 11 Cryptographic Audit Trail
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
              {approvalLog.map((log) => (
                <div key={log.id} style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  fontSize: '0.72rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', marginBottom: '2px' }}>
                    <span>{log.actor}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{log.timestamp}</span>
                  </div>
                  <div style={{ color: '#f8fafc', fontWeight: 600 }}>
                    {log.decision}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
