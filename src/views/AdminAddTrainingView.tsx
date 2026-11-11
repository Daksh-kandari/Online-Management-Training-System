import React, { useState } from 'react';
import { ViewMode, TrainingCategory, TrainingStatus } from '../types';
import { useTrainings } from '../context/TrainingContext';
import {
  validateTrainingForm,
  TrainingFormData,
  ALLOWED_CATEGORIES,
  ALLOWED_TRAINING_STATUSES,
} from '../utils/validation';
import {
  PlusCircle,
  Calendar,
  Clock,
  MapPin,
  Users,
  Layers,
  FileText,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface AdminAddTrainingViewProps {
  onNavigate: (view: ViewMode) => void;
  initialTopic?: string;
  initialCategory?: TrainingCategory;
}

export const AdminAddTrainingView: React.FC<AdminAddTrainingViewProps> = ({
  onNavigate,
  initialTopic = '',
  initialCategory = 'Technical',
}) => {
  const { addTraining } = useTrainings();

  const [formData, setFormData] = useState<TrainingFormData>({
    title: initialTopic,
    description: '',
    category: initialCategory,
    trainer: '',
    date: '',
    time: '10:00 AM - 01:00 PM',
    duration: '3 hours',
    venue: 'Tech Training Room 1 & Remote Stream',
    maxSeats: '30',
    status: 'Scheduled',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateTrainingForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const created = addTraining({
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category as TrainingCategory,
      trainer: formData.trainer.trim(),
      date: formData.date.trim(),
      time: formData.time.trim(),
      duration: formData.duration.trim(),
      venue: formData.venue.trim(),
      maxSeats: Number(formData.maxSeats),
      status: formData.status as TrainingStatus,
    });

    setSuccessMessage(`Training "${created.title}" successfully added and published!`);
    setTimeout(() => {
      onNavigate('admin-trainings');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Header and Back Link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('admin-trainings')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Manage Trainings</span>
        </button>
        <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
          Admin Portal Action
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Course Catalog Creation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Schedule a New Training Session
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Add a corporate training workshop to the directory. All fields are mandatory. Sessions marked
            as "Scheduled" will be immediately viewable by all employees.
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div
            role="status"
            className="m-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successMessage} Redirecting to manager...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-6">
          {Object.keys(errors).length > 0 && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm space-y-1"
            >
              <div className="flex items-center gap-2 font-bold text-rose-900">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Please fix the following validation errors:</span>
              </div>
              <ul className="list-disc pl-6 space-y-0.5 text-xs text-rose-700">
                {Object.values(errors).map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label
              htmlFor="title"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Training Title / Topic <span className="text-rose-600">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Distributed System Reliability & Chaos Engineering"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                errors.title
                  ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/40'
                  : 'border-slate-300 focus:ring-indigo-500'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label
              htmlFor="description"
              className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
            >
              Session Description & Syllabus <span className="text-rose-600">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what employees will learn, target learning outcomes, and technical or business relevance..."
              className={`w-full p-3 text-sm rounded-lg border bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/40'
                  : 'border-slate-300 focus:ring-indigo-500'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.description}</span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Category */}
            <div className="space-y-1.5">
              <label
                htmlFor="category"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Category <span className="text-rose-600">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {ALLOWED_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.category}</span>
                </p>
              )}
            </div>

            {/* Trainer */}
            <div className="space-y-1.5">
              <label
                htmlFor="trainer"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Trainer / Instructor <span className="text-rose-600">*</span>
              </label>
              <input
                id="trainer"
                name="trainer"
                type="text"
                value={formData.trainer}
                onChange={handleChange}
                placeholder="e.g. Dr. Nathan Fox (Senior Staff Engineer)"
                className={`w-full px-3.5 py-2 text-sm rounded-lg border bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.trainer
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:ring-indigo-500'
                }`}
              />
              {errors.trainer && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.trainer}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Date */}
            <div className="space-y-1.5">
              <label
                htmlFor="date"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Training Date <span className="text-rose-600">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-sm rounded-lg border bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.date
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:ring-indigo-500'
                }`}
              />
              {errors.date && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.date}</span>
                </p>
              )}
            </div>

            {/* Time */}
            <div className="space-y-1.5">
              <label
                htmlFor="time"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Time / Hours <span className="text-rose-600">*</span>
              </label>
              <input
                id="time"
                name="time"
                type="text"
                value={formData.time}
                onChange={handleChange}
                placeholder="10:00 AM - 01:00 PM"
                className={`w-full px-3 py-2 text-sm rounded-lg border bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.time
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:ring-indigo-500'
                }`}
              />
              {errors.time && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.time}</span>
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="space-y-1.5">
              <label
                htmlFor="duration"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Duration <span className="text-rose-600">*</span>
              </label>
              <input
                id="duration"
                name="duration"
                type="text"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 3 hours"
                className={`w-full px-3 py-2 text-sm rounded-lg border bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.duration
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:ring-indigo-500'
                }`}
              />
              {errors.duration && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.duration}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Venue */}
            <div className="space-y-1.5">
              <label
                htmlFor="venue"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Venue / Online Link <span className="text-rose-600">*</span>
              </label>
              <input
                id="venue"
                name="venue"
                type="text"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Room 302 or Zoom Bridge"
                className={`w-full px-3 py-2 text-sm rounded-lg border bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.venue
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:ring-indigo-500'
                }`}
              />
              {errors.venue && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.venue}</span>
                </p>
              )}
            </div>

            {/* Max Seats */}
            <div className="space-y-1.5">
              <label
                htmlFor="maxSeats"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Max Seats <span className="text-rose-600">*</span>
              </label>
              <input
                id="maxSeats"
                name="maxSeats"
                type="number"
                min="1"
                value={formData.maxSeats}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-sm rounded-lg border bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.maxSeats
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-300 focus:ring-indigo-500'
                }`}
              />
              {errors.maxSeats && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.maxSeats}</span>
                </p>
              )}
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label
                htmlFor="status"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Initial Status <span className="text-rose-600">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {ALLOWED_TRAINING_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.status}</span>
                </p>
              )}
            </div>
          </div>

          {/* Form Submit */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onNavigate('admin-trainings')}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-900/10 flex items-center gap-2 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create and Publish Training</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
