import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Bell, 
  Building2, 
  ChevronDown, 
  Moon, 
  Sun, 
  Sparkles,
  UserCheck
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
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSelectUser,
  isDark,
  onToggleTheme,
  onOpenSearch,
  unreadNotifications
}) => {
  const [showUserMenu, setShowUserMenu] = React.useState(false);

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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

        {/* Clinic Location Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '8px',
          border: '1px solid var(--border-subtle)',
          cursor: 'pointer'
        }}>
          <Building2 size={16} color="#06b6d4" />
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>MetroHealth Multispecialty Center</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Main Campus • 18 Exam Suites</div>
          </div>
          <ChevronDown size={14} color="var(--text-muted)" style={{ marginLeft: '4px' }} />
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
          color: 'var(--text-secondary)'
        }}
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '20px',
          padding: '5px 12px',
          fontSize: '0.75rem',
          color: '#34d399',
          fontWeight: 600
        }}>
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
            justifyContent: 'center'
          }}
          title="Toggle Dark/Light Mode"
        >
          {isDark ? <Sun size={17} color="#fbbf24" /> : <Moon size={17} color="#60a5fa" />}
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              padding: '8px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Bell size={17} />
          </button>
          {unreadNotifications > 0 && (
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
              {unreadNotifications}
            </span>
          )}
        </div>

        {/* Role & User Switcher */}
        <div style={{ position: 'relative' }}>
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
                  Switch Role / Persona
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
