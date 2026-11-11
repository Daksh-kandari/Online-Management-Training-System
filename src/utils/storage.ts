import { Training, TrainingRequest } from '../types';

const TRAININGS_STORAGE_KEY = 'skillbridge_trainings_v1';
const REQUESTS_STORAGE_KEY = 'skillbridge_requests_v1';
const ADMIN_SESSION_KEY = 'skillbridge_admin_session_v1';

export const INITIAL_TRAININGS: Training[] = [
  {
    id: 'trn-001',
    title: 'Advanced React 19 & Modern Web Architecture',
    description: 'Deep dive into React 19 features, Server Components concepts, advanced state management, and high-performance rendering patterns.',
    category: 'Technical',
    trainer: 'Dr. Alex Mercer (Principal Architect)',
    date: '2026-11-18',
    time: '10:00 AM - 01:00 PM',
    duration: '3 hours',
    venue: 'Tech Lab Alpha & Virtual Stream 1',
    maxSeats: 40,
    enrolledCount: 28,
    status: 'Scheduled',
    createdAt: '2026-11-01T09:00:00Z',
    prerequisites: 'Solid understanding of modern JavaScript (ES6+) and React fundamentals.',
  },
  {
    id: 'trn-002',
    title: 'Executive Presentation & Strategic Storytelling',
    description: 'Learn framework-driven communication, structured storytelling for C-suite proposals, and handling high-stakes Q&A.',
    category: 'BizSkill',
    trainer: 'Claire Vance (VP of Talent & Leadership)',
    date: '2026-11-21',
    time: '02:00 PM - 04:30 PM',
    duration: '2.5 hours',
    venue: 'Executive Boardroom B',
    maxSeats: 25,
    enrolledCount: 22,
    status: 'Scheduled',
    createdAt: '2026-11-02T11:30:00Z',
    prerequisites: 'Open to all team leads, managers, and product owners.',
  },
  {
    id: 'trn-003',
    title: 'Kubernetes Cluster Deployment & DevSecOps Workflows',
    description: 'Hands-on workshop covering Helm charts, GitOps with ArgoCD, security scanning, and production zero-downtime canary deployments.',
    category: 'Technical',
    trainer: 'Vikram Sethi (Cloud Infrastructure Lead)',
    date: '2026-11-24',
    time: '09:30 AM - 01:30 PM',
    duration: '4 hours',
    venue: 'Cloud Center of Excellence / Room 304',
    maxSeats: 30,
    enrolledCount: 30,
    status: 'Scheduled',
    createdAt: '2026-11-03T14:15:00Z',
    prerequisites: 'Familiarity with Docker containers and Linux CLI.',
  },
  {
    id: 'trn-004',
    title: 'Enterprise Incident Command & Blameless Post-Mortems',
    description: 'Standard operating procedures for Sev-1 incident escalation, role rotation (Incident Commander, Scribe, Comms), and root-cause analysis.',
    category: 'Process',
    trainer: 'Rachel Green (Head of Site Reliability)',
    date: '2026-11-27',
    time: '11:00 AM - 01:00 PM',
    duration: '2 hours',
    venue: 'War Room C / SRE Zoom Bridge',
    maxSeats: 50,
    enrolledCount: 15,
    status: 'Scheduled',
    createdAt: '2026-11-04T10:00:00Z',
    prerequisites: 'Mandatory for on-call engineers and engineering managers.',
  },
  {
    id: 'trn-005',
    title: 'Cross-Functional Negotiation & Conflict Resolution',
    description: 'Tactical negotiation frameworks, alignment strategies across product, sales, and engineering without positional friction.',
    category: 'BizSkill',
    trainer: 'Marcus Thorne (Senior Business Partner)',
    date: '2026-12-02',
    time: '02:00 PM - 05:00 PM',
    duration: '3 hours',
    venue: 'Auditorium 2 & Hybrid Stream',
    maxSeats: 45,
    enrolledCount: 18,
    status: 'Scheduled',
    createdAt: '2026-11-05T08:45:00Z',
    prerequisites: 'No prerequisites.',
  },
  {
    id: 'trn-006',
    title: 'Legacy Monolith Migration to Event-Driven Kafka',
    description: 'Detailed retrospective and architecture transition guide for moving batch SQL workloads to asynchronous event streams.',
    category: 'Technical',
    trainer: 'David Zhao (Staff Software Engineer)',
    date: '2026-11-12',
    time: '10:00 AM - 12:30 PM',
    duration: '2.5 hours',
    venue: 'Engineering Hall East',
    maxSeats: 35,
    enrolledCount: 12,
    status: 'Cancelled',
    createdAt: '2026-10-28T16:00:00Z',
    prerequisites: 'Cancelled due to trainer scheduling conflict. Rescheduling planned.',
  },
  {
    id: 'trn-007',
    title: 'SOC 2 Type II Compliance & Data Retention Protocol',
    description: 'Walkthrough of newly updated compliance requirements, audit logs collection, customer data encryption standards, and employee responsibilities.',
    category: 'Process',
    trainer: 'Helena Santos (Chief Information Security Officer)',
    date: '2026-12-08',
    time: '01:00 PM - 03:00 PM',
    duration: '2 hours',
    venue: 'Global Security Townhall',
    maxSeats: 100,
    enrolledCount: 64,
    status: 'Scheduled',
    createdAt: '2026-11-06T12:00:00Z',
    prerequisites: 'Recommended for all engineers, IT staff, and data handlers.',
  },
];

