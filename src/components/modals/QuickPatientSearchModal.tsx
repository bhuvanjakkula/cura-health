import React, { useState, useEffect } from 'react';
import { Search, X, User, FileText, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { MOCK_PATIENTS, MOCK_PRIOR_AUTHS } from '../../data/mockData';
import { NavTab } from '../common/Sidebar';

interface QuickPatientSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab, id?: string) => void;
}

export const QuickPatientSearchModal: React.FC<QuickPatientSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedPatients = MOCK_PATIENTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.mrn.toLowerCase().includes(query.toLowerCase()) ||
    p.activeConditions.some(c => c.toLowerCase().includes(query.toLowerCase()))
  );

  const matchedPAs = MOCK_PRIOR_AUTHS.filter(pa => 
    pa.patientName.toLowerCase().includes(query.toLowerCase()) ||
    pa.paNumber.toLowerCase().includes(query.toLowerCase()) ||
    pa.cptCode.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', padding: '0', overflow: 'hidden' }}>
        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <Search size={20} color="#06b6d4" />
          <input
            autoFocus
            type="text"
            placeholder="Type a patient name, MRN, CPT code (e.g. 70553), or condition..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <span className="kbd-key">ESC</span>
          </button>
        </div>

        {/* Results Body */}
        <div style={{ padding: '16px', maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Patients */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
              Patients ({matchedPatients.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {matchedPatients.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onNavigate('ambient_soap');
                    onClose();
                  }}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <User size={16} color="#06b6d4" />
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{p.name}</span>
                      <span className="kbd-key" style={{ marginLeft: '6px' }}>{p.mrn}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '6px' }}>• {p.insuranceProvider}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Open Chart <ArrowRight size={12} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Prior Authorizations */}
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
              Prior Authorizations ({matchedPAs.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {matchedPAs.map((pa) => (
                <div
                  key={pa.id}
                  onClick={() => {
                    onNavigate('prior_auth', pa.id);
                    onClose();
                  }}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Zap size={16} color="#f59e0b" />
                    <div>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{pa.patientName}</span>
                      <span className="kbd-key" style={{ marginLeft: '6px' }}>{pa.paNumber}</span>
                      <span style={{ fontSize: '0.75rem', color: '#60a5fa', marginLeft: '6px' }}>• CPT {pa.cptCode}</span>
                    </div>
                  </div>
                  <span className={`badge-status ${
                    pa.status === 'approved' ? 'badge-approved' : pa.status === 'denied' ? 'badge-denied' : 'badge-pended'
                  }`}>
                    {pa.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
