import React from 'react';
import { GraduationCap, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-lg text-white block">College Classwork Portal</span>
                <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                  Apex Institute of Technology & Science
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The unified digital academic platform empowering students, faculty, and administration to streamline
              daily classwork, track attendance, manage assignments, and access study materials anytime, anywhere.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> NAAC A++ Accredited
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                AICTE & UGC Approved
              </span>
            </div>
          </div>

          {/* Quick Academic Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Academic Portal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('daily-classwork')} className="hover:text-blue-400 transition">
                  Daily Classwork
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('subject-wise')} className="hover:text-blue-400 transition">
                  Subject Archives
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('assignments')} className="hover:text-blue-400 transition">
                  Assignments & Deadlines
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('study-materials')} className="hover:text-blue-400 transition">
                  Notes & Study Materials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('attendance')} className="hover:text-blue-400 transition">
                  Attendance Records
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('announcements')} className="hover:text-blue-400 transition">
                  College Notices
                </button>
              </li>
            </ul>
          </div>

          {/* College Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Institution</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-blue-400 transition">
                  About Apex Institute
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-blue-400 transition">
                  Campus Facilities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('help')} className="hover:text-blue-400 transition">
                  IT Helpdesk & FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('login')} className="hover:text-blue-400 transition">
                  Faculty & Staff Login
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('register')} className="hover:text-blue-400 transition">
                  Student Enrollment
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Campus Contact</h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Apex Tech Campus, Knowledge Corridor, Tech Park Rd, Sector 4</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+1 (800) 555-APEX / +1 (555) 019-2834</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>portal.support@apexcollege.edu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Apex Institute of Technology & Science. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('help')} className="hover:text-slate-400 transition">Privacy Policy</button>
            <button onClick={() => onNavigate('help')} className="hover:text-slate-400 transition">Terms of Academic Use</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-slate-400 transition">Security & Compliance</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
