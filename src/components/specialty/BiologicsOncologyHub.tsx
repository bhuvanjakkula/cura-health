import React, { useState } from 'react';
import { 
  Dna, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Clock, 
  Send, 
  FileText, 
  ShieldCheck, 
  TrendingDown, 
  Zap,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SpecialtyTherapyItem {
  id: string;
  drugName: string;
  category: 'Oncology Immunotherapy' | 'Dermatology Biologic' | 'Bleeding Disorder' | 'Neurology Biologic';
  patientName: string;
  patientMrn: string;
  payor: string;
  monthlyCost: number;
  adminTimeHours: number;
  costRatioPercent: number;
  status: 'approved' | 'pended_step_therapy' | 'submitting';
  stepTherapyCriteria: string[];
  clinicalTrialRef: string;
}

const MOCK_SPECIALTY_THERAPIES: SpecialtyTherapyItem[] = [
  {
    id: 'spec_1',
    drugName: 'Dupilumab (Dupixent) 300mg/2mL',
    category: 'Dermatology Biologic',
    patientName: 'Devon Montgomery',
    patientMrn: 'MRN-934812',
    payor: 'Cigna Healthcare',
    monthlyCost: 3890,
    adminTimeHours: 6.4,
    costRatioPercent: 106,
    status: 'pended_step_therapy',
    stepTherapyCriteria: [
      'Documented failure of topical corticosteroids (Triamcinolone 0.1%) for ≥90 days',
      'Documented trial of topical calcineurin inhibitor (Tacrolimus 0.1%)',
      'Body Surface Area (BSA) involvement ≥10% or EASI score ≥16'
    ],
    clinicalTrialRef: 'SOLO 1 & 2 Phase-III Trials (NEJM); Carlisle et al. 2020 Formularies'
  },
  {
    id: 'spec_2',
    drugName: 'Pembrolizumab (Keytruda) 200mg IV',
    category: 'Oncology Immunotherapy',
    patientName: 'Marcus Holloway',
    patientMrn: 'MRN-723910',
    payor: 'UnitedHealthcare',
    monthlyCost: 11400,
    adminTimeHours: 8.2,
    costRatioPercent: 92,
    status: 'approved',
    stepTherapyCriteria: [
      'PD-L1 Expression CPS ≥ 1 confirmed by CLIA-certified pathology',
      'Mismatch Repair Deficient (dMMR) / MSI-H genomic profiling confirmed',
      'Tumor Board review consensus documented (Bhardwaj et al., 2024)'
    ],
    clinicalTrialRef: 'KEYNOTE-048 & KEYNOTE-177 Multicenter Protocols'
  },
  {
    id: 'spec_3',
    drugName: 'Emicizumab-kxwh (Hemlibra) 150mg/mL',
    category: 'Bleeding Disorder',
    patientName: 'Clara Jenkins',
    patientMrn: 'MRN-610482',
    payor: 'Aetna Medicare Advantage',
    monthlyCost: 24500,
    adminTimeHours: 7.1,
    costRatioPercent: 98,
    status: 'pended_step_therapy',
    stepTherapyCriteria: [
      'Documented severe Factor VIII deficiency (<1% baseline)',
      'High bleeding frequency (>4 breakthrough bleeds/year despite on-demand factor)',
      'Littner et al. 2026 Bleeding Disorder Clinical Pathway satisfied'
    ],
    clinicalTrialRef: 'HAVEN 1-4 Phase-III Studies (Lancet / Haemophilia 2026)'
  }
];

export const BiologicsOncologyHub: React.FC = () => {
  const [specialties, setSpecialties] = useState<SpecialtyTherapyItem[]>(MOCK_SPECIALTY_THERAPIES);
  const [selectedTherapy, setSelectedTherapy] = useState<SpecialtyTherapyItem | null>(specialties[0]);
  const [toast, setToast] = useState<string | null>(null);

  const handle1ClickFastTrack = (item: SpecialtyTherapyItem) => {
    setSpecialties(prev => prev.map(s => s.id === item.id ? { ...s, status: 'approved', costRatioPercent: 8 } : s));
    setSelectedTherapy({ ...item, status: 'approved', costRatioPercent: 8 });
    setToast('Specialty prior auth for ' + item.drugName + ' auto-approved! Administrative overhead reduced from 106% to <8%.');
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(17, 24, 39, 0.95) 100%)',
        border: '1px solid rgba(244, 63, 94, 0.35)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Specialty Biologics & Oncology Fast-Track Hub</h2>
            <span className="badge-status badge-approved" style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#fb7185', borderColor: '#fb7185' }}>
              <Dna size={13} />
              Carlisle & Bhardwaj Protocol
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Combats the reality where prior authorizations cost <strong>up to 106% of Medicare reimbursement</strong> (Carlisle et al., 2020) and consumes <strong>over 6 hours weekly</strong> (Bhardwaj et al., 2024; Littner et al., 2026) using automated clinical pathways and standardized electronic formularies.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Overhead Ratio Reduction</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
            106% &rarr; 7.8%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Over 92% administrative cost eliminated</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Weekly Staff Hours Saved</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
            6.2 Hours / Wk
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Across oncology & biologic specialists</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>First-Pass Biologic Approvals</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
            96.2%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Zero step-therapy omissions</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Specialty Therapy Value</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24', marginTop: '4px' }}>
            $39,790 / Mo
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Active patient therapies secured</div>
        </div>
      </div>

      {/* Toast Feedback */}
      {toast && (
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
          <span>{toast}</span>
        </div>
      )}

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.7fr', gap: '24px' }}>
        {/* Left: Therapies List */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            High-Cost Specialty Therapies ({specialties.length})
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {specialties.map((item) => {
              const isSelected = selectedTherapy?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedTherapy(item)}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid #fb7185' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ffffff' }}>{item.drugName}</span>
                    <span className={`badge-status ${item.status === 'approved' ? 'badge-approved' : 'badge-pended'}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Patient: <strong>{item.patientName}</strong> &bull; {item.payor}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span>Cost: ${item.monthlyCost.toLocaleString()}/mo</span>
                    <span style={{ color: item.costRatioPercent > 50 ? '#fb7185' : '#34d399', fontWeight: 700 }}>
                      Admin Overhead: {item.costRatioPercent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Step-Therapy Matrix & 1-Click Fast-Track Approval */}
        {selectedTherapy ? (
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{selectedTherapy.drugName}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {selectedTherapy.category} &bull; Patient: {selectedTherapy.patientName} ({selectedTherapy.patientMrn})
                </div>
              </div>

              {selectedTherapy.status !== 'approved' && (
                <button
                  onClick={() => handle1ClickFastTrack(selectedTherapy)}
                  className="btn-primary"
                  style={{ fontSize: '0.8rem' }}
                >
                  <Zap size={14} />
                  <span>1-Click Formularies Fast-Track</span>
                </button>
              )}
            </div>

            {/* Step Therapy Criteria Card */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Standardized Electronic Formulary & Step-Therapy Checklist
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedTherapy.stepTherapyCriteria.map((crit, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    fontSize: '0.8rem'
                  }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>{crit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Evidence Citation */}
            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', marginBottom: '4px' }}>
                Peer-Reviewed Evidence & Registry Guideline Basis:
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {selectedTherapy.clinicalTrialRef}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
