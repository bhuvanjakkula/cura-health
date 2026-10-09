import React, { useState } from 'react';
import {
  Activity,
  Heart,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Sliders,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight,
  ShieldAlert,
  Zap,
  RefreshCw,
  Layers,
  ChevronRight,
  Pill,
  BarChart3,
  Dna,
  Users,
  Download,
  Check,
  X,
  Stethoscope,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PatientProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  mrn: string;
  diagnoses: string[];
  currentMeds: string[];
  allergies: string[];
  geneticMarkers: string;
  longitudinalDensity: string;
  trialEvidence: string;
  biomarkers: {
    name: string;
    unit: string;
    current: number;
    baseline: number;
    target: string;
    status: 'optimal' | 'warning' | 'critical';
    trend: 'up' | 'down' | 'stable';
    clinicalImplication: string;
    history: { date: string; value: number }[];
  }[];
  organScores: {
    cardiovascular: number; // 0-100
    renal: number;
    metabolic: number;
    hepatic: number;
    immunologic: number;
  };
  polypharmacyRisks: {
    severity: 'high' | 'moderate' | 'low';
    interaction: string;
    recommendation: string;
    actionLabel?: string;
    actionType?: 'run_sim' | 'order_lab' | 'schedule_dexa';
    simId?: string;
  }[];
}

