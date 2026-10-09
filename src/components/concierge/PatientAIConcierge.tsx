import React, { useState } from 'react';
import {
  MessageSquare,
  Globe,
  Bot,
  User,
  Send,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Volume2,
  Sparkles,
  PhoneCall,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Languages
} from 'lucide-react';
import confetti from 'canvas-confetti';

type LanguageCode = 'en' | 'es' | 'zh' | 'hi' | 'ar' | 'fr';

interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English (US)', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (Mandarin)', flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }
];

interface ChatMessage {
  id: string;
  sender: 'ai' | 'patient';
  text: string;
  timestamp: string;
  actionCard?: {
    type: 'auth_status' | 'prep_guide' | 'refill_confirm';
    title: string;
    details: string[];
    badgeText: string;
  };
}

const INITIAL_MESSAGES: Record<LanguageCode, ChatMessage[]> = {
  en: [
    {
      id: 'm1',
      sender: 'ai',
      text: "Hello Eleanor! I'm your CuraHealth Care Concierge. How can I help you today with your upcoming appointments, prior authorizations, or medications?",
      timestamp: '10:14 AM'
    }
  ],
  es: [
    {
      id: 'm1_es',
      sender: 'ai',
      text: "¡Hola Eleanor! Soy su Asistente de Atención Médica de CuraHealth. ¿En qué puedo ayudarle hoy con sus citas, autorizaciones previas o medicamentos?",
      timestamp: '10:14 AM'
    }
  ],
  zh: [
    {
      id: 'm1_zh',
      sender: 'ai',
      text: "您好，Eleanor！我是您的 CuraHealth 医疗专属智能助手。今天在就诊准备、预授权或用药方面，有什么我可以协助您的吗？",
      timestamp: '10:14 AM'
    }
  ],
  hi: [
    {
      id: 'm1_hi',
      sender: 'ai',
      text: "नमस्ते Eleanor! मैं आपका CuraHealth हेल्थकेयर सहायक हूँ। आज मैं आपकी आगामी अपॉइंटमेंट, प्रायर ऑथराइजेशन या दवाओं में कैसे मदद कर सकता हूँ?",
      timestamp: '10:14 AM'
    }
  ],
  ar: [
    {
      id: 'm1_ar',
      sender: 'ai',
      text: "مرحباً إلينور! أنا مساعدك الطبي الذكي في CuraHealth. كيف يمكنني مساعدتك اليوم في مواعيدك القادمة أو الموافقات المسبقة أو الأدوية؟",
      timestamp: '10:14 AM'
    }
  ],
  fr: [
    {
      id: 'm1_fr',
      sender: 'ai',
      text: "Bonjour Eleanor ! Je suis votre assistant de soins CuraHealth. Comment puis-je vous aider aujourd'hui concernant vos rendez-vous, autorisations préalables ou traitements ?",
      timestamp: '10:14 AM'
    }
  ]
};

