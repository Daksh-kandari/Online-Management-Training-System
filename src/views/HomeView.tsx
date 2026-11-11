import React from 'react';
import { ViewMode, TrainingCategory } from '../types';
import { useTrainings } from '../context/TrainingContext';
import { useAuth } from '../context/AuthContext';
import { CategoryBadge, StatusBadge } from '../components/Badges';
import {
  Calendar,
  FileQuestion,
  Shield,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle,
  Briefcase,
  Code,
  GitBranch,
  Clock,
  MapPin,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewMode) => void;
  onSelectCategoryFilter?: (category: TrainingCategory) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { trainings, requests } = useTrainings();
  const { isAdminLoggedIn } = useAuth();

  const scheduledTrainings = trainings.filter((t) => t.status === 'Scheduled');
  const recentScheduled = scheduledTrainings.slice(0, 3);

  const categoryStats = {
    BizSkill: trainings.filter((t) => t.category === 'BizSkill').length,
    Technical: trainings.filter((t) => t.category === 'Technical').length,
    Process: trainings.filter((t) => t.category === 'Process').length,
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 text-white p-8 md:p-12 shadow-xl border border-slate-700/60">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Corporate Learning & Skill Enhancement</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Level up your skills with internal expert-led training.
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Welcome to the company-wide training portal. Browse scheduled workshops in Business Skills,
            Technical Stacks, and Enterprise Process workflows. Need a topic not listed? Submit a customized
            training request anytime.
          </p>

          {/* Primary Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('employee-trainings')}
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-lg shadow-rose-900/40 hover:shadow-rose-600/30 transition-all flex items-center gap-2 text-sm sm:text-base group"
            >
              <Calendar className="w-5 h-5" />
              <span>View Available Trainings</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('request-training')}
              className="px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-100 font-semibold border border-slate-600/70 hover:border-slate-500 transition-all flex items-center gap-2 text-sm sm:text-base"
            >
              <FileQuestion className="w-5 h-5 text-amber-400" />
              <span>Request New Training</span>
            </button>

            {!isAdminLoggedIn && (
              <button
                onClick={() => onNavigate('admin-login')}
                className="px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors flex items-center gap-1.5 text-sm"
              >
                <Shield className="w-4 h-4 text-slate-400" />
                <span>Admin Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Highlights / Stats Grid */}
        <div className="mt-10 pt-8 border-t border-slate-700/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40">
            <div className="text-2xl font-bold text-white">{scheduledTrainings.length}</div>
            <div className="text-xs text-slate-400 mt-1">Active Scheduled Sessions</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40">
            <div className="text-2xl font-bold text-amber-400">3 Domains</div>
            <div className="text-xs text-slate-400 mt-1">BizSkill, Tech & Process</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40">
            <div className="text-2xl font-bold text-emerald-400">{requests.length}</div>
            <div className="text-xs text-slate-400 mt-1">Employee Requests Submitted</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40">
            <div className="text-2xl font-bold text-blue-400">100% Free</div>
            <div className="text-xs text-slate-400 mt-1">No Login Needed for Staff</div>
          </div>
        </div>
      </section>

      {/* Domain Categories Overview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Curated Learning Domains
            </h2>
            <p className="text-sm text-slate-500">
              Trainings and requests are strictly organized into three core enterprise pillars
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* BizSkill */}
          <div className="bg-white rounded-xl border border-amber-200/80 p-6 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900">BizSkill</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {categoryStats.BizSkill} Sessions
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Executive presentation, high-stakes negotiation, cross-department communication, leadership, and product strategy.
            </p>
            <button
              onClick={() => onNavigate('employee-trainings')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1 group-hover:underline"
            >
              Explore BizSkill Sessions <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Technical */}
          <div className="bg-white rounded-xl border border-blue-200/80 p-6 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Code className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900">Technical</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {categoryStats.Technical} Sessions
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Full-stack frameworks (React 19, TypeScript), Kubernetes orchestration, cloud microservices, and AI integrations.
            </p>
            <button
              onClick={() => onNavigate('employee-trainings')}
              className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 group-hover:underline"
            >
              Explore Technical Sessions <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Process */}
          <div className="bg-white rounded-xl border border-emerald-200/80 p-6 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <GitBranch className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900">Process</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {categoryStats.Process} Sessions
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              Agile release trains, Incident Management (SRE), SOC2 / ISO compliance workflows, and quality governance.
            </p>
            <button
              onClick={() => onNavigate('employee-trainings')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group-hover:underline"
            >
              Explore Process Sessions <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Scheduled Trainings */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Upcoming Scheduled Sessions
            </h2>
            <p className="text-sm text-slate-500">
              Confirmed sessions open for employee attendance and skill enrichment
            </p>
          </div>
          <button
            onClick={() => onNavigate('employee-trainings')}
            className="text-sm font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
          >
            <span>View Full Schedule ({trainings.length} total)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentScheduled.map((trn) => (
            <div
              key={trn.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <CategoryBadge category={trn.category} />
                  <StatusBadge status={trn.status} />
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 line-clamp-2">
                  {trn.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {trn.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium text-slate-700">{trn.date}</span>
                  <span>•</span>
                  <span>{trn.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{trn.venue}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{trn.enrolledCount} / {trn.maxSeats} enrolled</span>
                  </span>
                  <button
                    onClick={() => onNavigate('employee-trainings')}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                  >
                    View Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Callout: Missing a training topic? */}
      <section className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-200/60 text-amber-900">
            <FileQuestion className="w-3.5 h-3.5" />
            <span>Employee Training Request Service</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-amber-950">
            Can’t find the specific workshop or certification you need?
          </h3>
          <p className="text-sm text-amber-900/80 leading-relaxed">
            You don’t need an account or special permissions. Submit a request detailing the topic,
            target business or technical domain, and justification. Our learning admin team reviews all
            requests by category and schedules requested topics regularly!
          </p>
        </div>

        <button
          onClick={() => onNavigate('request-training')}
          className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md shadow-amber-900/10 transition-all flex items-center gap-2"
        >
          <span>Submit Training Request</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Admin Quick Jump Callout */}
      <section className="bg-slate-100 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-slate-700" />
          <span>
            <strong>Training Coordinator or Instructor?</strong> Sign in with hardcoded admin
            credentials to add sessions, edit training schedules, or triage employee requests.
          </span>
        </div>
        <div>
          {isAdminLoggedIn ? (
            <button
              onClick={() => onNavigate('admin-trainings')}
              className="font-semibold text-indigo-700 hover:text-indigo-800"
            >
              Open Admin Console &rarr;
            </button>
          ) : (
            <button
              onClick={() => onNavigate('admin-login')}
              className="font-semibold text-rose-700 hover:text-rose-800"
            >
              Admin Sign In &rarr;
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
