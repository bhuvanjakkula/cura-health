import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Bell, 
  Building2, 
  ChevronDown, 
  Moon, 
  Sun, 
  Sparkles,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Check,
  Trash2,
  Lock,
  Layers,
  Inbox
} from 'lucide-react';
import { UserProfile } from '../../types';
import { USER_PROFILES } from '../../data/mockData';

interface HeaderProps {
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  unreadNotifications: number;
  onNavigateTab?: (tab: string, id?: string) => void;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'urgent' | 'warning' | 'info' | 'success';
  tab: string;
  read: boolean;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Prior Auth Pending Adjudication',
    message: 'Elena Rostova (MRN-849201) • CPT 70553 MRI Brain pending payor review. SLA deadline: 14 hrs remaining.',
    time: '10m ago',
    type: 'warning',
    tab: 'prior_auth',
    read: false
  },
  {
    id: 'notif_2',
    title: 'Claims Scrubber NCCI Edit Flagged',
    message: 'Marcus Holloway (MRN-723910) • CPT 29881 + 29877 unbundling flagged. Action needed to protect $1,840.',
    time: '25m ago',
    type: 'urgent',
    tab: 'claims_scrubber',
    read: false
  },
  {
    id: 'notif_3',
    title: 'High No-Show Risk Predicted (78%)',
    message: 'Elena Rostova 9:00 AM appointment predicted no-show. Auto-standby waitlist ready to backfill.',
    time: '45m ago',
    type: 'warning',
    tab: 'capacity',
    read: false
  },
  {
    id: 'notif_4',
    title: 'EHR Inbox Protocol Refill Pending',
    message: 'Sumatriptan 100mg refill request queued for Clinical Pharmacy Tech protocol sign-off.',
    time: '1h ago',
    type: 'info',
    tab: 'inbox',
    read: false
  },
  {
    id: 'notif_5',
    title: 'PQC Quantum Shield Verified',
    message: 'NIST ML-KEM-768 hybrid key exchange active across all 18 clinical encounter endpoints.',
    time: '2h ago',
    type: 'success',
    tab: 'pqc_security',
    read: false
  }
];