const PATIENTS: PatientProfile[] = [
  {
    id: 'pt_001',
    name: 'Eleanor Vance',
    age: 64,
    gender: 'Female',
    mrn: 'MRN-78921',
    diagnoses: ['Type 2 Diabetes with Diabetic Nephropathy (E11.21)', 'Stage 3b Chronic Kidney Disease (N18.32)', 'Essential Hypertension (I10)'],
    currentMeds: ['Metformin 500mg BID', 'Lisinopril 20mg Daily', 'Atorvastatin 40mg Daily', 'Furosemide 20mg Daily'],
    allergies: ['Sulfa Drugs (Anaphylaxis)', 'Codeine (Nausea)'],
    geneticMarkers: 'CYP2C19 *2 (Poor Metabolizer), APOL1 G1/G2 Risk Allele',
    longitudinalDensity: '18 Mos / 42 Labs',
    trialEvidence: '98.2% ADA / KDIGO 2026 Concordance',
    organScores: {
      cardiovascular: 74,
      renal: 46,
      metabolic: 58,
      hepatic: 89,
      immunologic: 82
    },
    biomarkers: [
      {
        name: 'eGFR',
        unit: 'mL/min/1.73m²',
        current: 38,
        baseline: 52,
        target: '> 60 mL/min/1.73m²',
        status: 'critical',
        trend: 'down',
        clinicalImplication: 'Stage 3b CKD; rapid filtration decline exceeds -3.5 mL/yr threshold.',
        history: [
          { date: '18m ago', value: 52 },
          { date: '12m ago', value: 48 },
          { date: '6m ago', value: 43 },
          { date: 'Current', value: 38 }
        ]
      },
      {
        name: 'HbA1c',
        unit: '%',
        current: 8.6,
        baseline: 7.4,
        target: '< 7.0 %',
        status: 'warning',
        trend: 'up',
        clinicalImplication: 'Suboptimal glycemic control accelerating microvascular glomerular injury.',
        history: [
          { date: '18m ago', value: 7.4 },
          { date: '12m ago', value: 7.8 },
          { date: '6m ago', value: 8.1 },
          { date: 'Current', value: 8.6 }
        ]
      },
      {
        name: 'Urine Albumin/Creatinine (uACR)',
        unit: 'mg/g',
        current: 412,
        baseline: 180,
        target: '< 30 mg/g',
        status: 'critical',
        trend: 'up',
        clinicalImplication: 'Severely increased macroalbuminuria; hallmark of podocyte effacement.',
        history: [
          { date: '18m ago', value: 180 },
          { date: '12m ago', value: 240 },
          { date: '6m ago', value: 310 },
          { date: 'Current', value: 412 }
        ]
      },
      {
        name: 'Systolic BP',
        unit: 'mmHg',
        current: 146,
        baseline: 132,
        target: '< 130 mmHg',
        status: 'warning',
        trend: 'up',
        clinicalImplication: 'Intraglomerular hypertension driving hyperfiltration injury.',
        history: [
          { date: '18m ago', value: 132 },
          { date: '12m ago', value: 138 },
          { date: '6m ago', value: 142 },
          { date: 'Current', value: 146 }
        ]
      }
    ],
    polypharmacyRisks: [
      {
        severity: 'high',
        interaction: 'Metformin + declining eGFR (<40 mL/min)',
        recommendation: 'Risk of lactic acidosis. Titrate metformin downward or discontinue per ADA/KDIGO 2026 guidelines.',
        actionLabel: 'Switch to SGLT2 Simulation',
        actionType: 'run_sim',
        simId: 'sim_sglt2'
      },
      {
        severity: 'moderate',
        interaction: 'Lisinopril + Furosemide hypovolemia risk',
        recommendation: 'Monitor serum potassium and creatinine within 14 days of titration to prevent acute prerenal azotemia.',
        actionLabel: 'Order Chemistry Lab Panel',
        actionType: 'order_lab'
      }
    ]
  },
  {
    id: 'pt_002',
    name: 'Marcus Chen',
    age: 49,
    gender: 'Male',
    mrn: 'MRN-44210',
    diagnoses: ['Moderate-to-Severe Ulcerative Colitis (K51.00)', 'Primary Sclerosing Cholangitis (K83.01)'],
    currentMeds: ['Mesalamine 4.8g Daily', 'Prednisone 20mg Taper', 'Ursodiol 300mg TID'],
    allergies: ['Penicillin (Hives)'],
    geneticMarkers: 'HLA-B27 Positive, TPMT *1/*1 (Normal Metabolizer)',
    longitudinalDensity: '24 Mos / 56 Labs',
    trialEvidence: '96.8% ACG / AGA 2026 Guidelines Concordance',
    organScores: {
      cardiovascular: 88,
      renal: 92,
      metabolic: 85,
      hepatic: 62,
      immunologic: 41
    },
    biomarkers: [
      {
        name: 'Fecal Calprotectin',
        unit: 'mcg/g',
        current: 680,
        baseline: 140,
        target: '< 100 mcg/g',
        status: 'critical',
        trend: 'up',
        clinicalImplication: 'Severe mucosal neutrophil degranulation; refractory flare under 5-ASA therapy.',
        history: [
          { date: '18m ago', value: 140 },
          { date: '12m ago', value: 260 },
          { date: '6m ago', value: 450 },
          { date: 'Current', value: 680 }
        ]
      },
      {
        name: 'Alkaline Phosphatase',
        unit: 'U/L',
        current: 245,
        baseline: 120,
        target: '< 130 U/L',
        status: 'warning',
        trend: 'up',
        clinicalImplication: 'Intrahepatic cholestasis associated with Primary Sclerosing Cholangitis.',
        history: [
          { date: '18m ago', value: 120 },
          { date: '12m ago', value: 165 },
          { date: '6m ago', value: 210 },
          { date: 'Current', value: 245 }
        ]
      },
      {
        name: 'High-Sensitivity CRP',
        unit: 'mg/L',
        current: 18.4,
        baseline: 3.2,
        target: '< 3.0 mg/L',
        status: 'critical',
        trend: 'up',
        clinicalImplication: 'Systemic inflammation elevation predicting clinical loss of response.',
        history: [
          { date: '18m ago', value: 3.2 },
          { date: '12m ago', value: 6.8 },
          { date: '6m ago', value: 12.1 },
          { date: 'Current', value: 18.4 }
        ]
      }
    ],
    polypharmacyRisks: [
      {
        severity: 'high',
        interaction: 'Prolonged steroid exposure (>90 days prednisone)',
        recommendation: 'Bone density scan (DEXA) indicated. Accelerate biologic step-up therapy (IL-23 or anti-TNF).',
        actionLabel: 'Accelerate Biologic Step-Up (IL-23 / Anti-TNF)',
        actionType: 'run_sim',
        simId: 'sim_il23'
      },
      {
        severity: 'moderate',
        interaction: 'Corticosteroid osteopenia monitoring & axial fragility',
        recommendation: 'Baseline DEXA axial bone density scan and serum 25-OH Vitamin D indicated per AGA guidelines.',
        actionLabel: 'Schedule DEXA Bone Scan',
        actionType: 'schedule_dexa'
      }
    ]
  }
];

