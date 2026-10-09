import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  PhoneCall,
  Download
} from 'lucide-react';
import { PriorAuthItem } from '../../types';
import confetti from 'canvas-confetti';

interface AppealGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  priorAuth: PriorAuthItem | null;
  onAppealSubmitted: (updated: PriorAuthItem) => void;
}

export const AppealGeneratorModal: React.FC<AppealGeneratorModalProps> = ({
  isOpen,
  onClose,
  priorAuth,
  onAppealSubmitted
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !priorAuth) return null;

  const [appealText, setAppealText] = useState(
    `FORMAL EXPEDITED RECONSIDERATION & CLINICAL APPEAL
Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
To: ${priorAuth.payor} Appeals & Grievances Committee / Medical Director
RE: Adverse Determination Appeal for ${priorAuth.patientName} (MRN: ${priorAuth.patientMrn}, Ref: ${priorAuth.paNumber})
CPT Code: ${priorAuth.cptCode} (${priorAuth.cptDescription})
Diagnosis: ${priorAuth.icd10Code} (${priorAuth.icd10Description})

Dear Medical Director,

We are formally requesting an immediate Level-1 expedited clinical reconsideration of the adverse determination rendered on ${priorAuth.submissionDate}. The denial citing lack of recent neurological examination is factually contradicted by our clinical documentation.

CLINICAL REBUTTAL & EVIDENCE:
1. Documented Neurological Examination: On 2026-09-02 (well within the required 30-day window), Dr. Sarah Lin performed a comprehensive neurological examination documenting diminished L5 sensation and positive straight leg raise at 40 degrees.
2. Step Therapy & Conservative Failure: The patient completed 8 weeks of supervised physical therapy and maximum tolerated doses of Gabapentin without functional recovery (VAS pain 8/10).
3. Concordant Diagnostic Imaging: 3T MRI Lumbar Spine confirms severe left L4-L5 neural foraminal stenosis with active nerve root compression.

PEER-REVIEWED LITERATURE & GUIDELINE CITATIONS:
- Spine Journal Consensus Guidelines (2024): Transforaminal epidural injections provide statistically significant pain reduction (>50%) in lumbar radiculopathy refractory to 6 weeks conservative therapy.
- North American Spine Society (NASS) Clinical Guidelines: Grade A recommendation for single-level fluoroscopically guided epidural injection.

We request immediate reversal and authorization, or an expedited Peer-to-Peer discussion with Dr. Sarah Lin within 24 hours.`
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitAppeal = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const updated: PriorAuthItem = {
        ...priorAuth,
        status: 'appealing',
        timeline: [
          ...priorAuth.timeline,
          {
            date: new Date().toISOString().slice(0, 16).replace('T', ' '),
            action: 'Expedited Clinical Appeal Transmitted',
            actor: 'Dr. Sarah Lin, MD',
            details: 'AI Appeal Packet submitted to ' + priorAuth.payor + ' Medical Director with clinical citations'
          }
        ]
      };
      onAppealSubmitted(updated);
      setIsSubmitting(false);
      confetti({ particleCount: 60, spread: 70 });
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '28px', maxWidth: '850px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(244, 63, 94, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BookOpen size={20} color="#fb7185" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>AI Denial Appeal & Rebuttal Composer</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Targeting: {priorAuth.payor} • Patient: {priorAuth.patientName} ({priorAuth.cptCode})
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Denial Reason Alert */}
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          marginBottom: '16px',
          fontSize: '0.8rem',
          color: '#fb7185'
        }}>
          <strong>Payor Denial Reason:</strong> {priorAuth.denialReason}
        </div>

        {/* Appeal Letter Textarea */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              AI Synthesized Clinical Rebuttal Packet (with Literature Citations)
            </span>
          </div>
          <textarea
            rows={12}
            value={appealText}
            onChange={(e) => setAppealText(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '10px',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontSize: '0.825rem',
              lineHeight: 1.6,
              fontFamily: 'JetBrains Mono, monospace'
            }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#34d399' }}>
            <CheckCircle2 size={16} />
            <span>Meets 100% of CPB 0722 Guideline Thresholds</span>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button 
              onClick={handleSubmitAppeal} 
              disabled={isSubmitting}
              className="btn-danger"
            >
              <Send size={16} />
              <span>{isSubmitting ? 'Transmitting Appeal...' : 'Transmit Expedited Appeal'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
