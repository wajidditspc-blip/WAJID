import React, { useState, useMemo } from 'react';
import {
  CalendarDays,
  Search,
  Filter,
  FileText,
  Play,
  Bookmark,
  Plus,
  BookOpen,
  Calendar as CalendarIcon,
  LayoutGrid,
  List,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  User,
  Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Badge } from '../components/common/Badge';
import { AddClassworkModal } from '../components/teacher/AddClassworkModal';
import { PdfPreviewModal } from '../components/common/PdfPreviewModal';
import { VideoModal } from '../components/common/VideoModal';
import { getRelativeDate } from '../data/initialData';

export const DailyClassworkPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { classworks, subjects, departments, toggleBookmark, isBookmarked } = useData();

  // Filters
  const [quickFilter, setQuickFilter] = useState<'today' | 'yesterday' | 'week' | 'previous' | 'all'>('today');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-21');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'calendar'>('cards');

  // Modals
  const [isAddClassworkOpen, setIsAddClassworkOpen] = useState(false);
  const [previewPdf, setPreviewPdf] = useState<{ title: string; fileName: string; size: string; author?: string } | null>(null);
  const [videoModal, setVideoModal] = useState<{ title: string; url: string } | null>(null);

  const todayStr = '2026-11-21';
  const yesterdayStr = getRelativeDate(-1);

  // Quick filter logic
  const handleQuickFilter = (type: 'today' | 'yesterday' | 'week' | 'previous' | 'all') => {
    setQuickFilter(type);
    if (type === 'today') setSelectedDate(todayStr);
    else if (type === 'yesterday') setSelectedDate(yesterdayStr);
  };

  const filteredClassworks = useMemo(() => {
    return classworks.filter(cw => {
      // Date filter
      if (quickFilter === 'today' && cw.date !== todayStr) return false;
      if (quickFilter === 'yesterday' && cw.date !== yesterdayStr) return false;
      if (quickFilter === 'week') {
        const cwDate = new Date(cw.date).getTime();
        const minDate = new Date(getRelativeDate(-7)).getTime();
        if (cwDate < minDate) return false;
      }
      if (quickFilter === 'previous') {
        if (cw.date >= todayStr) return false;
      }

      // Explicit Date Picker match (if user selected date manually and filter isn't all/week)
      if (quickFilter !== 'all' && quickFilter !== 'week' && quickFilter !== 'previous') {
        if (selectedDate && cw.date !== selectedDate) return false;
      }

      // Subject filter
      if (selectedSubject !== 'all' && cw.subjectId !== selectedSubject) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const subj = subjects.find(s => s.id === cw.subjectId)?.name || '';
        const matchTopic = cw.topic.toLowerCase().includes(q);
        const matchDesc = cw.description.toLowerCase().includes(q);
        const matchHw = cw.homework.toLowerCase().includes(q);
        const matchSubj = subj.toLowerCase().includes(q);
        const matchTeacher = cw.teacherName.toLowerCase().includes(q);
        if (!matchTopic && !matchDesc && !matchHw && !matchSubj && !matchTeacher) return false;
      }

      return true;
    });
  }, [classworks, quickFilter, selectedDate, selectedSubject, searchQuery, subjects, todayStr, yesterdayStr]);

  // Calendar dates with classwork for Calendar View
  const calendarDates = [
    { date: '2026-11-16', day: 'Mon', count: 1 },
    { date: '2026-11-17', day: 'Tue', count: 2 },
    { date: '2026-11-18', day: 'Wed', count: 2 },
    { date: '2026-11-19', day: 'Thu', count: 2 },
    { date: '2026-11-20', day: 'Fri', count: 2 },
    { date: '2026-11-21', day: 'Sat', count: 2, isToday: true },
    { date: '2026-11-22', day: 'Sun', count: 0 },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Digital Classroom Logbook</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Daily Classwork Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse daily lecture summaries, homework tasks, whiteboard notes, and reference videos
          </p>
        </div>

        {/* Action button for teachers/admin */}
        {(currentUser?.role === 'teacher' || currentUser?.role === 'admin') && (
          <button
            onClick={() => setIsAddClassworkOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            Upload Daily Classwork
          </button>
        )}
      </div>

      {/* Control Bar: Filters, Date Picker, View Toggle, Search */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        {/* Top row: Quick Filter Pills & View Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => handleQuickFilter('today')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                quickFilter === 'today'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Today's Classwork
            </button>
            <button
              onClick={() => handleQuickFilter('yesterday')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                quickFilter === 'yesterday'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Yesterday
            </button>
            <button
              onClick={() => handleQuickFilter('week')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                quickFilter === 'week'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => handleQuickFilter('previous')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                quickFilter === 'previous'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Previous Archive
            </button>
            <button
              onClick={() => handleQuickFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                quickFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Dates ({classworks.length})
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Feed View"
            >
              <List className="w-4 h-4" />
              <span>Feed</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                viewMode === 'calendar'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Calendar View"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Calendar</span>
            </button>
          </div>
        </div>

        {/* Bottom row: Date Picker, Subject Dropdown, Search Input */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Specific Date Picker */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Select Specific Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => {
                setSelectedDate(e.target.value);
                setQuickFilter('all'); // Clear rigid quick filter to view selected date
              }}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Filter by Subject
            </label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="all">All Subjects (CS501 - CS506)</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
              ))}
            </select>
          </div>

          {/* Search Query */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Search Keywords
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Topic, description, teacher..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Week Strip View */}
      {viewMode === 'calendar' && (
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Interactive Academic Week View (November 2026)
            </h3>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
              Click any date to view classwork
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDates.map(item => {
              const isSelected = selectedDate === item.date;
              return (
                <button
                  key={item.date}
                  onClick={() => {
                    setSelectedDate(item.date);
                    setQuickFilter('all');
                  }}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center justify-between min-h-[90px] ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : item.isToday
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-slate-900 dark:text-white'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {item.day}
                  </span>
                  <span className="text-lg font-bold">
                    {item.date.split('-')[2]}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      item.count > 0
                        ? isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {item.count} classes
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Classwork Feed / Cards List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Showing <strong>{filteredClassworks.length}</strong> classwork lectures</span>
          {quickFilter !== 'all' && (
            <span className="capitalize font-semibold text-blue-600 dark:text-blue-400">
              Filter: {quickFilter}
            </span>
          )}
        </div>

        {filteredClassworks.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <CalendarDays className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Classwork Found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No daily classwork logs match your selected date or subject filters. Try switching filters to "All Dates".
            </p>
            <button
              onClick={() => handleQuickFilter('all')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredClassworks.map(cw => {
            const subj = subjects.find(s => s.id === cw.subjectId);
            const bookmarked = isBookmarked(currentUser?.id || '', 'classwork', cw.id);

            return (
              <div
                key={cw.id}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all space-y-5"
              >
                {/* Header: Subject badge, Date, Teacher info & Bookmark */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-100 dark:border-blue-900">
                      {subj?.code || 'CS501'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {subj?.name || 'Subject'}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          (Semester 5 • CSE)
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        Taught by <strong className="text-slate-700 dark:text-slate-300 font-semibold">{cw.teacherName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <CalendarDays className="w-3.5 h-3.5 text-blue-500" />
                      {cw.date}
                    </span>

                    <button
                      onClick={() => toggleBookmark(currentUser?.id || '', 'classwork', cw.id)}
                      className={`p-2 rounded-xl border transition ${
                        bookmarked
                          ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:border-amber-800'
                          : 'text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600'
                      }`}
                      title={bookmarked ? 'Bookmarked' : 'Save note'}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Topic & Description */}
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                    {cw.topic}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                    {cw.description}
                  </p>
                </div>

                {/* Homework Section (clearly distinct card) */}
                {cw.homework && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200/80 dark:border-amber-900/60 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                      <span>✍️ Assigned Homework for Today:</span>
                    </div>
                    <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      {cw.homework}
                    </p>
                  </div>
                )}

                {/* Attached Files & External Resources */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {cw.attachments.map(att => (
                    <button
                      key={att.id}
                      onClick={() =>
                        setPreviewPdf({
                          title: cw.topic,
                          fileName: att.name,
                          size: att.size,
                          author: cw.teacherName
                        })
                      }
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:hover:bg-blue-950/60 dark:hover:text-blue-300 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition"
                    >
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span>{att.name}</span>
                      <span className="text-[10px] text-slate-400">({att.size})</span>
                    </button>
                  ))}

                  {cw.videoLinks && cw.videoLinks[0] && (
                    <button
                      onClick={() => setVideoModal({ title: cw.topic, url: cw.videoLinks[0] })}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 hover:bg-rose-100 border border-rose-200 dark:border-rose-800 text-xs font-bold transition"
                    >
                      <Play className="w-4 h-4 fill-rose-600" />
                      <span>Watch Video Lecture</span>
                    </button>
                  )}
                </div>

                {/* Optional Whiteboard snapshot images */}
                {cw.images && cw.images.length > 0 && (
                  <div className="pt-2">
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">
                      Whiteboard & Architecture Snapshots
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cw.images.map((img, idx) => (
                        <div key={idx} className="relative rounded-xl overflow-hidden aspect-video border border-slate-200 dark:border-slate-800 group">
                          <img
                            src={img}
                            alt={cw.topic}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Modals */}
      <AddClassworkModal
        isOpen={isAddClassworkOpen}
        onClose={() => setIsAddClassworkOpen(false)}
      />

      {previewPdf && (
        <PdfPreviewModal
          isOpen={true}
          onClose={() => setPreviewPdf(null)}
          title={previewPdf.title}
          fileName={previewPdf.fileName}
          fileSize={previewPdf.size}
          authorName={previewPdf.author}
        />
      )}

      {videoModal && (
        <VideoModal
          isOpen={true}
          onClose={() => setVideoModal(null)}
          title={videoModal.title}
          videoUrl={videoModal.url}
        />
      )}
    </div>
  );
};
