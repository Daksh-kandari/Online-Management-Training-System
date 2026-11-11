import React, { useState } from 'react';
import { ViewMode } from '../types';
import { useAuth } from '../context/AuthContext';
import { useTrainings } from '../context/TrainingContext';
import {
  GraduationCap,
  Calendar,
  PlusCircle,
  FileText,
  ShieldCheck,
  LogOut,
  LogIn,
  Home,
  SlidersHorizontal,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { isAdminLoggedIn, adminUser, logout } = useAuth();
  const { requests } = useTrainings();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pendingRequestsCount = requests.filter((r) => r.status === 'Pending').length;

  const handleNavClick = (view: ViewMode) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
            <span className="truncate">Online Training Management System</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {isAdminLoggedIn ? (
              <span className="text-amber-300 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Active ({adminUser?.email})</span>
                <span className="sm:hidden">Admin</span>
              </span>
            ) : (
              <span className="text-slate-400 flex items-center gap-1">
                <span>Employee Mode (No Login)</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 text-white flex items-center justify-center shadow-md shadow-rose-200 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="font-bold text-base sm:text-lg text-slate-900 leading-tight flex items-center gap-1.5">
                <span>SkillBridge</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">
                  LMS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Corporate Training Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {/* Common / Employee Links */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'home'
                  ? 'bg-rose-50 text-rose-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleNavClick('employee-trainings')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'employee-trainings'
                  ? 'bg-rose-50 text-rose-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>View Trainings</span>
            </button>

            <button
              onClick={() => handleNavClick('request-training')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'request-training'
                  ? 'bg-rose-50 text-rose-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Request Training</span>
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            {/* Admin Section */}
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleNavClick('admin-trainings')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentView === 'admin-trainings'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                      : 'text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/50'
                  }`}
                  title="Manage Trainings"
                >
                  <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                  <span>Manage Trainings</span>
                </button>

                <button
                  onClick={() => handleNavClick('admin-add-training')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentView === 'admin-add-training'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                      : 'text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/50'
                  }`}
                  title="Add Training"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-600" />
                  <span>Add Training</span>
                </button>

                <button
                  onClick={() => handleNavClick('admin-requests')}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    currentView === 'admin-requests'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                      : 'text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/50'
                  }`}
                  title="View Requests by Category"
                >
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Requests</span>
                  {pendingRequestsCount > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-amber-500 text-white">
                      {pendingRequestsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    logout();
                    handleNavClick('home');
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1.5"
                  title="Logout from Admin Portal"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('admin-login')}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  currentView === 'admin-login'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <LogIn className="w-4 h-4 text-slate-600" />
                <span>Admin Login</span>
              </button>
            )}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            {!isAdminLoggedIn && (
              <button
                onClick={() => handleNavClick('admin-login')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-800" />
              ) : (
                <Menu className="w-6 h-6 text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {isMobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-1">
            Navigation Menu
          </div>

          <button
            onClick={() => handleNavClick('home')}
            className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 text-left ${
              currentView === 'home'
                ? 'bg-rose-50 text-rose-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Home className="w-4 h-4 text-rose-500" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleNavClick('employee-trainings')}
            className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 text-left ${
              currentView === 'employee-trainings'
                ? 'bg-rose-50 text-rose-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-4 h-4 text-rose-500" />
            <span>View All Trainings</span>
          </button>

          <button
            onClick={() => handleNavClick('request-training')}
            className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 text-left ${
              currentView === 'request-training'
                ? 'bg-rose-50 text-rose-700 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-500" />
            <span>Request a Training</span>
          </button>

          {/* Admin Specific Links on Mobile */}
          <div className="pt-2 border-t border-slate-100">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Admin Portal
            </div>

            {isAdminLoggedIn ? (
              <div className="space-y-1">
                <button
                  onClick={() => handleNavClick('admin-trainings')}
                  className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 text-left ${
                    currentView === 'admin-trainings'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                  <span>Manage Trainings</span>
                </button>

                <button
                  onClick={() => handleNavClick('admin-add-training')}
                  className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 text-left ${
                    currentView === 'admin-add-training'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <PlusCircle className="w-4 h-4 text-emerald-600" />
                  <span>Add New Training</span>
                </button>

                <button
                  onClick={() => handleNavClick('admin-requests')}
                  className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between text-left ${
                    currentView === 'admin-requests'
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>Review Requests by Category</span>
                  </span>
                  {pendingRequestsCount > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-amber-500 text-white">
                      {pendingRequestsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    logout();
                    handleNavClick('home');
                  }}
                  className="w-full px-3 py-2.5 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-3 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Admin ({adminUser?.email})</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('admin-login')}
                className="w-full px-3 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 text-white flex items-center justify-center gap-2 mt-1"
              >
                <LogIn className="w-4 h-4" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};
