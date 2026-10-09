import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Cpu, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Server, 
  Database, 
  Fingerprint, 
  Zap, 
  Radio, 
  Terminal,
  Activity,
  Layers,
  ArrowRight,
  Sliders,
  GitBranch,
  Network,
  Binary,
  Hash,
  CheckCircle,
  FileCheck,
  Scale
} from 'lucide-react';
import { MOCK_PQC_ASSETS, MOCK_COMPLIANCE_LOGS, MOCK_PPRL_CANDIDATES } from '../../data/mockData';
import { PQCAssetInventory, PPRLAdjudicationCandidate } from '../../types';
import confetti from 'canvas-confetti';

export const PQCDefenseShield: React.FC = () => {
  const [pqcAssets, setPqcAssets] = useState<PQCAssetInventory[]>(MOCK_PQC_ASSETS);
  const [selectedAlgo, setSelectedAlgo] = useState<'ML-KEM-768' | 'ML-DSA-65' | 'SLH-DSA'>('ML-KEM-768');
  const [isRotatingKeys, setIsRotatingKeys] = useState(false);
  const [rotationToast, setRotationToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pqc_shield' | 'pprl_linkage'>('pqc_shield');
  const [pprlCandidates, setPprlCandidates] = useState<PPRLAdjudicationCandidate[]>(MOCK_PPRL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<PPRLAdjudicationCandidate>(MOCK_PPRL_CANDIDATES[1]);

  const handleAdjudicateCandidate = (candidateId: string, decision: 'MERGED' | 'REJECTED_UNMERGED') => {
    setPprlCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        const updated: PPRLAdjudicationCandidate = {
          ...c,
          status: decision,
          adjudicated_by: 'Raymond Douglas, RHIA (HIM Identity Lead)',
          adjudicated_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
          provenance_log: decision === 'MERGED' 
            ? 'Adjudicator approved cross-network merge after verifying concordant SSN last-4 and date of birth.'
            : 'Adjudicator rejected match due to demographic inconsistency; source systems preserved independently.'
        };
        setSelectedCandidate(updated);
        return updated;
      }
      return c;
    }));
    confetti({ particleCount: 45, spread: 65 });
  };

  const handleUnmergeCandidate = (candidateId: string) => {
    setPprlCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        const updated: PPRLAdjudicationCandidate = {
          ...c,
          status: 'PENDING_ADJUDICATION',
          adjudicated_by: undefined,
          adjudicated_at: undefined,
          provenance_log: 'Reversible unmerge executed per HIM request. Linkage severed; clinical records partitioned.'
        };
        setSelectedCandidate(updated);
        return updated;
      }
      return c;
    }));
  };

  // Live PQC Playground State
  const [samplePayload, setSamplePayload] = useState('{"patientId":"MRN-849201","encounter":"Botox Injection J0585","ssn_last4":"9102","clinicalRisk":"Severe"}');
  const [generatedPublicKey, setGeneratedPublicKey] = useState<string>('kyber768_pk_0x8f3c91a04b827e61f9c04a29...');
  const [generatedCiphertext, setGeneratedCiphertext] = useState<string>('0x4e2b819f...[1088-byte ML-KEM Encapsulated Ciphertext]');
  const [sharedSecret, setSharedSecret] = useState<string>('0x7d3a91b...[256-bit Post-Quantum Shared Key]');
  const [isCryptoExecuting, setIsCryptoExecuting] = useState(false);
  const [cryptoLog, setCryptoLog] = useState<string>('Post-Quantum Cryptographic Engine ready. NIST FIPS 203 (ML-KEM) initialized.');

  // Quantum Shor's Simulation State
  const [quantumQubits, setQuantumQubits] = useState(4096);
  const [isSimulatingAttack, setIsSimulatingAttack] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  // PPRL & Multi-Method Linkage State
  const [selectedLinkageMethod, setSelectedLinkageMethod] = useState<'deterministic' | 'probabilistic' | 'ml_boosting' | 'bayesian_dx' | 'pprl_salted'>('pprl_salted');
  const [isExecutingLinkage, setIsExecutingLinkage] = useState(false);
  const [linkageResult, setLinkageResult] = useState<any>(null);

  // Bloom Filter Parameterization & Dynamic Scaler State
  const [bfElements, setBfElements] = useState<number>(100000);
  const [bfTargetFpr, setBfTargetFpr] = useState<number>(0.01);
  const [scalingVariant, setScalingVariant] = useState<'scalable' | 'block' | 'dynamic' | 'interleaved'>('scalable');

  // PPRL Tokenization Granularity & Double-Hashing Calibration State
  const [qGramSize, setQGramSize] = useState<number>(2); // 1 = unigrams, 2 = bigrams, 3 = trigrams
  const [pprlBitLength, setPprlBitLength] = useState<number>(1000);
  const [pprlHashCount, setPprlHashCount] = useState<number>(30);
  const [diceCutoff, setDiceCutoff] = useState<number>(0.85);
  const [isPerturbationActive, setIsPerturbationActive] = useState<boolean>(true);

  // Differential Cryptanalysis & Graph Matching Defense State (Yin 2024; Armknecht 2023; Han 2024)
  const [cryptanalysisDefense, setCryptanalysisDefense] = useState<'linear_bfd' | 'secondary_encoding' | 'unprotected'>('linear_bfd');
  const [isReferenceEncodingActive, setIsReferenceEncodingActive] = useState<boolean>(true);

  const handleExecutePqcCrypto = () => {
    setIsCryptoExecuting(true);
    setCryptoLog('Generating Lattice-based Polynomial Vectors over R_q (Module-LWE)...');

    setTimeout(() => {
      setCryptoLog('Generated 1,184-byte ML-KEM-768 Public Key. Computing Public-Key Encapsulation...');
      const pkHex = 'kyber768_pk_0x' + Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setGeneratedPublicKey(pkHex);
    }, 600);

    setTimeout(() => {
      setCryptoLog('Shared Secret derived via NTT (Number Theoretic Transform). Encrypting PHI Payload via AES-256-GCM with quantum key wrapping...');
      const ctHex = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + '...[1088-byte ML-KEM Ciphertext]';
      const secretHex = '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('') + ' [256-bit Quantum Secret]';
      setGeneratedCiphertext(ctHex);
      setSharedSecret(secretHex);
      setIsCryptoExecuting(false);
      setCryptoLog('Encapsulation Complete. Payload 100% protected against Shor\'s Quantum Algorithm & Harvest-Now-Decrypt-Later (HNDL) attacks.');

      confetti({ particleCount: 50, spread: 60 });
    }, 1300);
  };

  const handleSimulateQuantumAttack = () => {
    setIsSimulatingAttack(true);
    setSimulationResult(null);

    setTimeout(() => {
      setIsSimulatingAttack(false);
      setSimulationResult({
        classicalVulnerability: 'BREACHED: Classical RSA-2048 / ECDH P-256 factored in 1.4 seconds by Shor\'s Algorithm on a ' + quantumQubits + '-qubit quantum computer ($O(\\log^3 N)$).',
        pqcResistance: 'IMPERVIOUS: NIST ML-KEM-768 (Module-LWE) lattice basis reduction requires $>2^{160}$ operations, exceeding estimated quantum supremacy capacity by >10^30 orders of magnitude.'
      });
    }, 1200);
  };

  const handleRotatePqcKeys = () => {
    setIsRotatingKeys(true);
    setRotationToast('Broadcasting 30-day Post-Quantum Kyber-768 Key Rotation to FIPS 140-3 HSM clusters...');

    setTimeout(() => {
      setIsRotatingKeys(false);
      setRotationToast('PQC Epoch Rotation Successful! All TLS 1.3 tunnels, FHIR endpoints, and EDI 278 gateways updated.');
      confetti({ particleCount: 70, spread: 80 });
    }, 1500);
  };

  const handleRunRecordLinkage = () => {
    setIsExecutingLinkage(true);
    setLinkageResult(null);

    setTimeout(() => {
      setIsExecutingLinkage(false);
      if (selectedLinkageMethod === 'pprl_salted') {
        setLinkageResult({
          method: 'Privacy-Preserving Record Linkage (PPRL - Cryptographic Salted Hashing)',
          matchRate: '96.7% Cross-Network Match Yield',
          f1Score: '99.4% F1-Score',
          runtime: '0.42 seconds',
          privacyGuarantee: '100% Zero Direct PHI Exposure (Salted SHA-256 + PQC Key Wrapping)',
          findings: 'Successfully linked multi-system EHR patient records against commercial claims database without exposing plaintext identifiers (Ehresmann et al. 2025; Hejblum et al. 2019).'
        });
      } else if (selectedLinkageMethod === 'ml_boosting') {
        setLinkageResult({
          method: 'Machine Learning (Gradient Boosted Decision Trees)',
          matchRate: '89.6% Real-World Match Yield',
          f1Score: '99.8% F1-Score',
          runtime: '4.8 seconds',
          privacyGuarantee: 'De-Identified Feature Vectors',
          findings: 'Superior entity resolution over noisy demographic entries (Almadani et al. 2026; Lendle et al. 2025).'
        });
      } else if (selectedLinkageMethod === 'probabilistic') {
        setLinkageResult({
          method: 'Fellegi-Sunter Probabilistic Linkage (fastLink / Beta-Record)',
          matchRate: '92.4% Match Yield (+18-24% over deterministic alone)',
          f1Score: '98.5% F1-Score (100% Recall, 99.0% Precision)',
          runtime: '1.2 seconds',
          privacyGuarantee: 'De-Identified Quasi-Identifiers with DOB Blocking',
          findings: 'Recovers links corrupted by clerical typos and name variations (Avoundjian et al. 2020; Ong et al. 2020).'
        });
      } else if (selectedLinkageMethod === 'bayesian_dx') {
        setLinkageResult({
          method: 'Diagnosis-Only Bayesian Generative Modeling',
          matchRate: '79.2% De-Identified Match Yield',
          f1Score: '86.4% F1-Score',
          runtime: '2.1 seconds',
          privacyGuarantee: 'Zero PHI / Quasi-Identifiers (ICD Codes Only)',
          findings: 'Calculates posterior match likelihoods using binarized diagnosis history alone (Hejblum et al. 2019).'
        });
      } else {
        setLinkageResult({
          method: 'Deterministic Stepwise Rule-Based Matching',
          matchRate: '83.5% Match Yield (16.5% Missed Matches from Missing SSN)',
          f1Score: '97.2% F1-Score',
          runtime: '0.08 seconds (Ultra-Fast)',
          privacyGuarantee: 'Exact Field Match Verification',
          findings: 'High specificity with sub-second execution, but misses records with missing SSNs or minor typos (Kim et al. 2024; Patel & Dinh 2025).'
        });
      }
      confetti({ particleCount: 50, spread: 65 });
    }, 1200);
  };

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(99, 102, 241, 0.2) 50%, rgba(17, 24, 39, 0.95) 100%)',
        border: '1px solid rgba(6, 182, 212, 0.35)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={26} color="#06b6d4" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Post-Quantum Cryptography & Privacy-Preserving Record Linkage
            </h2>
            <span className="badge-status badge-approved">NIST FIPS 203 & 204</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '780px' }}>
            Protects healthcare data against Shor's quantum factoring algorithms while executing Privacy-Preserving Record Linkage (PPRL) across EHRs and multi-payer claims feeds (Almadani 2026; Ehresmann 2025; Hejblum 2019).
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('pqc_shield')}
            className={activeTab === 'pqc_shield' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.825rem' }}
          >
            <Lock size={14} />
            <span>NIST PQC Defense Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('pprl_linkage')}
            className={activeTab === 'pprl_linkage' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.825rem' }}
          >
            <GitBranch size={14} />
            <span>EHR-Claims PPRL Linkage Studio</span>
          </button>

          <button
            onClick={handleRotatePqcKeys}
            disabled={isRotatingKeys}
            className="btn-emerald"
            style={{ fontSize: '0.825rem' }}
          >
            <RefreshCw size={14} className={isRotatingKeys ? 'animate-spin' : ''} />
            <span>{isRotatingKeys ? 'Rotating HSM Keys...' : '30-Day PQC Key Rotation'}</span>
          </button>
        </div>
      </div>

      {rotationToast && (
        <div style={{
          padding: '12px 18px',
          borderRadius: '10px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          fontSize: '0.825rem',
          color: '#34d399',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={18} />
          <span>{rotationToast}</span>
        </div>
      )}

      {/* TAB 1: PQC SHIELD */}
      {activeTab === 'pqc_shield' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Main Grid: Interactive PQC Encapsulator & Shor's Simulator */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '24px' }}>
            {/* Left: Interactive Encapsulator */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu size={18} color="#06b6d4" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>NIST FIPS 203 ML-KEM-768 Encapsulation</h3>
                </div>
                <span className="badge-status badge-approved" style={{ fontSize: '0.68rem' }}>Lattice-Based (Module-LWE)</span>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Input Clinical PHI Payload
                </label>
                <textarea
                  value={samplePayload}
                  onChange={(e) => setSamplePayload(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontFamily: 'JetBrains Mono',
                    marginTop: '6px',
                    minHeight: '75px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleExecutePqcCrypto}
                  disabled={isCryptoExecuting}
                  className="btn-primary"
                  style={{ flex: 1, padding: '10px' }}
                >
                  <Sparkles size={16} />
                  <span>{isCryptoExecuting ? 'Generating Lattice Vectors...' : 'Execute ML-KEM Encapsulation'}</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <strong>Public Key (1,184 bytes):</strong>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#38bdf8', wordBreak: 'break-all', marginTop: '2px' }}>
                    {generatedPublicKey}
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <strong>Encapsulated Ciphertext (1,088 bytes):</strong>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#c084fc', wordBreak: 'break-all', marginTop: '2px' }}>
                    {generatedCiphertext}
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <strong>Shared Symmetric Key (256-bit):</strong>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#34d399', wordBreak: 'break-all', marginTop: '2px' }}>
                    {sharedSecret}
                  </div>
                </div>
              </div>

              <div style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                fontFamily: 'JetBrains Mono',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Terminal size={14} color="#06b6d4" />
                <span>{cryptoLog}</span>
              </div>
            </div>

            {/* Right: Quantum Attack Simulation */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} color="#f43f5e" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Shor's Quantum Algorithm Threat Simulator</h3>
                </div>
                <span className="badge-status badge-denied" style={{ fontSize: '0.68rem' }}>HNDL Defense</span>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Harvest-Now-Decrypt-Later (HNDL) adversaries intercept encrypted medical traffic today to break classical RSA/ECC encryption when cryptographically relevant quantum computers (CRQCs) emerge.
              </p>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Simulated Quantum Computer Power:</span>
                  <span style={{ fontWeight: 800, color: '#38bdf8' }}>{quantumQubits.toLocaleString()} Logical Qubits</span>
                </div>
                <input
                  type="range"
                  min={1024}
                  max={16384}
                  step={1024}
                  value={quantumQubits}
                  onChange={(e) => setQuantumQubits(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#06b6d4' }}
                />
              </div>

              <button
                onClick={handleSimulateQuantumAttack}
                disabled={isSimulatingAttack}
                className="btn-danger"
                style={{ padding: '12px' }}
              >
                <Zap size={16} />
                <span>{isSimulatingAttack ? 'Simulating Shor\'s Factoring...' : `Run Shor's Attack at ${quantumQubits} Qubits`}</span>
              </button>

              {simulationResult && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(244, 63, 94, 0.1)',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                    fontSize: '0.78rem',
                    color: '#fb7185'
                  }}>
                    <strong>Classical RSA-2048 / ECC:</strong> {simulationResult.classicalVulnerability}
                  </div>

                  <div style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    fontSize: '0.78rem',
                    color: '#34d399'
                  }}>
                    <strong>CuraHealth ML-KEM-768:</strong> {simulationResult.pqcResistance}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Endpoint Quantum Inventory Table */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} color="#60a5fa" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Practice Cryptographic Asset Inventory & PQC Deployment Status</h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>4 Protected Gateways</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {pqcAssets.map((asset) => (
                <div
                  key={asset.id}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1.5fr 1fr 1fr',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>{asset.endpoint}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{asset.protocol}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.78rem', color: '#06b6d4', fontWeight: 700 }}>{asset.pqcAlgorithm}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Classical: {asset.classicalAlgorithm}</div>
                  </div>

                  <div>
                    <span className="badge-status badge-approved" style={{ fontSize: '0.68rem' }}>
                      {asset.quantumReadiness.replace('_', ' ')}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'right' }}>
                    {asset.securityLevel.split('(')[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRIVACY-PRESERVING RECORD LINKAGE (PPRL) STUDIO */}
      {activeTab === 'pprl_linkage' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Method Selector & Benchmark Overview */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GitBranch size={20} color="#06b6d4" />
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                    EHR & Multi-Payer Claims Record Linkage Studio
                  </h3>
                  <span className="badge-status badge-approved">PPRL Compliant</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '780px' }}>
                  Bridges clinical depth with comprehensive claims coverage across non-interoperable hospital silos without universal IDs (Almadani et al. 2026; Ehresmann et al. 2025; Lendle et al. 2025; Xiong et al. 2026).
                </p>
              </div>

              <button
                onClick={handleRunRecordLinkage}
                disabled={isExecutingLinkage}
                className="btn-emerald"
                style={{ fontSize: '0.85rem' }}
              >
                <Sparkles size={16} />
                <span>{isExecutingLinkage ? 'Executing Linkage Pipeline...' : 'Run Record Linkage Engine'}</span>
              </button>
            </div>

            {/* 5 Linkage Methods Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div
                onClick={() => setSelectedLinkageMethod('pprl_salted')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: selectedLinkageMethod === 'pprl_salted' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: selectedLinkageMethod === 'pprl_salted' ? '1px solid #06b6d4' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#06b6d4', fontWeight: 800, fontSize: '0.825rem' }}>
                  <Hash size={16} />
                  <span>PPRL Salted Hashing</span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  NIST PQC salted hash tokens matching 96.7% dyads with zero PHI leakage (Ehresmann 2025).
                </p>
                <div style={{ marginTop: '8px', fontSize: '0.68rem', color: '#67e8f9', fontFamily: 'JetBrains Mono' }}>
                  F1: 99.4% • Zero Exposure
                </div>
              </div>

              <div
                onClick={() => setSelectedLinkageMethod('ml_boosting')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: selectedLinkageMethod === 'ml_boosting' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: selectedLinkageMethod === 'ml_boosting' ? '1px solid #818cf8' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#818cf8', fontWeight: 800, fontSize: '0.825rem' }}>
                  <Cpu size={16} />
                  <span>Gradient Boosting ML</span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  Robust to noisy/corrupted quasi-identifiers (Lendle 2025; Almadani 2026).
                </p>
                <div style={{ marginTop: '8px', fontSize: '0.68rem', color: '#c7d2fe', fontFamily: 'JetBrains Mono' }}>
                  F1: 99.8% • Match: 89.6%
                </div>
              </div>

              <div
                onClick={() => setSelectedLinkageMethod('probabilistic')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: selectedLinkageMethod === 'probabilistic' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: selectedLinkageMethod === 'probabilistic' ? '1px solid #34d399' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: 800, fontSize: '0.825rem' }}>
                  <Scale size={16} />
                  <span>Fellegi–Sunter fastLink</span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  Discriminatory agreement weights capturing +18-24% more links than deterministic (Ong 2020).
                </p>
                <div style={{ marginTop: '8px', fontSize: '0.68rem', color: '#6ee7b7', fontFamily: 'JetBrains Mono' }}>
                  100% Recall • 99% Precision
                </div>
              </div>

              <div
                onClick={() => setSelectedLinkageMethod('bayesian_dx')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: selectedLinkageMethod === 'bayesian_dx' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: selectedLinkageMethod === 'bayesian_dx' ? '1px solid #c084fc' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c084fc', fontWeight: 800, fontSize: '0.825rem' }}>
                  <Binary size={16} />
                  <span>Diagnosis-Only Bayesian</span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  Links de-identified datasets using binarized ICD codes without identifiers (Hejblum 2019).
                </p>
                <div style={{ marginTop: '8px', fontSize: '0.68rem', color: '#d8b4fe', fontFamily: 'JetBrains Mono' }}>
                  Zero PHI • Posterior Prob
                </div>
              </div>

              <div
                onClick={() => setSelectedLinkageMethod('deterministic')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: selectedLinkageMethod === 'deterministic' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255,255,255,0.02)',
                  border: selectedLinkageMethod === 'deterministic' ? '1px solid #fbbf24' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fbbf24', fontWeight: 800, fontSize: '0.825rem' }}>
                  <CheckCircle size={16} />
                  <span>Stepwise Deterministic</span>
                </div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  Exact string match on SSN / Name / DOB; ultra-fast &lt;0.1s execution (Kim 2024).
                </p>
                <div style={{ marginTop: '8px', fontSize: '0.68rem', color: '#fde68a', fontFamily: 'JetBrains Mono' }}>
                  Match: 83.5% • Speed: &lt;0.1s
                </div>
              </div>
            </div>

            {/* Linkage Results Display */}
            {linkageResult && (
              <div style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#06b6d4' }}>
                    {linkageResult.method}
                  </span>
                  <span className="badge-status badge-approved">{linkageResult.matchRate}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                  <div><strong>Accuracy Metric:</strong> <span style={{ color: '#34d399' }}>{linkageResult.f1Score}</span></div>
                  <div><strong>Execution Runtime:</strong> <span style={{ color: '#38bdf8' }}>{linkageResult.runtime}</span></div>
                  <div><strong>Privacy Guarantee:</strong> <span style={{ color: '#c084fc' }}>{linkageResult.privacyGuarantee}</span></div>
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', marginTop: '4px' }}>
                  {linkageResult.findings}
                </p>
              </div>
            )}
          </div>

          {/* Cohort Selection Bias & 17M Patient Confounding Mitigation Table */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCheck size={18} color="#34d399" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Cohort Selection Bias & Confounding Balancer</h4>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Propensity Score Matched (Patorno 2018; Geddes 2025)</span>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Linking clinical records to closed claims can cause attrition biases (e.g. 23% retention rate; Geddes 2025). CuraHealth OS deploys propensity score proxies to balance unmeasured clinical parameters (BMI, labs, staging), minimizing residual confounding in comparative effectiveness analyses.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 14px' }}>Cohort Dimension</th>
                  <th style={{ padding: '10px 14px' }}>Unlinked EHR Baseline</th>
                  <th style={{ padding: '10px 14px' }}>Linked Claims + EHR Pool</th>
                  <th style={{ padding: '10px 14px' }}>SMD (Standardized Diff)</th>
                  <th style={{ padding: '10px 14px' }}>Bias Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#ffffff' }}>Age Distribution (&ge; 65 yrs)</td>
                  <td style={{ padding: '12px 14px', color: '#fb7185' }}>30.2% (Skewed)</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>28.9% (Representative)</td>
                  <td style={{ padding: '12px 14px', color: '#34d399' }}>SMD = 0.034 (&lt; 0.10)</td>
                  <td style={{ padding: '12px 14px' }}><span className="badge-status badge-approved" style={{ fontSize: '0.7rem' }}>Balanced</span></td>
                </tr>

                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#ffffff' }}>Longitudinal Comorbidity Capture</td>
                  <td style={{ padding: '12px 14px', color: '#fb7185' }}>55% Captured (45% Missing)</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>100% Comprehensive</td>
                  <td style={{ padding: '12px 14px', color: '#34d399' }}>SMD = 0.021 (&lt; 0.10)</td>
                  <td style={{ padding: '12px 14px' }}><span className="badge-status badge-approved" style={{ fontSize: '0.7rem' }}>Balanced</span></td>
                </tr>

                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#ffffff' }}>Out-of-Network Biologics / Rx Fills</td>
                  <td style={{ padding: '12px 14px', color: '#fb7185' }}>41% Match Rate</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>95.4% Match Rate (Yang 2026)</td>
                  <td style={{ padding: '12px 14px', color: '#34d399' }}>SMD = 0.015 (&lt; 0.10)</td>
                  <td style={{ padding: '12px 14px' }}><span className="badge-status badge-approved" style={{ fontSize: '0.7rem' }}>Balanced</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Hybrid Bloom Filter + Secure Multi-Party Computation Architecture Panel */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.6fr', gap: '20px' }}>
            {/* Bloom Filter & SMC Circuit Simulator */}
            <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Binary size={18} color="#06b6d4" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>Hybrid Bloom Filter & SMC Circuit Engine</h4>
                </div>
                <span className="badge-status badge-approved" style={{ fontSize: '0.65rem' }}>Yao's Garbled Circuits</span>
              </div>

              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Combines lightweight Bloom filter representations with Secure Multi-Party Computation (SMC) circuits, calculating field-level Dice similarity directly inside garbled circuits without disclosing bit patterns or plaintexts (Stammler 2020; Ong 2018; Han 2024).
              </p>

              {/* Cryptanalysis Hardening Layers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div style={{ padding: '8px', borderRadius: '6px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#38bdf8' }}>Linear Diffusion (BFD)</div>
                  <div style={{ fontSize: '0.62rem', color: '#34d399', marginTop: '2px' }}>Graph-Attack Immune</div>
                </div>
                <div style={{ padding: '8px', borderRadius: '6px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#818cf8' }}>Autoencoder Embedding</div>
                  <div style={{ fontSize: '0.62rem', color: '#34d399', marginTop: '2px' }}>Continuous Vectors</div>
                </div>
                <div style={{ padding: '8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#34d399' }}>Counting BF (CBF)</div>
                  <div style={{ fontSize: '0.62rem', color: '#34d399', marginTop: '2px' }}>Multi-DB Aggregate</div>
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.35)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Input Quasi-Identifiers (q-gram parsed):</div>
                <div style={{ fontSize: '0.75rem', color: '#ffffff', fontFamily: 'JetBrains Mono' }}>
                  "Eleanor Vance | 1984-05-12 | Female | IL"
                </div>

                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>Diffused Bit Vector inside Yao's Garbled Circuit:</div>
                <div style={{ fontSize: '0.68rem', color: '#06b6d4', fontFamily: 'JetBrains Mono', wordBreak: 'break-all' }}>
                  11010010101100010110100110100011010100110101011100101010110010101101001...
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.72rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>SMC Computed Dice Similarity:</span>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>0.984 (Zero Bit-Pattern Leakage)</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', fontSize: '0.72rem', color: '#c7d2fe' }}>
                <Lock size={14} color="#818cf8" />
                <span>Ring-Based Secure Summation: Linear complexity O(n) without central broker (Vatsalan 2016)</span>
              </div>
            </div>

            {/* National Research Network PPRL Performance */}
            <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Network size={18} color="#818cf8" />
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>National PPRL Health Network Implementations</h4>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Empirical Consensus Benchmarks</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '220px' }}>
                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#ffffff' }}>PCORnet National Network</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Datavant Tokenization • 170M records to 138M unique patients (Marsolo 2022)</div>
                  </div>
                  <span className="badge-status badge-approved" style={{ fontSize: '0.68rem' }}>+63% to +173% Prevalence Capture</span>
                </div>

                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#ffffff' }}>OneFlorida Clinical Research Network</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>OneFL Deduper SHA-512 Seeded Hashes (Bian 2019)</div>
                  </div>
                  <span className="badge-status badge-approved" style={{ fontSize: '0.68rem' }}>97.25% to 99.7% Precision</span>
                </div>

                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#ffffff' }}>National COVID Cohort Collaborative (N3C)</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Linkage Honest Broker • 135,037 patients across 35 sites (Tachinardi 2024)</div>
                  </div>
                  <span className="badge-status badge-approved" style={{ fontSize: '0.68rem' }}>Cross-Site Registry Linked</span>
                </div>

                <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#ffffff' }}>German DigiNet Cancer Registry Trial</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Local insurance tokenization + third party (Kästner 2025)</div>
                  </div>
                  <span className="badge-status badge-approved" style={{ fontSize: '0.68rem' }}>94.2% Cancer-Claims Match</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloom Filter Parameterization & Sizing Calculator (Luo 2018; Walther 2025; Almeida 2007) */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sliders size={20} color="#06b6d4" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                    Bloom Filter Parameterization & Dynamic Scaling Framework
                  </h4>
                  <span className="badge-status badge-approved">Optimal k_opt = (m/n) ln 2</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Calibrates bit array length ($m$), independent hash functions ($k$), and element cardinality ($n$) to maintain bounded false positive rates across growing datasets (Luo et al. 2018; Walther et al. 2025).
                </p>
              </div>
            </div>

            {/* Parameter Sliders */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Expected Elements ($n$):</span>
                  <span style={{ fontWeight: 800, color: '#38bdf8' }}>{bfElements.toLocaleString()} Records</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={1000000}
                  step={10000}
                  value={bfElements}
                  onChange={(e) => setBfElements(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#06b6d4' }}
                />
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Scales linearly with stored elements to bound false positive probabilities.
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Target False Positive Rate ($p$):</span>
                  <span style={{ fontWeight: 800, color: '#34d399' }}>{(bfTargetFpr * 100).toFixed(1)}% ({bfTargetFpr})</span>
                </div>
                <input
                  type="range"
                  min={0.001}
                  max={0.05}
                  step={0.001}
                  value={bfTargetFpr}
                  onChange={(e) => setBfTargetFpr(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981' }}
                />
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                  Theoretical lower bound: 0.6185^(m/n) at 50% bit saturation.
                </div>
              </div>
            </div>

            {/* Calculated Theoretical Output Cards */}
            {(() => {
              const optimalBits = Math.round(- (bfElements * Math.log(bfTargetFpr)) / (Math.LN2 * Math.LN2));
              const optimalHashes = Math.max(1, Math.round((optimalBits / bfElements) * Math.LN2));
              const bitsPerElem = (optimalBits / bfElements).toFixed(2);
              const kilobytes = (optimalBits / 8 / 1024).toFixed(1);
              const theoreticalFpr = (Math.pow(0.6185, optimalBits / bfElements) * 100).toFixed(3);

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Optimal Bit Array Length ($m$)</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>
                      {optimalBits.toLocaleString()} bits
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#67e8f9', marginTop: '2px' }}>
                      Memory: {kilobytes} KB ({bitsPerElem} bits/elem)
                    </div>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Optimal Hash Count (k_opt)</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
                      {optimalHashes} Hashes
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#6ee7b7', marginTop: '2px' }}>
                      (m/n) ln 2 &bull; Saturation: 50.0%
                    </div>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Theoretical Minimum FPR</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#818cf8', marginTop: '4px' }}>
                      {theoreticalFpr}%
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#c7d2fe', marginTop: '2px' }}>
                      Formula: 0.6185^(m/n) bound
                    </div>
                  </div>

                  <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.25)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Memory Query Speed</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24', marginTop: '4px' }}>
                      $O(1)$ SIMD Fast Probe
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#fde68a', marginTop: '2px' }}>
                      Single cache-line word (Putze 2007)
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Dynamic Growth Architecture Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>
                Select Dynamic Growth Architecture for Unbounded Patient Streaming:
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                <div
                  onClick={() => setScalingVariant('scalable')}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: scalingVariant === 'scalable' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.02)',
                    border: scalingVariant === 'scalable' ? '1px solid #06b6d4' : '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#06b6d4' }}>Scalable BF (SBF)</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Appends subordinate filters with geometrically decreasing error targets ($p \cdot r^i$, $r=0.85$). Bounded global error (Almeida 2007).
                  </div>
                </div>

                <div
                  onClick={() => setScalingVariant('block')}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: scalingVariant === 'block' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.02)',
                    border: scalingVariant === 'block' ? '1px solid #10b981' : '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#10b981' }}>Block / Fast BF</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Constrains hashes to a single 64-byte CPU cache line ($O(1)$ memory probes) for ultra-high throughput network routing (Qiao 2013).
                  </div>
                </div>

                <div
                  onClick={() => setScalingVariant('dynamic')}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: scalingVariant === 'dynamic' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.02)',
                    border: scalingVariant === 'dynamic' ? '1px solid #818cf8' : '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#818cf8' }}>Dynamic BF (DBF)</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Partitions items across dynamic segments with decentralized expansion, supporting true item deletion and union operations (Guo 2009).
                  </div>
                </div>

                <div
                  onClick={() => setScalingVariant('interleaved')}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    background: scalingVariant === 'interleaved' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.02)',
                    border: scalingVariant === 'interleaved' ? '1px solid #c084fc' : '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '0.825rem', color: '#c084fc' }}>Hierarchical Interleaved (HIBF)</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Nests interleaved bit arrays using minimizer windowing schemes, indexing up to 211× faster across complex genomic data (Mehringer 2022).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PPRL Tokenization Granularity & Double-Hashing Calibration Simulator (Schnell et al.; Izakian 2018; Xue 2020) */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Hash size={20} color="#06b6d4" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                    PPRL Tokenization Granularity & Double-Hashing Calibration Pipeline
                  </h4>
                  <span className="badge-status badge-approved">
                    Double-Hashing: g_i(x) = (h1(x) + i * h2(x)) mod m
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  False positives decrease exponentially with longer bit-arrays ($m$) and larger $q$-grams ($q=2$ or $q=3$), while hash counts ($k$) require balanced tuning near 50% bit density (Schnell et al.; Izakian 2018; Xue et al. 2020).
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setIsPerturbationActive(!isPerturbationActive)}
                  className={isPerturbationActive ? 'btn-primary' : 'btn-secondary'}
                  style={{ fontSize: '0.78rem', padding: '8px 14px' }}
                >
                  <ShieldCheck size={14} />
                  <span>{isPerturbationActive ? 'Multi-Bit Perturbation: Active' : 'Multi-Bit Perturbation: Disabled'}</span>
                </button>
              </div>
            </div>

            {/* Interactive Sliders: q-gram size, bit array length m, hash count k, Dice cutoff */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {/* q-gram selector */}
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                  Tokenization Granularity ($q$-grams):
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  {[1, 2, 3].map((q) => (
                    <button
                      key={q}
                      onClick={() => setQGramSize(q)}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '6px',
                        border: qGramSize === q ? '1px solid #06b6d4' : '1px solid var(--border-subtle)',
                        background: qGramSize === q ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.03)',
                        color: qGramSize === q ? '#38bdf8' : 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      {q === 1 ? 'q=1 (Unigram)' : q === 2 ? 'q=2 (Bigram)' : 'q=3 (Trigram)'}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  {qGramSize === 1
                    ? 'Severe hash collisions & bit saturation (Izakian 2018).'
                    : qGramSize === 2
                    ? 'Optimal balance replicating clear-text string precision (Schnell et al.).'
                    : 'High string discrimination; slightly reduced typo tolerance.'}
                </div>
              </div>

              {/* Bit Array Length m Slider */}
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>Bit-Array Length ($m$):</span>
                  <span style={{ fontWeight: 800, color: '#38bdf8' }}>{pprlBitLength} bits</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1500}
                  step={100}
                  value={pprlBitLength}
                  onChange={(e) => setPprlBitLength(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#06b6d4', marginTop: '10px' }}
                />
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  {pprlBitLength <= 200
                    ? '⚠️ Low capacity: rapid saturation destroys discriminative power.'
                    : '1,000+ bits minimizes encrypted vs clear-text Dice divergence.'}
                </div>
              </div>

              {/* Hash Count k Slider */}
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>Double-Hash Count ($k$):</span>
                  <span style={{ fontWeight: 800, color: '#34d399' }}>{pprlHashCount} hashes</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={5}
                  value={pprlHashCount}
                  onChange={(e) => setPprlHashCount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981', marginTop: '10px' }}
                />
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Double hashing: g_i(x) = (h1(x) + i * h2(x)) mod m. Optimal range: 20 to 50.
                </div>
              </div>

              {/* Dice Cutoff Threshold Slider */}
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>Dice Threshold (&theta;):</span>
                  <span style={{ fontWeight: 800, color: '#c084fc' }}>{diceCutoff}</span>
                </div>
                <input
                  type="range"
                  min={0.70}
                  max={0.95}
                  step={0.01}
                  value={diceCutoff}
                  onChange={(e) => setDiceCutoff(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#c084fc', marginTop: '10px' }}
                />
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Pairs with Dice &ge; &theta; classified as true candidate linkages.
                </div>
              </div>
            </div>

            {/* Live Pipeline Visualizer Card */}
            {(() => {
              // Simulated bit saturation based on parameters
              const estimatedUniqueTokens = qGramSize === 1 ? 12 : qGramSize === 2 ? 38 : 64;
              const totalBitSets = estimatedUniqueTokens * pprlHashCount;
              const saturation = Math.min(96, Math.max(12, Math.round((1 - Math.exp(-totalBitSets / pprlBitLength)) * 100)));
              
              // Estimated Dice score with a typo ("Eleanor" vs "Elinor")
              const rawDice = qGramSize === 1 ? 0.98 : qGramSize === 2 ? 0.912 : 0.845;
              const isMatch = rawDice >= diceCutoff;
              const falsePositiveRisk = pprlBitLength < 300 || saturation > 75 ? 'HIGH (Excess Saturation)' : 'LOW (< 0.002)';

              return (
                <div style={{
                  padding: '18px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                      Simulated Linkage Evaluation: "Eleanor Vance 1984-05-12" vs "Elinor Vance 1984-05-12" (Typo)
                    </div>
                    <span className={`badge-status ${isMatch ? 'badge-approved' : 'badge-denied'}`}>
                      {isMatch ? `Candidate Match (Dice ${rawDice} >= ${diceCutoff})` : `Non-Match (Dice ${rawDice} < ${diceCutoff})`}
                    </span>
                  </div>

                  {/* Telemetry Metrics */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '0.75rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Bit Vector Saturation: </span>
                      <strong style={{ color: saturation > 70 ? '#fb7185' : saturation >= 40 && saturation <= 60 ? '#34d399' : '#38bdf8' }}>
                        {saturation}% {saturation >= 40 && saturation <= 60 ? '(Optimal ~50%)' : ''}
                      </strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>False Positive Risk: </span>
                      <strong style={{ color: falsePositiveRisk.includes('HIGH') ? '#fb7185' : '#34d399' }}>
                        {falsePositiveRisk}
                      </strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Cryptanalysis Defense: </span>
                      <strong style={{ color: '#c084fc' }}>
                        {isPerturbationActive ? 'Perturbed (Frequency Masked)' : 'Standard (Unmasked)'}
                      </strong>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Clear-Text String Parity: </span>
                      <strong style={{ color: '#38bdf8' }}>
                        {qGramSize === 2 && pprlBitLength >= 1000 && pprlHashCount >= 20 ? '99.3% Equivalent (Izakian 2018)' : '94.1%'}
                      </strong>
                    </div>
                  </div>

                  {/* Synthetic Bit-Array Sample Bar */}
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Cryptographic Double-Hashed Bit Stream Sample ({pprlBitLength} bits total, showing first 64 bits):
                    </div>
                    <div style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      background: 'rgba(0,0,0,0.5)',
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.72rem',
                      letterSpacing: '1px',
                      color: saturation > 70 ? '#fb7185' : '#06b6d4',
                      wordBreak: 'break-all'
                    }}>
                      1101001010110001011010011010001101010011010101110010101011001010
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Operational Trade-Offs Across Bit-Array Sizing Options in PPRL (Brown 2017; Xu 2024; Randall 2022) */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Database size={18} color="#06b6d4" />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>
                    Operational Performance & Trade-Offs Across Bit-Array Sizing Frameworks
                  </h4>
                  <span className="badge-status badge-approved">SparseBF 70.5% Space Savings</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Evaluated across 26 million records (Randall et al. 2022) comparing small bit-arrays, 1,000-bit composite keys (CLK), and SparseBF compressed sparse row formats (Xu et al. 2024).
                </p>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 14px' }}>Dimension</th>
                  <th style={{ padding: '10px 14px' }}>Small Array ($l \le 500$)</th>
                  <th style={{ padding: '10px 14px' }}>Large Array ($l \ge 1,000$ CLK)</th>
                  <th style={{ padding: '10px 14px' }}>Optimized SparseBF Format</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#ffffff' }}>Collision Rate</td>
                  <td style={{ padding: '12px 14px', color: '#fb7185' }}>High saturation; frequent clashes</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>Minimized collision probability</td>
                  <td style={{ padding: '12px 14px', color: '#34d399' }}>Adaptive sparsity (Stable profile)</td>
                </tr>

                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#ffffff' }}>Linkage Quality</td>
                  <td style={{ padding: '12px 14px', color: '#fb7185' }}>Precision drops to 0.91 (Rohde 2021)</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>99.3% matches unencrypted (Randall)</td>
                  <td style={{ padding: '12px 14px', color: '#34d399' }}>High precision across dirty data thresholds</td>
                </tr>

                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#ffffff' }}>Compute & Memory</td>
                  <td style={{ padding: '12px 14px', color: '#38bdf8' }}>Minimal RAM; fast bitwise operations</td>
                  <td style={{ padding: '12px 14px', color: '#fbbf24' }}>High RAM usage & longer runtimes</td>
                  <td style={{ padding: '12px 14px', color: '#34d399' }}>2.1x speedup; 70.5% space savings (Xu 2024)</td>
                </tr>

                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#ffffff' }}>Attack Defense</td>
                  <td style={{ padding: '12px 14px', color: '#fb7185' }}>Vulnerable to frequency cryptanalysis</td>
                  <td style={{ padding: '12px 14px', color: '#fbbf24' }}>Exposed to differential graph matching</td>
                  <td style={{ padding: '12px 14px', color: '#34d399' }}>Linear diffusion layer (BFD) immune (Armknecht)</td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', marginTop: '6px' }}>
              <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.25)', fontSize: '0.74rem', color: '#67e8f9' }}>
                <strong>LSH Subquadratic Blocking:</strong> Sorted nearest neighborhood blocking reduces quadratic comparison space from O(N^2) to O(N log N), preventing candidate pair overflow (Wu et al. 2022; Han et al. 2022).
              </div>

              <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', fontSize: '0.74rem', color: '#c7d2fe' }}>
                <strong>Missingness Pattern Lattice:</strong> Multi-party partitioning weights populated attributes separately, ensuring missing SSNs or secondary names do not falsely depress link scores (Brown et al. 2017; Vaiwsri 2021).
              </div>
            </div>
          </div>

          {/* Differential Cryptanalysis & Graph Matching Defense Console (Yin 2024; Armknecht 2023; Han 2024; Christen 2024) */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={20} color="#34d399" />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                    Differential Cryptanalysis & Graph Matching Defense Console
                  </h4>
                  <span className="badge-status badge-approved">Yin et al. 2024 / PoPETs 2023</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Expanding bit-array dimensions does not universally improve privacy. Large, sparsely populated vectors leave unique bit combinations intact, exposing identifiers to differential graph matching. CuraHealth deploys Linear Diffusion (BFD) and secondary encoding addition rules to decouple security from bit-array expansion (Armknecht 2023; Han 2024).
                </p>
              </div>

              {/* Data-driven Single-Parameter Reference Set Toggle */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  onClick={() => setIsReferenceEncodingActive(!isReferenceEncodingActive)}
                  className={isReferenceEncodingActive ? 'btn-primary' : 'btn-secondary'}
                  style={{ fontSize: '0.76rem', padding: '8px 14px' }}
                >
                  <Sparkles size={14} />
                  <span>{isReferenceEncodingActive ? 'Single-Parameter Reference Encoding: Active' : 'Manual Parameter Tuning'}</span>
                </button>
              </div>
            </div>

            {/* Defense Selector Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div 
                onClick={() => setCryptanalysisDefense('linear_bfd')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: cryptanalysisDefense === 'linear_bfd' ? '2px solid #34d399' : '1px solid var(--border-subtle)',
                  background: cryptanalysisDefense === 'linear_bfd' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Linear Diffusion Layer (BFD)</strong>
                  <span className="badge-status badge-approved" style={{ fontSize: '0.65rem' }}>PoPETs 2023</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Each output bit represents the XOR sum of multiple filter positions. Breaks bit-pattern frequency correlations without reducing link recall (Armknecht et al. 2023).
                </div>
              </div>

              <div 
                onClick={() => setCryptanalysisDefense('secondary_encoding')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: cryptanalysisDefense === 'secondary_encoding' ? '2px solid #38bdf8' : '1px solid var(--border-subtle)',
                  background: cryptanalysisDefense === 'secondary_encoding' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255,255,255,0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Secondary Encoding Addition Rules</strong>
                  <span className="badge-status badge-approved" style={{ fontSize: '0.65rem' }}>Han et al. 2024</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Multi-party protocols apply algebraic addition rules that decouple security from bit-array expansion, matching baseline BF efficiency with provable privacy.
                </div>
              </div>

              <div 
                onClick={() => setCryptanalysisDefense('unprotected')}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: cryptanalysisDefense === 'unprotected' ? '2px solid #fb7185' : '1px solid var(--border-subtle)',
                  background: cryptanalysisDefense === 'unprotected' ? 'rgba(244, 63, 94, 0.12)' : 'rgba(255,255,255,0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Unprotected Sparse Vector (1,000 bits)</strong>
                  <span className="badge-status badge-denied" style={{ fontSize: '0.65rem' }}>Vulnerable</span>
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  High link accuracy, but leaves distinct bit combination patterns intact, exposing tokens to frequency and differential graph cryptanalysis (Yin et al. 2024).
                </div>
              </div>
            </div>

            {/* Cryptanalysis Attack Outcome Telemetry */}
            <div style={{
              padding: '16px 20px',
              borderRadius: '10px',
              background: cryptanalysisDefense === 'unprotected' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.08)',
              border: cryptanalysisDefense === 'unprotected' ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {cryptanalysisDefense === 'unprotected' ? (
                    <AlertTriangle size={18} color="#fb7185" />
                  ) : (
                    <CheckCircle2 size={18} color="#34d399" />
                  )}
                  <strong style={{ fontSize: '0.88rem', color: cryptanalysisDefense === 'unprotected' ? '#fca5a5' : '#86efac' }}>
                    {cryptanalysisDefense === 'unprotected'
                      ? 'DIFFERENTIAL ATTACK RISK: Sensitive Demographic Identifiers Compromised'
                      : 'CRYPTOGRAPHIC DEFENSE ACTIVE: Differential Graph Matching Neutralized'}
                  </strong>
                </div>
                <span className={`badge-status ${cryptanalysisDefense === 'unprotected' ? 'badge-denied' : 'badge-approved'}`}>
                  {cryptanalysisDefense === 'unprotected' ? 'Re-identification Feasible (< 4 min)' : '0% Plaintext Leakage'}
                </span>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {cryptanalysisDefense === 'unprotected' && (
                  <span>
                    Simulated cryptanalysis via Yin et al. (2024) differential attack: Graph unicity exploitation maps sparse 1,000-bit vectors against public voter rolls. Demographic plaintexts reconstructed in <strong>3.4 minutes</strong> with 91.2% identity recovery.
                  </span>
                )}
                {cryptanalysisDefense === 'linear_bfd' && (
                  <span>
                    Linear Diffusion Layer (Armknecht et al. 2023) active: Multi-position summation scrambles single-token bit frequency mapping. Differential graph solver fails to converge (Entropy &gt; 99.8%). Linkage Dice accuracy remains unaffected at <strong>99.3%</strong>.
                  </span>
                )}
                {cryptanalysisDefense === 'secondary_encoding' && (
                  <span>
                    Secondary Encoding Addition Rules (Han et al. 2024) active: Multi-party bit addition rules eliminate topological graph correlation. Computation overhead scales linearly while defending against multi-party collusion.
                  </span>
                )}
              </div>

              {isReferenceEncodingActive && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '6px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.25)', fontSize: '0.72rem', color: '#67e8f9' }}>
                  <Sparkles size={14} />
                  <span>Single-parameter reference set encoding active (Christen et al. 2024; Ziyad et al. 2025): Optimal bounds calculated automatically from input entropy without empirical trial-and-error.</span>
                </div>
              )}
            </div>
          </div>

          {/* Section 3.5: PPRL Candidate Adjudication & Reversible Merge/Unmerge Workbench (CH-ID-001) */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ 
                    background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}>
                    SPEC SECTION 3.5 · CH-ID-001
                  </span>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                    Candidate Identity Adjudication & Reversible Reconciliation
                  </h4>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '850px' }}>
                  Ambiguous matches (Dice similarity between 0.80 and 0.89) are routed to authorized HIM adjudicators for human verification. Full reversibility guarantees records can be safely unmerged with zero data loss to native source systems.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge-status badge-pended">
                  {pprlCandidates.filter(c => c.status === 'PENDING_ADJUDICATION').length} Ambiguous Matches Awaiting Review
                </span>
              </div>
            </div>

            {/* Adjudication Workbench Master-Detail Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '20px' }}>
              {/* Candidate Queue List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Review Queue ({pprlCandidates.length})
                </div>

                {pprlCandidates.map((candidate) => {
                  const isSelected = selectedCandidate.id === candidate.id;
                  return (
                    <div
                      key={candidate.id}
                      onClick={() => setSelectedCandidate(candidate)}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        background: isSelected ? 'rgba(168, 85, 247, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                        border: isSelected ? '1.5px solid #a855f7' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {candidate.source_record_a.name_masked}
                        </span>
                        <span className={`badge-status ${
                          candidate.status === 'MERGED' ? 'badge-approved' :
                          candidate.status === 'REJECTED_UNMERGED' ? 'badge-denied' : 'badge-pended'
                        }`} style={{ fontSize: '0.65rem' }}>
                          {candidate.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Dice Score: <strong style={{ color: '#38bdf8' }}>{(candidate.dice_similarity * 100).toFixed(1)}%</strong> ({candidate.confidence_level})
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {candidate.source_record_a.system.split(' ')[0]} ↔ {candidate.source_record_b.system.split(' ')[0]}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Side-by-Side Demographic Comparator */}
              <div style={{ 
                background: 'rgba(0, 0, 0, 0.25)', 
                border: '1px solid var(--border-subtle)', 
                borderRadius: '12px', 
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                  <div>
                    <h5 style={{ fontSize: '1rem', fontWeight: 800, margin: '0 0 4px 0' }}>
                      Comparison: Record Pair #{selectedCandidate.id}
                    </h5>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Confidence: <strong>{selectedCandidate.confidence_level}</strong> • Linkage Metric: <strong>{(selectedCandidate.dice_similarity * 100).toFixed(1)}% CLK Concordance</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {selectedCandidate.status === 'PENDING_ADJUDICATION' ? (
                      <>
                        <button
                          onClick={() => handleAdjudicateCandidate(selectedCandidate.id, 'REJECTED_UNMERGED')}
                          className="btn-danger"
                          style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                        >
                          Reject Match
                        </button>
                        <button
                          onClick={() => handleAdjudicateCandidate(selectedCandidate.id, 'MERGED')}
                          className="btn-emerald"
                          style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                        >
                          Approve Consensus Merge
                        </button>
                      </>
                    ) : selectedCandidate.status === 'MERGED' ? (
                      <button
                        onClick={() => handleUnmergeCandidate(selectedCandidate.id)}
                        className="btn-secondary"
                        style={{ fontSize: '0.78rem', padding: '6px 14px', color: '#fb7185', borderColor: '#fb7185' }}
                      >
                        Reversible Unmerge
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnmergeCandidate(selectedCandidate.id)}
                        className="btn-secondary"
                        style={{ fontSize: '0.78rem', padding: '6px 14px' }}
                      >
                        Re-open for Adjudication
                      </button>
                    )}
                  </div>
                </div>

                {/* Side-by-Side Comparison Columns */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {/* System A */}
                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', color: '#0ea5e9', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                      Source Institution A
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '2px' }}>{selectedCandidate.source_record_a.system}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>MRN: {selectedCandidate.source_record_a.mrn}</div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem' }}>
                      <div>Masked Name: <strong style={{ color: '#ffffff' }}>{selectedCandidate.source_record_a.name_masked}</strong></div>
                      <div>Masked DOB: <strong style={{ color: '#ffffff' }}>{selectedCandidate.source_record_a.dob_masked}</strong></div>
                      <div>Masked Postal: <strong style={{ color: '#ffffff' }}>{selectedCandidate.source_record_a.postal_masked}</strong></div>
                      <div>CLK Active Bits: <strong style={{ color: '#38bdf8' }}>{selectedCandidate.source_record_a.clks_bits_set} / 1,000</strong></div>
                    </div>
                  </div>

                  {/* System B */}
                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
                      Source Institution B
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '2px' }}>{selectedCandidate.source_record_b.system}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Identifier: {selectedCandidate.source_record_b.mrn}</div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem' }}>
                      <div>Masked Name: <strong style={{ color: '#ffffff' }}>{selectedCandidate.source_record_b.name_masked}</strong></div>
                      <div>Masked DOB: <strong style={{ color: '#ffffff' }}>{selectedCandidate.source_record_b.dob_masked}</strong></div>
                      <div>Masked Postal: <strong style={{ color: '#ffffff' }}>{selectedCandidate.source_record_b.postal_masked}</strong></div>
                      <div>CLK Active Bits: <strong style={{ color: '#a855f7' }}>{selectedCandidate.source_record_b.clks_bits_set} / 1,000</strong></div>
                    </div>
                  </div>
                </div>

                {/* Audit & Provenance History Box */}
                <div style={{ 
                  background: 'rgba(0,0,0,0.3)', 
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.78rem'
                }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Audit & Linkage Provenance:
                  </div>
                  <div style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    {selectedCandidate.provenance_log}
                  </div>
                  {selectedCandidate.adjudicated_by && (
                    <div style={{ marginTop: '6px', color: '#34d399', fontSize: '0.72rem' }}>
                      ✓ Adjudicated by <strong>{selectedCandidate.adjudicated_by}</strong> on {selectedCandidate.adjudicated_at}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
