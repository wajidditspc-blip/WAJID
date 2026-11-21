import React, { useState } from 'react';
import {
  FileCheck2,
  Calendar,
  Clock,
  Award,
  UploadCloud,
  FileText,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Badge } from '../components/common/Badge';
import { AddAssignmentModal } from '../components/teacher/AddAssignmentModal';
import { AssignmentSubmitModal } from '../components/student/AssignmentSubmitModal';
import { GradeSubmissionModal } from '../components/teacher/GradeSubmissionModal';
import { PdfPreviewModal } from '../components/common/PdfPreviewModal';
import { Assignment, AssignmentSubmission, AssignmentStatus } from '../types';

export const AssignmentsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { assignments, submissions, subjects } = useData();

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'submitted' | 'checked'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
  const [submittingAssignment, setSubmittingAssignment] = useState<Assignment | null>(null);
  const [gradingSubmission, setGradingSubmission] = useState<{ submission: AssignmentSubmission; assignment: Assignment } | null>(null);
  const [previewPdf, setPreviewPdf] = useState<{ title: string; fileName: string; size: string; author?: string } | null>(null);

  // Helper to get student's submission status for an assignment
  const getSubmissionForAssignment = (assignmentId: string): AssignmentSubmission | undefined => {
    return submissions.find(s => s.assignmentId === assignmentId && s.studentId === currentUser?.id);
  };

  const filteredAssignments = assignments.filter(asg => {
    const subj = subjects.find(s => s.id === asg.subjectId);
    const sub = getSubmissionForAssignment(asg.id);

    // Filter by status
    if (statusFilter === 'pending') {
      if (sub && sub.status !== 'Pending') return false;
    } else if (statusFilter === 'submitted') {
      if (!sub || sub.status !== 'Submitted') return false;
    } else if (statusFilter === 'checked') {
      if (!sub || sub.status !== 'Checked') return false;
    }

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = asg.title.toLowerCase().includes(q);
      const matchDesc = asg.description.toLowerCase().includes(q);
      const matchSubj = subj?.name.toLowerCase().includes(q) || subj?.code.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchSubj) return false;
    }

    return true;
  });

  // Calculate deadline countdown helper
  const getDeadlineText = (deadlineStr: string) => {
    const diff = new Date(deadlineStr).getTime() - new Date('2026-11-21T10:45:00').getTime();
    if (diff < 0) return { text: 'Deadline Passed', isLate: true };
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return { text: `${hours} hours remaining`, isLate: false, urgent: true };
    const days = Math.floor(hours / 24);
    return { text: `${days} days remaining`, isLate: false, urgent: false };
  };

  // Export Assignment Report (CSV)
  const handleExportReport = () => {
    let csv = 'Assignment Title,Subject,Deadline,Max Marks,Submissions Count\n';
    assignments.forEach(a => {
      const subj = subjects.find(s => s.id === a.subjectId)?.code || '';
      const subCount = submissions.filter(s => s.assignmentId === a.id).length;
      csv += `"${a.title}","${subj}","${a.deadline}",${a.maxMarks},${subCount}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Apex_Assignments_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Academic Assignments & Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Submit coursework, track upcoming deadlines, review evaluations and grades
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportReport}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export Report (CSV)
          </button>

          {(currentUser?.role === 'teacher' || currentUser?.role === 'admin') && (
            <button
              onClick={() => setIsAddAssignmentOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Assignment
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Filter Pills & Search */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Assignments ({assignments.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              statusFilter === 'pending'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setStatusFilter('submitted')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              statusFilter === 'submitted'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Submitted
          </button>
          <button
            onClick={() => setStatusFilter('checked')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              statusFilter === 'checked'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Checked / Graded
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search assignments..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Assignment Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssignments.map(asg => {
          const subj = subjects.find(s => s.id === asg.subjectId);
          const submission = getSubmissionForAssignment(asg.id);
          const deadlineInfo = getDeadlineText(asg.deadline);

          // All submissions for this assignment (for teachers to grade)
          const allSubsForThis = submissions.filter(s => s.assignmentId === asg.id);

          return (
            <div
              key={asg.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    {subj?.code || 'CS501'} • {subj?.name || 'Subject'}
                  </span>

                  {/* Status Badge */}
                  {submission?.status === 'Checked' ? (
                    <Badge variant="success">Graded ({submission.marks}/{asg.maxMarks})</Badge>
                  ) : submission?.status === 'Submitted' ? (
                    <Badge variant="purple">Submitted</Badge>
                  ) : deadlineInfo.isLate ? (
                    <Badge variant="danger">Late Deadline</Badge>
                  ) : (
                    <Badge variant="warning">Pending Work</Badge>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {asg.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {asg.description}
                </p>

                {/* Deadline & Max Marks bar */}
                <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>Due: {new Date(asg.deadline).toLocaleString()}</span>
                  </div>

                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] ${
                    deadlineInfo.isLate
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : deadlineInfo.urgent
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{deadlineInfo.text}</span>
                  </div>

                  <span className="font-semibold text-slate-700 dark:text-slate-300 ml-auto">
                    Max: {asg.maxMarks} Marks
                  </span>
                </div>

                {/* Teacher Attachment Download */}
                {asg.attachments && asg.attachments.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {asg.attachments.map(att => (
                      <button
                        key={att.id}
                        onClick={() =>
                          setPreviewPdf({
                            title: asg.title,
                            fileName: att.name,
                            size: att.size,
                            author: asg.teacherName
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-500" />
                        <span>Specification ({att.name})</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Student Grading Feedback Box (if graded) */}
                {submission && submission.status === 'Checked' && (
                  <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-emerald-600" />
                        Evaluated Score: {submission.marks} / {asg.maxMarks} Points
                      </span>
                    </div>
                    {submission.feedback && (
                      <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                        "{submission.feedback}"
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons: Student Submit vs Teacher Submissions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {currentUser?.role === 'student' ? (
                  submission ? (
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Submitted: <strong>{submission.fileName}</strong></span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSubmittingAssignment(asg)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <UploadCloud className="w-4 h-4" />
                      Upload Assignment Submission
                    </button>
                  )
                ) : (
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>Total Submissions Received: {allSubsForThis.length}</span>
                      <span className="text-blue-600 dark:text-blue-400">Class 5A</span>
                    </div>

                    {allSubsForThis.map(sub => (
                      <div
                        key={sub.id}
                        className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{sub.studentName} ({sub.studentRoll})</p>
                          <p className="text-[10px] text-slate-400">{sub.fileName} • {sub.status}</p>
                        </div>
                        <button
                          onClick={() => setGradingSubmission({ submission: sub, assignment: asg })}
                          className="px-2.5 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition"
                        >
                          {sub.status === 'Checked' ? 'Re-Grade' : 'Grade'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <AddAssignmentModal
        isOpen={isAddAssignmentOpen}
        onClose={() => setIsAddAssignmentOpen(false)}
      />

      {submittingAssignment && (
        <AssignmentSubmitModal
          isOpen={true}
          onClose={() => setSubmittingAssignment(null)}
          assignment={submittingAssignment}
        />
      )}

      {gradingSubmission && (
        <GradeSubmissionModal
          isOpen={true}
          onClose={() => setGradingSubmission(null)}
          submission={gradingSubmission.submission}
          assignment={gradingSubmission.assignment}
        />
      )}

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
    </div>
  );
};
