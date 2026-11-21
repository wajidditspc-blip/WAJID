import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Layers,
  FileCheck2,
  FolderDown,
  UserCheck,
  Megaphone,
  User,
  Info,
  PhoneCall,
  HelpCircle,
  PlusCircle,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isOpen,
  onClose
}) => {
  const { currentUser } = useAuth();
  const { assignments, submissions, classworks } = useData();

  // Calculate pending assignments for student
  const pendingCount = assignments.filter(asg => {
    if (currentUser?.role !== 'student') return false;
    const sub = submissions.find(s => s.assignmentId === asg.id && s.studentId === currentUser.id);
    return !sub || sub.status === 'Pending';
  }).length;

  // Today's classwork count
  const todayStr = '2026-11-21';
  const todayClassworkCount = classworks.filter(c => c.date === todayStr).length;

  const getDashboardId = () => {
    if (currentUser?.role === 'admin') return 'admin-dashboard';
    if (currentUser?.role === 'teacher') return 'teacher-dashboard';
    return 'student-dashboard';
  };

  const navItems = [
    {
      id: getDashboardId(),
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'daily-classwork',
      label: 'Daily Classwork',
      icon: CalendarDays,
      badge: todayClassworkCount > 0 ? `${todayClassworkCount} Today` : null,
      badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
    },
    {
      id: 'subject-wise',
      label: 'Subject Archives',
      icon: Layers,
      badge: null
    },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: FileCheck2,
      badge: currentUser?.role === 'student' && pendingCount > 0 ? `${pendingCount} Due` : null,
      badgeColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
    },
    {
      id: 'study-materials',
      label: 'Notes & Study Materials',
      icon: FolderDown,
      badge: null
    },
    {
      id: 'attendance',
      label: 'Attendance Portal',
      icon: UserCheck,
      badge: null
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: Megaphone,
      badge: null
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      badge: null
    }
  ];

  const collegeInfoItems = [
    { id: 'about', label: 'About College', icon: Info },
    { id: 'contact', label: 'Campus & Contact', icon: PhoneCall },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  const handleItemClick = (pageId: string) => {
    onNavigate(pageId);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6">
          {/* User Quick Mini Card */}
          {currentUser && (
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.role === 'student' ? currentUser.rollNo : currentUser.designation || currentUser.role}
                </p>
              </div>
            </div>
          )}

          {/* Academic Navigation */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Academic Modules
            </p>
            <nav className="space-y-1">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20 text-white' : item.badgeColor
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* College Info & Support */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              College & Resources
            </p>
            <nav className="space-y-1">
              {collegeInfoItems.map(item => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer info inside sidebar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Fall 2026 Semester</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
