import React, { useState } from 'react';
import {
  FolderDown,
  FileText,
  Search,
  Download,
  Eye,
  Plus,
  Trash2,
  Calendar,
  User,
  Filter,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { PdfPreviewModal } from '../components/common/PdfPreviewModal';
import { Modal } from '../components/common/Modal';
import { StudyMaterial } from '../types';

export const StudyMaterialsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { studyMaterials, subjects, semesters, addStudyMaterial, deleteStudyMaterial, incrementDownload, toggleBookmark, isBookmarked } = useData();

  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedFileType, setSelectedFileType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState<StudyMaterial | null>(null);

  // Upload Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSubjId, setNewSubjId] = useState('subj-cs501');
  const [newFileType, setNewFileType] = useState<'pdf' | 'docx' | 'image' | 'ppt'>('pdf');
  const [newFileName, setNewFileName] = useState('');

  const filteredMaterials = studyMaterials.filter(sm => {
    if (selectedSubject !== 'all' && sm.subjectId !== selectedSubject) return false;
    if (selectedFileType !== 'all' && sm.fileType !== selectedFileType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = sm.title.toLowerCase().includes(q);
      const matchDesc = sm.description.toLowerCase().includes(q);
      const matchFile = sm.fileName.toLowerCase().includes(q);
      const subj = subjects.find(s => s.id === sm.subjectId)?.name || '';
      const matchSubj = subj.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchFile && !matchSubj) return false;
    }
    return true;
  });

  const handleDownload = (sm: StudyMaterial) => {
    incrementDownload(sm.id);
    const element = document.createElement('a');
    const file = new Blob([`Simulated document content for ${sm.title}`], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = sm.fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadAll = () => {
    alert(`Downloading ${filteredMaterials.length} study material documents packaged as Zip.`);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const finalFileName = newFileName.trim() || `${newTitle.replace(/\s+/g, '_')}.${newFileType}`;

    addStudyMaterial({
      subjectId: newSubjId,
      semesterId: 'sem-5',
      departmentId: 'dept-cse',
      teacherId: currentUser?.id || 'usr-teacher-1',
      teacherName: currentUser?.name || 'Prof. Sarah Jenkins',
      title: newTitle.trim(),
      description: newDesc.trim() || 'Comprehensive course notes and lecture references.',
      fileType: newFileType,
      fileName: finalFileName,
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: `${(Math.random() * 3 + 2).toFixed(1)} MB`
    });

    setIsUploadModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewFileName('');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Notes & Study Materials Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access, preview, and download official professor slide decks, cheat sheets, and syllabi
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleDownloadAll}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Download All (ZIP)
          </button>

          {(currentUser?.role === 'teacher' || currentUser?.role === 'admin') && (
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Upload Study Material
            </button>
          )}
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Subject filter */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="all">All Subjects (CS501 - CS506)</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
            ))}
          </select>

          <select
            value={selectedFileType}
            onChange={e => setSelectedFileType(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="all">All File Formats</option>
            <option value="pdf">PDF Documents</option>
            <option value="docx">Word DOCX</option>
            <option value="image">Diagrams / Images</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search notes, chapters, topics..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Grid of Materials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map(sm => {
          const subj = subjects.find(s => s.id === sm.subjectId);
          const bookmarked = isBookmarked(currentUser?.id || '', 'study_material', sm.id);

          return (
            <div
              key={sm.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {subj?.code || 'CS501'} • {sm.fileType.toUpperCase()}
                  </span>

                  <button
                    onClick={() => toggleBookmark(currentUser?.id || '', 'study_material', sm.id)}
                    className={`p-1.5 rounded-lg border transition ${
                      bookmarked
                        ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:border-amber-800'
                        : 'text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                  {sm.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {sm.description}
                </p>

                <div className="pt-3 text-[11px] text-slate-400 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Uploaded by {sm.teacherName}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Date: {sm.createdAt} • Size: {sm.fileSize}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setPreviewMaterial(sm)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>

                <button
                  onClick={() => handleDownload(sm)}
                  className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>

                {(currentUser?.role === 'teacher' || currentUser?.role === 'admin') && (
                  <button
                    onClick={() => deleteStudyMaterial(sm.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl border border-slate-200 dark:border-slate-700"
                    title="Delete document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Study Material / Notes"
        subtitle="Add PDF slides, cheat sheets, and book chapters to repository"
        maxWidth="lg"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Document Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="e.g. Unit 5: Distributed Concurrency & Timestamp Ordering"
              required
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Subject
              </label>
              <select
                value={newSubjId}
                onChange={e => setNewSubjId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Format
              </label>
              <select
                value={newFileType}
                onChange={e => setNewFileType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="pdf">PDF Document (.pdf)</option>
                <option value="docx">Word (.docx)</option>
                <option value="image">Image Diagram (.png/.jpg)</option>
                <option value="ppt">PowerPoint (.pptx)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              File Name
            </label>
            <input
              type="text"
              value={newFileName}
              onChange={e => setNewFileName(e.target.value)}
              placeholder="e.g. Unit5_Distributed_Concurrency.pdf"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Content Summary & Chapter Scope
            </label>
            <textarea
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              rows={3}
              placeholder="Outline what is covered in this document..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
            >
              Upload Material
            </button>
          </div>
        </form>
      </Modal>

      {/* PDF Preview Modal */}
      {previewMaterial && (
        <PdfPreviewModal
          isOpen={true}
          onClose={() => setPreviewMaterial(null)}
          title={previewMaterial.title}
          fileName={previewMaterial.fileName}
          fileSize={previewMaterial.fileSize}
          authorName={previewMaterial.teacherName}
          date={previewMaterial.createdAt}
        />
      )}
    </div>
  );
};