const CLINIC_LOCATIONS = [
  { name: 'MetroHealth Multispecialty Center', campus: 'Main Campus • 18 Exam Suites' },
  { name: 'Westside Ambulatory Pavilion', campus: 'West Campus • Surgical & Imaging' },
  { name: 'North Memorial Cancer Center', campus: 'Oncology & Biologics Wing' },
  { name: 'Eastside Neuroscience Pavilion', campus: 'Neurology & Diagnostics' }
];

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSelectUser,
  isDark,
  onToggleTheme,
  onOpenSearch,
  unreadNotifications,
  onNavigateTab
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showClinicMenu, setShowClinicMenu] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(CLINIC_LOCATIONS[0]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const clinicRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifMenu(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (clinicRef.current && !clinicRef.current.contains(event.target as Node)) {
        setShowClinicMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
    setShowNotifMenu(false);
    if (onNavigateTab) {
      onNavigateTab(notif.tab);
    }
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 24px',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--bg-secondary)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Brand & Clinic Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => onNavigateTab && onNavigateTab('dashboard')}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.4)'
          }}>
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em' }} className="gradient-text-blue">
                CuraHealth
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                background: 'rgba(6, 182, 212, 0.15)',
                color: '#06b6d4',
                padding: '1px 6px',
                borderRadius: '4px',
                border: '1px solid rgba(6, 182, 212, 0.3)'
              }}>
                OS v2.4
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Practice & Prior Auth Intelligence
            </p>
          </div>
        </div>

        {/* Clinic Location Selector Dropdown */}
        <div style={{ position: 'relative' }} ref={clinicRef}>
          <div 
            onClick={() => setShowClinicMenu(!showClinicMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            <Building2 size={16} color="#06b6d4" />
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{selectedClinic.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{selectedClinic.campus}</div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" style={{ marginLeft: '4px' }} />
          </div>

          {showClinicMenu && (
            <div style={{
              position: 'absolute',
              left: 0,
              top: '48px',
              width: '320px',
              background: '#111827',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)',
              padding: '8px',
              zIndex: 100
            }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                Select Campus Location
              </div>
              {CLINIC_LOCATIONS.map((loc) => (
                <div
                  key={loc.name}
                  onClick={() => {
                    setSelectedClinic(loc);
                    setShowClinicMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: selectedClinic.name === loc.name ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                    marginTop: '4px'
                  }}
                >
                  <Building2 size={16} color={selectedClinic.name === loc.name ? '#06b6d4' : '#64748b'} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>{loc.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{loc.campus}</div>
                  </div>
                  {selectedClinic.name === loc.name && <Check size={14} color="#06b6d4" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Search Trigger */}
      <div 
        onClick={onOpenSearch}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '10px',
          padding: '8px 16px',
          width: '340px',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          transition: 'border-color 0.2s'
        }}
        title="Quick Search (Ctrl+K or Cmd+K)"
      >
        <Search size={16} />
        <span style={{ fontSize: '0.825rem', flex: 1 }}>Search patient, CPT code, Prior Auth...</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          <span className="kbd-key">⌘</span>
          <span className="kbd-key">K</span>
        </div>
      </div>

      {/* Right Controls: HIPAA Badge, Theme, Notifications & User Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Live HIPAA Shield Indicator */}
        <div 
          onClick={() => onNavigateTab && onNavigateTab('compliance')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '20px',
            padding: '5px 12px',
            fontSize: '0.75rem',
            color: '#34d399',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          title="Click to view HIPAA Compliance Shield"
        >
          <ShieldCheck size={15} color="#10b981" />
          <span>HIPAA Shield Active (AES-256)</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          style={{
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            padding: '8px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s'
          }}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#60a5fa" />}
        </button>

        {/* Notifications Dropdown Panel */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            style={{
              background: showNotifMenu ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-elevated)',
              border: showNotifMenu ? '1px solid #3b82f6' : '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'all 0.2s'
            }}
            title="Notifications and Clinical Alerts"
          >
            <Bell size={17} color={showNotifMenu ? '#60a5fa' : 'currentColor'} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#f43f5e',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px rgba(244, 63, 94, 0.6)'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '380px',
              background: '#111827',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
              padding: '12px',
              zIndex: 100
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                paddingBottom: '10px', 
                borderBottom: '1px solid var(--border-subtle)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={16} color="#06b6d4" />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                    Notifications & Alerts ({notifications.length})
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#60a5fa',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Check size={12} /> Mark read
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Trash2 size={12} /> Clear
                    </button>
                  )}
                </div>
              </div>

              {notifications.length === 0 ? (
                <div style={{ padding: '24px 12px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <CheckCircle2 size={24} color="#10b981" style={{ margin: '0 auto 8px auto' }} />
                  All notifications cleared. Practice operations nominal!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '380px', overflowY: 'auto', marginTop: '10px' }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => handleNotificationClick(notif)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        background: notif.read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(59, 130, 246, 0.08)',
                        border: notif.read ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(59, 130, 246, 0.3)',
                        cursor: 'pointer',
                        transition: 'background 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {notif.type === 'urgent' && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f43f5e' }} />}
                          {notif.type === 'warning' && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />}
                          {notif.type === 'info' && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }} />}
                          {notif.type === 'success' && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />}
                          <span style={{ fontSize: '0.8rem', fontWeight: notif.read ? 600 : 700, color: notif.read ? 'var(--text-secondary)' : '#ffffff' }}>
                            {notif.title}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{notif.time}</span>
                      </div>
                      <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: '0 0 6px 0', lineHeight: 1.35 }}>
                        {notif.message}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ 
                          fontSize: '0.65rem', 
                          color: '#38bdf8', 
                          textTransform: 'uppercase', 
                          fontWeight: 700,
                          background: 'rgba(56, 189, 248, 0.1)',
                          padding: '1px 6px',
                          borderRadius: '4px'
                        }}>
                          {notif.tab.replace('_', ' ')}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                          Open <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Role & User Switcher */}
        <div style={{ position: 'relative' }} ref={userRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              padding: '5px 12px 5px 6px',
              borderRadius: '30px',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1.2 }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#06b6d4', fontWeight: 600 }}>
                {currentUser.roleTitle.split('&')[0]}
              </div>
            </div>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {showUserMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '48px',
              width: '280px',
              background: '#111827',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)',
              padding: '8px',
              zIndex: 100
            }}>
              <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Switch Role / Persona (7 Roles)
                </span>
              </div>
              {USER_PROFILES.map((usr) => (
                <div
                  key={usr.id}
                  onClick={() => {
                    onSelectUser(usr);
                    setShowUserMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: currentUser.id === usr.id ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                    marginTop: '4px'
                  }}
                >
                  <img src={usr.avatar} alt={usr.name} style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600 }}>{usr.name}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{usr.roleTitle}</div>
                  </div>
                  {currentUser.id === usr.id && <UserCheck size={16} color="#3b82f6" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
