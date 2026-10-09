import React, { useState } from 'react';
import {
  Network,
  ShieldCheck,
  Server,
  Lock,
  Cpu,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Layers,
  ArrowRight,
  Database,
  Sliders,
  Sparkles,
  Zap,
  Globe,
  Radio,
  FileCode
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HospitalNode {
  id: string;
  name: string;
  location: string;
  localEncounters: number;
  nodeStatus: 'online_training' | 'validating' | 'syncing' | 'idle';
  privacyBudgetUsed: number; // e.g. epsilon = 0.42
  gradientLatencyMs: number;
  contributedRounds: number;
  localAccuracy: number;
}

const HOSPITAL_NODES: HospitalNode[] = [
  {
    id: 'node_metro',
    name: 'MetroHealth Regional Medical Center',
    location: 'Cleveland, OH (Host Facility)',
    localEncounters: 142000,
    nodeStatus: 'online_training',
    privacyBudgetUsed: 0.38,
    gradientLatencyMs: 14,
    contributedRounds: 148,
    localAccuracy: 94.6
  },
  {
    id: 'node_mayo',
    name: 'Mayo Clinic Enterprise Health System',
    location: 'Rochester, MN',
    localEncounters: 480000,
    nodeStatus: 'online_training',
    privacyBudgetUsed: 0.41,
    gradientLatencyMs: 38,
    contributedRounds: 148,
    localAccuracy: 96.2
  },
  {
    id: 'node_hopkins',
    name: 'Johns Hopkins Medicine Health System',
    location: 'Baltimore, MD',
    localEncounters: 310000,
    nodeStatus: 'validating',
    privacyBudgetUsed: 0.34,
    gradientLatencyMs: 29,
    contributedRounds: 145,
    localAccuracy: 95.1
  },
  {
    id: 'node_cleveland',
    name: 'Cleveland Clinic Health System',
    location: 'Cleveland, OH',
    localEncounters: 265000,
    nodeStatus: 'syncing',
    privacyBudgetUsed: 0.39,
    gradientLatencyMs: 22,
    contributedRounds: 147,
    localAccuracy: 95.8
  }
];

export const FederatedHealthcareNetwork: React.FC = () => {
  const [nodes, setNodes] = useState<HospitalNode[]>(HOSPITAL_NODES);
  const [currentRound, setCurrentRound] = useState(148);
  const [isAggregating, setIsAggregating] = useState(false);
  const [globalAuroc, setGlobalAuroc] = useState(0.954);
  const [aggregationLog, setAggregationLog] = useState<string[]>([
    '[10:14:02] Round #148: Initialized FedAvg gradient aggregator with Homomorphic Encryption.',
    '[10:14:03] Differential Privacy Gaussian mechanism applied (epsilon=0.38, delta=1e-6).',
    '[10:14:05] MetroHealth local gradient tensor weights received (SHA-256 verified).',
    '[10:14:06] Mayo Clinic encrypted gradient payload merged into global checkpoint.'
  ]);

  const totalEncounters = nodes.reduce((sum, n) => sum + n.localEncounters, 0);

  const handleRunAggregationRound = () => {
    setIsAggregating(true);
    const nextRound = currentRound + 1;

    setTimeout(() => {
      setCurrentRound(nextRound);
      setGlobalAuroc(prev => +(prev + 0.003).toFixed(4));
      setAggregationLog(prev => [
        `[${new Date().toLocaleTimeString()}] Round #${nextRound}: FedAvg consensus reached across 4 hospital nodes!`,
        `[${new Date().toLocaleTimeString()}] Secure Multi-Party Aggregation (SMPC) validated zero PHI egress.`,
        ...prev.slice(0, 4)
      ]);
      setIsAggregating(false);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }, 1200);
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Top Banner Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(14, 165, 233, 0.2))',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              padding: '6px 10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Network size={16} color="#06b6d4" />
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Innovation Module 05
              </span>
            </div>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              Zero-PHI Decentralized Protocol
            </span>
          </div>

          <h1 style={{
            fontSize: '1.9rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 6px 0',
            background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Federated Healthcare AI Network
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, maxWidth: '750px' }}>
            Collaborative machine learning across independent hospital systems. Model weights and clinical gradients 
            are aggregated with Differential Privacy and Secure Multi-Party Computation without moving raw patient records.
          </p>
        </div>

        {/* Global Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleRunAggregationRound}
            disabled={isAggregating}
            className="btn-primary"
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <RefreshCw size={16} className={isAggregating ? 'spin-slow' : ''} />
            <span>{isAggregating ? 'Executing Secure Aggregation Round...' : `Trigger Round #${currentRound + 1} Aggregation`}</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metrics Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '28px'
      }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            Global Model Checkpoint
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
            Cura-LLM-v4.2
          </div>
          <div style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 600 }}>
            Round #{currentRound} Synchronized
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            Cross-Institutional Cohort
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginBottom: '4px' }}>
            {totalEncounters.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Total encounters trained locally
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            Global Validation AUROC
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginBottom: '4px' }}>
            {globalAuroc}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
            +14.2% vs single-hospital baseline
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
            Differential Privacy Budget (ε)
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a855f7', marginBottom: '4px' }}>
            ε = 0.38
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Strict δ = 10⁻⁶ mathematical guarantee
          </div>
        </div>
      </div>

      {/* Main Grid: Participating Hospital Nodes + Cryptographic Privacy Architecture */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '24px' }}>
        
        {/* Left: Active Federated Hospital Nodes */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>
                Participating Hospital Compute Nodes
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                On-premise secure enclaves (SGX / Nitro) training local weights behind hospital firewalls.
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              color: '#34d399',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(16, 185, 129, 0.2)'
            }}>
              <Radio size={12} className="pulse" />
              <span>4 Nodes Live</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {nodes.map((node) => {
              const statusColor = 
                node.nodeStatus === 'online_training' ? '#10b981' :
                node.nodeStatus === 'validating' ? '#38bdf8' : '#f59e0b';

              return (
                <div key={node.id} style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'rgba(6, 182, 212, 0.15)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Building2 size={20} color="#06b6d4" />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#f8fafc' }}>
                          {node.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {node.location}
                        </div>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: `${statusColor}20`,
                      color: statusColor,
                      border: `1px solid ${statusColor}40`
                    }}>
                      {node.nodeStatus.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  {/* Node Metrics Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '8px',
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.74rem'
                  }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Local Cohort</div>
                      <div style={{ fontWeight: 700, color: '#f8fafc', marginTop: '2px' }}>{node.localEncounters.toLocaleString()}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Latency</div>
                      <div style={{ fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>{node.gradientLatencyMs} ms</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Privacy (ε)</div>
                      <div style={{ fontWeight: 700, color: '#a855f7', marginTop: '2px' }}>{node.privacyBudgetUsed}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>Accuracy</div>
                      <div style={{ fontWeight: 700, color: '#34d399', marginTop: '2px' }}>{node.localAccuracy}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Zero-PHI Privacy Telemetry & Aggregation Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Cryptographic Privacy Shield Card */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldCheck size={18} color="#10b981" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                Zero-PHI Cryptographic Safeguards
              </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Mathematical proof that no individual patient data is exposed or reconstructed.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', marginBottom: '2px' }}>
                  Differential Privacy (DP-SGD)
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  Gaussian noise calibrates tensor gradients such that presence of any single patient cannot be inferred by an adversary.
                </div>
              </div>

              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a855f7', marginBottom: '2px' }}>
                  Homomorphic Encryption (CKKS)
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  Server averages gradients directly over encrypted ciphertext without possessing the private decryption key.
                </div>
              </div>

              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399', marginBottom: '2px' }}>
                  HIPAA & BAA Institutional Boundary
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  Hospital firewalls remain intact; zero inbound open ports required. Outbound outbound-only gRPC TLS 1.3 tunnels.
                </div>
              </div>
            </div>
          </div>

          {/* Real-Time Aggregation Telemetry Log */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <FileCode size={16} color="#06b6d4" />
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: 0 }}>
                Federated Consensus Telemetry Log
              </h4>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              maxHeight: '180px',
              overflowY: 'auto',
              background: 'rgba(0, 0, 0, 0.35)',
              padding: '12px',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.7rem'
            }}>
              {aggregationLog.map((log, idx) => (
                <div key={idx} style={{ color: idx === 0 ? '#34d399' : '#94a3b8', lineHeight: '1.4' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
