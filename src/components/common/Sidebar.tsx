import React from 'react';
import { 
  LayoutDashboard, 
  FileCheck, 
  Mic2, 
  CalendarClock, 
  ReceiptText, 
  Lock,
  ShieldCheck,
  Stethoscope,
  Activity,
  PlusCircle,
  HelpCircle,
  Inbox,
  Dna,
  BookOpen,
  Layers,
  CreditCard
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'evidence_engine'
  | 'prior_auth'
  | 'ambient_soap'
  | 'inbox'
  | 'specialty'
  | 'capacity'
  | 'claims_scrubber'
  | 'pqc_security'
  | 'compliance'
  | 'pricing';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenNewPA: () => void;
  onOpenEvidence: () => void;
  pendingPACount: number;
  unscrubbedClaimsCount: number;
  noShowAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenNewPA,
  onOpenEvidence,
  pendingPACount,
  unscrubbedClaimsCount,
  noShowAlertsCount
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Practice Command',
      icon: LayoutDashboard,
      badge: null,
      desc: 'KPIs & Clinician Capacity'
    },
    {
      id: 'evidence_engine' as NavTab,
      label: 'Evidence Engine',
      icon: Layers,
      badge: 'CH-EV-001',
      badgeColor: '#0ea5e9',
      desc: 'Shared Provenance & Graph'
    },
    {
      id: 'prior_auth' as NavTab,
      label: 'AI Prior Auth Hub',
      icon: FileCheck,
      badge: pendingPACount > 0 ? `${pendingPACount} Active` : null,
      badgeColor: '#f59e0b',
      desc: 'Payor Rules & 278 EDI'
    },
    {
      id: 'ambient_soap' as NavTab,
      label: 'Ambient AI Charting',
      icon: Mic2,
      badge: 'Live AI',
      badgeColor: '#06b6d4',
      desc: 'Voice to SOAP & EHR Sync'
    },
    {
      id: 'inbox' as NavTab,
      label: 'Smart EHR Inbox',
      icon: Inbox,
      badge: '3 Triage',
      badgeColor: '#818cf8',
      desc: 'Asynchronous Refills & Team Orders'
    },
    {
      id: 'specialty' as NavTab,
      label: 'Specialty & Biologics',
      icon: Dna,
      badge: 'Carlisle 106%',
      badgeColor: '#fb7185',
      desc: 'Oncology & Biologics Fast-Track'
    },
    {
      id: 'capacity' as NavTab,
      label: 'Capacity & Scheduling',
      icon: CalendarClock,
      badge: noShowAlertsCount > 0 ? `${noShowAlertsCount} High Risk` : null,
      badgeColor: '#f43f5e',
      desc: 'No-Show AI & Slot Balancer'
    },
    {
      id: 'claims_scrubber' as NavTab,
      label: 'Claims Scrubber',
      icon: ReceiptText,
      badge: unscrubbedClaimsCount > 0 ? `${unscrubbedClaimsCount} Flags` : null,
      badgeColor: '#a855f7',
      desc: 'Pre-submission NCCI & Modifiers'
    },
    {
      id: 'pqc_security' as NavTab,
      label: 'PQC Quantum Shield',
      icon: Lock,
      badge: 'ML-KEM-768',
      badgeColor: '#06b6d4',
      desc: 'Post-Quantum Crypto & Shor Defense'
    },
    {
      id: 'compliance' as NavTab,
      label: 'HIPAA & Compliance',
      icon: ShieldCheck,
      badge: 'Protected',
      badgeColor: '#10b981',
      desc: 'Audit Trail & BAA Telemetry'
    },
    {
      id: 'pricing' as NavTab,
      label: 'Plans & Pricing',
      icon: CreditCard,
      badge: '3 Mo Free',
      badgeColor: '#f59e0b',
      desc: 'Stripe Subscriptions & Trial'
    }
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '20px 14px',
      height: 'calc(100vh - 65px)',
      position: 'sticky',
      top: '65px'
    }}>
      <div>
        {/* Quick Action Button */}
        <button
          onClick={onOpenNewPA}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '12px',
            fontSize: '0.85rem'
          }}
        >
          <PlusCircle size={18} />
          <span>New Prior Auth Request</span>
        </button>

        {/* Section Label */}
        <div style={{
          fontSize: '0.68rem',
          fontWeight: 800,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '0 8px 10px 8px'
        }}>
          Core Clinical Modules
        </div>

        {/* Nav Items List */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: isActive ? '1px solid var(--border-glow)' : '1px solid transparent',
                  background: isActive ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                  color: isActive ? '#60a5fa' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={18} color={isActive ? '#60a5fa' : 'currentColor'} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.825rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--text-primary)' : 'inherit',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {item.desc}
                  </div>
                </div>
                {item.badge && (
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '6px',
                    background: `${item.badgeColor}22`,
                    color: item.badgeColor,
                    border: `1px solid ${item.badgeColor}44`
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Practice Health & Evidence */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={onOpenEvidence}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            borderRadius: '8px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#c7d2fe',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <BookOpen size={14} color="#818cf8" />
          <span>Research & Evidence Library</span>
        </button>

        <div 
          onClick={() => onSelectTab('compliance')}
          className="glass-panel glass-panel-hover" 
          style={{ padding: '14px', borderRadius: '12px', cursor: 'pointer' }}
          title="Click to view HIPAA Compliance & Practice Health"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Activity size={16} color="#10b981" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Practice Health Engine
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            <span>EHR Sync Latency</span>
            <span style={{ color: '#34d399', fontWeight: 600 }}>0.42s (Optimal)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
            <span>Clean Claims Pass</span>
            <span style={{ color: '#60a5fa', fontWeight: 600 }}>98.4%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
