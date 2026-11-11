import React, { useState } from 'react';
import { ViewMode, TrainingCategory, RequestStatus, TrainingRequest } from '../types';
import { useTrainings } from '../context/TrainingContext';
import { CategoryBadge, StatusBadge } from '../components/Badges';
import {
  FileText,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  User,
  Hash,
  ArrowRight,
  PlusCircle,
  MessageSquare,
  Search,
  Briefcase,
  Code,
  GitBranch,
} from 'lucide-react';

interface AdminRequestsViewProps {
  onNavigate: (view: ViewMode) => void;
  onScheduleFromRequest?: (topic: string, category: TrainingCategory) => void;
}

export const AdminRequestsView: React.FC<AdminRequestsViewProps> = ({
  onNavigate,
  onScheduleFromRequest,
}) => {
  const { requests, updateRequestStatus } = useTrainings();

  const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<RequestStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNotesModalReq, setActiveNotesModalReq] = useState<TrainingRequest | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    updateRequestStatus(id, newStatus);
    showFeedback(`Request marked as "${newStatus}"!`);
  };

  const handleSaveNotes = () => {
    if (!activeNotesModalReq) return;
    updateRequestStatus(activeNotesModalReq.id, activeNotesModalReq.status, adminNoteInput);
    setActiveNotesModalReq(null);
    showFeedback('Admin notes updated!');
  };

  // Filter requests by category and search
  const filteredRequests = requests.filter((req) => {
    if (selectedCategory !== 'All' && req.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && req.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        req.topic.toLowerCase().includes(q) ||
        req.employeeName.toLowerCase().includes(q) ||
        req.employeeId.includes(q) ||
        req.reason.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const categoryCounts = {
    BizSkill: requests.filter((r) => r.category === 'BizSkill').length,
    Technical: requests.filter((r) => r.category === 'Technical').length,
    Process: requests.filter((r) => r.category === 'Process').length,
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Employee Training Requests</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Review Requests by Category
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Triage employee-requested topics grouped by domain. Identify recurring training gaps and
            convert high-demand requests into scheduled company sessions.
          </p>
        </div>

        <button
          onClick={() => onNavigate('admin-add-training')}
          className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-xs flex items-center gap-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Custom Training</span>
        </button>
      </div>

      {/* Category Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* BizSkill Category Card */}
        <div
          onClick={() => setSelectedCategory('BizSkill')}
          className={`cursor-pointer rounded-xl p-4 border transition-all ${
            selectedCategory === 'BizSkill'
              ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-300'
              : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-sm">BizSkill</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              {categoryCounts.BizSkill} Requests
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Communication, negotiation, storytelling and business development.
          </p>
        </div>

        {/* Technical Category Card */}
        <div
          onClick={() => setSelectedCategory('Technical')}
          className={`cursor-pointer rounded-xl p-4 border transition-all ${
            selectedCategory === 'Technical'
              ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-300'
              : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
                <Code className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-sm">Technical</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              {categoryCounts.Technical} Requests
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Full-stack code, Kubernetes, API architecture, and AI engineering.
          </p>
        </div>

        {/* Process Category Card */}
        <div
          onClick={() => setSelectedCategory('Process')}
          className={`cursor-pointer rounded-xl p-4 border transition-all ${
            selectedCategory === 'Process'
              ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-300'
              : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <GitBranch className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-sm">Process</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {categoryCounts.Process} Requests
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Agile cadences, incident command, compliance, and governance.
          </p>
        </div>
      </div>

      {feedback && (
        <div
          role="status"
          className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-xl flex items-center gap-2"
        >
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider mr-1">
              Category:
            </span>
            {(['All', 'BizSkill', 'Technical', 'Process'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
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
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-bold text-slate-500 uppercase tracking-wider mr-1">Status:</span>
            {(['All', 'Pending', 'Approved', 'Scheduled', 'Rejected'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  selectedStatus === st
                    ? 'bg-indigo-600 text-white shadow-xs'
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
            placeholder="Search by topic, employee name, employee ID, or reason..."
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No requests match this category</h3>
            <p className="text-xs text-slate-500">
              No employee training requests were found under category "{selectedCategory}".
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryBadge category={req.category} />
                  <StatusBadge status={req.status} />
                  <span className="text-xs text-slate-400 font-mono">ID: {req.id}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Target Date: <strong className="text-slate-700">{req.preferredDate}</strong></span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{req.topic}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="font-bold text-slate-700">Business Justification:</span> {req.reason}
                </p>
              </div>

              {req.adminNotes && (
                <div className="text-xs bg-amber-50/70 border border-amber-200 text-amber-900 p-2.5 rounded-lg flex items-start gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Admin Note:</strong> {req.adminNotes}
                  </span>
                </div>
              )}

              {/* Requester Info & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Requester: <strong className="text-slate-800">{req.employeeName}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-slate-400" />
                    <span>Emp ID: <strong className="text-slate-800 font-mono">{req.employeeId}</strong></span>
                  </div>
                </div>

                {/* Status Triage Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveNotesModalReq(req);
                      setAdminNoteInput(req.adminNotes || '');
                    }}
                    className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                  >
                    {req.adminNotes ? 'Edit Notes' : '+ Add Note'}
                  </button>

                  {req.status !== 'Approved' && (
                    <button
                      onClick={() => handleStatusChange(req.id, 'Approved')}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold border border-blue-200 transition-colors"
                    >
                      Approve
                    </button>
                  )}

                  {req.status !== 'Rejected' && (
                    <button
                      onClick={() => handleStatusChange(req.id, 'Rejected')}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold border border-rose-200 transition-colors"
                    >
                      Reject
                    </button>
                  )}

                  {/* Schedule directly */}
                  <button
                    onClick={() => {
                      if (onScheduleFromRequest) {
                        onScheduleFromRequest(req.topic, req.category);
                      } else {
                        onNavigate('admin-add-training');
                      }
                      handleStatusChange(req.id, 'Scheduled');
                    }}
                    className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <span>Schedule Session</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notes Modal */}
      {activeNotesModalReq && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-note-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 id="modal-note-title" className="text-base font-bold text-slate-900">
              Admin Notes for Request #{activeNotesModalReq.id}
            </h3>
            <p className="text-xs text-slate-500">
              Add internal review notes, trainer assignment thoughts, or feedback for this request.
            </p>
            <textarea
              rows={4}
              value={adminNoteInput}
              onChange={(e) => setAdminNoteInput(e.target.value)}
              placeholder="e.g. Discussed with lead architect; planning cohort session for next sprint."
              className="w-full p-3 text-xs border border-slate-300 rounded-lg bg-slate-50 focus:bg-white text-slate-900"
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setActiveNotesModalReq(null)}
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
