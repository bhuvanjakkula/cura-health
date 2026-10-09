import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Sidebar, NavTab } from './components/common/Sidebar';
import { PracticeDashboard } from './components/dashboard/PracticeDashboard';
import { PriorAuthHub } from './components/priorauth/PriorAuthHub';
import { AmbientSOAPStudio } from './components/charting/AmbientSOAPStudio';
import { CapacityOptimizer } from './components/capacity/CapacityOptimizer';
import { ClaimsScrubber } from './components/scrubber/ClaimsScrubber';
import { ComplianceShield } from './components/compliance/ComplianceShield';
import { PQCDefenseShield } from './components/security/PQCDefenseShield';
import { SmartEHRInbox } from './components/inbox/SmartEHRInbox';
import { BiologicsOncologyHub } from './components/specialty/BiologicsOncologyHub';
import { ResearchEvidenceModal } from './components/evidence/ResearchEvidenceModal';
import { ClinicalEvidenceEngine } from './components/evidence/ClinicalEvidenceEngine';
import { NewPriorAuthModal } from './components/modals/NewPriorAuthModal';
import { AppealGeneratorModal } from './components/modals/AppealGeneratorModal';
import { QuickPatientSearchModal } from './components/modals/QuickPatientSearchModal';
import { AuthGateway } from './components/auth/AuthGateway';

import { 
  USER_PROFILES, 
  MOCK_PRIOR_AUTHS, 
  MOCK_SCHEDULE_SLOTS, 
  MOCK_CLAIMS_SCRUBBER 
} from './data/mockData';
import { PriorAuthItem, ScheduleSlot, ClaimScrubberItem, UserProfile } from './types';

