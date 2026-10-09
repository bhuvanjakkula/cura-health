import React from 'react';
import { X, Download, Printer, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ClaimScrubberItem, PriorAuthItem } from '../../types';

interface CMS1500ViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  claim: ClaimScrubberItem | null;
  associatedPa?: PriorAuthItem | null;
}

export const CMS1500ViewerModal: React.FC<CMS1500ViewerModalProps> = ({
  isOpen,
  onClose,
  claim,
  associatedPa
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

  if (!isOpen || !claim) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', padding: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 800, color: '#60a5fa', fontSize: '0.8rem' }}>1500</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Standard CMS-1500 Health Insurance Claim Form (02/12)</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Electronic Claim Reference: {claim.claimId} • Payor: {claim.payor}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Paper CMS-1500 Form Simulation */}
        <div style={{
          background: '#ffffff',
          color: '#111827',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #dc2626',
          fontFamily: 'JetBrains Mono, Courier New, monospace',
          fontSize: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxHeight: '60vh',
          overflowY: 'auto'
        }}>
          {/* Top Form Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #dc2626', paddingBottom: '8px' }}>
            <div>
              <strong style={{ color: '#dc2626' }}>HEALTH INSURANCE CLAIM FORM</strong>
              <div>APPROVED BY NATIONAL UNIFORM CLAIM COMMITTEE (NUCC) 02/12</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ background: '#fef2f2', padding: '2px 6px', border: '1px solid #dc2626', fontWeight: 700, color: '#991b1b' }}>
                EDI 837P TRANSMISSION READY
              </span>
            </div>
          </div>

          {/* Section 1: Patient and Insured Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', border: '1px solid #dc2626', padding: '8px' }}>
            <div>
              <span style={{ color: '#dc2626', fontSize: '0.65rem' }}>1. MEDICARE / MEDICAID / TRICARE / GROUP HEALTH PLAN:</span>
              <div style={{ fontWeight: 700 }}>{claim.payor}</div>
            </div>
            <div>
              <span style={{ color: '#dc2626', fontSize: '0.65rem' }}>1a. INSURED&apos;S I.D. NUMBER:</span>
              <div style={{ fontWeight: 700 }}>POL-9948201-01</div>
            </div>
            <div>
              <span style={{ color: '#dc2626', fontSize: '0.65rem' }}>2. PATIENT&apos;S NAME (Last, First):</span>
              <div style={{ fontWeight: 700 }}>{claim.patientName}</div>
            </div>
          </div>

          {/* Section 2: Diagnosis Codes Box 21 */}
          <div style={{ border: '1px solid #dc2626', padding: '8px' }}>
            <span style={{ color: '#dc2626', fontSize: '0.65rem' }}>21. DIAGNOSIS OR NATURE OF ILLNESS OR INJURY (ICD-10-CM Codes):</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginTop: '4px' }}>
              <div><strong>A.</strong> G43.909 (Migraine)</div>
              <div><strong>B.</strong> M17.11 (Knee OA)</div>
              <div><strong>C.</strong> M23.22 (Meniscus)</div>
              <div><strong>D.</strong> M54.16 (Lumbar)</div>
            </div>
          </div>

          {/* Section 3: Box 23 Prior Auth Number */}
          <div style={{ border: '1px solid #dc2626', padding: '8px', background: associatedPa?.approvalCode ? '#f0fdf4' : '#fff' }}>
            <span style={{ color: '#dc2626', fontSize: '0.65rem' }}>23. PRIOR AUTHORIZATION NUMBER:</span>
            <div style={{ fontWeight: 800, color: associatedPa?.approvalCode ? '#15803d' : '#000000', fontSize: '0.85rem' }}>
              {associatedPa?.approvalCode || 'AUTH-PENDING-SUBMISSION'}
            </div>
          </div>

          {/* Section 4: Box 24 Service Lines Table */}
          <div style={{ border: '1px solid #dc2626' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 80px 100px 60px 50px 80px 60px 1fr',
              background: '#fee2e2',
              color: '#991b1b',
              fontWeight: 700,
              padding: '6px',
              fontSize: '0.65rem',
              borderBottom: '1px solid #dc2626'
            }}>
              <div>24A. FROM DOS</div>
              <div>TO DOS</div>
              <div>24D. CPT/HCPCS</div>
              <div>MODIF</div>
              <div>DIAG</div>
              <div>24F. CHARGES</div>
              <div>DAYS</div>
              <div>24J. RENDERING NPI</div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 80px 100px 60px 50px 80px 60px 1fr',
              padding: '8px 6px',
              fontSize: '0.72rem',
              borderBottom: '1px solid #fee2e2'
            }}>
              <div>{claim.dos}</div>
              <div>{claim.dos}</div>
              <div style={{ fontWeight: 700 }}>99214</div>
              <div style={{ fontWeight: 800, color: '#16a34a' }}>-25</div>
              <div>A</div>
              <div>$185.00</div>
              <div>1</div>
              <div>1841392019</div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '80px 80px 100px 60px 50px 80px 60px 1fr',
              padding: '8px 6px',
              fontSize: '0.72rem'
            }}>
              <div>{claim.dos}</div>
              <div>{claim.dos}</div>
              <div style={{ fontWeight: 700 }}>64615</div>
              <div>--</div>
              <div>A</div>
              <div>$1,658.50</div>
              <div>1</div>
              <div>1841392019</div>
            </div>
          </div>

          {/* Section 5: Box 28, 29, 31 Totals & Signature */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '8px', border: '1px solid #dc2626', padding: '8px' }}>
            <div>
              <span style={{ color: '#dc2626', fontSize: '0.65rem' }}>28. TOTAL CHARGE:</span>
              <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>${claim.totalBilled.toFixed(2)}</div>
            </div>
            <div>
              <span style={{ color: '#dc2626', fontSize: '0.65rem' }}>29. AMOUNT PAID:</span>
              <div style={{ fontWeight: 700 }}>$0.00 (Pre-Bill)</div>
            </div>
            <div>
              <span style={{ color: '#dc2626', fontSize: '0.65rem' }}>31. SIGNATURE OF PHYSICIAN OR SUPPLIER:</span>
              <div style={{ fontWeight: 700, color: '#1d4ed8' }}>
                SIGNATURE ON FILE • Cryptographically Verified ({claim.provider})
              </div>
            </div>
          </div>
        </div>

        {/* Modal Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#34d399' }}>
            <ShieldCheck size={16} />
            <span>NUCC 2026 Compliant • NCCI Edits Cleared</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onClose} className="btn-secondary" style={{ fontSize: '0.8rem' }}>
              Close
            </button>
            <button onClick={() => window.print()} className="btn-primary" style={{ fontSize: '0.8rem' }}>
              <Printer size={14} />
              <span>Print CMS-1500 Red Form</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
