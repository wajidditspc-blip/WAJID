import React, { useState } from 'react';
import {
  Megaphone,
  Pin,
  Calendar,
  User,
  Plus,
  Trash2,
  Search,
  Filter,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Badge } from '../components/common/Badge';
import { AnnouncementModal } from '../components/admin/AnnouncementModal';

export const AnnouncementsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { announcements, deleteAnnouncement, togglePinAnnouncement } = useData();

  const [audienceFilter, setAudienceFilter] = useState<'All' | 'Students' | 'Teachers'>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isTeacherOrAdmin = currentUser?.role === 'teacher' || currentUser?.role === 'admin';

  const filtered = announcements.filter(a => {
    if (audienceFilter !== 'All' && a.targetAudience !== 'All' && a.targetAudience !== audienceFilter) return false;
    if (priorityFilter !== 'all' && a.priority !== priorityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!a.title.toLowerCase().includes(q) && !a.content.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  // Sort pinned first
  const sortedAnnouncements = [...filtered].sort((a, b) => {
    if (a.pinned === b.pinned) return new Date(b.date).getTime() - new Date(a.date).getTime();
    return a.pinned ? -1 : 1;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            College Circulars & Notice Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official communications, examination schedules, campus events, and academic directives
          </p>
        </div>

        {isTeacherOrAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Publish Circular
          </button>
        )}
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Target Audience Pill */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {(['All', 'Students', 'Teachers'] as const).map(aud => (
              <button
                key={aud}
                onClick={() => setAudienceFilter(aud)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  audienceFilter === aud
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {aud}
              </button>
            ))}
          </div>

          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="all">All Priorities</option>
            <option value="Urgent">Urgent Only</option>
            <option value="High">High Importance</option>
            <option value="Normal">Normal</option>
          </select>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search circulars..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Notices Stream */}
      <div className="space-y-4">
        {sortedAnnouncements.map(anc => (
          <div
            key={anc.id}
            className={`p-6 rounded-3xl border transition-all space-y-3 ${
              anc.pinned
                ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-sm'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                {anc.pinned && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-sm">
                    <Pin className="w-3 h-3 fill-white" /> Pinned
                  </span>
                )}
                <span
                  className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                    anc.priority === 'Urgent'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse'
                      : anc.priority === 'High'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {anc.priority}
                </span>
                <span className="text-xs text-slate-400">Target: {anc.targetAudience}</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {anc.date}
                </span>

                {isTeacherOrAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => togglePinAnnouncement(anc.id)}
                      className="p-1 text-slate-400 hover:text-blue-600"
                      title={anc.pinned ? 'Unpin' : 'Pin to top'}
                    >
                      <Pin className={`w-3.5 h-3.5 ${anc.pinned ? 'fill-blue-600 text-blue-600' : ''}`} />
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(anc.id)}
                      className="p-1 text-rose-500 hover:text-rose-700"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {anc.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {anc.content}
            </p>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Issued by: <strong className="text-slate-600 dark:text-slate-300 font-semibold">{anc.authorName}</strong> ({anc.authorRole})
              </span>
              <span>Ref: CIR-2026-APX-{anc.id.slice(-4)}</span>
            </div>
          </div>
        ))}
      </div>

      <AnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
