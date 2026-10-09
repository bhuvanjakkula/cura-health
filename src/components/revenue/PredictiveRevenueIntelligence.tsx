import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
  Zap,
  BarChart3,
  Calendar,
  Layers,
  ChevronRight,
  Building2,
  Receipt,
  FileCheck2,
  Percent,
  Search,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PayerRiskProfile {
  payerName: string;
  payerId: string;
  riskScore: number; // 0-100
  historicalDenialRate: number;
  aiScrubbedDenialRate: number;
  avgTurnaroundDays: number;
  monthlyClaimVolume: string;
  commonFrictionReason: string;
  recommendedMitigation: string;
}

const PAYER_PROFILES: PayerRiskProfile[] = [
  {
    payerName: 'UnitedHealthcare Commercial',
    payerId: 'PAY-UHC-01',
    riskScore: 78,
    historicalDenialRate: 14.8,
    aiScrubbedDenialRate: 1.2,
    avgTurnaroundDays: 22,
    monthlyClaimVolume: '$184,200',
    commonFrictionReason: 'Aggressive algorithmic bundling of E&M (99214/99215) with minor procedures.',
    recommendedMitigation: 'Enforce Modifier 25 with distinct ICD-10 organ system cross-linkage.'
  },
  {
    payerName: 'Anthem Blue Cross Blue Shield',
    payerId: 'PAY-BCBS-02',
    riskScore: 62,
    historicalDenialRate: 11.4,
    aiScrubbedDenialRate: 0.9,
    avgTurnaroundDays: 16,
    monthlyClaimVolume: '$240,500',
    commonFrictionReason: 'Biologics & Specialty infusion prior auth lapse within 180-day cycle.',
    recommendedMitigation: 'Trigger autonomous renewal pipeline 45 days prior to expiration.'
  },
  {
    payerName: 'Aetna / CVS Health',
    payerId: 'PAY-AET-03',
    riskScore: 54,
    historicalDenialRate: 9.8,
    aiScrubbedDenialRate: 0.7,
    avgTurnaroundDays: 14,
    monthlyClaimVolume: '$112,000',
    commonFrictionReason: 'Demands secondary clinical documentation for high-complexity imaging (MRI/CT).',
    recommendedMitigation: 'Attach Section 4.1 atomized clinical evidence PDF directly to electronic 837P.'
  },
  {
    payerName: 'Cigna Healthcare',
    payerId: 'PAY-CIG-04',
    riskScore: 48,
    historicalDenialRate: 8.2,
    aiScrubbedDenialRate: 0.6,
    avgTurnaroundDays: 12,
    monthlyClaimVolume: '$96,400',
    commonFrictionReason: 'Strict medical necessity review on physical medicine modalities (CPT 97110).',
    recommendedMitigation: 'Include objective functional deficit scale (Oswestry/NDI) in claim attachment.'
  }
];

interface AtRiskClaim {
  id: string;
  patient: string;
  cpt: string;
  description: string;
  amount: number;
  expectedReimbursement: number;
  payer: string;
  riskFactor: string;
  preventativeFix: string;
  status: 'at_risk' | 'remediated';
}

const INITIAL_AT_RISK_CLAIMS: AtRiskClaim[] = [
  {
    id: 'CLM-8812',
    patient: 'Eleanor Vance',
    cpt: '99215 + 93000',
    description: 'Level 5 E&M + Routine 12-Lead EKG',
    amount: 320,
    expectedReimbursement: 248.50,
    payer: 'UnitedHealthcare Commercial',
    riskFactor: 'Missing Modifier 25 on E&M when billed same day as EKG',
    preventativeFix: 'Append Modifier 25 with distinct hypertension diagnosis',
    status: 'at_risk'
  },
  {
    id: 'CLM-8813',
    patient: 'Marcus Chen',
    cpt: 'J0256',
    description: 'Alpha-1 Proteinase Inhibitor Infusion (1000mg)',
    amount: 4250,
    expectedReimbursement: 3820.00,
    payer: 'Anthem BCBS',
    riskFactor: 'Prior authorization authorization reference token expired 3 days ago',
    preventativeFix: 'Link newly approved PA #AUTH-90281 from Section 4.1 evidence engine',
    status: 'at_risk'
  },
  {
    id: 'CLM-8814',
    patient: 'Sofia Rodriguez',
    cpt: '70553',
    description: 'MRI Brain with and without Contrast',
    amount: 1480,
    expectedReimbursement: 980.00,
    payer: 'Aetna / CVS Health',
    riskFactor: 'Payer rule requires documented trial of conservative migraine therapy',
    preventativeFix: 'Attach extracted evidence proving Topiramate & Propranolol trial failures',
    status: 'at_risk'
  },
  {
    id: 'CLM-8815',
    patient: 'David Kim',
    cpt: '99214',
    description: 'Office Visit (Detailed Complexity)',
    amount: 210,
    expectedReimbursement: 162.00,
    payer: 'Cigna Healthcare',
    riskFactor: 'Downcoding risk: documentation qualifies for 99215 under 2026 MDM rules',
    preventativeFix: 'Upgrade to 99215 (+$52.40 revenue optimization) based on high-risk med management',
    status: 'at_risk'
  }
];

