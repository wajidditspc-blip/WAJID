import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  Calendar,
  FileCheck2,
  FolderDown,
  User,
  ArrowRight,
  ExternalLink,
  Award,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/common/Badge';
import { PdfPreviewModal } from '../components/common/PdfPreviewModal';

interface SubjectWisePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export const SubjectWisePage: React.FC<SubjectWisePageProps> = ({ onNavigate }) => {
  const { subjects, classworks, assignments, studyMaterials } = useData();
  const { currentUser } = useAuth();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(subjects[0]?.id || 'subj-cs501');
  const [activeTab, setActiveTab] = useState<'classwork' | 'assignments' | 'notes'>('classwork');
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; fileName: string; size: string; author?: string } | null>(null);

  const currentSubject = subjects.find(s => s.id === selectedSubjectId) || subjects[0];
  const subjectClassworks = classworks.filter(cw => cw.subjectId === selectedSubjectId);
  const subjectAssignments = assignments.filter(asg => asg.subjectId === selectedSubjectId);
  const subjectMaterials = studyMaterials.filter(sm => sm.subjectId === selectedSubjectId);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>Curriculum Archive</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Subject-Wise Academic Archives
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore comprehensive lecture streams, projects, and study guides categorized by curriculum subject
        </p>
      </div>

      {/* Subject Cards Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map(subj => {
          const isSelected = subj.id === selectedSubjectId;
          const cwCount = classworks.filter(cw => cw.subjectId === subj.id).length;
          const asgCount = assignments.filter(asg => asg.subjectId === subj.id).length;

          return (
            <div
              key={subj.id}
              onClick={() => setSelectedSubjectId(subj.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-700">
                  {subj.code}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {subj.credits} Credit Hours
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">
                {subj.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Department of Computer Science
              </p>

              <div className="flex items-center gap-4 pt-4 mt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500">
                <span><strong>{cwCount}</strong> Classwork</span>
                <span>•</span>
                <span><strong>{asgCount}</strong> Assignments</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Subject Dossier View */}
      {currentSubject && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Dossier Header */}
          <div className="p-6 sm:p-8 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-600 text-white">
                  {currentSubject.code}
                </span>
                <span className="text-xs text-slate-500">B.Tech Semester 5</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {currentSubject.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Course Lead: Prof. Sarah Jenkins / Dr. Marcus Reed
              </p>
            </div>

            {/* Dossier Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('classwork')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'classwork'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Classwork ({subjectClassworks.length})
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'assignments'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Assignments ({subjectAssignments.length})
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  activeTab === 'notes'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Study Notes ({subjectMaterials.length})
              </button>
            </div>
          </div>

          {/* Dossier Body */}
          <div className="p-6 sm:p-8">
            {/* Tab: Classwork */}
            {activeTab === 'classwork' && (
              <div className="space-y-4">
                {subjectClassworks.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No classwork lectures uploaded for this subject yet.
                  </div>
                ) : (
                  subjectClassworks.map(cw => (
                    <div
                      key={cw.id}
                      className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                          Date: {cw.date}
                        </span>
                        <span className="text-xs text-slate-400">Instructor: {cw.teacherName}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{cw.topic}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {cw.description}
                      </p>
                      {cw.homework && (
                        <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
                          <strong>Homework: </strong>{cw.homework}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab: Assignments */}
            {activeTab === 'assignments' && (
              <div className="space-y-4">
                {subjectAssignments.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No active assignments for this subject.
                  </div>
                ) : (
                  subjectAssignments.map(asg => (
                    <div
                      key={asg.id}
                      className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          Due: {new Date(asg.deadline).toLocaleDateString()}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                          {asg.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{asg.description}</p>
                      </div>

                      <button
                        onClick={() => onNavigate('assignments')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shrink-0"
                      >
                        View Assignment
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab: Study Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-3">
                {subjectMaterials.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No study material documents uploaded for this subject yet.
                  </div>
                ) : (
                  subjectMaterials.map(sm => (
                    <div
                      key={sm.id}
                      className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{sm.title}</h4>
                        <p className="text-[11px] text-slate-400">{sm.fileName} ({sm.fileSize})</p>
                      </div>
                      <button
                        onClick={() =>
                          setSelectedPdf({
                            title: sm.title,
                            fileName: sm.fileName,
                            size: sm.fileSize,
                            author: sm.teacherName
                          })
                        }
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-xs font-bold transition hover:bg-blue-100"
                      >
                        Preview PDF
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
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
