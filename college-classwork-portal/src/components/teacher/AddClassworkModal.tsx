import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Plus, Trash2, Video, Paperclip, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Attachment } from '../../types';

interface AddClassworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddClassworkModal: React.FC<AddClassworkModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { subjects, departments, semesters, addClasswork } = useData();
  const { currentUser } = useAuth();

  const [departmentId, setDepartmentId] = useState('dept-cse');
  const [semesterId, setSemesterId] = useState('sem-5');
  const [subjectId, setSubjectId] = useState('subj-cs501');
  const [date, setDate] = useState('2026-11-21');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [homework, setHomework] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAddAttachment = () => {
    if (!attachmentName.trim()) return;
    const newAtt: Attachment = {
      id: `att-${Date.now()}`,
      name: attachmentName.trim().endsWith('.pdf') ? attachmentName.trim() : `${attachmentName.trim()}.pdf`,
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
      type: 'pdf'
    };
    setAttachments(prev => [...prev, newAtt]);
    setAttachmentName('');
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleAddImage = () => {
    if (!imageUrl.trim()) return;
    setImages(prev => [...prev, imageUrl.trim()]);
    setImageUrl('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please provide a classwork topic or chapter name');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a classwork description');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      addClasswork({
        date,
        departmentId,
        semesterId,
        subjectId,
        teacherId: currentUser?.id || 'usr-teacher-1',
        teacherName: currentUser?.name || 'Prof. Sarah Jenkins',
        topic: topic.trim(),
        description: description.trim(),
        homework: homework.trim(),
        attachments,
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600'],
        videoLinks: videoLink.trim() ? [videoLink.trim()] : []
      });

      setIsSubmitting(false);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setError('Failed to create classwork. Please try again.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Daily Classwork" subtitle="Publish daily classroom activities, lecture notes, homework & resources" maxWidth="2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs">
            {error}
          </div>
        )}

        {/* Row 1: Department, Semester, Subject */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Department
            </label>
            <select
              value={departmentId}
              onChange={e => setDepartmentId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {departments.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Semester
            </label>
            <select
              value={semesterId}
              onChange={e => setSemesterId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {semesters.map(s => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Subject
            </label>
            <select
              value={subjectId}
              onChange={e => setSubjectId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Date & Topic */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Date of Class
            </label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Topic or Chapter Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="e.g. B-Tree & B+ Tree Indexing in Relational Databases"
              required
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Classwork Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Classwork Summary & Concepts Taught <span className="text-rose-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            placeholder="Detailed description of what was covered during the lecture, theorems proved, lab demonstrations performed..."
            required
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Homework Description */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Daily Homework / Tasks for Students
          </label>
          <textarea
            value={homework}
            onChange={e => setHomework(e.target.value)}
            rows={2}
            placeholder="Specific exercises, textbook questions, reading assignments, or problem sets for students..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* YouTube Video Link */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-rose-500" /> YouTube Video Resource Link (Optional)
          </label>
          <input
            type="url"
            value={videoLink}
            onChange={e => setVideoLink(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Attachments Section */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
            <Paperclip className="w-3.5 h-3.5 text-blue-500" /> Attach PDF Notes or Documents
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={attachmentName}
              onChange={e => setAttachmentName(e.target.value)}
              placeholder="Document name e.g. Lecture-Notes-Ch14.pdf"
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
            <button
              type="button"
              onClick={handleAddAttachment}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          {attachments.length > 0 && (
            <div className="mt-2 space-y-1">
              {attachments.map(att => (
                <div key={att.id} className="flex items-center justify-between text-xs bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="font-medium truncate">{att.name} ({att.size})</span>
                  <button type="button" onClick={() => handleRemoveAttachment(att.id)} className="text-rose-500 hover:text-rose-700">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
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
            {isSubmitting ? 'Publishing...' : 'Publish Daily Classwork'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
