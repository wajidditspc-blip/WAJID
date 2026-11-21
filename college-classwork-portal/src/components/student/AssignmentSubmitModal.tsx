import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Assignment } from '../../types';

interface AssignmentSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignment: Assignment | null;
  onSuccess?: () => void;
}

export const AssignmentSubmitModal: React.FC<AssignmentSubmitModalProps> = ({
  isOpen,
  onClose,
  assignment,
  onSuccess
}) => {
  const { currentUser } = useAuth();
  const { submitAssignment } = useData();

  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('2.4 MB');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!assignment) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFileName = fileName.trim() || `${currentUser?.name.replace(/\s+/g, '_')}_${assignment.title.substring(0, 15)}.zip`;

    setIsSubmitting(true);
    submitAssignment({
      assignmentId: assignment.id,
      studentId: currentUser?.id || 'usr-student-1',
      studentName: currentUser?.name || 'Alex Mercer',
      studentRoll: currentUser?.rollNo || '21CSE042',
      fileName: finalFileName,
      fileSize: fileSize || '2.4 MB',
      notes: notes.trim()
    });

    setIsSubmitting(false);
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Assignment"
      subtitle={assignment.title}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Assignment Deadline Reminder */}
        <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-blue-900 dark:text-blue-300">Due Date: </span>
            <span className="text-slate-700 dark:text-slate-300">
              {new Date(assignment.deadline).toLocaleString()}
            </span>
          </div>
          <span className="font-bold text-blue-700 dark:text-blue-400">
            Max Marks: {assignment.maxMarks}
          </span>
        </div>

        {/* File Dropzone */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Upload Work File (PDF, ZIP, DOCX, Code) <span className="text-rose-500">*</span>
          </label>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50 dark:bg-slate-800/40 relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center">
              <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 rounded-xl mb-3">
                <UploadCloud className="w-7 h-7" />
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {fileName ? fileName : 'Click to select or drag and drop your file here'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports ZIP, TAR, PDF, DOCX, CPP, PY, SQL up to 50MB
              </p>
              {fileName && (
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{fileName} ({fileSize})</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Optional or Manual File Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            File / Archive Title
          </label>
          <input
            type="text"
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            placeholder="e.g. AlexMercer_21CSE042_DBMS_Project.zip"
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>

        {/* Notes for Teacher */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Notes or Comments for Professor (Optional)
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={2}
            placeholder="Any implementation notes, GitHub repository link, execution instructions..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
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
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            {isSubmitting ? 'Submitting...' : 'Confirm Submission'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
