import React, { useState, useMemo } from 'react';
import { Modal } from './Modal';
import { Search, BookOpen, FileText, Calendar, Bell, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, params?: any) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');
  const { classworks, assignments, studyMaterials, announcements, subjects } = useData();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    const matches: Array<{
      id: string;
      title: string;
      subtitle: string;
      category: 'Classwork' | 'Assignment' | 'Notes' | 'Announcement';
      page: string;
      meta?: string;
    }> = [];

    // Search classwork
    classworks.forEach(cw => {
      const subj = subjects.find(s => s.id === cw.subjectId)?.name || 'Subject';
      if (
        cw.topic.toLowerCase().includes(q) ||
        cw.description.toLowerCase().includes(q) ||
        cw.homework.toLowerCase().includes(q) ||
        subj.toLowerCase().includes(q)
      ) {
        matches.push({
          id: cw.id,
          title: cw.topic,
          subtitle: `${subj} • Date: ${cw.date}`,
          category: 'Classwork',
          page: 'daily-classwork',
          meta: cw.teacherName
        });
      }
    });

    // Search assignments
    assignments.forEach(asg => {
      const subj = subjects.find(s => s.id === asg.subjectId)?.name || 'Subject';
      if (asg.title.toLowerCase().includes(q) || asg.description.toLowerCase().includes(q)) {
        matches.push({
          id: asg.id,
          title: asg.title,
          subtitle: `${subj} • Due: ${new Date(asg.deadline).toLocaleDateString()}`,
          category: 'Assignment',
          page: 'assignments',
          meta: `${asg.maxMarks} Marks`
        });
      }
    });

    // Search study materials
    studyMaterials.forEach(sm => {
      const subj = subjects.find(s => s.id === sm.subjectId)?.name || 'Subject';
      if (sm.title.toLowerCase().includes(q) || sm.description.toLowerCase().includes(q)) {
        matches.push({
          id: sm.id,
          title: sm.title,
          subtitle: `${subj} • ${sm.fileType.toUpperCase()} (${sm.fileSize})`,
          category: 'Notes',
          page: 'study-materials',
          meta: sm.teacherName
        });
      }
    });

    // Search announcements
    announcements.forEach(anc => {
      if (anc.title.toLowerCase().includes(q) || anc.content.toLowerCase().includes(q)) {
        matches.push({
          id: anc.id,
          title: anc.title,
          subtitle: `Notice • ${anc.date}`,
          category: 'Announcement',
          page: 'announcements',
          meta: anc.priority
        });
      }
    });

    return matches.slice(0, 8); // Top 8 results
  }, [query, classworks, assignments, studyMaterials, announcements, subjects]);

  const handleSelect = (item: any) => {
    onNavigate(item.page);
    onClose();
  };

  const categoryIcons = {
    Classwork: BookOpen,
    Assignment: Calendar,
    Notes: FileText,
    Announcement: Bell
  };

  const categoryColors = {
    Classwork: 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
    Assignment: 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400',
    Notes: 'bg-purple-50 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400',
    Announcement: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Global Academic Search" maxWidth="2xl">
      <div className="space-y-4">
        {/* Input box */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search classwork, topics, assignments, notes, announcements..."
            autoFocus
            className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        {/* Results */}
        {query.trim() === '' ? (
          <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-sm">
            Type keywords like <span className="text-blue-600 dark:text-blue-400 font-semibold">"B-Tree"</span>, <span className="text-blue-600 dark:text-blue-400 font-semibold">"Knapsack"</span>, <span className="text-blue-600 dark:text-blue-400 font-semibold">"Exam"</span>, or subject codes.
          </div>
        ) : results.length === 0 ? (
          <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-sm">
            No academic records found matching "{query}".
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto">
            {results.map(item => {
              const Icon = categoryIcons[item.category];
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${categoryColors[item.category]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 group-hover:text-blue-600 transition-colors">
                    {item.meta && <span className="text-xs font-medium text-slate-500 hidden sm:inline">{item.meta}</span>}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};
