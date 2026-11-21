import React, { useState } from 'react';
import {
  Upload,
  Calendar,
  FileCheck2,
  FolderDown,
  UserCheck,
  Megaphone,
  Plus,
  BookOpen,
  Award,
  Trash2,
  Edit3,
  ExternalLink,
  Play,
  FileText,
  Clock,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { AddClassworkModal } from '../components/teacher/AddClassworkModal';
import { AddAssignmentModal } from '../components/teacher/AddAssignmentModal';
import { GradeSubmissionModal } from '../components/teacher/GradeSubmissionModal';
import { AnnouncementModal } from '../components/admin/AnnouncementModal';
import { PdfPreviewModal } from '../components/common/PdfPreviewModal';
import { Assignment, AssignmentSubmission } from '../types';

interface TeacherDashboardProps {
  onNavigate: (page: string, params?: any) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const {
    subjects,
    classworks,
    assignments,
    submissions,
    studyMaterials,
    attendanceSessions,
    deleteClasswork
  } = useData();

  // Modals
  const [isAddClassworkOpen, setIsAddClassworkOpen] = useState(false);
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
  const [isAddAnnouncementOpen, setIsAddAnnouncementOpen] = useState(false);
  const [gradingSubmission, setGradingSubmission] = useState<{ submission: AssignmentSubmission; assignment: Assignment } | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; fileName: string; size: string; author?: string } | null>(null);

  // Filters for Teacher view
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');

  const teacherName = currentUser?.name || 'Prof. Sarah Jenkins';
  const todayStr = '2026-11-21';

  // Metrics
  const myClassworks = classworks.filter(cw => cw.teacherName === teacherName || cw.teacherId === currentUser?.id);
  const myAssignments = assignments.filter(asg => asg.teacherName === teacherName || asg.teacherId === currentUser?.id);

  // Submissions needing review
  const pendingReviews = submissions.filter(s => {
    const asg = assignments.find(a => a.id === s.assignmentId);
    return asg && (asg.teacherName === teacherName || asg.teacherId === currentUser?.id) && s.status === 'Submitted';
  });

  // Filtered classwork list
  const filteredClassworks = selectedSubjectFilter === 'all'
    ? myClassworks
    : myClassworks.filter(cw => cw.subjectId === selectedSubjectFilter);

  return (
    <div className="space-y-8 pb-12">
      {/* Teacher Welcome & Quick Actions Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Faculty Academic Workspace • Session 2026-2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {teacherName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {currentUser?.designation || 'Associate Professor, Computer Science & Engineering'}.
              You have <strong className="text-amber-400 font-bold">{pendingReviews.length} student submissions</strong> awaiting grading.
            </p>
          </div>

          {/* Quick Upload Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAddClassworkOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Upload Daily Classwork
            </button>

            <button
              onClick={() => setIsAddAssignmentOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
            >
              <FileCheck2 className="w-4 h-4 text-amber-400" />
              New Assignment
            </button>

            <button
              onClick={() => onNavigate('attendance')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              Take Attendance
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Assigned Subjects"
          value="2 Subjects"
          subtitle="CS501 (DBMS) & CS502 (Algorithms)"
          icon={BookOpen}
          colorTheme="blue"
          onClick={() => onNavigate('subject-wise')}
        />
        <StatCard
          title="Classwork Lectures Posted"
          value={myClassworks.length}
          subtitle="Full semester archive"
          icon={Calendar}
          colorTheme="indigo"
          onClick={() => onNavigate('daily-classwork')}
        />
        <StatCard
          title="Submissions to Grade"
          value={pendingReviews.length}
          subtitle="Active student work files"
          icon={Award}
          colorTheme="amber"
          onClick={() => onNavigate('assignments')}
        />
        <StatCard
          title="Today's Attendance Status"
          value="Completed"
          subtitle="Class 5A & 5B records synced"
          icon={UserCheck}
          colorTheme="emerald"
          onClick={() => onNavigate('attendance')}
        />
      </div>

      {/* Main Workspace: Left Submissions Queue / Right Classwork Manager */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: My Uploaded Classwork Management */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" /> My Classwork Management Feed
              </h3>
              <p className="text-xs text-slate-400">Review, edit, or remove classroom entries</p>
            </div>

            {/* Subject filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedSubjectFilter}
                onChange={e => setSelectedSubjectFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="all">All My Subjects</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredClassworks.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                No classwork posts found for this filter. Click "Upload Daily Classwork" to publish one.
              </div>
            ) : (
              filteredClassworks.map(cw => {
                const subj = subjects.find(s => s.id === cw.subjectId);

                return (
                  <div
                    key={cw.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                            {subj?.code || 'CS501'} • {cw.date}
                          </span>
                          <span className="text-xs text-slate-400">Views: {cw.views || 42} students</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {cw.topic}
                        </h4>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => deleteClasswork(cw.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-slate-200 dark:border-slate-700 transition"
                          title="Delete classwork"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cw.description}
                    </p>

                    {/* Homework Highlight */}
                    {cw.homework && (
                      <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200/70 dark:border-amber-900/50 text-xs">
                        <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">
                          ✍️ Assigned Homework:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">{cw.homework}</span>
                      </div>
                    )}

                    {/* Attachments */}
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
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:hover:bg-blue-950/50 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-500" />
                          <span>{att.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 1 Col: Submissions Needing Evaluation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Submissions to Grade
              </h3>
              <p className="text-xs text-slate-400">Student work awaiting evaluation</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              {pendingReviews.length}
            </span>
          </div>

          <div className="space-y-3">
            {pendingReviews.length === 0 ? (
              <div className="p-6 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                All submitted assignments are currently graded and reviewed!
              </div>
            ) : (
              pendingReviews.map(sub => {
                const asg = assignments.find(a => a.id === sub.assignmentId);

                return (
                  <div
                    key={sub.id}
                    className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {sub.studentName}
                        </h4>
                        <p className="text-[10px] text-slate-400">Roll: {sub.studentRoll}</p>
                      </div>
                      <Badge variant="purple">Submitted</Badge>
                    </div>

                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300 line-clamp-1">
                      {asg?.title || 'Assignment'}
                    </p>

                    <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-between text-[11px] text-slate-500">
                      <span className="truncate max-w-[150px]">{sub.fileName}</span>
                      <span>{sub.fileSize}</span>
                    </div>

                    <button
                      onClick={() => asg && setGradingSubmission({ submission: sub, assignment: asg })}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Award className="w-3.5 h-3.5" />
                      Grade & Feedback
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddClassworkModal
        isOpen={isAddClassworkOpen}
        onClose={() => setIsAddClassworkOpen(false)}
      />

      <AddAssignmentModal
        isOpen={isAddAssignmentOpen}
        onClose={() => setIsAddAssignmentOpen(false)}
      />

      <AnnouncementModal
        isOpen={isAddAnnouncementOpen}
        onClose={() => setIsAddAnnouncementOpen(false)}
      />

      {gradingSubmission && (
        <GradeSubmissionModal
          isOpen={true}
          onClose={() => setGradingSubmission(null)}
          submission={gradingSubmission.submission}
          assignment={gradingSubmission.assignment}
        />
      )}

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
    </div>
  );
};
