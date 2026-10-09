import React, { useState } from 'react';
import { 
  Inbox, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  Filter, 
  UserCheck, 
  Pill, 
  AlertCircle, 
  FileText, 
  TrendingDown, 
  Flame,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InboxMessage {
  id: string;
  sender: string;
  patientName: string;
  patientMrn: string;
  subject: string;
  category: 'Refill Request' | 'Lab Question' | 'Symptom Check' | 'Admin & Scheduling';
  timestamp: string;
  urgency: 'low' | 'normal' | 'high';
  body: string;
  aiSuggestedAction: string;
  aiDraftResponse: string;
  delegationTarget: 'Clinical Pharmacy Tech' | 'Triage Nurse' | 'Attending MD' | 'Auto-Resolved';
  status: 'pending' | 'delegated' | 'resolved';
}

const MOCK_INBOX_MESSAGES: InboxMessage[] = [
  {
    id: 'msg_1',
    sender: 'Elena Rostova (Patient)',
    patientName: 'Elena Rostova',
    patientMrn: 'MRN-849201',
    subject: 'Sumatriptan 100mg 90-day Refill Authorization',
    category: 'Refill Request',
    timestamp: '15 mins ago',
    urgency: 'normal',
    body: 'Hello Dr. Lin, my pharmacy says my Sumatriptan 100mg has zero refills remaining. I have 2 tablets left for the upcoming travel week. Can you please authorize a 90-day supply?',
    aiSuggestedAction: 'Protocolized Refill Auto-Approval: Patient had documented in-person follow-up 24 days ago. Vitals normal, zero contraindications, kidney/liver panels up to date.',
    aiDraftResponse: 'Refill approved for Sumatriptan 100mg #9 with 3 refills sent to Walgreens (Rx# 884190). Remember to use max 9 days/month to avoid rebound headaches.',
    delegationTarget: 'Clinical Pharmacy Tech',
    status: 'pending'
  },
  {
    id: 'msg_2',
    sender: 'Marcus Holloway (Patient)',
    patientName: 'Marcus Holloway',
    patientMrn: 'MRN-723910',
    subject: 'Pre-MRI Questionnaire & Knee Brace Question',
    category: 'Admin & Scheduling',
    timestamp: '42 mins ago',
    urgency: 'low',
    body: 'Hi team, I received the Prior Auth approval for my knee MRI. Should I wear my compressive knee sleeve to the imaging center or remove it before entering the 3T scanner?',
    aiSuggestedAction: 'Auto-Triage & Patient Education: Send standard 3T MRI metallic hazard instructions. Reassure patient regarding non-ferrous clothing.',
    aiDraftResponse: 'Hello Marcus, please wear loose clothing without metal zippers or snaps. You will be asked to remove the knee sleeve in the dressing room before entering the scanner suite.',
    delegationTarget: 'Auto-Resolved',
    status: 'pending'
  },
  {
    id: 'msg_3',
    sender: 'Amara Okafor (Patient)',
    patientName: 'Amara Okafor',
    patientMrn: 'MRN-552918',
    subject: 'Mild dizziness after taking first dose of Nitroglycerin',
    category: 'Symptom Check',
    timestamp: '1 hour ago',
    urgency: 'high',
    body: 'Dr. Lin, I took one tablet of the sublingual Nitro after chest tightness yesterday. The tightness went away quickly, but I felt lightheaded for about 4 minutes while standing.',
    aiSuggestedAction: 'Clinical Protocol Alert: Transient hypotension is expected with SL Nitrates. Advise patient to remain seated when administering.',
    aiDraftResponse: 'Hello Amara, mild lightheadedness is a common vasodilatory effect. Please always sit or lie down immediately before taking sublingual nitroglycerin to prevent lightheadedness.',
    delegationTarget: 'Triage Nurse',
    status: 'pending'
  }
];

export const SmartEHRInbox: React.FC = () => {
  const [messages, setMessages] = useState<InboxMessage[]>(MOCK_INBOX_MESSAGES);
  const [selectedMsg, setSelectedMsg] = useState<InboxMessage | null>(messages[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [toast, setToast] = useState<string | null>(null);

  const pendingCount = messages.filter(m => m.status === 'pending').length;

  const handleResolveMessage = (msgId: string) => {
    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, status: 'resolved' } : m));
    setSelectedMsg(prev => prev && prev.id === msgId ? { ...prev, status: 'resolved' } : prev);
    setToast('Response dispatched and documented directly into EHR timeline!');
    confetti({ particleCount: 40, spread: 60 });
  };

  const handleBatchDelegateRefills = () => {
    setMessages(prev => prev.map(m => m.category === 'Refill Request' ? { ...m, status: 'resolved' } : m));
    setSelectedMsg(prev => prev && prev.category === 'Refill Request' ? { ...prev, status: 'resolved' } : prev);
    setToast('All protocolized refill requests delegated to Clinical Pharmacy Tech queue!');
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  };

  const filteredMessages = messages.filter(m => 
    activeCategory === 'all' ? true : m.category === activeCategory
  );

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(17, 24, 39, 0.9) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.35)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Smart EHR Inbox & Asynchronous Triage Engine</h2>
            <span className="badge-status badge-approved" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8', borderColor: '#818cf8' }}>
              <Sparkles size={13} />
              Arndt et al. Workload Reducer
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '720px' }}>
            Eliminates the 5.9 hours/day EHR documentation burden (Arndt et al., 2017 & 2024; Budd, 2023) by protocolizing prescription refills and delegating routine triage to clinical pharmacy technicians.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleBatchDelegateRefills}
            className="btn-emerald"
            style={{ fontSize: '0.825rem' }}
          >
            <Zap size={15} />
            <span>1-Click Batch Delegate Refills</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Daily Pajama Time Saved</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#818cf8', marginTop: '4px' }}>
            2.4 Hours / Day
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>74% drop in after-hours desktop triage</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Protocolized Refill Speed</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
            4.2 Minutes
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Down from 48h asynchronous wait</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Pending Inbox Messages</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: pendingCount > 0 ? '#fbbf24' : '#34d399', marginTop: '4px' }}>
            {pendingCount} Messages
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Auto-classified by NLP urgency</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Shift Time Recovered (Rotenstein)</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
            16 min / 8h
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>JAMA 2026 Multicenter Benchmark</div>
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

      {/* Master Detail Inbox Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.7fr', gap: '24px' }}>
        {/* Left: Message List */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>EHR Patient Inbox Stream</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{filteredMessages.length} Messages</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '580px' }}>
            {filteredMessages.map((msg) => {
              const isSelected = selectedMsg?.id === msg.id;
              return (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMsg(msg)}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid #818cf8' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{msg.patientName}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{msg.timestamp}</span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 600 }}>
                    {msg.subject}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span className={`badge-status ${msg.status === 'resolved' ? 'badge-approved' : 'badge-pended'}`} style={{ fontSize: '0.65rem' }}>
                      {msg.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#06b6d4', fontWeight: 600 }}>
                      → {msg.delegationTarget}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI Triage Assistant & Draft Composer */}
        {selectedMsg ? (
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{selectedMsg.patientName}</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {selectedMsg.patientMrn} • {selectedMsg.subject}
                  </div>
                </div>
                <span className={`badge-status ${selectedMsg.status === 'resolved' ? 'badge-approved' : 'badge-pended'}`}>
                  {selectedMsg.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Original Patient Message */}
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Patient Message:
              </div>
              <p style={{ fontSize: '0.825rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                {selectedMsg.body}
              </p>
            </div>

            {/* AI Protocolized Clinical Logic */}
            <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Sparkles size={16} color="#818cf8" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c7d2fe' }}>
                  AI Protocol & Delegation Assessment
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {selectedMsg.aiSuggestedAction}
              </p>
            </div>

            {/* AI Generated Electronic Response */}
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Synthesized Patient Response & Pharmacy Order:
              </div>
              <textarea
                rows={4}
                value={selectedMsg.aiDraftResponse}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedMsg({ ...selectedMsg, aiDraftResponse: val });
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.825rem',
                  lineHeight: 1.5,
                  outline: 'none'
                }}
              />
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Delegated to: <strong>{selectedMsg.delegationTarget}</strong>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleResolveMessage(selectedMsg.id)}
                  disabled={selectedMsg.status === 'resolved'}
                  className="btn-emerald"
                  style={{ fontSize: '0.8rem' }}
                >
                  <Send size={14} />
                  <span>{selectedMsg.status === 'resolved' ? 'Resolved & Documented' : 'Sign & Transmit to EHR'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
