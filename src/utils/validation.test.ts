import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmployeeId,
  isValidDate,
  validateTrainingRequest,
  validateTrainingForm,
  ALLOWED_CATEGORIES,
  ALLOWED_TRAINING_STATUSES,
} from './validation';

test('isValidEmployeeId returns true for valid numeric IDs', () => {
  assert.equal(isValidEmployeeId('1001'), true);
  assert.equal(isValidEmployeeId('54321'), true);
  assert.equal(isValidEmployeeId(' 789 '), true);
});

test('isValidEmployeeId returns false for non-numeric or negative or empty IDs', () => {
  assert.equal(isValidEmployeeId(''), false);
  assert.equal(isValidEmployeeId('EMP-101'), false);
  assert.equal(isValidEmployeeId('abc'), false);
  assert.equal(isValidEmployeeId('-5'), false);
  assert.equal(isValidEmployeeId('0'), false);
  assert.equal(isValidEmployeeId('12a3'), false);
});

test('isValidDate validates valid calendar dates', () => {
  assert.equal(isValidDate('2026-11-15'), true);
  assert.equal(isValidDate('2025-02-28'), true);
  assert.equal(isValidDate('2024-02-29'), true); // Leap year
});

test('isValidDate rejects invalid or malformed dates', () => {
  assert.equal(isValidDate(''), false);
  assert.equal(isValidDate('not-a-date'), false);
  assert.equal(isValidDate('2026-02-31'), false); // Feb 31 does not exist
  assert.equal(isValidDate('2026-13-01'), false); // Month 13
  assert.equal(isValidDate('15-11-2026'), false); // Wrong format
});

test('validateTrainingRequest passes when all fields are valid', () => {
  const result = validateTrainingRequest({
    employeeName: 'Sarah Jenkins',
    employeeId: '10842',
    category: 'Technical',
    topic: 'Advanced Kubernetes and Docker Deployment',
    reason: 'Needed for upcoming cloud migration sprint in Q4.',
    preferredDate: '2026-11-20',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('validateTrainingRequest blocks empty fields and non-numeric employee ID', () => {
  const result = validateTrainingRequest({
    employeeName: '',
    employeeId: 'emp_invalid',
    category: 'InvalidCategory',
    topic: '',
    reason: '',
    preferredDate: '2026-02-30',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.employeeName, 'Employee Name is required');
  assert.equal(result.errors.employeeId, 'Employee ID must be a valid number');
  assert.equal(result.errors.category, 'Category must be BizSkill, Technical, or Process');
  assert.equal(result.errors.topic, 'Training Topic is required');
  assert.equal(result.errors.reason, 'Reason / Justification is required');
  assert.equal(result.errors.preferredDate, 'Preferred Training Date must be a valid date (YYYY-MM-DD)');
});

test('validateTrainingForm validates admin form accurately', () => {
  const valid = validateTrainingForm({
    title: 'Executive Communication & Negotiation',
    description: 'Master high-stakes communication, client pitching and conflict resolution.',
    category: 'BizSkill',
    trainer: 'Dr. Evelyn Carter',
    date: '2026-11-25',
    time: '02:00 PM - 04:30 PM',
    duration: '2.5 hours',
    venue: 'Executive Boardroom B / Zoom Room 1',
    maxSeats: '35',
    status: 'Scheduled',
  });
  assert.equal(valid.isValid, true);

  const invalid = validateTrainingForm({
    title: '',
    description: '',
    category: 'Random',
    trainer: '',
    date: 'invalid',
    time: '',
    duration: '',
    venue: '',
    maxSeats: '-5',
    status: 'UnknownStatus',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.title);
  assert.ok(invalid.errors.category);
  assert.ok(invalid.errors.maxSeats);
  assert.ok(invalid.errors.status);
});

test('ALLOWED_CATEGORIES contains required categories', () => {
  assert.deepEqual(ALLOWED_CATEGORIES, ['BizSkill', 'Technical', 'Process']);
});

test('ALLOWED_TRAINING_STATUSES contains Scheduled and Cancelled', () => {
  assert.ok(ALLOWED_TRAINING_STATUSES.includes('Scheduled'));
  assert.ok(ALLOWED_TRAINING_STATUSES.includes('Cancelled'));
});
