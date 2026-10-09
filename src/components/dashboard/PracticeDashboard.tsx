import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  DollarSign, 
  AlertTriangle, 
  UserCheck, 
  ArrowUpRight, 
  Sparkles,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  Zap,
  Flame,
  ChevronRight
} from 'lucide-react';
import { PriorAuthItem, ScheduleSlot, ClaimScrubberItem, UserProfile } from '../../types';

interface PracticeDashboardProps {
  priorAuths: PriorAuthItem[];
  scheduleSlots: ScheduleSlot[];
  claims: ClaimScrubberItem[];
  currentUser: UserProfile;
  onNavigateToPA: (paId?: string) => void;
  onNavigateToCharting: () => void;
  onNavigateToCapacity: () => void;
  onNavigateToScrubber: () => void;
  onOpenNewPA?: () => void;
  onNavigateToEvidence?: () => void;
}

export const PracticeDashboard: React.FC<PracticeDashboardProps> = ({
  priorAuths,
  scheduleSlots,
  claims,
  currentUser,
  onNavigateToPA,
  onNavigateToCharting,
  onNavigateToCapacity,
  onNavigateToScrubber,
  onOpenNewPA,
  onNavigateToEvidence
}) => {
  const approvedCount = priorAuths.filter(p => p.status === 'approved').length;
  const pendingCount = priorAuths.filter(p => p.status === 'pending_review' || p.status === 'pended_additional_info').length;
  const deniedCount = priorAuths.filter(p => p.status === 'denied').length;
  const highRiskNoShows = scheduleSlots.filter(s => s.noShowRiskScore >= 50);
  const flaggedClaims = claims.filter(c => c.status === 'flagged');
  const revenueAtRisk = flaggedClaims.reduce((acc, curr) => acc + curr.totalBilled, 0) + 
                        priorAuths.filter(p => p.status === 'denied').reduce((acc, curr) => acc + curr.estimatedCost, 0);

  return (
    <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Welcome Banner with Fast Clinical Action Trigger */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.35) 0%, rgba(17, 24, 39, 0.9) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800 }}>Welcome back, {currentUser.name}</span>
            <span className="badge-status badge-approved">
              <span className="pulse-dot" style={{ background: '#10b981' }} />
              Practice Systems Nominal
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', maxWidth: '680px' }}>
            CuraHealth OS is actively protecting <strong style={{ color: '#ffffff' }}>${revenueAtRisk.toLocaleString()} in revenue</strong>, routing <strong style={{ color: '#ffffff' }}>{pendingCount} prior authorizations</strong>, and pre-scrubbing today's clinical encounters to eliminate documentation burnout.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={onNavigateToCharting}
            className="btn-emerald"
          >
            <Sparkles size={16} />
            <span>Launch Ambient Charting</span>
          </button>
          {onOpenNewPA && (
            <button 
              onClick={onOpenNewPA}
              className="btn-primary"
            >
              <Zap size={16} />
              <span>Create New Prior Auth</span>
            </button>
          )}
          <button 
            onClick={() => onNavigateToPA()}
            className="btn-secondary"
          >
            <span>Prior Auth Station</span>
          </button>
          {onNavigateToEvidence && (
            <button 
              onClick={onNavigateToEvidence}
              className="btn-secondary"
              style={{ borderColor: 'rgba(14, 165, 233, 0.4)', color: '#38bdf8' }}
            >
              <span>Evidence Engine</span>
            </button>
          )}
        </div>
      </div>

      {/* Top 4 Core KPI Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px'
      }}>
        {/* KPI 1: Prior Auth First-Pass Rate */}
        <div 
          onClick={() => onNavigateToPA()}
          className="glass-panel glass-panel-hover" 
          style={{ padding: '20px', cursor: 'pointer' }}
          title="Click to view Prior Auth Hub"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Prior Auth Approval Rate</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }} className="gradient-text-blue">
                94.8%
              </div>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(59, 130, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <CheckCircle2 size={22} color="#3b82f6" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#34d399' }}>
            <TrendingUp size={14} />
            <span>+18.4% vs National Average (76.4%)</span>
          </div>
        </div>

        {/* KPI 2: Authorization Velocity (Turnaround) */}
        <div 
          onClick={() => onNavigateToEvidence && onNavigateToEvidence()}
          className="glass-panel glass-panel-hover" 
          style={{ padding: '20px', cursor: 'pointer' }}
          title="Click to view Clinical Evidence Engine"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Avg. Auth Turnaround Time</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }} className="gradient-text-emerald">
                1.4 Days
              </div>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={22} color="#10b981" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#34d399' }}>
            <TrendingUp size={14} />
            <span>89% faster than legacy phone/fax (14 days)</span>
          </div>
        </div>

        {/* KPI 3: Clinician Admin Hours Saved */}
        <div 
          onClick={onNavigateToCharting}
          className="glass-panel glass-panel-hover" 
          style={{ padding: '20px', cursor: 'pointer' }}
          title="Click to launch Ambient SOAP Studio"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Clinician Time Reclaimed</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px' }} className="gradient-text-purple">
                3.8 hrs/day
              </div>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(168, 85, 247, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Flame size={22} color="#c084fc" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#c084fc' }}>
            <span>Pajama time reduced by 72% across providers</span>
          </div>
        </div>

        {/* KPI 4: Clean Claim Rate */}
        <div 
          onClick={onNavigateToScrubber}
          className="glass-panel glass-panel-hover" 
          style={{ padding: '20px', cursor: 'pointer' }}
          title="Click to view Claims Scrubber"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Pre-Submission Clean Rate</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '4px', color: '#38bdf8' }}>
                98.4%
              </div>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(56, 189, 248, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign size={22} color="#38bdf8" />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#38bdf8' }}>
            <span>$48,920 in denial penalties prevented this month</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Urgent Clinical Queue & Live Capacity */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '24px' }}>
        {/* Left Column: Urgent Prior Auth & Denial Escalation Queue */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={20} color="#f59e0b" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Priority Action & Escalation Queue</h3>
            </div>
            <button 
              onClick={() => onNavigateToPA()}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#60a5fa',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>View All Authorizations</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {priorAuths.map((pa) => (
              <div
                key={pa.id}
                onClick={() => onNavigateToPA(pa.id)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: pa.status === 'denied' ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: pa.status === 'approved' 
                      ? 'rgba(16, 185, 129, 0.15)' 
                      : pa.status === 'denied' 
                      ? 'rgba(244, 63, 94, 0.15)' 
                      : 'rgba(245, 158, 11, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {pa.status === 'approved' && <CheckCircle2 size={22} color="#10b981" />}
                    {pa.status === 'denied' && <XCircle size={22} color="#f43f5e" />}
                    {pa.status !== 'approved' && pa.status !== 'denied' && <Clock size={22} color="#f59e0b" />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{pa.patientName}</span>
                      <span className="kbd-key">{pa.patientMrn}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• {pa.payor}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      <strong>{pa.cptCode}</strong>: {pa.cptDescription.length > 55 ? pa.cptDescription.slice(0, 55) + '...' : pa.cptDescription}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', minWidth: '140px' }}>
                  <span className={`badge-status ${
                    pa.status === 'approved' ? 'badge-approved' : pa.status === 'denied' ? 'badge-denied' : 'badge-pended'
                  }`}>
                    {pa.status.replace('_', ' ')}
                  </span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    SLA: {pa.slaDeadline.split('(')[0]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Clinician Load Balance & Today's Schedule Health */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Provider Workload & Charting Fatigue Gauge */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={18} color="#06b6d4" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Clinician Capacity & Charting Load</h4>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>Dr. Sarah Lin (Neurology)</span>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>82% (Nominal)</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)', borderRadius: '4px' }} />
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  14/16 patients seen • 0 chart backlog (100% ambient synced)
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>Dr. David Chen (Orthopedics)</span>
                  <span style={{ color: '#fbbf24', fontWeight: 700 }}>94% (High)</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '94%', height: '100%', background: 'linear-gradient(90deg, #06b6d4, #f59e0b)', borderRadius: '4px' }} />
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  18/20 patients seen • 1 pending prior auth sign-off
                </div>
              </div>
            </div>
          </div>

          {/* High No-Show Risk Warning Widget */}
          <div className="glass-panel" style={{
            padding: '20px',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(17, 24, 39, 0.8) 100%)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={18} color="#f43f5e" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>No-Show Risk Alert</h4>
              </div>
              <span className="badge-status badge-denied">
                {highRiskNoShows.length} Predicted
              </span>
            </div>

            {highRiskNoShows.map((slot) => (
              <div key={slot.id} style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.25)',
                border: '1px solid rgba(255,255,255,0.05)',
                marginBottom: '10px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700 }}>
                  <span>{slot.patientName}</span>
                  <span style={{ color: '#f43f5e' }}>{slot.noShowRiskScore}% Risk</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {slot.time} • {slot.appointmentType}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#fb7185', marginTop: '4px' }}>
                  {slot.notes}
                </div>
              </div>
            ))}

            <button
              onClick={onNavigateToCapacity}
              className="btn-secondary"
              style={{ width: '100%', fontSize: '0.78rem', padding: '6px' }}
            >
              <span>Engage Auto-Standby & Ride Dispatch</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
