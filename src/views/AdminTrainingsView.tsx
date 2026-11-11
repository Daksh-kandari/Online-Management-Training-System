import React, { useState } from 'react';
import { ViewMode, Training, TrainingCategory, TrainingStatus } from '../types';
import { useTrainings } from '../context/TrainingContext';
import { CategoryBadge, StatusBadge } from '../components/Badges';
import {
  validateTrainingForm,
  ALLOWED_CATEGORIES,
  ALLOWED_TRAINING_STATUSES,
} from '../utils/validation';
import {
  SlidersHorizontal,
  PlusCircle,
  Search,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  X,
  FileText,
  RotateCcw,
} from 'lucide-react';

interface AdminTrainingsViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const AdminTrainingsView: React.FC<AdminTrainingsViewProps> = ({ onNavigate }) => {
  const { trainings, updateTraining, toggleTrainingStatus, deleteTraining, resetToDefaultData } =
    useTrainings();

  const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<TrainingStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{ type: 'success' | 'info'; text: string } | null>(null);

  const showFeedback = (text: string, type: 'success' | 'info' = 'success') => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleToggleStatus = (id: string, currentStatus: TrainingStatus) => {
    const newStatus: TrainingStatus = currentStatus === 'Scheduled' ? 'Cancelled' : 'Scheduled';
    toggleTrainingStatus(id, newStatus);
    showFeedback(`Training status changed to "${newStatus}"!`);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the training session "${title}"?`)) {
      deleteTraining(id);
      showFeedback(`Training "${title}" was deleted.`, 'info');
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTraining) return;

    const validation = validateTrainingForm({
      title: editingTraining.title,
      description: editingTraining.description,
      category: editingTraining.category,
      trainer: editingTraining.trainer,
      date: editingTraining.date,
      time: editingTraining.time,
      duration: editingTraining.duration,
      venue: editingTraining.venue,
      maxSeats: editingTraining.maxSeats,
      status: editingTraining.status,
    });

    if (!validation.isValid) {
      setEditErrors(validation.errors);
      return;
    }

    updateTraining(editingTraining.id, {
      title: editingTraining.title.trim(),
      description: editingTraining.description.trim(),
      category: editingTraining.category,
      trainer: editingTraining.trainer.trim(),
      date: editingTraining.date.trim(),
      time: editingTraining.time.trim(),
      duration: editingTraining.duration.trim(),
      venue: editingTraining.venue.trim(),
      maxSeats: Number(editingTraining.maxSeats),
      status: editingTraining.status,
    });

    showFeedback(`Training "${editingTraining.title}" updated successfully!`);
    setEditingTraining(null);
    setEditErrors({});
  };

  // Filter
  const filteredTrainings = trainings.filter((t) => {
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && t.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        t.title.toLowerCase().includes(q) ||
        t.trainer.toLowerCase().includes(q) ||
        t.venue.toLowerCase().includes(q);
      if (!matches) return false;
    }
    return true;
  });

  const scheduledCount = trainings.filter((t) => t.status === 'Scheduled').length;
  const cancelledCount = trainings.filter((t) => t.status === 'Cancelled').length;

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Administrator Control Hub</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Manage Corporate Trainings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Schedule new sessions, update workshop logistics, or toggle status between Scheduled and Cancelled.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('admin-add-training')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm flex items-center gap-2 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Training</span>
          </button>

          <button
            onClick={() => onNavigate('admin-requests')}
            className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm transition-all"
          >
            <span>Review Requests &rarr;</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Trainings
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{trainings.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            Scheduled (Active)
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{scheduledCount}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
            Cancelled
          </div>
          <div className="text-2xl font-bold text-rose-700 mt-1">{cancelledCount}</div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Seed State
            </div>
            <div className="text-xs text-slate-600 mt-1">Reset sample data</div>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset all trainings and requests to default seed data?')) {
                resetToDefaultData();
                showFeedback('Reset database to default seed state.');
              }
            }}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            title="Reset to default seed data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notification toast */}
      {feedback && (
        <div
          role="status"
          className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs sm:text-sm flex items-center gap-2.5"
        >
          <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
          <span className="font-medium">{feedback.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider mr-1">
              Category:
            </span>
            {(['All', 'BizSkill', 'Technical', 'Process'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider mr-1">Status:</span>
            {(['All', 'Scheduled', 'Cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  selectedStatus === st
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search trainings by title, trainer or venue..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Trainings Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Training Title & Category</th>
                <th className="py-3 px-4">Instructor / Trainer</th>
                <th className="py-3 px-4">Date & Schedule</th>
                <th className="py-3 px-4">Venue</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTrainings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No trainings match the current criteria.
                  </td>
                </tr>
              ) : (
                filteredTrainings.map((trn) => (
                  <tr key={trn.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-bold text-slate-900 text-sm">{trn.title}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <CategoryBadge category={trn.category} />
                        <span className="text-slate-500 text-[11px]">
                          {trn.enrolledCount} / {trn.maxSeats} enrolled
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-800">{trn.trainer}</td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{trn.date}</div>
                      <div className="text-slate-500 text-[11px]">{trn.time}</div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-600">{trn.venue}</td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <StatusBadge status={trn.status} />
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Toggle Status Button */}
                        <button
                          onClick={() => handleToggleStatus(trn.id, trn.status)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors flex items-center gap-1 ${
                            trn.status === 'Scheduled'
                              ? 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                          }`}
                          title={
                            trn.status === 'Scheduled'
                              ? 'Mark session as Cancelled'
                              : 'Mark session as Scheduled'
                          }
                        >
                          {trn.status === 'Scheduled' ? (
                            <>
                              <XCircle className="w-3 h-3 text-rose-500" />
                              <span>Mark Cancelled</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Mark Scheduled</span>
                            </>
                          )}
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => {
                            setEditingTraining(trn);
                            setEditErrors({});
                          }}
                          className="p-1.5 rounded-md text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200"
                          title="Edit training details"
                          aria-label={`Edit ${trn.title}`}
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(trn.id, trn.title)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200"
                          title="Delete training"
                          aria-label={`Delete ${trn.title}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Training Modal */}
      {editingTraining && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-edit-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-indigo-600" />
                <h2 id="modal-edit-title" className="text-lg font-bold text-slate-900">
                  Update Training Session
                </h2>
              </div>
              <button
                onClick={() => setEditingTraining(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Close edit modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {Object.keys(editErrors).length > 0 && (
              <div
                role="alert"
                className="p-3 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-xl"
              >
                <div className="font-bold mb-1">Please fix the following validation errors:</div>
                <ul className="list-disc pl-5 space-y-0.5">
                  {Object.values(editErrors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Title *</label>
                <input
                  type="text"
                  value={editingTraining.title}
                  onChange={(e) =>
                    setEditingTraining({ ...editingTraining, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-slate-50 text-slate-900 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={editingTraining.description}
                  onChange={(e) =>
                    setEditingTraining({ ...editingTraining, description: e.target.value })
                  }
                  className="w-full p-2.5 border rounded-lg bg-slate-50 text-slate-900 focus:bg-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={editingTraining.category}
                    onChange={(e) =>
                      setEditingTraining({
                        ...editingTraining,
                        category: e.target.value as TrainingCategory,
                      })
                    }
                    className="w-full px-2.5 py-2 border rounded-lg bg-slate-50 text-slate-900 text-xs"
                  >
                    {ALLOWED_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Trainer / Lead *
                  </label>
                  <input
                    type="text"
                    value={editingTraining.trainer}
                    onChange={(e) =>
                      setEditingTraining({ ...editingTraining, trainer: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg bg-slate-50 text-slate-900 focus:bg-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Date *</label>
                  <input
                    type="date"
                    value={editingTraining.date}
                    onChange={(e) =>
                      setEditingTraining({ ...editingTraining, date: e.target.value })
                    }
                    className="w-full px-2.5 py-2 border rounded-lg bg-slate-50 text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Time *</label>
                  <input
                    type="text"
                    value={editingTraining.time}
                    onChange={(e) =>
                      setEditingTraining({ ...editingTraining, time: e.target.value })
                    }
                    className="w-full px-2.5 py-2 border rounded-lg bg-slate-50 text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={editingTraining.duration}
                    onChange={(e) =>
                      setEditingTraining({ ...editingTraining, duration: e.target.value })
                    }
                    className="w-full px-2.5 py-2 border rounded-lg bg-slate-50 text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Venue *</label>
                  <input
                    type="text"
                    value={editingTraining.venue}
                    onChange={(e) =>
                      setEditingTraining({ ...editingTraining, venue: e.target.value })
                    }
                    className="w-full px-2.5 py-2 border rounded-lg bg-slate-50 text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Max Seats *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={editingTraining.maxSeats}
                    onChange={(e) =>
                      setEditingTraining({ ...editingTraining, maxSeats: Number(e.target.value) })
                    }
                    className="w-full px-2.5 py-2 border rounded-lg bg-slate-50 text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Status *</label>
                  <select
                    value={editingTraining.status}
                    onChange={(e) =>
                      setEditingTraining({
                        ...editingTraining,
                        status: e.target.value as TrainingStatus,
                      })
                    }
                    className="w-full px-2.5 py-2 border rounded-lg bg-slate-50 text-slate-900 text-xs"
                  >
                    {ALLOWED_TRAINING_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingTraining(null)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
