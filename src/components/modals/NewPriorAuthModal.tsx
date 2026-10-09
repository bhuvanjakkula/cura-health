import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  FileText, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { PriorAuthItem, Patient } from '../../types';
import { MOCK_PATIENTS } from '../../data/mockData';
import confetti from 'canvas-confetti';

interface NewPriorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newItem: PriorAuthItem) => void;
}

export const NewPriorAuthModal: React.FC<NewPriorAuthModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState(MOCK_PATIENTS[0].id);
  const [cptCode, setCptCode] = useState('70553');
  const [cptDescription, setCptDescription] = useState('Magnetic Resonance Imaging (MRI), brain, with and without contrast');
  const [icd10Code, setIcd10Code] = useState('G43.909');
  const [icd10Description, setIcd10Description] = useState('Intractable Chronic Migraine without aura');
  const [payor, setPayor] = useState('BlueCross BlueShield');
  const [urgency, setUrgency] = useState<'routine' | 'urgent' | 'stat'>('routine');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [justification, setJustification] = useState(
    'Patient has experienced refractory symptoms for >6 months failing multiple conservative lines. Meets 100% of Medical Policy Guidelines for high-field neuroimaging.'
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePatientChange = (patientId: string) => {
    setSelectedPatientId(patientId);
    const pat = MOCK_PATIENTS.find(p => p.id === patientId);
    if (pat) {
      if (pat.insuranceProvider.includes('BlueCross')) setPayor('BlueCross BlueShield');
      else if (pat.insuranceProvider.includes('United')) setPayor('UnitedHealthcare');
      else if (pat.insuranceProvider.includes('Aetna')) setPayor('Aetna');
      else if (pat.insuranceProvider.includes('Cigna')) setPayor('Cigna Healthcare');
      else if (pat.insuranceProvider.includes('Humana')) setPayor('Humana Medicare Advantage');

      if (pat.id === 'pat_2') {
        setCptCode('73721');
        setCptDescription('MRI Knee without contrast (Right Knee)');
        setIcd10Code('M23.22');
        setIcd10Description('Meniscus Derangement / Tear of Right Knee');
      } else if (pat.id === 'pat_3') {
        setCptCode('64483');
        setCptDescription('Transforaminal Lumbar Epidural Steroid Injection (L4-L5)');
        setIcd10Code('M54.16');
        setIcd10Description('Lumbar Radiculopathy');
      } else if (pat.id === 'pat_4') {
        setCptCode('29827');
        setCptDescription('Arthroscopic Rotator Cuff Repair');
        setIcd10Code('M75.10');
        setIcd10Description('Rotator Cuff Tear, Right Shoulder');
      }
    }
  };

  const selectedPatient = MOCK_PATIENTS.find(p => p.id === selectedPatientId) || MOCK_PATIENTS[0];

  const handleGenerateAIJustification = () => {
    setIsGeneratingAI(true);
    setTimeout(() => {
      setJustification(
        `CLINICAL NECESSITY JUSTIFICATION:
Patient ${selectedPatient.name} (MRN: ${selectedPatient.mrn}, DOB: ${selectedPatient.dob}) has been under active clinical care for ${icd10Description} (${icd10Code}).
Per payor guidelines for ${payor}, conservative management was attempted including documented pharmacotherapy trials and physical therapy. Ordered procedure ${cptCode} (${cptDescription}) is medically essential to establish definitive etiology and rule out underlying structural pathology.`
      );
      setIsGeneratingAI(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPa: PriorAuthItem = {
      id: 'pa_' + Date.now(),
      paNumber: 'PA-2026-' + Math.floor(1000 + Math.random() * 9000),
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      patientDob: selectedPatient.dob,
      patientMrn: selectedPatient.mrn,
      payor: payor,
      payorPlan: payor + ' Premier Choice PPO',
      cptCode: cptCode,
      cptDescription: cptDescription,
      icd10Code: icd10Code,
      icd10Description: icd10Description,
      requestingProvider: 'Dr. Sarah Lin, MD',
      providerNpi: '1841392019',
      submissionDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      slaDeadline: 'In 48 Hours',
      status: 'pending_review',
      urgency: urgency,
      estimatedCost: 1950,
      clinicalNotes: justification,
      conservativeTreatmentsAttempted: [
        'Documented 8 weeks of first-line pharmacotherapy',
        'Physical therapy trial protocol completed',
        'Baseline labs and plain radiographs evaluated'
      ],
      requiredDocsUploaded: [
        'Recent Clinical Encounter Notes.pdf',
        'Prior Diagnostic Imaging Records.pdf'
      ],
      aiConfidenceScore: 95,
      clinicalJustification: justification,
      timeline: [
        {
          date: new Date().toISOString().slice(0, 16).replace('T', ' '),
          action: 'Created & Transmitted via CuraHealth EDI',
          actor: 'Dr. Sarah Lin, MD',
          details: 'Direct electronic 278 transaction sent to ' + payor
        }
      ]
    };

    onSubmit(newPa);
    confetti({ particleCount: 50, spread: 60 });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px' }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} color="#60a5fa" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Create New Prior Authorization</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automated Payor Rule Matching & EDI 278 Transmission</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Patient Picker */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Select Patient:
            </label>
            <select
              value={selectedPatientId}
              onChange={(e) => handlePatientChange(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem'
              }}
            >
              {MOCK_PATIENTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.mrn} • DOB: {p.dob} • {p.insuranceProvider})
                </option>
              ))}
            </select>
          </div>

          {/* Procedure CPT & Diagnosis ICD-10 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                CPT / HCPCS Procedure Code:
              </label>
              <input
                type="text"
                value={cptCode}
                onChange={(e) => setCptCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                ICD-10 Primary Diagnosis:
              </label>
              <input
                type="text"
                value={icd10Code}
                onChange={(e) => setIcd10Code(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          {/* Payor & Urgency */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Target Payor:
              </label>
              <select
                value={payor}
                onChange={(e) => setPayor(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem'
                }}
              >
                <option value="BlueCross BlueShield">BlueCross BlueShield</option>
                <option value="UnitedHealthcare">UnitedHealthcare</option>
                <option value="Aetna">Aetna</option>
                <option value="Cigna Healthcare">Cigna Healthcare</option>
                <option value="Humana Medicare Advantage">Humana Medicare Advantage</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Clinical Urgency Level:
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem'
                }}
              >
                <option value="routine">Routine (Standard SLA)</option>
                <option value="urgent">Urgent (24h Expedited)</option>
                <option value="stat">STAT (Direct Inpatient Escalation)</option>
              </select>
            </div>
          </div>

          {/* AI Clinical Justification */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                Clinical Necessity & Step Therapy Justification:
              </label>
              <button
                type="button"
                onClick={handleGenerateAIJustification}
                disabled={isGeneratingAI}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#60a5fa',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles size={14} />
                <span>{isGeneratingAI ? 'Synthesizing...' : 'Re-generate via AI'}</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '0.825rem',
                lineHeight: 1.5,
                outline: 'none'
              }}
            />
          </div>

          {/* Modal Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Send size={16} />
              <span>Transmit EDI 278 Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
