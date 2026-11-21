import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  FileCheck2,
  FolderDown,
  Megaphone,
  UserCheck,
  ArrowRight,
  Sparkles,
  Bookmark,
  ExternalLink,
  Play,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { AttendanceRing } from '../components/student/AttendanceRing';
import { PdfPreviewModal } from '../components/common/PdfPreviewModal';
import { VideoModal } from '../components/common/VideoModal';
import { AssignmentSubmitModal } from '../components/student/AssignmentSubmitModal';
import { Assignment } from '../types';

interface StudentDashboardProps {
  onNavigate: (page: string, params?: any) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const {
    subjects,
    classworks,
    assignments,
    submissions,
    studyMaterials,
    announcements,
    attendanceSessions,
    toggleBookmark,
    isBookmarked
  } = useData();

  // Modals state
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; fileName: string; size: string; author?: string } | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; url: string } | null>(null);
  const [submittingAssignment, setSubmittingAssignment] = useState<Assignment | null>(null);

  const studentName = currentUser?.name || 'Alex Mercer';
  const currentDate = 'Saturday, November 21, 2026';
  const todayStr = '2026-11-21';

  // Metrics
  const todayClassworks = classworks.filter(cw => cw.date === todayStr);

  const mySubmissions = submissions.filter(s => s.studentId === currentUser?.id);
  const completedAssignmentIds = mySubmissions.map(s => s.assignmentId);
  const pendingAssignments = assignments.filter(asg => !completedAssignmentIds.includes(asg.id));
  const completedAssignments = assignments.filter(asg => completedAssignmentIds.includes(asg.id));

  // Attendance calculation
  let totalClasses = 0;
  let presentClasses = 0;
  attendanceSessions.forEach(session => {
    const record = session.records.find(r => r.studentId === currentUser?.id);
    if (record) {
      totalClasses++;
      if (record.status === 'Present') presentClasses++;
    }
  });
  if (totalClasses === 0) {
    totalClasses = 24;
    presentClasses = 21;
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentDate}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {studentName}!
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              You are enrolled in B.Tech Computer Science & Engineering (Semester 5). You have{' '}
              <strong className="text-amber-300 font-bold">{pendingAssignments.length} pending assignments</strong>{' '}
              and <strong className="text-white font-bold">{todayClassworks.length} classwork lectures</strong> updated today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('daily-classwork')}
              className="px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs font-bold shadow-md transition flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              View Today's Classwork
            </button>
            <button
              onClick={() => onNavigate('assignments')}
              className="px-4 py-2.5 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white border border-blue-400/30 text-xs font-bold transition flex items-center gap-1.5"
            >
              <FileCheck2 className="w-4 h-4" />
              Assignments
            </button>
          </div>
        </div>

        {/* Decorative background shape */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-white/5 rounded-full pointer-events-none" />
      </div>

      {/* 4 Key Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Subjects"
          value={subjects.length}
          subtitle="Semester 5 Core & Labs"
          icon={BookOpen}
          colorTheme="blue"
          onClick={() => onNavigate('subject-wise')}
        />
        <StatCard
          title="Today's Classwork"
          value={todayClassworks.length}
          subtitle="Lectures uploaded today"
          icon={Calendar}
          colorTheme="indigo"
          onClick={() => onNavigate('daily-classwork')}
        />
        <StatCard
          title="Pending Assignments"
          value={pendingAssignments.length}
          subtitle="Due within this week"
          icon={Clock}
          colorTheme="amber"
          onClick={() => onNavigate('assignments')}
        />
        <StatCard
          title="Completed Assignments"
          value={completedAssignments.length}
          subtitle="Submitted & graded"
          icon={FileCheck2}
          colorTheme="emerald"
          onClick={() => onNavigate('assignments')}
        />
      </div>

      {/* Attendance & Subject Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Ring Overview */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" /> Attendance Overview
            </h3>
            <button
              onClick={() => onNavigate('attendance')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Full Log
            </button>
          </div>
          <AttendanceRing present={presentClasses} total={totalClasses} />
        </div>

        {/* Quick Access to All Subjects */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" /> Enrolled Subjects Quick Access
            </h3>
            <button
              onClick={() => onNavigate('subject-wise')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              All Subjects ({subjects.length})
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {subjects.map(subj => (
              <div
                key={subj.id}
                onClick={() => onNavigate('subject-wise')}
                className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-md transition cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {subj.code}
                  </span>
                  <span className="text-[10px] text-slate-400">{subj.credits} Credits</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                  {subj.name}
                </h4>
                <p className="text-[10px] text-slate-400 mt-1">Lecture notes & labs</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Today's Classwork & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Classwork Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" /> Today's Classwork ({todayStr})
              </h3>
              <p className="text-xs text-slate-400">Classroom activities and assignments logged today</p>
            </div>
            <button
              onClick={() => onNavigate('daily-classwork')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              Browse All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {todayClassworks.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
              No new classwork posted yet for today. Check previous days.
            </div>
          ) : (
            <div className="space-y-4">
              {todayClassworks.map(cw => {
                const subj = subjects.find(s => s.id === cw.subjectId);
                const bookmarked = isBookmarked(currentUser?.id || '', 'classwork', cw.id);

                return (
                  <div
                    key={cw.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                            {subj?.code || 'CS501'} • {subj?.name || 'Subject'}
                          </span>
                          <span className="text-xs text-slate-400">• By {cw.teacherName}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {cw.topic}
                        </h4>
                      </div>

                      <button
                        onClick={() => toggleBookmark(currentUser?.id || '', 'classwork', cw.id)}
                        className={`p-1.5 rounded-lg border transition ${
                          bookmarked
                            ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:border-amber-800'
                            : 'text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600'
                        }`}
                        title="Bookmark classwork"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cw.description}
                    </p>

                    {/* Homework Highlight */}
                    {cw.homework && (
                      <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200/70 dark:border-amber-900/50 text-xs">
                        <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                          ✍️ Homework Task:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">{cw.homework}</span>
                      </div>
                    )}

                    {/* Attachments & Video Links */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {cw.attachments.map(att => (
                        <button
                          key={att.id}
                          onClick={() =>
                            setSelectedPdf({
                              title: cw.topic,
                              fileName: att.name,
                              size: att.size,
                              author: cw.teacherName
                            })
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-300 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-500" />
                          <span>{att.name}</span>
                        </button>
                      ))}

                      {cw.videoLinks && cw.videoLinks[0] && (
                        <button
                          onClick={() => setSelectedVideo({ title: cw.topic, url: cw.videoLinks[0] })}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition"
                        >
                          <Play className="w-3.5 h-3.5 fill-rose-600" />
                          <span>Lecture Video</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming Deadlines & Assignments */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" /> Upcoming Assignment Deadlines
              </h3>
              <p className="text-xs text-slate-400">Manage submissions and avoid late penalties</p>
            </div>
            <button
              onClick={() => onNavigate('assignments')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              View Board <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {assignments.slice(0, 3).map(asg => {
              const subj = subjects.find(s => s.id === asg.subjectId);
              const submission = submissions.find(s => s.assignmentId === asg.id && s.studentId === currentUser?.id);
              const isSubmitted = !!submission;
              const isChecked = submission?.status === 'Checked';

              return (
                <div
                  key={asg.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {subj?.code} • Max {asg.maxMarks} Marks
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                        {asg.title}
                      </h4>
                    </div>

                    {/* Status Pill */}
                    {isChecked ? (
                      <Badge variant="success">Graded ({submission.marks}/{asg.maxMarks})</Badge>
                    ) : isSubmitted ? (
                      <Badge variant="purple">Submitted</Badge>
                    ) : (
                      <Badge variant="warning">Pending</Badge>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {asg.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Due: {new Date(asg.deadline).toLocaleDateString()}
                    </span>

                    {isSubmitted ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                        ✓ Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <button
                        onClick={() => setSubmittingAssignment(asg)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm"
                      >
                        Submit Work
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recently Uploaded Notes & Latest Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recently Uploaded Study Notes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FolderDown className="w-5 h-5 text-purple-600" /> Recently Uploaded Study Notes
            </h3>
            <button
              onClick={() => onNavigate('study-materials')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              Library ({studyMaterials.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {studyMaterials.slice(0, 3).map(sm => (
              <div
                key={sm.id}
                className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {sm.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {sm.teacherName} • {sm.fileSize} • {sm.downloadCount} downloads
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      setSelectedPdf({
                        title: sm.title,
                        fileName: sm.fileName,
                        size: sm.fileSize,
                        author: sm.teacherName
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Announcements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-rose-600" /> College Notices & Circulars
            </h3>
            <button
              onClick={() => onNavigate('announcements')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              All Notices <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 2).map(anc => (
              <div
                key={anc.id}
                className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      anc.priority === 'Urgent'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}
                  >
                    {anc.priority}
                  </span>
                  <span className="text-[10px] text-slate-400">{anc.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{anc.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{anc.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {selectedPdf && (
        <PdfPreviewModal
          isOpen={true}
          onClose={() => setSelectedPdf(null)}
          title={selectedPdf.title}
          fileName={selectedPdf.fileName}
          fileSize={selectedPdf.size}
          authorName={selectedPdf.author}
        />
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={true}
          onClose={() => setSelectedVideo(null)}
          title={selectedVideo.title}
          videoUrl={selectedVideo.url}
        />
      )}

      {/* Assignment Submit Modal */}
      {submittingAssignment && (
        <AssignmentSubmitModal
          isOpen={true}
          onClose={() => setSubmittingAssignment(null)}
          assignment={submittingAssignment}
        />
      )}
    </div>
  );
};
