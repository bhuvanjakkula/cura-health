import React, { useState } from 'react';
import { 
  CalendarClock, 
  UserCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Car, 
  Sparkles, 
  Send, 
  Plus, 
  Filter,
  UserX,
  Zap,
  TrendingUp,
  MapPin,
  Check
} from 'lucide-react';
import { ScheduleSlot, Patient } from '../../types';
import { MOCK_PATIENTS, MOCK_SCHEDULE_SLOTS } from '../../data/mockData';
import confetti from 'canvas-confetti';

interface CapacityOptimizerProps {
  scheduleSlots: ScheduleSlot[];
  onUpdateSlot: (updated: ScheduleSlot) => void;
}

export const CapacityOptimizer: React.FC<CapacityOptimizerProps> = ({
  scheduleSlots,
  onUpdateSlot
}) => {
  const [selectedSlot, setSelectedSlot] = useState<ScheduleSlot | null>(
    scheduleSlots.find(s => s.status === 'no_show_risk') || scheduleSlots[0]
  );
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handleSendUrgentConfirmation = () => {
    if (!selectedSlot) return;
    setActionSuccess(`Priority 2-way SMS verification dispatched to ${selectedSlot.patientName} (${selectedSlot.patientId}).`);
    setTimeout(() => {
      const updated: ScheduleSlot = {
        ...selectedSlot,
        status: 'confirmed',
        noShowRiskScore: 18,
        notes: 'Patient confirmed attendance via SMS response "YES".'
      };
      onUpdateSlot(updated);
      setSelectedSlot(updated);
      setActionSuccess('Patient confirmed! Risk score downgraded to 18% (Low).');
    }, 1500);
  };

  const handleDispatchUberHealth = () => {
    if (!selectedSlot) return;
    setActionSuccess(`Dispatched Uber Health complimentary transport voucher to ${selectedSlot.patientName}. Driver ETA: 18 mins.`);
    setTimeout(() => {
      const updated: ScheduleSlot = {
        ...selectedSlot,
        status: 'confirmed',
        noShowRiskScore: 8,
        notes: 'Uber Health ride active. Transit risk neutralized.'
      };
      onUpdateSlot(updated);
      setSelectedSlot(updated);
      setActionSuccess('Ride confirmed! Patient in transit.');
      
      confetti({ particleCount: 40, spread: 60 });
    }, 1500);
  };

  const handleAutofillStandby = () => {
    if (!selectedSlot) return;
    setActionSuccess('Auto-filling cancelled/at-risk slot from Priority Standby Waitlist...');
    setTimeout(() => {
      const updated: ScheduleSlot = {
        ...selectedSlot,
        patientName: 'Kavita Patel (Standby Patient)',
        appointmentType: 'Expedited Knee Evaluation',
        status: 'confirmed',
        noShowRiskScore: 5,
        notes: 'Standby patient accepted 10:00 AM slot. Practice capacity 100% preserved.'
      };
      onUpdateSlot(updated);
      setSelectedSlot(updated);
      setActionSuccess('Standby slot filled! $340 clinical revenue preserved.');
      confetti({ particleCount: 50, spread: 70 });
    }, 1400);
  };

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Clinic Capacity & Schedule Optimizer</h2>
            <span className="badge-status badge-approved">
              <Sparkles size={13} />
              AI No-Show Shield & Auto-Fill
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Predict high-risk appointment drop-offs 24 hours in advance and auto-fill empty capacity from intelligent waitlists.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 185, 129, 0.12)',
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontSize: '0.8rem',
            color: '#34d399',
            fontWeight: 700
          }}>
            <TrendingUp size={16} />
            <span>Today's Slot Utilization: 94.2%</span>
          </div>
        </div>
      </div>

      {/* Main Schedule Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        {/* Left: Interactive Daily Schedule Slots */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Today's Clinical Appointment Queue</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              8 Total Slots • 1 High Risk Flagged
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '640px' }}>
            {scheduleSlots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              const isHighRisk = slot.noShowRiskScore >= 50;

              return (
                <div
                  key={slot.id}
                  onClick={() => {
                    setSelectedSlot(slot);
                    setActionSuccess(null);
                  }}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: isHighRisk 
                      ? '1px solid rgba(244, 63, 94, 0.4)' 
                      : isSelected 
                      ? '1px solid #3b82f6' 
                      : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '0.825rem',
                      fontWeight: 700,
                      color: '#60a5fa',
                      minWidth: '70px'
                    }}>
                      {slot.time}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{slot.patientName}</span>
                        {slot.telehealth && (
                          <span style={{ fontSize: '0.65rem', background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8', padding: '1px 6px', borderRadius: '4px' }}>
                            Telehealth
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {slot.appointmentType} • {slot.providerName}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge-status ${
                      slot.status === 'completed' 
                        ? 'badge-approved' 
                        : isHighRisk 
                        ? 'badge-denied' 
                        : 'badge-pending'
                    }`}>
                      {isHighRisk ? `${slot.noShowRiskScore}% No-Show Risk` : slot.status.replace('_', ' ')}
                    </span>
                    {slot.room && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        {slot.room}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: AI No-Show Prevention & Intervention Control */}
        {selectedSlot ? (
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{selectedSlot.patientName}</h3>
                <span className={`badge-status ${
                  selectedSlot.noShowRiskScore >= 50 ? 'badge-denied' : 'badge-approved'
                }`}>
                  {selectedSlot.noShowRiskScore}% Risk
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {selectedSlot.time} • {selectedSlot.appointmentType} ({selectedSlot.durationMin} mins)
              </div>
            </div>

            {/* Action Feedback Banner */}
            {actionSuccess && (
              <div style={{
                padding: '12px 14px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontSize: '0.8rem',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} />
                <span>{actionSuccess}</span>
              </div>
            )}

            {/* No-Show Risk Factors Breakdown */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                AI Predictive Risk Modeling & Behavioral Factors
              </div>
              <ul style={{ paddingLeft: '18px', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Historical Attendance: 2 past no-shows within 12 months</li>
                <li>Transit Distance: 45 min commute via bus lines with active transit delays</li>
                <li>Confirmation: SMS reminder sent 24 hours ago remains unconfirmed</li>
              </ul>
            </div>

            {/* Proactive Intervention Toolkit */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
                1-Click Preventative Interventions
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={handleSendUrgentConfirmation}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 16px' }}
                >
                  <Phone size={16} />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontSize: '0.825rem', fontWeight: 700 }}>Send 2-Way Priority SMS Reminder</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Sends interactive text asking patient to confirm or reschedule</div>
                  </div>
                </button>

                <button
                  onClick={handleDispatchUberHealth}
                  className="btn-emerald"
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 16px' }}
                >
                  <Car size={16} />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontSize: '0.825rem', fontWeight: 700 }}>Dispatch Uber Health Transit Ride</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>Cover patient roundtrip commute to eliminate transit barrier</div>
                  </div>
                </button>

                <button
                  onClick={handleAutofillStandby}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 16px' }}
                >
                  <Zap size={16} color="#fbbf24" />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontSize: '0.825rem', fontWeight: 700 }}>Auto-Fill from Standby Waitlist</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Immediately offer slot to next patient on waitlist (Kavita Patel)</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Select an appointment slot to view capacity analytics
          </div>
        )}
      </div>
    </div>
  );
};