export const INITIAL_REQUESTS: TrainingRequest[] = [
  {
    id: 'req-101',
    employeeName: 'Jordan Taylor',
    employeeId: '10482',
    category: 'Technical',
    topic: 'GraphQL Federation & Apollo Gateway Microservices',
    reason: 'Our squad is planning to break down the monolithic catalog API into federated subgraph services next quarter.',
    preferredDate: '2026-11-29',
    status: 'Pending',
    submittedAt: '2026-11-06T10:30:00Z',
  },
  {
    id: 'req-102',
    employeeName: 'Priya Sharma',
    employeeId: '10819',
    category: 'BizSkill',
    topic: 'Financial Modeling & ROI Justification for Tech Leads',
    reason: 'Need guidance on presenting engineering modernization budgets to the executive committee in monetary terms.',
    preferredDate: '2026-12-04',
    status: 'Pending',
    submittedAt: '2026-11-06T14:10:00Z',
  },
  {
    id: 'req-103',
    employeeName: 'Liam O’Connor',
    employeeId: '10234',
    category: 'Process',
    topic: 'Automated CI/CD Release Gates & Change Advisory Board (CAB) Fast-Track',
    reason: 'Current release process causes 4-day delays on low-risk updates. We need to standardize automated change control procedures.',
    preferredDate: '2026-12-07',
    status: 'Approved',
    submittedAt: '2026-11-05T11:20:00Z',
    adminNotes: 'Approved. Coordinating with QA lead for session syllabus.',
  },
  {
    id: 'req-104',
    employeeName: 'Sophia Lin',
    employeeId: '10655',
    category: 'Technical',
    topic: 'Building Generative AI Agents with Tool Calling & Guardrails',
    reason: 'Customer Experience team needs hands-on patterns for safe LLM function calling and streaming UI.',
    preferredDate: '2026-12-12',
    status: 'Pending',
    submittedAt: '2026-11-07T09:15:00Z',
  },
  {
    id: 'req-105',
    employeeName: 'Carlos Mendez',
    employeeId: '10390',
    category: 'BizSkill',
    topic: 'Crisis Communication & Media Training for Product Managers',
    reason: 'External facing PMs need training on coordinated response when customer-impacting outages occur.',
    preferredDate: '2026-12-15',
    status: 'Pending',
    submittedAt: '2026-11-07T13:45:00Z',
  },
];

export function getStoredTrainings(): Training[] {
  if (typeof window === 'undefined') return INITIAL_TRAININGS;
  try {
    const data = localStorage.getItem(TRAININGS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(TRAININGS_STORAGE_KEY, JSON.stringify(INITIAL_TRAININGS));
      return INITIAL_TRAININGS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_TRAININGS;
  }
}

export function saveStoredTrainings(trainings: Training[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TRAININGS_STORAGE_KEY, JSON.stringify(trainings));
  } catch (e) {
    console.error('Failed to save trainings to storage', e);
  }
}

export function getStoredRequests(): TrainingRequest[] {
  if (typeof window === 'undefined') return INITIAL_REQUESTS;
  try {
    const data = localStorage.getItem(REQUESTS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_REQUESTS;
  }
}

export function saveStoredRequests(requests: TrainingRequest[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
  } catch (e) {
    console.error('Failed to save requests to storage', e);
  }
}

export function getStoredAdminSession(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setStoredAdminSession(loggedIn: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (loggedIn) {
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_SESSION_KEY);
    }
  } catch (e) {
    console.error('Failed to update admin session', e);
  }
}
