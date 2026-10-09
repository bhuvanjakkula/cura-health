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
  ReceiptText
} from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const [isSimulatingRun, setIsSimulatingRun] = useState(false);
  const [selectedTask, setSelectedTask] = useState<AgentTask>(pipelineTasks[1]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
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

  const handleSimulateAutonomousPipeline = () => {
    setIsSimulatingRun(true);
    setToastMessage('Simulating Clinician SOAP Note Sign-off & Autonomous Multi-Agent Dispatch...');

    setTimeout(() => {
      setPipelineTasks(prev => prev.map(t => {
        if (t.id === 'task_beta') {
          return {
            ...t,
            status: 'awaiting_human_approval'
          };
        }
        return { ...t, status: 'completed' };
      }));
      setIsSimulatingRun(false);
      setToastMessage('Pipeline execution complete! Reusable evidence synthesized across Prior Auth, Coding & Revenue.');
      confetti({ particleCount: 50, spread: 60 });
    }, 1600);
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
              <span>{isSimulatingRun ? 'Orchestrating Swarm...' : 'Simulate Note Sign-off & Run Pipeline'}</span>
            </button>
          </div>
        </div>

        {/* 4 Pipeline Milestones */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(14, 165, 233, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={16} color="#38bdf8" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>1. Clinician Note Sign-off</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>1-click cryptographic signature</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GitMerge size={16} color="#818cf8" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>2. Evidence Atomization</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Section 4.1 Schema Graph</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={16} color="#fbbf24" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>3. Multi-Agent Dispatch</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Prior Auth & NCCI Scrubbing</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={16} color="#34d399" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700 }}>4. Revenue Realization</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>98.4% Clean Claim Protected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Multi-Agent Task Swarm (Left) & Consequential Action Guardrail (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Left Column: Autonomous Multi-Agent Swarm Tracker */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Autonomous Multi-Agent Task Swarm</h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                4 Specialized Healthcare Agents executing simultaneously on patient Elena Rostova (MRN-849201)
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
