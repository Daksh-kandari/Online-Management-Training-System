export type TrainingCategory = 'BizSkill' | 'Technical' | 'Process';

export type TrainingStatus = 'Scheduled' | 'Cancelled' | 'Completed';

export type RequestStatus = 'Pending' | 'Approved' | 'Scheduled' | 'Rejected';

export interface Training {
  id: string;
  title: string;
  description: string;
  category: TrainingCategory;
  trainer: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM - 12:00 PM"
  duration: string; // e.g. "2 hours"
  venue: string; // e.g. "Room 402 / Zoom Live"
  maxSeats: number;
  enrolledCount: number;
  status: TrainingStatus;
  createdAt: string;
  prerequisites?: string;
}

export interface TrainingRequest {
  id: string;
  employeeName: string;
  employeeId: string; // numeric string
  category: TrainingCategory;
  topic: string;
  reason: string;
  preferredDate: string; // YYYY-MM-DD
  status: RequestStatus;
  submittedAt: string;
  adminNotes?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export type ViewMode =
  | 'home'
  | 'employee-trainings'
  | 'request-training'
  | 'admin-login'
  | 'admin-trainings'
  | 'admin-requests'
  | 'admin-add-training';
