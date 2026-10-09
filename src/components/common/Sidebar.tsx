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
  CreditCard,
  Bot,
  HeartPulse,
  TrendingUp,
  Languages,
  Network,
  Sparkles,
  Zap,
  DollarSign
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'c2r_engine'
  | 'digital_twin'
  | 'predictive_revenue'
  | 'patient_concierge'
  | 'federated_network'
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
  const innovationNavItems = [
    {
      id: 'c2r_engine' as NavTab,
      label: 'C2R Autonomous Engine',
      icon: Bot,
      badge: 'Auto Agents',
      badgeColor: '#0ea5e9',
      desc: 'Doc-to-Evidence & Auth Pipeline'
    },
    {
      id: 'digital_twin' as NavTab,
      label: 'Patient Digital Twin',
      icon: HeartPulse,
      badge: 'Kinetics',
      badgeColor: '#38bdf8',
      desc: 'Longitudinal Lab & In-Silico Sim'
    },
    {
      id: 'predictive_revenue' as NavTab,
      label: 'Predictive Revenue AI',
      icon: DollarSign,
      badge: 'Denial Shield',
      badgeColor: '#10b981',
      desc: 'Payer Risk & 90-Day Cash Velocity'
    },
    {
      id: 'patient_concierge' as NavTab,
      label: 'Multilingual Concierge',
      icon: Languages,
      badge: '6 Langs',
      badgeColor: '#c084fc',
      desc: 'Patient Prep, Auth & Refills'
    },
    {
      id: 'federated_network' as NavTab,
      label: 'Federated AI Network',
      icon: Network,
      badge: 'Zero PHI',
      badgeColor: '#06b6d4',
      desc: 'Decentralized Hospital Models'
    }
  ];

  const coreNavItems = [
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

  const renderNavList = (items: typeof coreNavItems) => (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 10px',
              borderRadius: '9px',
              border: isActive ? '1px solid var(--border-glow)' : '1px solid transparent',
              background: isActive ? 'rgba(59, 130, 246, 0.14)' : 'transparent',
              color: isActive ? '#60a5fa' : 'var(--text-secondary)',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              background: isActive ? 'rgba(59, 130, 246, 0.25)' : 'rgba(255, 255, 255, 0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon size={16} color={isActive ? '#60a5fa' : 'currentColor'} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--text-primary)' : 'inherit',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {item.label}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.desc}
              </div>
            </div>
            {item.badge && (
              <span style={{
                fontSize: '0.62rem',
                fontWeight: 700,
                padding: '1px 5px',
                borderRadius: '5px',
                background: `${item.badgeColor}22`,
                color: item.badgeColor,
                border: `1px solid ${item.badgeColor}44`,
                whiteSpace: 'nowrap'
              }}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );

  return (
    <aside style={{
      width: '270px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '16px 12px',
      height: 'calc(100vh - 65px)',
      position: 'sticky',
      top: '65px',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Quick Action Button */}
        <button
          onClick={onOpenNewPA}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            fontSize: '0.82rem'
          }}
        >
          <PlusCircle size={16} />
          <span>New Prior Auth Request</span>
        </button>

        {/* Section: Next-Gen AI Innovations */}
        <div>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 800,
            color: '#38bdf8',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '0 6px 6px 6px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={12} color="#38bdf8" />
            <span>AI Engine Innovations</span>
          </div>
          {renderNavList(innovationNavItems)}
        </div>

        {/* Section: Core Practice Modules */}
        <div>
          <div style={{
            fontSize: '0.65rem',
            fontWeight: 800,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            padding: '4px 6px 6px 6px'
          }}>
            Core Clinical Practice
          </div>
          {renderNavList(coreNavItems)}
        </div>
      </div>

      {/* Bottom Practice Health & Evidence */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
        <button
          onClick={onOpenEvidence}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 10px',
            borderRadius: '8px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#c7d2fe',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            width: '100%',
            justifyContent: 'center'
          }}
        >
          <BookOpen size={13} color="#818cf8" />
          <span>Research & Evidence Library</span>
        </button>

        <div 
          onClick={() => onSelectTab('compliance')}
          className="glass-panel glass-panel-hover" 
          style={{ padding: '10px 12px', borderRadius: '10px', cursor: 'pointer' }}
          title="Click to view HIPAA Compliance & Practice Health"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Activity size={14} color="#10b981" />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Practice Health Engine
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>
            <span>EHR Sync Latency</span>
            <span style={{ color: '#34d399', fontWeight: 600 }}>0.42s (Optimal)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
            <span>Clean Claims Pass</span>
            <span style={{ color: '#60a5fa', fontWeight: 600 }}>98.6%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