interface SimulationScenario {
  id: string;
  title: string;
  intervention: string;
  rationale: string;
  projectedOutcomes: {
    metric: string;
    projectedDelta: string;
    confidence: number;
    clinicalImpact: string;
  }[];
  costAvoidance: string;
}

const SIMULATION_PRESETS: Record<string, SimulationScenario[]> = {
  pt_001: [
    {
      id: 'sim_sglt2',
      title: 'Add SGLT2 Inhibitor (Dapagliflozin 10mg)',
      intervention: 'Initiate Dapagliflozin 10mg daily + discontinue Metformin due to eGFR <40 threshold.',
      rationale: 'DAPA-CKD & EMPA-KIDNEY landmark trials show significant attenuation of eGFR decline slope and 31% reduction in renal mortality.',
      projectedOutcomes: [
        { metric: 'eGFR Trajectory (12 Mo)', projectedDelta: '+4.2 mL/min slope stabilization', confidence: 94, clinicalImpact: 'Prevents Stage 5 ESRD transition for 4.8 years' },
        { metric: 'uACR Albuminuria', projectedDelta: '-34% reduction (to ~270 mg/g)', confidence: 91, clinicalImpact: 'Reverses microvascular capillary stress' },
        { metric: 'Systolic BP', projectedDelta: '-4 to -6 mmHg osmotic reduction', confidence: 89, clinicalImpact: 'Optimizes target BP <130 mmHg without extra diuretic' },
        { metric: 'HbA1c', projectedDelta: '-0.7% glycemic improvement', confidence: 88, clinicalImpact: 'Brings HbA1c to 7.9% without hypoglycemia risk' }
      ],
      costAvoidance: '$48,200/yr (Avoids acute dialysis access & emergent inpatient visits)'
    },
    {
      id: 'sim_glp1_finerenone',
      title: 'Add Non-Steroidal MRA (Finerenone 10mg)',
      intervention: 'Add Finerenone 10mg daily under FIDELIO-DKD evidence guidelines.',
      rationale: 'Selective mineralocorticoid receptor antagonism targets inflammatory and fibrotic renal pathways independently of hemodynamic pressure.',
      projectedOutcomes: [
        { metric: 'Composite Renal Event', projectedDelta: '-22% risk reduction', confidence: 92, clinicalImpact: 'Halts glomerular podocyte loss' },
        { metric: 'Cardiovascular Hospitalization', projectedDelta: '-18% risk reduction', confidence: 87, clinicalImpact: 'Prevents HFpEF progression' }
      ],
      costAvoidance: '$31,500/yr (Avoids congestive heart failure readmissions)'
    }
  ],
  pt_002: [
    {
      id: 'sim_il23',
      title: 'Step Up to IL-23 Inhibitor (Mirikizumab / Risankizumab)',
      intervention: 'Steroid-sparing induction therapy with selective IL-23 p19 inhibitor.',
      rationale: 'Failed oral 5-ASA with steroid dependency. LUCENT clinical trial demonstrates 65% endoscopic response at week 12.',
      projectedOutcomes: [
        { metric: 'Fecal Calprotectin', projectedDelta: '-72% reduction to <150 mcg/g', confidence: 89, clinicalImpact: 'Achieves deep endoscopic mucosal healing' },
        { metric: 'Steroid Taper Success', projectedDelta: '100% complete withdrawal at 8 wks', confidence: 95, clinicalImpact: 'Eliminates adrenal suppression & osteopenia risk' }
      ],
      costAvoidance: '$64,000/yr (Avoids emergency colectomy and inpatient admissions)'
    },
    {
      id: 'sim_antitnf',
      title: 'Initiate Anti-TNF (Infliximab Biosimilar 5mg/kg)',
      intervention: 'Weight-based biologic induction at weeks 0, 2, and 6.',
      rationale: 'Rapid induction of remission in moderate-to-severe UC with verified TPMT normal metabolizer status.',
      projectedOutcomes: [
        { metric: 'Mucosal Healing Rate', projectedDelta: '+58% response at 8 weeks', confidence: 86, clinicalImpact: 'Rapid clinical remission' },
        { metric: 'CRP Normalization', projectedDelta: '-65% reduction (to <5 mg/L)', confidence: 92, clinicalImpact: 'Systemic inflammation resolution' }
      ],
      costAvoidance: '$41,200/yr'
    }
  ]
};