export function App() {
  const [authUser, setAuthUser] = useState<any>(() => {
    try {
      const saved = localStorage.getItem('cura_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [currentUser, setCurrentUser] = useState<UserProfile>(USER_PROFILES[0]);
  const [isDark, setIsDark] = useState(true);
  
  // App Data State
  const [priorAuths, setPriorAuths] = useState<PriorAuthItem[]>(MOCK_PRIOR_AUTHS);
  const [scheduleSlots, setScheduleSlots] = useState<ScheduleSlot[]>(MOCK_SCHEDULE_SLOTS);
  const [claims, setClaims] = useState<ClaimScrubberItem[]>(MOCK_CLAIMS_SCRUBBER);
  
  // Navigation & Modal States
  const [selectedPaId, setSelectedPaId] = useState<string | undefined>(undefined);
  const [isNewPaModalOpen, setIsNewPaModalOpen] = useState(false);
  const [appealPaTarget, setAppealPaTarget] = useState<PriorAuthItem | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Global Cmd+K keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleUpdatePriorAuth = (updated: PriorAuthItem) => {
    setPriorAuths(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleAddNewPriorAuth = (newItem: PriorAuthItem) => {
    setPriorAuths(prev => [newItem, ...prev]);
    setSelectedPaId(newItem.id);
    setActiveTab('prior_auth');
  };

  const handleUpdateScheduleSlot = (updated: ScheduleSlot) => {
    setScheduleSlots(prev => prev.map(s => s.id === updated.id ? updated : s));
  };

  const handleUpdateClaims = (updatedClaims: ClaimScrubberItem[]) => {
    setClaims(updatedClaims);
  };

  const handleOpenAppealModal = (pa: PriorAuthItem) => {
    setAppealPaTarget(pa);
  };

  const handleAppealSubmitted = (updated: PriorAuthItem) => {
    handleUpdatePriorAuth(updated);
  };

  const handleNavigateFromSearch = (tab: NavTab, id?: string) => {
    setActiveTab(tab);
    if (tab === 'prior_auth' && id) {
      setSelectedPaId(id);
    }
  };

  const pendingPACount = priorAuths.filter(p => p.status === 'pending_review' || p.status === 'pended_additional_info').length;
  const unscrubbedClaimsCount = claims.filter(c => c.status === 'flagged').length;
  const noShowAlertsCount = scheduleSlots.filter(s => s.noShowRiskScore >= 50).length;

  if (!authUser) {
    return (
      <div style={{ minHeight: '100vh' }} className="bg-gradient-mesh">
        <AuthGateway 
          onLoginSuccess={(user) => {
            setAuthUser(user);
            if (user.isOwner) {
              const exec = USER_PROFILES.find(p => p.role === 'physician') || USER_PROFILES[0];
              setCurrentUser({
                ...exec,
                name: user.name,
                roleTitle: user.roleTitle
              });
            }
          }} 
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="bg-gradient-mesh">
      {/* Top Application Header */}
      <Header
        currentUser={currentUser}
        onSelectUser={setCurrentUser}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        unreadNotifications={pendingPACount + unscrubbedClaimsCount}
        onNavigateTab={(tab, id) => {
          setActiveTab(tab as NavTab);
          if (id && tab === 'prior_auth') setSelectedPaId(id);
        }}
        onSignOut={() => {
          localStorage.removeItem('cura_auth_user');
          setAuthUser(null);
        }}
      />

      {/* Main App Layout (Sidebar + Content Workspace) */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenNewPA={() => setIsNewPaModalOpen(true)}
          onOpenEvidence={() => setIsEvidenceModalOpen(true)}
          pendingPACount={pendingPACount}
          unscrubbedClaimsCount={unscrubbedClaimsCount}
          noShowAlertsCount={noShowAlertsCount}
        />

        <main style={{ flex: 1, minWidth: 0, overflowX: 'hidden' }}>
          {activeTab === 'dashboard' && (
            <PracticeDashboard
              priorAuths={priorAuths}
              scheduleSlots={scheduleSlots}
              claims={claims}
              currentUser={currentUser}
              onNavigateToPA={(id) => {
                if (id) setSelectedPaId(id);
                setActiveTab('prior_auth');
              }}
              onNavigateToCharting={() => setActiveTab('ambient_soap')}
              onNavigateToCapacity={() => setActiveTab('capacity')}
              onNavigateToScrubber={() => setActiveTab('claims_scrubber')}
              onOpenNewPA={() => setIsNewPaModalOpen(true)}
              onNavigateToEvidence={() => setActiveTab('evidence_engine')}
            />
          )}

          {activeTab === 'evidence_engine' && (
            <ClinicalEvidenceEngine />
          )}

          {activeTab === 'prior_auth' && (
            <PriorAuthHub
              priorAuths={priorAuths}
              selectedPaId={selectedPaId}
              onUpdatePriorAuth={handleUpdatePriorAuth}
              onOpenNewModal={() => setIsNewPaModalOpen(true)}
              onOpenAppealModal={handleOpenAppealModal}
            />
          )}

          {activeTab === 'ambient_soap' && (
            <AmbientSOAPStudio />
          )}

          {activeTab === 'inbox' && (
            <SmartEHRInbox />
          )}

          {activeTab === 'specialty' && (
            <BiologicsOncologyHub />
          )}

          {activeTab === 'capacity' && (
            <CapacityOptimizer
              scheduleSlots={scheduleSlots}
              onUpdateSlot={handleUpdateScheduleSlot}
            />
          )}

          {activeTab === 'claims_scrubber' && (
            <ClaimsScrubber
              claims={claims}
              onUpdateClaims={handleUpdateClaims}
            />
          )}

          {activeTab === 'pqc_security' && (
            <PQCDefenseShield />
          )}

          {activeTab === 'compliance' && (
            <ComplianceShield />
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      {isNewPaModalOpen && (
        <NewPriorAuthModal
          isOpen={isNewPaModalOpen}
          onClose={() => setIsNewPaModalOpen(false)}
          onSubmit={handleAddNewPriorAuth}
        />
      )}

      {appealPaTarget !== null && (
        <AppealGeneratorModal
          isOpen={appealPaTarget !== null}
          onClose={() => setAppealPaTarget(null)}
          priorAuth={appealPaTarget}
          onAppealSubmitted={handleAppealSubmitted}
        />
      )}

      {isSearchModalOpen && (
        <QuickPatientSearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onNavigate={handleNavigateFromSearch}
        />
      )}

      {isEvidenceModalOpen && (
        <ResearchEvidenceModal
          isOpen={isEvidenceModalOpen}
          onClose={() => setIsEvidenceModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
