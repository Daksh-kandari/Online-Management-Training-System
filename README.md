# 🎓 SkillBridge — Online Training Management System

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tests](https://img.shields.io/badge/Unit_Tests-9%2F9_Passing-brightgreen?logo=node.js&logoColor=white)](https://nodejs.org/)

**SkillBridge** is a modern corporate Learning Management System (LMS) designed for software organizations to organize internal training sessions, facilitate employee upskilling, and triage employee-proposed curriculum requests.

Employees can browse scheduled training sessions and submit requests for missing topics across **Business Skills**, **Technical Stacks**, and **Process Workflows** with **zero friction (no employee login required)**. A protected **Admin Portal** enables training coordinators to schedule sessions, update logistical details, toggle statuses between `Scheduled` and `Cancelled`, and manage incoming employee requests filtered by category.

---

## 📌 Project Overview

In software and technology organizations, continuous learning is critical. However, training coordinators often struggle to gauge exact team skill gaps, and employees find it difficult to voice specific curriculum needs.

**SkillBridge solves this with a two-tier model:**
1. **Employee Tier (Public / No Login Needed)**: Employees freely explore the corporate training directory, view syllabus details, reserve seats, or request customized sessions if a required topic is unavailable.
2. **Administrator Tier (Protected Access)**: Authorized training managers log in with credentials to publish workshops, edit venue/instructor logistics, cancel/reschedule sessions, and evaluate employee requests grouped strictly by category.

---

## 🚀 Key Features

### 👤 Employee Experience
- **No Login Barrier**: Immediate access to the course catalog and request pipeline.
- **Categorized Directory**: Fast filtering by three core enterprise pillars:
  - 💼 **BizSkill**: Executive presentation, high-stakes negotiation, stakeholder alignment, and leadership.
  - 💻 **Technical**: Modern web architecture (React 19, TypeScript), cloud orchestration (Kubernetes, Docker), DevSecOps, and AI engineering.
  - 🔄 **Process**: Agile release trains, Site Reliability Engineering (SRE), Incident Command, and SOC2/ISO compliance.
- **Search & Status Filtering**: Real-time keyword search across topics, trainer names, venues, and descriptions, along with filters for `Scheduled` and `Cancelled` sessions.
- **Session Details & Registration**: Interactive modal showing comprehensive syllabus breakdowns, prerequisites, date/time, and real-time seat availability counters with enrollment confirmation.
- **Training Request Intake Form**: Dedicated self-service request form allowing employees to propose new workshops when curriculum is missing.

### 🛡️ Administrator Console
- **Route Guard Protection**: Admin screens (`Manage Trainings`, `Add Training`, `Requests by Category`) are strictly protected and automatically redirect unauthenticated visits to the login gate.
- **Hardcoded Admin Authentication**: Quick, secure sign-in with preconfigured administrator credentials and an auto-fill helper card.
- **Interactive Training Manager**:
  - Live table and card views of all company sessions.
  - **One-click status toggler**: Instantly switch training state between `Scheduled` and `Cancelled`.
  - **Edit Modal**: Update session topics, syllabus, instructor, schedule, venue, and seat caps with full input validation.
  - **Deletion Safeguard**: Removal with user confirmation.
- **Course Scheduling Form**: Dedicated form for coordinators to add new sessions with strict input validation.
- **Category-Based Request Triage**:
  - Review incoming employee requests grouped and filterable by **BizSkill**, **Technical**, and **Process**.
  - Track requests across four lifecycle states: `Pending`, `Approved`, `Scheduled`, and `Rejected`.
  - **One-Click Scheduling**: Pre-fills the Add Training form directly with the employee's requested topic and category.
  - **Internal Admin Notes**: Record review justifications and instructor notes.

### 📱 Responsive & Mobile-Optimized
- Mobile navigation drawer with clean hamburger toggle for phones and tablets.
- Desktop navigation bar with instant role indicators and badge counters.
- Zero horizontal overflow (`overflow-x: hidden`) across all screen widths (tested at 390×844 mobile and 1440×900 desktop).

---

## 🔒 Form Validations & Business Rules

Every form across the application enforces strict validation rules before submission:

| Validation Rule | Description |
| :--- | :--- |
| **Mandatory Fields** | All inputs on both Employee Request and Admin Training forms are mandatory. |
| **Numeric Employee ID** | Employee IDs must be positive integers (e.g., `10482`). Non-numeric input (`abc`, `emp-101`) is blocked with clear error indicators. |
| **Category Whitelist** | Accepted categories are strictly limited to `BizSkill`, `Technical`, and `Process`. |
| **Status Whitelist** | Trainings accept `Scheduled`, `Cancelled`, or `Completed`. Requests accept `Pending`, `Approved`, `Scheduled`, or `Rejected`. |
| **Valid Calendar Dates** | Dates must follow `YYYY-MM-DD` calendar format and represent valid days (e.g., leap years validated, invalid calendar dates like Feb 31 rejected). |
| **Capacity Constraints** | Maximum seats must be positive integers. Sessions cannot be overbooked. |
| **Admin Route Isolation** | Admin URLs and state cannot be accessed without prior authentication. |

---

## 🔑 Admin Credentials

For evaluation and administrative access, use the following pre-configured credentials:

- **Username / Email**: `admin@company.com` *(or `admin`)*
- **Password**: `admin123`

*(A one-click **"Auto Fill"** button is also available on the Admin Login screen for testing).*

---

## 📂 Project Structure

```text
├── index.html                     # HTML5 entry point & OpenGraph metadata
├── metadata.json                  # AI Studio application metadata
├── package.json                   # Scripts, dependencies, and metadata
├── tsconfig.json                  # TypeScript compiler configuration
├── vite.config.ts                 # Vite bundler configuration with Tailwind CSS plugin
├── src/
│   ├── main.tsx                   # React root entry point
│   ├── App.tsx                    # Main router with protected route guards
│   ├── index.css                  # Global Tailwind CSS directives & mobile viewport rules
│   ├── types/
│   │   └── index.ts               # Core TypeScript interfaces (Training, Request, Admin)
│   ├── context/
│   │   ├── AuthContext.tsx        # Admin authentication state & session persistence
│   │   └── TrainingContext.tsx    # State management for trainings, requests & seed data
│   ├── utils/
│   │   ├── validation.ts          # Pure form validation logic & regex validators
│   │   ├── validation.test.ts     # Automated unit test suite (node:test)
│   │   └── storage.ts             # Persistence layer with realistic seed corporate data
│   ├── components/
│   │   ├── Navbar.tsx             # Responsive header with desktop links & mobile drawer
│   │   ├── Footer.tsx             # System footer with category summary & copyright
│   │   └── Badges.tsx             # Domain category badges & lifecycle status badges
│   └── views/
│       ├── HomeView.tsx               # Employee landing page & domain showcases
│       ├── EmployeeTrainingsView.tsx  # Searchable & filterable course directory with modal
│       ├── RequestTrainingView.tsx    # Employee request submission form with validation
│       ├── AdminLoginView.tsx         # Admin sign-in screen with auto-fill helper
│       ├── AdminTrainingsView.tsx     # Training management table & status toggler
│       ├── AdminAddTrainingView.tsx   # Add/schedule new training session form
│       └── AdminRequestsView.tsx      # Categorized employee requests triage board
```

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Motion](https://motion.dev/)
- **Bundler & Tooling**: [Vite 8](https://vitejs.dev/), [tsx](https://github.com/privatenumber/tsx)
- **Test Framework**: Node.js Native Test Runner (`node:test` + `node:assert/strict`)

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/online-training-management-system.git
   cd online-training-management-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 🧪 Running Unit Tests

The test suite validates core business logic, numeric Employee ID requirements, calendar date validation, category bounds, and error dictionary outputs:

```bash
npx --yes tsx --test src/utils/validation.test.ts
```

### Test Coverage Highlights
- ✅ `isValidEmployeeId`: Correctly validates positive numeric IDs and rejects strings, negative numbers, and non-numeric characters.
- ✅ `isValidDate`: Validates genuine calendar dates (including leap years) and rejects invalid formats or non-existent dates.
- ✅ `validateTrainingRequest`: Enforces all mandatory fields on employee proposals and displays inline errors.
- ✅ `validateTrainingForm`: Confirms all fields and seat capacity constraints for admin course creation.
- ✅ `ALLOWED_CATEGORIES` & `ALLOWED_TRAINING_STATUSES`: Enforces exact enum constraints (`BizSkill`, `Technical`, `Process`).

---

## 📄 License

This project is licensed under the [Apache-2.0 License](LICENSE).
