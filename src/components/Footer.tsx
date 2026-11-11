import React from 'react';
import { GraduationCap, ShieldCheck, HelpCircle, BookOpen, Layers } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span>SkillBridge Training Management System</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              A comprehensive corporate learning management platform enabling employees to browse scheduled
              technical, business, and process workshops, and submit customized training requests to company leadership.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Hardcoded Admin Access
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-4 h-4 text-blue-400" />
                BizSkill, Technical, Process
              </span>
            </div>
          </div>

          {/* Training Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">
              Training Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>BizSkill: Leadership & Communication</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Technical: Software, Cloud & DevOps</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Process: Agile, SRE, Incident & Compliance</span>
              </li>
            </ul>
          </div>

          {/* Quick Help */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">
              System Guidelines
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-rose-400" />
                <span>Employee Mode: No login required</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Login: admin@company.com / admin123</span>
              </li>
              <li className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Validations enforced on all form inputs</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 SkillBridge LMS. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <span>Client SPA</span>
            <span>•</span>
            <span>Local & Storage Persistence</span>
            <span>•</span>
            <span>Strict Validation Engine</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
