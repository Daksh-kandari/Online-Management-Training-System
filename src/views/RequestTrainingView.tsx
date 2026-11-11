import React, { useState } from 'react';
import { ViewMode, TrainingCategory } from '../types';
import { useTrainings } from '../context/TrainingContext';
import {
  validateTrainingRequest,
  TrainingRequestFormData,
  ALLOWED_CATEGORIES,
} from '../utils/validation';
import {
  FileText,
  Send,
  AlertCircle,
  CheckCircle2,
  Calendar,
  User,
  Hash,
  Layers,
  HelpCircle,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

interface RequestTrainingViewProps {
  onNavigate: (view: ViewMode) => void;
}

export const RequestTrainingView: React.FC<RequestTrainingViewProps> = ({ onNavigate }) => {
  const { addRequest } = useTrainings();

  const [formData, setFormData] = useState<TrainingRequestFormData>({
    employeeName: '',
    employeeId: '',
    category: 'Technical',
    topic: '',
    reason: '',
    preferredDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedRequestRef, setSubmittedRequestRef] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
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

    const validation = validateTrainingRequest(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Submission is valid
    const newReq = addRequest({
      employeeName: formData.employeeName.trim(),
      employeeId: formData.employeeId.trim(),
      category: formData.category as TrainingCategory,
      topic: formData.topic.trim(),
      reason: formData.reason.trim(),
      preferredDate: formData.preferredDate.trim(),
    });

    setSubmittedRequestRef(newReq.id);
  };

  const handleResetForm = () => {
    setFormData({
      employeeName: '',
      employeeId: '',
      category: 'Technical',
      topic: '',
      reason: '',
      preferredDate: '',
    });
    setErrors({});
    setSubmittedRequestRef(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('employee-trainings')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Trainings Directory</span>
        </button>
        <span className="text-xs text-slate-400">Employee Self-Service Portal</span>
      </div>

      {submittedRequestRef ? (
        /* Success Screen */
        <div className="bg-white rounded-2xl border border-emerald-200 p-8 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              Training Request Submitted Successfully!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your training topic request has been recorded with tracking ID{' '}
              <strong className="text-slate-800 font-mono bg-slate-100 px-2 py-0.5 rounded">
                {submittedRequestRef}
              </strong>
              . The training coordinator will review this request in the admin console.
            </p>
          </div>

          {/* Submitted Request Summary */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-slate-500">Employee Name:</span>
              <span className="font-semibold text-slate-800">{formData.employeeName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Employee ID:</span>
              <span className="font-semibold text-slate-800">{formData.employeeId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Category:</span>
              <span className="font-semibold text-slate-800">{formData.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Requested Topic:</span>
              <span className="font-semibold text-slate-800">{formData.topic}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Target Date:</span>
              <span className="font-semibold text-slate-800">{formData.preferredDate}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleResetForm}
              className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all"
            >
              Submit Another Request
            </button>
            <button
              onClick={() => onNavigate('employee-trainings')}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-sm transition-all"
            >
              Return to Trainings
            </button>
          </div>
        </div>
      ) : (
        /* Training Request Form */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-rose-950 text-white p-6 sm:p-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skill Gap Intake</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Request a New Training Session
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              If the curriculum you need is not currently offered in our catalog, propose it here.
              All fields are mandatory. Our learning team categorizes requests to assess cohort demand.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 space-y-6">
            {/* Top error alert banner if any errors exist */}
            {Object.keys(errors).length > 0 && (
              <div
                role="alert"
                className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm space-y-1"
              >
                <div className="flex items-center gap-2 font-bold text-rose-900">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Please correct the errors below before submitting:</span>
                </div>
                <ul className="list-disc pl-6 space-y-0.5 text-xs text-rose-700">
                  {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Employee Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="employeeName"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Employee Name <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    id="employeeName"
                    name="employeeName"
                    type="text"
                    value={formData.employeeName}
                    onChange={handleChange}
                    placeholder="e.g. Maya Lin"
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.employeeName
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-rose-500'
                    }`}
                  />
                </div>
                {errors.employeeName && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.employeeName}</span>
                  </p>
                )}
              </div>

              {/* Employee ID */}
              <div className="space-y-1.5">
                <label
                  htmlFor="employeeId"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Employee ID (Numeric) <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    id="employeeId"
                    name="employeeId"
                    type="text"
                    value={formData.employeeId}
                    onChange={handleChange}
                    placeholder="e.g. 10452"
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.employeeId
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-rose-500'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-500">Must be a valid positive number.</p>
                {errors.employeeId && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.employeeId}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label
                  htmlFor="category"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Training Category <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-8 py-2 text-sm rounded-lg border bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 appearance-none ${
                      errors.category
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-rose-500'
                    }`}
                  >
                    {ALLOWED_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[11px] text-slate-500">
                  Pre-populated: BizSkill, Technical, or Process.
                </p>
                {errors.category && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.category}</span>
                  </p>
                )}
              </div>

              {/* Preferred Date */}
              <div className="space-y-1.5">
                <label
                  htmlFor="preferredDate"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
                >
                  Preferred Date <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                      errors.preferredDate
                        ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                        : 'border-slate-300 focus:ring-rose-500'
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-500">Must be a valid calendar date.</p>
                {errors.preferredDate && (
                  <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.preferredDate}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Topic Title */}
            <div className="space-y-1.5">
              <label
                htmlFor="topic"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Training Topic / Title Requested <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="topic"
                  name="topic"
                  type="text"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g. Next-Gen Generative AI Workflows with TypeScript"
                  className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                    errors.topic
                      ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                      : 'border-slate-300 focus:ring-rose-500'
                  }`}
                />
              </div>
              {errors.topic && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.topic}</span>
                </p>
              )}
            </div>

            {/* Reason / Justification */}
            <div className="space-y-1.5">
              <label
                htmlFor="reason"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Reason & Business Justification <span className="text-rose-600">*</span>
              </label>
              <textarea
                id="reason"
                name="reason"
                rows={4}
                value={formData.reason}
                onChange={handleChange}
                placeholder="Explain why this training is needed, how it applies to ongoing projects, or what skill gaps it resolves..."
                className={`w-full p-3 text-sm rounded-lg border bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.reason
                    ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                    : 'border-slate-300 focus:ring-rose-500'
                }`}
              />
              {errors.reason && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.reason}</span>
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate('employee-trainings')}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md shadow-rose-900/10 flex items-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
