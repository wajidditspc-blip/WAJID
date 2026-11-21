import React from 'react';
import {
  GraduationCap,
  Award,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export const AboutCollegePage: React.FC = () => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white p-8 sm:p-14 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>NAAC 'A++' Accredited Institution • Est. 1998</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Apex Institute of Technology & Science
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Pioneering engineering excellence, ethical leadership, cutting-edge computing research,
            and transformative education for over two decades.
          </p>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            To be recognized globally as an institution of paramount distinction in technological education,
            interdisciplinary innovation, and human-centric computing that addresses societal challenges.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Provide holistic curriculum through rigorous classroom pedagogy, hands-on laboratories,
            digital portals, industry partnerships, and entrepreneurial incubation.
          </p>
        </div>
      </div>

      {/* Institutional Highlights */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Why Apex Institute Stands Out
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-3xl font-extrabold text-blue-600">98.4%</p>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">Placement Record</p>
            <p className="text-[11px] text-slate-500 mt-1">Leading tech firms including Google, Microsoft, and Amazon recruit on-campus.</p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-3xl font-extrabold text-blue-600">120+</p>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">Ph.D. Faculty</p>
            <p className="text-[11px] text-slate-500 mt-1">World-class professors with active IEEE publications and patents.</p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-3xl font-extrabold text-blue-600">45 Acres</p>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">Smart Campus</p>
            <p className="text-[11px] text-slate-500 mt-1">10 Gbps fiber network, high-performance GPU clusters & robotic labs.</p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-3xl font-extrabold text-blue-600">\$2.4M</p>
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">Annual Research Grants</p>
            <p className="text-[11px] text-slate-500 mt-1">Sponsored projects in Artificial Intelligence, Clean Energy & Robotics.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
