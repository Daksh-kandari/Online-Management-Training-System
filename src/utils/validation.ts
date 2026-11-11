import { TrainingCategory, TrainingStatus } from '../types';

export const ALLOWED_CATEGORIES: TrainingCategory[] = ['BizSkill', 'Technical', 'Process'];
export const ALLOWED_TRAINING_STATUSES: TrainingStatus[] = ['Scheduled', 'Cancelled', 'Completed'];

export interface TrainingFormData {
  title: string;
  description: string;
  category: string;
  trainer: string;
  date: string;
  time: string;
  duration: string;
  venue: string;
  maxSeats: string | number;
  status: string;
}

export interface TrainingRequestFormData {
  employeeName: string;
  employeeId: string;
  category: string;
  topic: string;
  reason: string;
  preferredDate: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates if a string is a valid positive integer Employee ID
 */
export function isValidEmployeeId(val: string): boolean {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed === '') return false;
  // Must be strictly numeric digits, at least 1 digit, no letters or special chars
  return /^\d+$/.test(trimmed) && Number(trimmed) > 0;
}

/**
 * Validates if a date string is in valid format and corresponds to a real calendar date
 */
export function isValidDate(dateStr: string): boolean {
  if (!dateStr || typeof dateStr !== 'string') return false;
  const trimmed = dateStr.trim();
  if (trimmed === '') return false;
  const parsed = new Date(trimmed);
  if (isNaN(parsed.getTime())) return false;
  
  // Format check (YYYY-MM-DD)
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(trimmed)) return false;

  const [year, month, day] = trimmed.split('-').map(Number);
  // Ensure calendar boundary check
  const testDate = new Date(year, month - 1, day);
  return (
    testDate.getFullYear() === year &&
    testDate.getMonth() === month - 1 &&
    testDate.getDate() === day
  );
}

/**
 * Validates Employee Training Request Form
 */
export function validateTrainingRequest(data: TrainingRequestFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.employeeName || data.employeeName.trim() === '') {
    errors.employeeName = 'Employee Name is required';
  }

  if (!data.employeeId || data.employeeId.trim() === '') {
    errors.employeeId = 'Employee ID is required';
  } else if (!isValidEmployeeId(data.employeeId)) {
    errors.employeeId = 'Employee ID must be a valid number';
  }

  if (!data.category || data.category.trim() === '') {
    errors.category = 'Training Category is required';
  } else if (!ALLOWED_CATEGORIES.includes(data.category as TrainingCategory)) {
    errors.category = 'Category must be BizSkill, Technical, or Process';
  }

  if (!data.topic || data.topic.trim() === '') {
    errors.topic = 'Training Topic is required';
  }

  if (!data.reason || data.reason.trim() === '') {
    errors.reason = 'Reason / Justification is required';
  }

  if (!data.preferredDate || data.preferredDate.trim() === '') {
    errors.preferredDate = 'Preferred Training Date is required';
  } else if (!isValidDate(data.preferredDate)) {
    errors.preferredDate = 'Preferred Training Date must be a valid date (YYYY-MM-DD)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates Admin Add/Update Training Form
 */
export function validateTrainingForm(data: TrainingFormData): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim() === '') {
    errors.title = 'Training Title is required';
  }

  if (!data.description || data.description.trim() === '') {
    errors.description = 'Description is required';
  }

  if (!data.category || data.category.trim() === '') {
    errors.category = 'Category is required';
  } else if (!ALLOWED_CATEGORIES.includes(data.category as TrainingCategory)) {
    errors.category = 'Category must be BizSkill, Technical, or Process';
  }

  if (!data.trainer || data.trainer.trim() === '') {
    errors.trainer = 'Trainer / Instructor is required';
  }

  if (!data.date || data.date.trim() === '') {
    errors.date = 'Training Date is required';
  } else if (!isValidDate(data.date)) {
    errors.date = 'Training Date must be a valid date (YYYY-MM-DD)';
  }

  if (!data.time || data.time.trim() === '') {
    errors.time = 'Time / Schedule is required';
  }

  if (!data.duration || data.duration.trim() === '') {
    errors.duration = 'Duration is required';
  }

  if (!data.venue || data.venue.trim() === '') {
    errors.venue = 'Venue or Meeting Link is required';
  }

  const seatsNum = Number(data.maxSeats);
  if (data.maxSeats === '' || data.maxSeats === undefined || data.maxSeats === null) {
    errors.maxSeats = 'Maximum Seats is required';
  } else if (isNaN(seatsNum) || seatsNum <= 0 || !Number.isInteger(seatsNum)) {
    errors.maxSeats = 'Maximum Seats must be a positive integer';
  }

  if (!data.status || data.status.trim() === '') {
    errors.status = 'Status is required';
  } else if (!ALLOWED_TRAINING_STATUSES.includes(data.status as TrainingStatus)) {
    errors.status = 'Status must be Scheduled, Cancelled, or Completed';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