export const PatientDigitalTwin: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile>(PATIENTS[0]);
  const [activeSimulation, setActiveSimulation] = useState<SimulationScenario | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationApplied, setSimulationApplied] = useState(false);
  const [isPacketAttached, setIsPacketAttached] = useState(false);
  const [timeHorizon, setTimeHorizon] = useState<'6m' | '12m' | '24m'>('12m');
  const [selectedBiomarkerDetail, setSelectedBiomarkerDetail] = useState<any | null>(null);
  const [actionToast, setActionToast] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleRunSimulation = (sim: SimulationScenario) => {
    setIsSimulating(true);
    setActiveSimulation(sim);
    setSimulationApplied(false);
    setIsPacketAttached(false);

    setTimeout(() => {
      setIsSimulating(false);
      setSimulationApplied(true);
      setActionToast(`Simulation Converged: ${sim.title} applied with ${timeHorizon.toUpperCase()} horizon!`);
      confetti({ particleCount: 45, spread: 65, origin: { y: 0.6 } });
    }, 850);
  };

  const handleActionClick = (risk: PatientProfile['polypharmacyRisks'][0]) => {
    if (risk.actionType === 'run_sim' && risk.simId) {
      const targetSim = (SIMULATION_PRESETS[selectedPatient.id] || []).find(s => s.id === risk.simId);
      if (targetSim) {
        handleRunSimulation(targetSim);
        return;
      }
    }

    if (risk.actionType === 'order_lab') {
      setActionToast(`Order Placed: Serum Comprehensive Metabolic Panel (K+, BUN, Cr) routed to LabCorp/Quest.`);
      confetti({ particleCount: 35, spread: 50 });
      return;
    }

    if (risk.actionType === 'schedule_dexa') {
      setActionToast(`Order Placed: Dual-Energy X-ray Absorptiometry (DEXA) scheduled with Imaging.`);
      confetti({ particleCount: 35, spread: 50 });
      return;
    }

    setActionToast(`Clinical action acknowledged: ${risk.recommendation}`);
  };

  const handleExportDigitalTwin = () => {
    setIsExporting(true);
    setActionToast('Compiling HL7 FHIR R4 Biomarker Bundle & PDF Digital Twin Synthesis...');

    setTimeout(() => {
      setIsExporting(false);
      setActionToast(`Digital Twin Dossier for ${selectedPatient.name} (${selectedPatient.mrn}) exported successfully!`);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    }, 1200);
  };

  const patientSimulations = SIMULATION_PRESETS[selectedPatient.id] || [];

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto', color: 'var(--text-primary)' }}>
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
              background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(99, 102, 241, 0.2))',
              border: '1px solid rgba(14, 165, 233, 0.4)',
              padding: '6px 10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Dna size={16} color="#38bdf8" />
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Innovation Module 02
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
              Active Longitudinal Model
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
            Patient Digital Twin Intelligence
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, maxWidth: '750px' }}>
            Longitudinal biophysical simulation combining multi-year clinical encounters, lab biomarker kinetics, 
            and pharmacogenomic pathways to predict trajectory before irreversible organ damage occurs.
          </p>
        </div>

        {/* Action Controls & Patient Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleExportDigitalTwin}
            disabled={isExporting}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Download size={14} />
            <span>{isExporting ? 'Generating FHIR Bundle...' : 'Export Twin Synthesis'}</span>
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            padding: '6px 10px',
            borderRadius: '12px'
          }}>
            <Users size={16} color="#94a3b8" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Cohort Twin:</span>
            {PATIENTS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPatient(p);
                  setActiveSimulation(null);
                  setSimulationApplied(false);
                  setIsPacketAttached(false);
                  setSelectedBiomarkerDetail(null);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: selectedPatient.id === p.id ? '1px solid #38bdf8' : '1px solid transparent',
                  background: selectedPatient.id === p.id ? 'rgba(14, 165, 233, 0.2)' : 'transparent',
                  color: selectedPatient.id === p.id ? '#38bdf8' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {p.name} ({p.age}y)
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Action Toast */}
      {actionToast && (
        <div style={{
          padding: '12px 18px',
          borderRadius: '10px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          fontSize: '0.825rem',
          color: '#34d399',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} />
            <span style={{ fontWeight: 600 }}>{actionToast}</span>
          </div>
          <button
            onClick={() => setActionToast(null)}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Patient Dossier Bar */}
      <div className="glass-panel" style={{
        padding: '18px 24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        borderLeft: '4px solid #0ea5e9'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.1rem',
            color: '#fff'
          }}>
            {selectedPatient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{selectedPatient.name}</h2>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                {selectedPatient.mrn}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {selectedPatient.age} yo • {selectedPatient.gender}
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {selectedPatient.diagnoses.join(' • ')}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Medications
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f1f5f9' }}>
              {selectedPatient.currentMeds.length} Prescriptions Active
            </div>
          </div>
          <div style={{ height: '32px', width: '1px', background: 'var(--border-subtle)' }} />
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Allergies & Contraindications
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f43f5e' }}>
              {selectedPatient.allergies.join(', ')}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Organ Health + Longitudinal Biomarkers + Simulation Engine */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
        
        {/* Left Column: Physiological Radar & Biomarker Trajectories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Organ Resilience Radar / Scores */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} color="#0ea5e9" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                  Organ System Physiological Resilience Index
                </h3>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Scale: 0-100 (Clinical Reserve Capacity)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
              {[
                { name: 'Cardiovascular', score: selectedPatient.organScores.cardiovascular, color: '#38bdf8' },
                { name: 'Renal Reserve', score: selectedPatient.organScores.renal, color: selectedPatient.organScores.renal < 50 ? '#f43f5e' : '#f59e0b' },
                { name: 'Metabolic Stability', score: selectedPatient.organScores.metabolic, color: '#fbbf24' },
                { name: 'Hepatic Clearance', score: selectedPatient.organScores.hepatic, color: '#10b981' },
                { name: 'Immunologic Reserve', score: selectedPatient.organScores.immunologic, color: '#818cf8' }
              ].map((org) => (
                <div key={org.name} style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-subtle)',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }}>
                    {org.name}
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: org.color, marginBottom: '6px' }}>
                    {org.score}
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/100</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${org.score}%`, height: '100%', background: org.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Longitudinal Biomarkers Matrix */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 4px 0' }}>
                  Biomarker Trajectory & Longitudinal Velocity
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                  Historical 18-month laboratory results correlated with multi-year clinical encounter notes. Click a card to inspect trajectory details.
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.72rem',
                color: '#38bdf8',
                background: 'rgba(14, 165, 233, 0.1)',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(14, 165, 233, 0.2)'
              }}>
                <Clock size={14} />
                <span>Synchronized with HL7 FHIR R4</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {selectedPatient.biomarkers.map((bio) => {
                const isCrit = bio.status === 'critical';
                const isWarn = bio.status === 'warning';
                const statusColor = isCrit ? '#f43f5e' : isWarn ? '#f59e0b' : '#10b981';
                const isSelected = selectedBiomarkerDetail?.name === bio.name;

                return (
                  <div
                    key={bio.name}
                    onClick={() => setSelectedBiomarkerDetail(bio)}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(14, 165, 233, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      border: isSelected ? '2px solid #38bdf8' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                          {bio.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          Unit: {bio.unit} • Target: {bio.target}
                        </div>
                      </div>
                      <span style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: `${statusColor}20`,
                        color: statusColor,
                        border: `1px solid ${statusColor}40`
                      }}>
                        {bio.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Current vs Baseline */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '1.6rem', fontWeight: 800, color: statusColor }}>
                        {bio.current}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Baseline: {bio.baseline} {bio.unit}
                      </span>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: bio.trend === 'down' ? '#f43f5e' : '#f59e0b',
                        marginLeft: 'auto'
                      }}>
                        {bio.trend === 'down' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                        {bio.trend === 'down' ? 'Decline' : 'Elevation'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '10px', lineHeight: 1.35 }}>
                      {bio.clinicalImplication}
                    </div>

                    {/* Timeline History Dots */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(0, 0, 0, 0.25)',
                      padding: '8px 12px',
                      borderRadius: '8px'
                    }}>
                      {bio.history.map((pt, idx) => (
                        <div key={idx} style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{pt.date}</div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: idx === bio.history.length - 1 ? statusColor : '#cbd5e1' }}>
                            {pt.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Polypharmacy & Drug Safety Matrix */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <ShieldAlert size={18} color="#f59e0b" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                Polypharmacy & Kinetic Drug-Disease Warnings
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedPatient.polypharmacyRisks.map((risk, idx) => (
                <div key={idx} style={{
                  padding: '14px 16px',
                  borderRadius: '10px',
                  background: risk.severity === 'high' ? 'rgba(244, 63, 94, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                  border: `1px solid ${risk.severity === 'high' ? 'rgba(244, 63, 94, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '14px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: '280px' }}>
                    <AlertTriangle size={18} color={risk.severity === 'high' ? '#f43f5e' : '#f59e0b'} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
                        {risk.interaction}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {risk.recommendation}
                      </div>
                    </div>
                  </div>

                  {risk.actionLabel && (
                    <button
                      onClick={() => handleActionClick(risk)}
                      className="btn-secondary"
                      style={{
                        padding: '6px 12px',
                        fontSize: '0.74rem',
                        borderRadius: '6px',
                        whiteSpace: 'nowrap',
                        borderColor: risk.severity === 'high' ? '#f43f5e' : '#f59e0b',
                        color: risk.severity === 'high' ? '#fb7185' : '#fbbf24',
                        background: 'rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <Zap size={12} style={{ marginRight: '4px' }} />
                      <span>{risk.actionLabel}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Intervention Simulator & Clinical Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="glass-panel" style={{
            padding: '24px',
            border: '1px solid rgba(14, 165, 233, 0.35)',
            background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.06) 0%, rgba(15, 23, 42, 0.7) 100%)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} color="#38bdf8" />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>
                  Clinical Intervention Simulator
                </h3>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              Run predictive in-silico trials against the patient’s digital twin before prescribing.
            </p>

            {/* Simulation Time Horizon Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              padding: '6px 10px',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--border-subtle)'
            }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Horizon:</span>
              {(['6m', '12m', '24m'] as const).map(h => (
                <button
                  key={h}
                  onClick={() => setTimeHorizon(h)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: 'none',
                    background: timeHorizon === h ? '#0ea5e9' : 'transparent',
                    color: timeHorizon === h ? '#fff' : 'var(--text-secondary)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {h.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Presets List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              {patientSimulations.map((sim) => {
                const isSelected = activeSimulation?.id === sim.id;
                return (
                  <button
                    key={sim.id}
                    onClick={() => handleRunSimulation(sim)}
                    disabled={isSimulating}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(14, 165, 233, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid #38bdf8' : '1px solid var(--border-subtle)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
                        {sim.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Cost Avoidance: {sim.costAvoidance}
                      </div>
                    </div>
                    <ChevronRight size={16} color={isSelected ? '#38bdf8' : '#64748b'} />
                  </button>
                );
              })}
            </div>

            {/* Simulation Running Progress Indicator */}
            {isSimulating && (
              <div style={{
                padding: '24px',
                textAlign: 'center',
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle)'
              }}>
                <RefreshCw size={24} color="#0ea5e9" className="spin-slow" style={{ margin: '0 auto 12px auto' }} />
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                  Solving Stochastic Biomarker Differential Equations...
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Simulating 1,000 Monte Carlo trajectories for {timeHorizon.toUpperCase()} horizon
                </div>
              </div>
            )}

            {/* Simulation Results Display */}
            {!isSimulating && activeSimulation && simulationApplied && (
              <div style={{
                background: 'rgba(14, 165, 233, 0.06)',
                border: '1px solid rgba(14, 165, 233, 0.35)',
                borderRadius: '12px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle2 size={16} color="#10b981" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34d399' }}>
                    Simulation Converged (99.4% Significance)
                  </span>
                </div>

                <div style={{ fontSize: '0.76rem', color: '#cbd5e1', marginBottom: '12px', fontStyle: 'italic', lineHeight: 1.35 }}>
                  "{activeSimulation.intervention}"
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                  {activeSimulation.projectedOutcomes.map((out, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      padding: '10px',
                      borderRadius: '8px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8' }}>
                        <span>{out.metric}</span>
                        <span>{out.projectedDelta}</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {out.clinicalImpact}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>
                        Confidence: {out.confidence}%
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  padding: '10px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  fontSize: '0.74rem',
                  color: '#34d399',
                  fontWeight: 600,
                  marginBottom: '14px',
                  lineHeight: 1.35
                }}>
                  Estimated Cost Savings: {activeSimulation.costAvoidance}
                </div>

                {isPacketAttached ? (
                  <div style={{
                    padding: '12px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: '#34d399',
                    fontWeight: 700
                  }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>Attached to Prior Auth Packet #AUTH-88291 & Section 4.1 Schema</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsPacketAttached(true);
                      setActionToast(`Digital Twin simulation attached to Prior Auth Packet for ${selectedPatient.name}!`);
                      confetti({ particleCount: 50, spread: 70 });
                    }}
                    className="btn-primary"
                    style={{ width: '100%', padding: '10px', fontSize: '0.8rem', borderRadius: '8px' }}
                  >
                    <FileText size={14} />
                    <span>Attach Simulation to Prior Auth Packet</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Dynamic Twin Clinical Utility Metrics Card */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Dna size={16} color="#818cf8" />
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>
                Twin Clinical Utility Metrics ({selectedPatient.name.split(' ')[0]})
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span>Longitudinal Data Density:</span>
                <span style={{ color: '#f8fafc', fontWeight: 700 }}>{selectedPatient.longitudinalDensity}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span>Genetic & Phenotype Markers:</span>
                <span style={{ color: '#38bdf8', fontWeight: 700 }}>{selectedPatient.geneticMarkers}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Trial Evidence Concordance:</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>{selectedPatient.trialEvidence}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
