import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useData } from '../../context/DataContext';
import { Award, FileText, CheckCircle2, User, Clock, MessageSquare } from 'lucide-react';
import { AssignmentSubmission, Assignment } from '../../types';

interface GradeSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: AssignmentSubmission | null;
  assignment: Assignment | null;
  onSuccess?: () => void;
}

export const GradeSubmissionModal: React.FC<GradeSubmissionModalProps> = ({
  isOpen,
  onClose,
  submission,
  assignment,
  onSuccess
}) => {
  const { gradeSubmission } = useData();
  const [marks, setMarks] = useState<number>(submission?.marks ?? 18);
  const [feedback, setFeedback] = useState<string>(
    submission?.feedback ?? 'Great implementation and well-structured code. Documented edge cases clearly.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!submission || !assignment) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    gradeSubmission(submission.id, Number(marks), feedback.trim(), 'Checked');
    setIsSubmitting(false);
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Evaluate & Grade Submission"
      subtitle={`${assignment.title}`}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student metadata info box */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{submission.studentName}</p>
              <p className="text-xs text-slate-500">Roll No: {submission.studentRoll}</p>
            </div>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            Submitted: {new Date(submission.submittedAt).toLocaleString()}
          </div>
        </div>

        {/* Submitted file pill */}
        <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white truncate max-w-xs">
                {submission.fileName}
              </p>
              <p className="text-[10px] text-slate-500">{submission.fileSize}</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Verified File
          </span>
        </div>

        {/* Student Note */}
        {submission.notes && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Student's Note</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 italic">"{submission.notes}"</p>
          </div>
        )}

        {/* Marks Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            Score / Marks (Max: {assignment.maxMarks}) <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={assignment.maxMarks}
              value={marks}
              onChange={e => setMarks(Number(e.target.value))}
              required
              className="w-32 px-3 py-2 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-slate-400">/ {assignment.maxMarks} Points</span>
          </div>
        </div>

        {/* Feedback Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            Teacher's Feedback & Comments
          </label>
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            rows={3}
            placeholder="Write constructive evaluation feedback for the student..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : 'Save Grade & Publish'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
