import React from 'react';
import {
  GraduationCap,
  ArrowRight,
  BookOpen,
  Calendar,
  FileText,
  UserCheck,
  Megaphone,
  ShieldCheck,
  CheckCircle,
  Users,
  Award,
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { switchRole } = useAuth();
  const { announcements } = useData();

  const handleQuickLogin = (role: 'student' | 'teacher' | 'admin') => {
    switchRole(role);
    if (role === 'admin') onNavigate('admin-dashboard');
    else if (role === 'teacher') onNavigate('teacher-dashboard');
    else onNavigate('student-dashboard');
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 lg:pb-24 bg-gradient-to-b from-blue-50/70 via-slate-50 to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Next-Gen Academic Management • Fall 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Your College Life,{' '}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Organized in One Place.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Access daily classwork, assignments, notes, announcements, and academic updates anytime, anywhere.
              Empowering students and faculty of Apex Institute with a unified digital ecosystem.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => handleQuickLogin('student')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Student Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleQuickLogin('teacher')}
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Teacher Login</span>
                <GraduationCap className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleQuickLogin('admin')}
                className="px-5 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 font-semibold text-sm transition"
              >
                Admin Portal
              </button>
            </div>

            {/* Metrics Pills */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Instant Classwork Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Submissions & Deadlines</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Smart Attendance Engine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Core Architecture
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Engineered For Seamless Classroom Productivity
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
            Eliminate communication gaps with digital daily records, structured attachments, and automated reminders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Daily Classwork */}
          <div
            onClick={() => onNavigate('daily-classwork')}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
          >
            <div className="p-3 w-fit rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900 mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Daily Classwork Tracking
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Teachers log daily classroom activities, topics, homework, and video resources. Students filter by date, today, or subject to catch up immediately.
            </p>
          </div>

          {/* Card 2: Assignment Hub */}
          <div
            onClick={() => onNavigate('assignments')}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
          >
            <div className="p-3 w-fit rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-100 dark:border-amber-900 mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Assignment Management
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Deadlines with countdown timers, file submission dropzones, teacher evaluation with marks, and constructive written feedback.
            </p>
          </div>

          {/* Card 3: Study Materials Library */}
          <div
            onClick={() => onNavigate('study-materials')}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
          >
            <div className="p-3 w-fit rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-100 dark:border-purple-900 mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Digital Study Materials
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Curated lecture notes, PDF slides, and syllabus guides with built-in instant PDF reader preview, full-text reading, and one-click downloads.
            </p>
          </div>

          {/* Card 4: Attendance Portal */}
          <div
            onClick={() => onNavigate('attendance')}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
          >
            <div className="p-3 w-fit rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 mb-4 group-hover:scale-110 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Attendance Monitoring
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              1-click roll call for teachers with instant present/absent toggles and CSV export. Visual 75% threshold progress indicator for students.
            </p>
          </div>

          {/* Card 5: Announcements */}
          <div
            onClick={() => onNavigate('announcements')}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
          >
            <div className="p-3 w-fit rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-100 dark:border-rose-900 mb-4 group-hover:scale-110 transition-transform">
              <Megaphone className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              Notice Board & Alerts
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Official circulars from administration and faculty. Urgent priority badges, pinned examination timetables, and campus event updates.
            </p>
          </div>

          {/* Card 6: Subject Archives */}
          <div
            onClick={() => onNavigate('subject-wise')}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1"
          >
            <div className="p-3 w-fit rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Subject Archives & Syllabus
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Organized subject-by-subject views. View total credit hours, teacher assignments, syllabus coverage, and historical lecture notes.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-100/70 dark:bg-slate-900/40 py-16 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Workflow Simplicity
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              How the Classwork Portal Works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Teacher Publishes Daily Classwork
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                After each lecture, faculty upload taught topics, homework exercises, slides, and curated video links in under 60 seconds.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Student Accesses & Reviews
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Students receive instant alerts, view what was taught by date, download materials, and bookmark important concepts.
              </p>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-4 text-lg">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Assignments & Marks Closed-Loop
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Students submit project files prior to deadlines; teachers grade submissions with real-time feedback and marks notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Students & Teachers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* For Students */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-200/60 dark:border-blue-900/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-blue-600 text-white">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Benefits for Students</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Everything needed to excel academically</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Never Miss a Lecture:</strong> See exact notes, slides, and homework even when absent from class.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Assignment Tracking:</strong> Live countdown timers ensure zero late penalties or missed submissions.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Instant Study Library:</strong> Built-in preview of textbook summaries, diagrams, and code snippets.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Attendance Security:</strong> Real-time alerts if your attendance approaches the 75% boundary.</span>
              </li>
            </ul>

            <button
              onClick={() => handleQuickLogin('student')}
              className="mt-6 px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/60 rounded-xl transition inline-flex items-center gap-1.5"
            >
              Enter Student Space <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* For Teachers */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border border-indigo-200/60 dark:border-indigo-900/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-indigo-600 text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Benefits for Faculty</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Streamline course administration</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>Rapid Classwork Posting:</strong> Upload topics, PDFs, and homework in seconds from any device.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>Digital Submissions Queue:</strong> View and grade student work in one place without physical papers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>Automated Roll Call:</strong> Mark present/absent with 1-click 'Mark All Present' and export reports.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <span><strong>Direct Circulars:</strong> Broadcast class-specific notifications directly to student dashboards.</span>
              </li>
            </ul>

            <button
              onClick={() => handleQuickLogin('teacher')}
              className="mt-6 px-4 py-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-950/60 rounded-xl transition inline-flex items-center gap-1.5"
            >
              Enter Faculty Space <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Latest Announcements Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-blue-600" />
              Official Campus Circulars
            </h3>
            <p className="text-xs text-slate-500">Live notifications and administrative updates</p>
          </div>
          <button
            onClick={() => onNavigate('announcements')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            View all ({announcements.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {announcements.slice(0, 2).map(anc => (
            <div
              key={anc.id}
              onClick={() => onNavigate('announcements')}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    anc.priority === 'Urgent'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}
                >
                  {anc.priority}
                </span>
                <span className="text-xs text-slate-400">{anc.date}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{anc.title}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{anc.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
