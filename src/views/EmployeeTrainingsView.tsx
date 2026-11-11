import React, { useState } from 'react';
import { ViewMode, Training, TrainingCategory, TrainingStatus } from '../types';
import { useTrainings } from '../context/TrainingContext';
import { CategoryBadge, StatusBadge } from '../components/Badges';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  FileQuestion,
  CheckCircle,
  X,
  Info,
  UserCheck,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface EmployeeTrainingsViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const EmployeeTrainingsView: React.FC<EmployeeTrainingsViewProps> = ({ onNavigate }) => {
  const { trainings, enrollInTraining } = useTrainings();

  const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<TrainingStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalTraining, setActiveModalTraining] = useState<Training | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Filter trainings
  const filteredTrainings = trainings.filter((t) => {
    if (selectedCategory !== 'All' && t.category !== selectedCategory) {
      return false;
    }
    if (selectedStatus !== 'All' && t.status !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matches =
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.trainer.toLowerCase().includes(q) ||
        t.venue.toLowerCase().includes(q);
      if (!matches) return false;
    }
    return true;
  });

  const handleEnroll = (id: string) => {
    const res = enrollInTraining(id);
    if (res.success) {
      setFeedbackMessage({ type: 'success', text: res.message });
      // Update modal training if open
      if (activeModalTraining && activeModalTraining.id === id) {
        setActiveModalTraining((prev) =>
          prev ? { ...prev, enrolledCount: prev.enrolledCount + 1 } : null
        );
      }
    } else {
      setFeedbackMessage({ type: 'error', text: res.message });
    }
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 mb-2">
            <span>Corporate Learning Directory</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse Company Training Programs
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Explore workshops curated and scheduled by our training coordinators. No login required
            for staff to view syllabus details and register.
          </p>
        </div>

        <button
          onClick={() => onNavigate('request-training')}
          className="whitespace-nowrap px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition-all self-start md:self-auto"
        >
          <FileQuestion className="w-4 h-4" />
          <span>Request New Training</span>
        </button>
      </div>

      {/* Global Feedback notification */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span className="text-sm font-medium">{feedbackMessage.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
              Category:
            </span>
            {(['All', 'BizSkill', 'Technical', 'Process'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
              Status:
            </span>
            {(['All', 'Scheduled', 'Cancelled'] as const).map((stat) => (
              <button
                key={stat}
                onClick={() => setSelectedStatus(stat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedStatus === stat
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {stat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative pt-2 border-t border-slate-100">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic title, instructor, description, or venue..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white text-slate-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-5 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredTrainings.length}</strong> of {trainings.length} total trainings
        </span>
        {(selectedCategory !== 'All' || selectedStatus !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedStatus('All');
              setSearchQuery('');
            }}
            className="text-rose-600 hover:underline font-semibold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Trainings Grid */}
      {filteredTrainings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No training sessions found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            No trainings matched your current filter criteria. Try resetting the filters or submit
            a training request for your desired topic.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('request-training')}
              className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700"
            >
              Request this Training
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainings.map((trn) => {
            const seatsLeft = Math.max(0, trn.maxSeats - trn.enrolledCount);
            const isFull = seatsLeft === 0;
            const isCancelled = trn.status === 'Cancelled';

            return (
              <div
                key={trn.id}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <CategoryBadge category={trn.category} />
                    <StatusBadge status={trn.status} />
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg leading-snug line-clamp-2">
                    {trn.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {trn.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800">{trn.date}</span>
                      <span className="text-slate-400">•</span>
                      <span>{trn.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Duration: {trn.duration}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-700 truncate">
                        Trainer: {trn.trainer}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">{trn.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                  <div className="flex flex-col">
                    <span className="text-slate-500">Capacity</span>
                    <span
                      className={`font-bold ${
                        isFull
                          ? 'text-rose-600'
                          : seatsLeft <= 5
                          ? 'text-amber-600'
                          : 'text-emerald-700'
                      }`}
                    >
                      {isCancelled
                        ? 'Session Cancelled'
                        : `${trn.enrolledCount} / ${trn.maxSeats} filled (${seatsLeft} left)`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalTraining(trn)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-medium transition-colors"
                    >
                      Details
                    </button>

                    {!isCancelled && (
                      <button
                        onClick={() => handleEnroll(trn.id)}
                        disabled={isFull}
                        className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1 ${
                          isFull
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>{isFull ? 'Full' : 'Enroll'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {activeModalTraining && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-training-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CategoryBadge category={activeModalTraining.category} />
                  <StatusBadge status={activeModalTraining.status} />
                </div>
                <h2 id="modal-training-title" className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                  {activeModalTraining.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveModalTraining(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Close training details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Overview & Syllabus
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {activeModalTraining.description}
              </p>
            </div>

            {activeModalTraining.prerequisites && (
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-500" />
                  <span>Prerequisites & Requirements</span>
                </h4>
                <p className="text-xs text-slate-600 bg-blue-50/60 border border-blue-100 p-3 rounded-lg">
                  {activeModalTraining.prerequisites}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block mb-0.5">Trainer / Lead</span>
                <span className="font-bold text-slate-800">{activeModalTraining.trainer}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Session Date</span>
                <span className="font-bold text-slate-800">{activeModalTraining.date}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Time Schedule</span>
                <span className="font-bold text-slate-800">{activeModalTraining.time}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Total Duration</span>
                <span className="font-bold text-slate-800">{activeModalTraining.duration}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Venue / Meeting</span>
                <span className="font-bold text-slate-800">{activeModalTraining.venue}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Enrolled / Capacity</span>
                <span className="font-bold text-slate-800">
                  {activeModalTraining.enrolledCount} / {activeModalTraining.maxSeats}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveModalTraining(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold"
              >
                Back to List
              </button>

              {activeModalTraining.status === 'Cancelled' ? (
                <div className="text-xs text-rose-600 font-semibold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                  Training is Cancelled
                </div>
              ) : (
                <button
                  onClick={() => handleEnroll(activeModalTraining.id)}
                  disabled={activeModalTraining.enrolledCount >= activeModalTraining.maxSeats}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 disabled:bg-slate-200 disabled:text-slate-400"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>
                    {activeModalTraining.enrolledCount >= activeModalTraining.maxSeats
                      ? 'Fully Booked'
                      : 'Confirm Attendance Registration'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
