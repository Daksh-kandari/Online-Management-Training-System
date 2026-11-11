import React from 'react';
import { TrainingCategory, TrainingStatus, RequestStatus } from '../types';
import { Briefcase, Code, GitBranch, CheckCircle2, XCircle, Clock, Check } from 'lucide-react';

interface CategoryBadgeProps {
  category: TrainingCategory;
  className?: string;
  showIcon?: boolean;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  className = '',
  showIcon = true,
}) => {
  let colorStyle = 'bg-slate-100 text-slate-800 border-slate-200';
  let Icon = Briefcase;

  if (category === 'BizSkill') {
    colorStyle = 'bg-amber-50 text-amber-800 border-amber-200';
    Icon = Briefcase;
  } else if (category === 'Technical') {
    colorStyle = 'bg-blue-50 text-blue-800 border-blue-200';
    Icon = Code;
  } else if (category === 'Process') {
    colorStyle = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    Icon = GitBranch;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${colorStyle} ${className}`}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      {category}
    </span>
  );
};

interface StatusBadgeProps {
  status: TrainingStatus | RequestStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  let style = 'bg-gray-100 text-gray-700 border-gray-200';
  let Icon = Clock;

  switch (status) {
    case 'Scheduled':
      style = 'bg-emerald-50 text-emerald-700 border-emerald-300';
      Icon = CheckCircle2;
      break;
    case 'Cancelled':
      style = 'bg-rose-50 text-rose-700 border-rose-300';
      Icon = XCircle;
      break;
    case 'Completed':
      style = 'bg-slate-100 text-slate-700 border-slate-300';
      Icon = Check;
      break;
    case 'Pending':
      style = 'bg-amber-50 text-amber-700 border-amber-300';
      Icon = Clock;
      break;
    case 'Approved':
      style = 'bg-blue-50 text-blue-700 border-blue-300';
      Icon = CheckCircle2;
      break;
    case 'Rejected':
      style = 'bg-rose-50 text-rose-700 border-rose-300';
      Icon = XCircle;
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style} ${className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {status}
    </span>
  );
};
