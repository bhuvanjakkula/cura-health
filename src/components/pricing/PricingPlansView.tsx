import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  ExternalLink, 
  Gift, 
  Building2, 
  Stethoscope, 
  Crown, 
  ArrowRight,
  Zap,
  Dna,
  Lock,
  HeartHandshake
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface PlanTier {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  popular?: boolean;
  priceUSD: number;
  period: string;
  stripeUrl: string;
  targetAudience: string;
  features: string[];
  color: string;
  icon: any;
}

export const PRICING_PLANS: PlanTier[] = [
  {
    id: 'pro',
    name: 'Pro Plan',
    tagline: 'Solo Doctors & Independent Practices',
    priceUSD: 499,
    period: 'per month',
    stripeUrl: 'https://buy.stripe.com/test_dRm8wH9z536d3t78GjcjS0e',
    targetAudience: 'Solo Doctors, Private Clinics (1-3 Clinicians)',
    color: '#38bdf8',
    icon: Stethoscope,
    features: [
      'Up to 2 Clinicians & 3 Staff accounts',
      'Ambient AI SOAP Studio (250 visits/month)',
      'AI Prior Auth Hub (100 electronic submissions/mo)',
      'Pre-Submission Claims Scrubber & NCCI edits',
      'HIPAA Shield AES-256 Cloud Infrastructure',
      'Email & Live Chat Technical Support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional Plan',
    tagline: 'Multidisciplinary Groups & Surgical Centers',
    badge: 'MOST POPULAR',
    popular: true,
    priceUSD: 2999,
    period: 'per month',
    stripeUrl: 'https://buy.stripe.com/test_6oUbITaD9ayF0gVg8LcjS0f',
    targetAudience: 'Multidisciplinary Groups, Ambulatory Centers (4-20 Providers)',
    color: '#06b6d4',
    icon: Zap,
    features: [
      'Up to 15 Clinician Seats & Unlimited Staff',
      'Unlimited Ambient AI SOAP Charting & Voice Capture',
      'Full Prior Auth Hub with EDI 278 Direct Transmission',
      'Automated AI Appeal Letter Generator',
      'Capacity & Schedule Optimizer (No-Show Risk AI)',
      'Smart EHR Inbox: Protocolized Prescription Refill Automation',
      'Priority 24/7 Support with 1-Hour SLA'
    ]
  },
  {
    id: 'hospital',
    name: 'Hospital Plan',
    tagline: 'Community & Regional Inpatient/Outpatient Facilities',
    priceUSD: 15000,
    period: 'per month',
    stripeUrl: 'https://buy.stripe.com/test_eVq5kveTpayF6Fj8GjcjS0g',
    targetAudience: 'Hospitals, Health Centers, Surgical Pavilions (25-150 Beds)',
    color: '#10b981',
    icon: Building2,
    features: [
      'Hospital & Department-wide Licensing (ER, Inpatient, Surgical)',
      'CMS-0057-F HL7 Da Vinci CRD / DTR / PAS Endpoints',
      'Dual-SLA Adjudication Telemetry (Emergency <24h, Routine <72h)',
      'Multi-Clinic Campus Management & Scheduling Balancer',
      '21 CFR Part 11 & Immutable Cryptographic Audit Logs',
      'Dedicated Customer Success Lead & Quarterly Clinical Audits'
    ]
  },
  {
    id: 'pharma',
    name: 'Pharma & Specialty Biologics',
    tagline: 'Life Sciences, Hub Programs & Specialty Pharmacy',
    priceUSD: 25000,
    period: 'per month',
    stripeUrl: 'https://buy.stripe.com/test_eVq8wHh1xfSZ2p309NcjS0h',
    targetAudience: 'Pharmaceutical Manufacturers, Specialty Pharmacy Hubs',
    color: '#f43f5e',
    icon: Dna,
    features: [
      'Specialty Oncology & Biologics Fast-Track Hub',
      'Step-Therapy Criteria Verification (Carlisle & Bhardwaj)',
      'Biomarker Genomic Verification & Companion Diagnostics',
      'Automated Payer Medical Policy Guideline Parser',
      'Patient Copay Card & Manufacturer Financial Assistance Hub',
      'Reduces Specialty Overhead Ratio from 106% to <8%'
    ]
  },
  {
    id: 'enterprise',
    name: 'Health Enterprises',
    tagline: 'Integrated Delivery Networks & National Health Systems',
    badge: 'FLAGSHIP ENTERPRISE',
    priceUSD: 60000,
    period: 'per month',
    stripeUrl: 'https://buy.stripe.com/test_5kQ28j6mTcGNd3H8GjcjS0i',
    targetAudience: 'Integrated Delivery Networks (IDNs), National Hospital Chains (500+ Beds)',
    color: '#a855f7',
    icon: Crown,
    features: [
      'Unlimited Enterprise Seats across all Hospitals & Clinics',
      'Shared Clinical Evidence Engine (CH-EV-001) Graph',
      'PQC Quantum Defense Shield (NIST ML-KEM-768 & ML-DSA)',
      'Privacy-Preserving Record Linkage (PPRL) Identity Adjudication',
      '99.99% High-Availability Uptime SLA',
      'Custom EHR On-Prem Hybrid Connectors & Dedicated Engineers'
    ]
  }
];

export const PricingPlansView: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');

  const handleCheckoutClick = (plan: PlanTier) => {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    window.open(plan.stripeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto', color: 'var(--text-primary)' }}>
      {/* Hero Banner with 3 Months Free Trial Highlight */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(99, 102, 241, 0.25) 50%, rgba(16, 185, 129, 0.15) 100%)',
        border: '1px solid rgba(14, 165, 233, 0.4)',
        borderRadius: '20px',
        padding: '32px 36px',
        marginBottom: '32px',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '4px 12px',
                borderRadius: '20px',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
              }}>
                <Gift size={14} /> SPECIAL LAUNCH OFFER
              </span>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                ZERO RISK • CANCEL ANYTIME
              </span>
            </div>

            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, margin: '6px 0 10px 0', letterSpacing: '-0.02em' }}>
              Transparent Pricing & <span className="gradient-text-blue">3 Months Free Trial</span>
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '780px', margin: 0, lineHeight: 1.5 }}>
              All plans include an immediate <strong>3 Months Full-Access Free Trial ($0 due today)</strong>. Experience the entire CuraHealth OS ecosystem across clinical voice documentation, automated prior authorization, and claims protection before paid subscription begins.
            </p>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '14px',
            padding: '16px 20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Payment Security
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', justifyContent: 'center' }}>
              <ShieldCheck size={20} color="#10b981" />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>Powered by Stripe</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: '#38bdf8', marginTop: '4px' }}>
              Instant Activation & 256-bit SSL
            </div>
          </div>
        </div>
      </div>

      {/* 5 Plans Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '36px'
      }}>
        {PRICING_PLANS.map((plan) => {
          const Icon = plan.icon;
          const isSelected = selectedPlan === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`glass-panel ${plan.popular ? 'border-glow' : ''}`}
              style={{
                borderRadius: '16px',
                padding: '24px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                background: isSelected 
                  ? 'linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)' 
                  : 'rgba(17, 24, 39, 0.75)',
                border: isSelected ? `2px solid ${plan.color}` : '1px solid var(--border-subtle)',
                boxShadow: isSelected ? `0 12px 30px ${plan.color}25` : undefined,
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {/* Badges */}
              {plan.badge && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: plan.popular 
                    ? 'linear-gradient(135deg, #0ea5e9, #2563eb)' 
                    : 'linear-gradient(135deg, #a855f7, #6366f1)',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  letterSpacing: '0.04em'
                }}>
                  {plan.badge}
                </div>
              )}

              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: `${plan.color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${plan.color}44`
                  }}>
                    <Icon size={20} color={plan.color} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>{plan.name}</h3>
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
                      {plan.targetAudience}
                    </p>
                  </div>
                </div>

                {/* Price Display */}
                <div style={{
                  padding: '16px 0',
                  borderTop: '1px solid var(--border-subtle)',
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: '16px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontSize: '2.1rem', fontWeight: 900, color: '#f8fafc' }}>
                      ${plan.priceUSD.toLocaleString()}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      USD / month
                    </span>
                  </div>

                  {/* 3 Months Free Tag */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '8px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '0.72rem',
                    color: '#34d399',
                    fontWeight: 700
                  }}>
                    <Gift size={12} />
                    <span>3 Months Free Trial ($0 Due Today)</span>
                  </div>
                </div>

                {/* Features List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    What's Included:
                  </div>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.78rem' }}>
                      <Check size={15} color={plan.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckoutClick(plan);
                  }}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: plan.popular 
                      ? 'linear-gradient(135deg, #0ea5e9, #2563eb)' 
                      : `linear-gradient(135deg, ${plan.color}, #1e293b)`,
                    border: `1px solid ${plan.color}88`,
                    boxShadow: `0 4px 14px ${plan.color}35`
                  }}
                >
                  <CreditCard size={16} />
                  <span>Start 3 Months Free Trial</span>
                  <ExternalLink size={14} />
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Stripe Checkout &bull; Cancel anytime before Day 90
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise FAQ & Assurance */}
      <div className="glass-panel" style={{ padding: '28px', borderRadius: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HeartHandshake size={20} color="#06b6d4" />
          Enterprise Subscription & Trial Assurance
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
              How does the 3 Months Free Trial work?
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
              You will receive full access to all features on your chosen plan for 90 days. Stripe will securely record your billing method, but <strong>you will not be charged until the 90-day trial concludes</strong>. You may cancel with a single click inside your Stripe billing portal anytime.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
              Can we add extra clinicians mid-cycle?
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
              Yes. Practice administrators can add new physicians and nurse practitioners at prorated rates directly through the account settings. Enterprise and Hospital plans support volume licensing.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
              Is BAA and HIPAA covered under trial?
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
              Yes. All customer accounts receive an immediate digitally signed Business Associate Agreement (BAA) and full HIPAA / 21 CFR Part 11 cryptographic audit logging from Day 1.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
