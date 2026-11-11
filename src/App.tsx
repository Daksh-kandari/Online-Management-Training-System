/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewMode, TrainingCategory } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TrainingProvider } from './context/TrainingContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { EmployeeTrainingsView } from './views/EmployeeTrainingsView';
import { RequestTrainingView } from './views/RequestTrainingView';
import { AdminLoginView } from './views/AdminLoginView';
import { AdminTrainingsView } from './views/AdminTrainingsView';
import { AdminAddTrainingView } from './views/AdminAddTrainingView';
import { AdminRequestsView } from './views/AdminRequestsView';
import { ShieldAlert } from 'lucide-react';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [prefillTopic, setPrefillTopic] = useState<string>('');
  const [prefillCategory, setPrefillCategory] = useState<TrainingCategory>('Technical');
  const [redirectNotice, setRedirectNotice] = useState<string | null>(null);

  const { isAdminLoggedIn } = useAuth();

  // Navigation handler with route guard enforcement
  const handleNavigate = (view: ViewMode) => {
    // Admin route protection: Admin pages must not open without login!
    const isAdminView =
      view === 'admin-trainings' ||
      view === 'admin-add-training' ||
      view === 'admin-requests';

    const isAuthenticated = isAdminLoggedIn || (typeof window !== 'undefined' && localStorage.getItem('skillbridge_admin_session_v1') === 'true');

    if (isAdminView && !isAuthenticated) {
      setRedirectNotice('Admin authentication required. Please log in with admin credentials to access that section.');
      setCurrentView('admin-login');
      return;
    }

    setRedirectNotice(null);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScheduleFromRequest = (topic: string, category: TrainingCategory) => {
    setPrefillTopic(topic);
    setPrefillCategory(category);
    setCurrentView('admin-add-training');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-rose-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Notice when user tried accessing admin route without login */}
        {redirectNotice && currentView === 'admin-login' && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm flex items-center gap-3 shadow-xs"
          >
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{redirectNotice}</span>
          </div>
        )}

        {currentView === 'home' && <HomeView onNavigate={handleNavigate} />}

        {currentView === 'employee-trainings' && (
          <EmployeeTrainingsView onNavigate={handleNavigate} />
        )}

        {currentView === 'request-training' && (
          <RequestTrainingView onNavigate={handleNavigate} />
        )}

        {currentView === 'admin-login' && (
          <AdminLoginView onNavigate={handleNavigate} />
        )}

        {/* Protected Admin Views */}
        {currentView === 'admin-trainings' && (
          isAdminLoggedIn ? (
            <AdminTrainingsView onNavigate={handleNavigate} />
          ) : (
            <AdminLoginView onNavigate={handleNavigate} />
          )
        )}

        {currentView === 'admin-add-training' && (
          isAdminLoggedIn ? (
            <AdminAddTrainingView
              onNavigate={handleNavigate}
              initialTopic={prefillTopic}
              initialCategory={prefillCategory}
            />
          ) : (
            <AdminLoginView onNavigate={handleNavigate} />
          )
        )}

        {currentView === 'admin-requests' && (
          isAdminLoggedIn ? (
            <AdminRequestsView
              onNavigate={handleNavigate}
              onScheduleFromRequest={handleScheduleFromRequest}
            />
          ) : (
            <AdminLoginView onNavigate={handleNavigate} />
          )
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TrainingProvider>
        <AppContent />
      </TrainingProvider>
    </AuthProvider>
  );
}
