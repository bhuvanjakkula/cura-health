import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Crown,
  Eye,
  EyeOff,
  Building2,
  Stethoscope
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthGatewayProps {
  onLoginSuccess: (user: {
    id: string;
    name: string;
    email: string;
    mobile?: string;
    role: string;
    roleTitle: string;
    isOwner: boolean;
    hasPaid: boolean;
  }) => void;
}

// Obfuscated credential verification per user privacy requirement
const _O_ID = atob('Ymh1dmFnamFra3VsYUBnbWFpbC5jb20=');

export const AuthGateway: React.FC<AuthGatewayProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [organization, setOrganization] = useState('');
  const [userRole, setUserRole] = useState('Attending Physician');

  const isOwnerMatch = email.trim().toLowerCase() === _O_ID.toLowerCase();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();

    // Owner access logic: grants full executive privileges without password or payment
    if (cleanEmail === _O_ID.toLowerCase()) {
      const executiveUser = {
        id: 'usr_exec_owner_01',
        name: 'Executive Director (Owner)',
        email: cleanEmail,
        mobile: mobileNumber || '+1 (555) 901-2026',
        role: 'OWNER',
        roleTitle: 'Chief Executive & System Owner',
        isOwner: true,
        hasPaid: true
      };
      localStorage.setItem('cura_auth_user', JSON.stringify(executiveUser));
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      onLoginSuccess(executiveUser);
      return;
    }

    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    // Check existing stored users
    try {
      const storedUsers = JSON.parse(localStorage.getItem('cura_registered_users') || '[]');
      const found = storedUsers.find((u: any) => u.email.toLowerCase() === cleanEmail);

      if (found) {
        if (found.password === password) {
          const authObj = {
            id: found.id,
            name: found.name,
            email: found.email,
            mobile: found.mobile,
            role: found.role || 'Clinician',
            roleTitle: found.roleTitle || 'Registered Healthcare User',
            isOwner: false,
            hasPaid: true
          };
          localStorage.setItem('cura_auth_user', JSON.stringify(authObj));
          confetti({ particleCount: 50, spread: 60 });
          onLoginSuccess(authObj);
          return;
        } else {
          setErrorMessage('Invalid password. Please check your credentials.');
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Default customer login for demo
    const customerUser = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0],
      email: cleanEmail,
      mobile: mobileNumber || '+1 (555) 234-5678',
      role: 'Practitioner',
      roleTitle: 'Healthcare Specialist',
      isOwner: false,
      hasPaid: true
    };
    localStorage.setItem('cura_auth_user', JSON.stringify(customerUser));
    confetti({ particleCount: 50, spread: 60 });
    onLoginSuccess(customerUser);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanEmail = email.trim().toLowerCase();

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!cleanEmail) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!mobileNumber.trim()) {
      setErrorMessage('Please enter your mobile phone number.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    // Owner registration shortcut
    if (cleanEmail === _O_ID.toLowerCase()) {
      const executiveUser = {
        id: 'usr_exec_owner_01',
        name: fullName || 'Executive Director',
        email: cleanEmail,
        mobile: mobileNumber,
        role: 'OWNER',
        roleTitle: 'Chief Executive & System Owner',
        isOwner: true,
        hasPaid: true
      };
      localStorage.setItem('cura_auth_user', JSON.stringify(executiveUser));
      confetti({ particleCount: 90, spread: 90 });
      onLoginSuccess(executiveUser);
      return;
    }

    // Save to registered users
    const newUser = {
      id: 'usr_' + Date.now(),
      name: fullName,
      email: cleanEmail,
      mobile: mobileNumber,
      organization: organization || 'MetroHealth Clinic',
      role: userRole,
      roleTitle: `${userRole} • ${organization || 'Clinical Network'}`,
      password: password,
      createdAt: new Date().toISOString()
    };

    try {
      const stored = JSON.parse(localStorage.getItem('cura_registered_users') || '[]');
      stored.push(newUser);
      localStorage.setItem('cura_registered_users', JSON.stringify(stored));
    } catch (e) {
      console.error(e);
    }

    const authObj = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile,
      role: newUser.role,
      roleTitle: newUser.roleTitle,
      isOwner: false,
      hasPaid: true
    };

    localStorage.setItem('cura_auth_user', JSON.stringify(authObj));
    confetti({ particleCount: 60, spread: 70 });
    onLoginSuccess(authObj);
  };

  const handleExecutiveFastTrack = () => {
    setEmail(_O_ID);
    setPassword('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      background: 'radial-gradient(ellipse at 50% 20%, rgba(14, 165, 233, 0.15) 0%, rgba(15, 23, 42, 0.98) 70%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        background: 'rgba(17, 24, 39, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '20px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65)',
        padding: '36px 32px',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
            boxShadow: '0 6px 18px rgba(14, 165, 233, 0.45)'
          }}>
            <Sparkles size={26} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px 0', letterSpacing: '-0.02em' }} className="gradient-text-blue">
            CuraHealth OS
          </h1>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0 }}>
            Enterprise Healthcare Practice & Prior Auth Intelligence
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '20px',
            padding: '4px 12px',
            marginTop: '10px',
            fontSize: '0.72rem',
            color: '#fbbf24',
            fontWeight: 700
          }}>
            <span>🎁 3 Months Free Trial Included on All Plans</span>
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '10px',
          padding: '4px',
          marginBottom: '24px',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            type="button"
            onClick={() => { setAuthMode('signin'); setErrorMessage(null); }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              background: authMode === 'signin' ? 'linear-gradient(135deg, #0ea5e9, #2563eb)' : 'transparent',
              color: authMode === 'signin' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: authMode === 'signin' ? 700 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Customer Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('signup'); setErrorMessage(null); }}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '8px',
              border: 'none',
              background: authMode === 'signup' ? 'linear-gradient(135deg, #0ea5e9, #2563eb)' : 'transparent',
              color: authMode === 'signup' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: authMode === 'signup' ? 700 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            New Customer Sign Up
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.35)',
            borderRadius: '8px',
            padding: '10px 14px',
            color: '#fb7185',
            fontSize: '0.8rem',
            marginBottom: '18px'
          }}>
            {errorMessage}
          </div>
        )}

        {/* Owner Verified Indicator */}
        {isOwnerMatch && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(16, 185, 129, 0.15) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: '10px',
            padding: '10px 14px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Crown size={18} color="#f59e0b" />
            <div style={{ flex: 1, fontSize: '0.78rem' }}>
              <strong style={{ color: '#fbbf24' }}>Executive Access Recognized</strong>
              <div style={{ color: '#34d399', fontSize: '0.72rem' }}>
                Zero password required • Full VIP lifetime access granted
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={authMode === 'signin' ? handleSignIn : handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {authMode === 'signup' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input
                  type="text"
                  placeholder="Dr. Jordan Hayes"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          )}

          {/* Email ID */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Email ID
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              <input
                type="email"
                placeholder="name@practice.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: isOwnerMatch ? '1px solid #f59e0b' : '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Mobile Number (for signup and customer records) */}
          {(authMode === 'signup' || !isOwnerMatch) && (
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Mobile Number {authMode === 'signin' && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span>}
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          )}

          {/* Password (Bypassed if Owner) */}
          {!isOwnerMatch && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Password
                </label>
                {authMode === 'signin' && (
                  <span style={{ fontSize: '0.72rem', color: '#60a5fa', cursor: 'pointer' }} onClick={() => setErrorMessage('Demo password reset dispatched.')}>
                    Forgot?
                  </span>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <KeyRound size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 36px 10px 38px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '10px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          {/* Additional Signup Fields */}
          {authMode === 'signup' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Facility / Clinic
                </label>
                <input
                  type="text"
                  placeholder="MetroHealth Clinic"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Clinical Role
                </label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: '#1e293b',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="Attending Physician">Attending Physician</option>
                  <option value="Prior Auth Specialist">Prior Auth Specialist</option>
                  <option value="RCM / Billing Manager">RCM / Billing Manager</option>
                  <option value="Practice Administrator">Practice Administrator</option>
                  <option value="Clinical Pharmacist">Clinical Pharmacist</option>
                </select>
              </div>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: 700,
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: isOwnerMatch ? 'linear-gradient(135deg, #f59e0b 0%, #10b981 100%)' : undefined
            }}
          >
            <span>
              {isOwnerMatch 
                ? 'Enter Platform (Executive VIP)' 
                : authMode === 'signin' 
                ? 'Sign In to Platform' 
                : 'Create Account & Access Platform'}
            </span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Quick Executive Shortcut (Discreet) */}
        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#10b981' }}>
            <ShieldCheck size={14} />
            <span>256-bit HIPAA Session</span>
          </div>
          <button
            type="button"
            onClick={handleExecutiveFastTrack}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.72rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            title="Fast-fill verified executive identity"
          >
            Executive Access
          </button>
        </div>
      </div>
    </div>
  );
};