export const PredictiveRevenueIntelligence: React.FC = () => {
  const [claimsList, setClaimsList] = useState<AtRiskClaim[]>(INITIAL_AT_RISK_CLAIMS);
  const [selectedPayer, setSelectedPayer] = useState<PayerRiskProfile>(PAYER_PROFILES[0]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'at_risk' | 'remediated'>('all');
  const [isRemediatingAll, setIsRemediatingAll] = useState(false);

  const atRiskCount = claimsList.filter(c => c.status === 'at_risk').length;
  const remediatedCount = claimsList.filter(c => c.status === 'remediated').length;
  const totalProtectedValue = claimsList
    .filter(c => c.status === 'remediated')
    .reduce((sum, c) => sum + c.expectedReimbursement, 0);

  const handleRemediateSingle = (id: string) => {
    setClaimsList(prev => prev.map(c => c.id === id ? { ...c, status: 'remediated' } : c));
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.7 } });
  };

  const handleRemediateAll = () => {
    setIsRemediatingAll(true);
    setTimeout(() => {
      setClaimsList(prev => prev.map(c => ({ ...c, status: 'remediated' })));
      setIsRemediatingAll(false);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    }, 800);
  };

  const filteredClaims = claimsList.filter(c => {
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header Banner */}
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
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(14, 165, 233, 0.2))',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              padding: '6px 10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <DollarSign size={16} color="#34d399" />
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Innovation Module 03
              </span>
            </div>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}>
              Predictive Denial Defense
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
            Predictive Revenue Intelligence
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, maxWidth: '750px' }}>
            Real-time forecasting of claim denial risks, contract allowable variance, and 90-day cash velocity. 
            Pre-empts revenue leakage before electronic EDI 837 transmission.
          </p>
        </div>

        {/* Global Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {atRiskCount > 0 ? (
            <button
              onClick={handleRemediateAll}
              disabled={isRemediatingAll}
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
              <Zap size={16} />
              <span>{isRemediatingAll ? 'Autonomous Scrubbing Running...' : `Scrub & Protect All ${atRiskCount} Claims`}</span>
            </button>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              padding: '10px 16px',
              borderRadius: '10px',
              color: '#34d399',
              fontSize: '0.85rem',
              fontWeight: 700
            }}>
              <CheckCircle2 size={18} />
              <span>All Claims Shielded (100% Clean)</span>
            </div>
          )}
        </div>
      </div>

      {/* Top 4 KPI Metrics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '28px'
      }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Pre-submission Clean Rate</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              color: '#10b981',
              fontWeight: 700
            }}>
              <ArrowUpRight size={14} /> +24.4% vs Nat Avg
            </span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
            98.6%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Benchmark: 74.2% industry average
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Monthly Revenue Protected</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              color: '#10b981',
              fontWeight: 700
            }}>
              <ShieldAlert size={14} /> Recovered
            </span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', marginBottom: '4px' }}>
            ${(totalProtectedValue + 42300).toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            From unbundled CPTs & downcoded notes
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Days in A/R (Accounts Receivable)</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              color: '#10b981',
              fontWeight: 700
            }}>
              <ArrowDownRight size={14} /> -25.2 Days
            </span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginBottom: '4px' }}>
            14.2 Days
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Prior baseline: 39.4 days
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>90-Day Cash Flow Velocity</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.72rem',
              color: '#818cf8',
              fontWeight: 700
            }}>
              <Clock size={14} /> Real-Time
            </span>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
            $632,900
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Projected collections next 90 days
          </div>
        </div>
      </div>

      {/* Main Grid: At-Risk Claims Scrubber + Payer Behavioral Intelligence */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        
        {/* Left: Pre-submission At-Risk Claims Queue */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>
                Pre-submission At-Risk Claims Queue
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Claims detected with high denial propensity prior to clearinghouse transmission.
              </p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['all', 'at_risk', 'remediated'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: filterStatus === tab ? 'rgba(14, 165, 233, 0.2)' : 'transparent',
                    color: filterStatus === tab ? '#38bdf8' : 'var(--text-muted)',
                    border: filterStatus === tab ? '1px solid rgba(14, 165, 233, 0.4)' : '1px solid transparent'
                  }}
                >
                  {tab === 'all' ? 'All Claims' : tab === 'at_risk' ? `At Risk (${atRiskCount})` : `Remediated (${remediatedCount})`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredClaims.map((claim) => {
              const isRemediated = claim.status === 'remediated';
              return (
                <div key={claim.id} style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: isRemediated ? 'rgba(16, 185, 129, 0.04)' : 'rgba(244, 63, 94, 0.04)',
                  border: isRemediated ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(244, 63, 94, 0.25)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc' }}>{claim.patient}</span>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                          {claim.id}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 600 }}>
                          {claim.cpt}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {claim.description} • {claim.payer}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: isRemediated ? '#34d399' : '#f43f5e' }}>
                        ${claim.expectedReimbursement.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        Billed: ${claim.amount}
                      </div>
                    </div>
                  </div>

                  {/* Risk Factor Banner */}
                  <div style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: isRemediated ? 'rgba(16, 185, 129, 0.08)' : 'rgba(0, 0, 0, 0.25)',
                    fontSize: '0.74rem',
                    color: isRemediated ? '#34d399' : '#fb7185',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {isRemediated ? <CheckCircle2 size={14} color="#10b981" /> : <AlertTriangle size={14} color="#f43f5e" />}
                    <span>{isRemediated ? `Autonomous Fix Applied: ${claim.preventativeFix}` : claim.riskFactor}</span>
                  </div>

                  {/* Actions */}
                  {!isRemediated && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                      <button
                        onClick={() => handleRemediateSingle(claim.id)}
                        className="btn-secondary"
                        style={{
                          padding: '6px 12px',
                          fontSize: '0.74rem',
                          borderRadius: '6px',
                          background: 'rgba(14, 165, 233, 0.15)',
                          color: '#38bdf8',
                          borderColor: 'rgba(14, 165, 233, 0.3)'
                        }}
                      >
                        <Zap size={12} style={{ marginRight: '4px' }} />
                        Apply Auto-Fix
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Payer Behavioral Risk Profiles & Cash Flow Velocity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Payer Risk Profiles */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Building2 size={18} color="#0ea5e9" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                Payer Behavioral Denial Profiles
              </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Machine learning models trained on 140,000+ clearinghouse adjudication outcomes.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
              {PAYER_PROFILES.map((p) => {
                const isSelected = selectedPayer.payerId === p.payerId;
                return (
                  <button
                    key={p.payerId}
                    onClick={() => setSelectedPayer(p)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(14, 165, 233, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                      border: isSelected ? '1px solid #0ea5e9' : '1px solid var(--border-subtle)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
                        {p.payerName}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Volume: {p.monthlyClaimVolume}/mo • Turnaround: {p.avgTurnaroundDays}d
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: p.riskScore > 70 ? '#f43f5e' : '#f59e0b' }}>
                        Risk: {p.riskScore}/100
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#10b981' }}>
                        AI Denial: {p.aiScrubbedDenialRate}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Payer Details */}
            <div style={{
              padding: '14px',
              borderRadius: '10px',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', marginBottom: '6px' }}>
                Algorithmic Friction Strategy: {selectedPayer.payerName}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#cbd5e1', marginBottom: '8px' }}>
                {selectedPayer.commonFrictionReason}
              </div>
              <div style={{
                fontSize: '0.72rem',
                color: '#34d399',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <strong>CuraHealth Automated Protocol:</strong> {selectedPayer.recommendedMitigation}
              </div>
            </div>
          </div>

          {/* 90-Day Cash Collection Forecast */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Calendar size={18} color="#818cf8" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                90-Day Cash Flow Inflow Projection
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>0-30 Days</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399', margin: '4px 0' }}>$410,200</div>
                <div style={{ fontSize: '0.65rem', color: '#10b981' }}>High Confidence (96%)</div>
              </div>

              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>31-60 Days</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', margin: '4px 0' }}>$158,400</div>
                <div style={{ fontSize: '0.65rem', color: '#0ea5e9' }}>Medium Confidence (88%)</div>
              </div>

              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>61-90 Days</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#818cf8', margin: '4px 0' }}>$64,300</div>
                <div style={{ fontSize: '0.65rem', color: '#818cf8' }}>Appeals & Recoups</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