export const PatientAIConcierge: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('en');
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES['en']);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleLanguageChange = (lang: LanguageCode) => {
    setSelectedLang(lang);
    setMessages(INITIAL_MESSAGES[lang]);
  };

  const handleSendQuery = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'patient',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate AI response based on keywords
    setTimeout(() => {
      let aiResponse: ChatMessage;
      const lower = userText.toLowerCase();

      if (lower.includes('auth') || lower.includes('mri') || lower.includes('autoriz') || lower.includes('授权')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: selectedLang === 'es'
            ? "Buenas noticias: su autorización para la resonancia magnética cerebral (CPT 70553) fue aprobada electrónicamente por UnitedHealthcare."
            : selectedLang === 'zh'
            ? "好消息：您的脑部 MRI 增强检查（CPT 70553）已获得 UnitedHealthcare 医保预授权批准！"
            : "Great news: Your Brain MRI (CPT 70553) prior authorization was electronically approved by UnitedHealthcare this morning!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'auth_status',
            title: 'Prior Auth #AUTH-88291 Approved',
            details: [
              'Procedure: High-Field 3T Brain MRI with/without Contrast',
              'Payer: UnitedHealthcare Commercial',
              'Validity: Approved through July 15, 2026',
              'Estimated Patient Copay: $45.00 (Zero deductible remaining)'
            ],
            badgeText: 'APPROVED & CLEARED'
          }
        };
      } else if (lower.includes('prep') || lower.includes('fast') || lower.includes('prepar') || lower.includes('准备')) {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: selectedLang === 'es'
            ? "Aquí tiene su protocolo de preparación para el procedimiento de mañana:"
            : selectedLang === 'zh'
            ? "这是您明天检查的重要准备指导："
            : "Here is your customized clinical preparation guide for tomorrow's visit:",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionCard: {
            type: 'prep_guide',
            title: 'Procedure Preparation Protocol',
            details: [
              'Fasting: No solid food 6 hours prior to check-in (Water permitted up to 2h)',
              'Medications: Take morning blood pressure medicine with a small sip of water',
              'Hold Metformin on the morning of IV contrast infusion',
              'Transportation: An adult companion is recommended for discharge'
            ],
            badgeText: 'CLINICAL ACTION REQUIRED'
          }
        };
      } else {
        aiResponse = {
          id: `ai_${Date.now()}`,
          sender: 'ai',
          text: selectedLang === 'es'
            ? "He registrado su consulta y he notificado al equipo clínico de la Dra. Lin. Le responderemos en menos de 15 minutos."
            : selectedLang === 'zh'
            ? "我已记录您的需求并已同步至林医生的临床团队，稍后将向您推送最新进展。"
            : "I've noted that for you and updated your clinical chart with Dr. Lin's care team. Is there anything else you need assistance with?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  const handleSimulateVoice = () => {
    setIsAudioPlaying(true);
    setTimeout(() => {
      setIsAudioPlaying(false);
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
    }, 2200);
  };

  const currentLangObj = LANGUAGES.find(l => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div style={{ padding: '24px 32px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(14, 165, 233, 0.2))',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              padding: '6px 10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Languages size={16} color="#c084fc" />
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Innovation Module 04
              </span>
            </div>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(168, 85, 247, 0.15)',
              color: '#c084fc',
              border: '1px solid rgba(168, 85, 247, 0.3)'
            }}>
              6 Languages Real-Time
            </span>
          </div>

          <h1 style={{
            fontSize: '1.9rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 6px 0',
            background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Multilingual Patient AI Concierge
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, maxWidth: '750px' }}>
            Patient-facing conversational companion delivering empathetic appointment prep, prior auth transparency, 
            and bilingual medication instructions across 6 languages.
          </p>
        </div>

        {/* Language Selection Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: isSelected ? '1px solid #c084fc' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'rgba(168, 85, 247, 0.2)' : 'var(--bg-card)',
                  color: isSelected ? '#f8fafc' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Interactive Chat Console + Clinical Preparation Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        
        {/* Left: Interactive Chat Simulator */}
        <div className="glass-panel" style={{
          display: 'flex',
          flexDirection: 'column',
          height: '680px',
          overflow: 'hidden'
        }}>
          {/* Top Bar of Chat */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>
                  CuraHealth Patient Concierge
                </div>
                <div style={{ fontSize: '0.72rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  Online in {currentLangObj.nativeName}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleSimulateVoice}
                disabled={isAudioPlaying}
                className="btn-secondary"
                style={{
                  padding: '6px 12px',
                  fontSize: '0.74rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Volume2 size={14} color={isAudioPlaying ? '#38bdf8' : '#cbd5e1'} />
                <span>{isAudioPlaying ? 'Playing Voice Stream...' : 'Audio Readout'}</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((m) => {
              const isAi = m.sender === 'ai';
              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: isAi ? 'row' : 'row-reverse',
                    gap: '12px',
                    alignItems: 'flex-start'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isAi ? 'rgba(168, 85, 247, 0.2)' : 'rgba(14, 165, 233, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isAi ? <Bot size={16} color="#c084fc" /> : <User size={16} color="#38bdf8" />}
                  </div>

                  <div style={{ maxWidth: '80%' }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: isAi ? '0 14px 14px 14px' : '14px 0 14px 14px',
                      background: isAi ? 'rgba(255, 255, 255, 0.05)' : 'rgba(14, 165, 233, 0.2)',
                      border: isAi ? '1px solid var(--border-subtle)' : '1px solid rgba(14, 165, 233, 0.4)',
                      fontSize: '0.85rem',
                      lineHeight: '1.45',
                      color: '#f8fafc'
                    }}>
                      {m.text}

                      {/* Attached Action Card */}
                      {m.actionCard && (
                        <div style={{
                          marginTop: '12px',
                          padding: '12px',
                          borderRadius: '8px',
                          background: 'rgba(0, 0, 0, 0.3)',
                          border: '1px solid rgba(168, 85, 247, 0.3)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#c084fc' }}>
                              {m.actionCard.title}
                            </span>
                            <span style={{
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              background: 'rgba(16, 185, 129, 0.15)',
                              color: '#34d399',
                              padding: '2px 6px',
                              borderRadius: '4px'
                            }}>
                              {m.actionCard.badgeText}
                            </span>
                          </div>
                          <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.74rem', color: '#cbd5e1' }}>
                            {m.actionCard.details.map((d, idx) => (
                              <li key={idx} style={{ marginBottom: '4px' }}>{d}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div style={{
                      fontSize: '0.65rem',
                      color: 'var(--text-muted)',
                      marginTop: '4px',
                      textAlign: isAi ? 'left' : 'right'
                    }}>
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                <Bot size={16} color="#c084fc" />
                <span>AI Concierge is formulating medical response...</span>
              </div>
            )}
          </div>

          {/* Quick Reply Suggestions */}
          <div style={{
            padding: '10px 16px',
            background: 'rgba(0, 0, 0, 0.2)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto'
          }}>
            {[
              "Check Prior Authorization status for my MRI",
              "What are my preparation instructions for tomorrow?",
              "Request prescription refill for Lisinopril",
              "Explain my copay and insurance deductible"
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSendQuery(chip)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  whiteSpace: 'nowrap',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '10px',
            background: 'var(--bg-card)'
          }}>
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendQuery(inputQuery);
              }}
              placeholder={`Ask in ${currentLangObj.name} (e.g., prior auth status, fasting instructions)...`}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: '#fff',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleSendQuery(inputQuery)}
              className="btn-primary"
              style={{ padding: '0 16px', borderRadius: '8px' }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Right: Multi-Channel Patient Dispatch & Clinical Compliance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Dispatch Channel Card */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Smartphone size={18} color="#0ea5e9" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                Automated Multi-Channel Outreach
              </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Synchronized delivery via SMS, WhatsApp for Healthcare, and Secure Patient Portal.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Smartphone size={16} color="#38bdf8" />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>SMS Two-Way Conversational</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Opted-in • +1 (555) 019-2831</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>ACTIVE</span>
              </div>

              <div style={{
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <PhoneCall size={16} color="#34d399" />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>WhatsApp Health Notification</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Verified Meta Business API</div>
                  </div>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>CONNECTED</span>
              </div>
            </div>
          </div>

          {/* Real-Time Prior Auth Transparency */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FileText size={18} color="#c084fc" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                Patient-Facing Auth Transparency
              </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Demystifies insurance jargon into clear, plain-language milestone progress.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>Brain MRI 3T Scan</span>
                  <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700 }}>APPROVED</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '8px' }}>
                  UnitedHealthcare approved 4 hours ago. Scheduled for Oct 14 at 9:00 AM.
                </div>
                <div style={{ height: '4px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', background: '#10b981' }} />
                </div>
              </div>

              <div style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.06)',
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>Biologic Infusion (Mirikizumab)</span>
                  <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700 }}>IN REVIEW (DAY 3/5)</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginBottom: '8px' }}>
                  Anthem BCBS clinical nurse team is validating endoscopic biopsy history.
                </div>
                <div style={{ height: '4px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', background: '#f59e0b' }} />
                </div>
              </div>
            </div>
          </div>

          {/* HIPAA & Safety Safeguard */}
          <div className="glass-panel" style={{ padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={16} color="#10b981" />
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#34d399' }}>
                HIPAA & Medical Advice Guardrails
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
              The AI Concierge is constrained to administrative guidance, appointment readiness, 
              and clinician-approved instructions. Immediate triage routing to 911/emergency protocols is enforced.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
