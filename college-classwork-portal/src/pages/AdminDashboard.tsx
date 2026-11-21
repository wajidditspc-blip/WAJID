import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Layers,
  BookOpen,
  Calendar,
  FileCheck2,
  Megaphone,
  Activity,
  Plus,
  Trash2,
  Edit2,
  Shield,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { UserManagementModal } from '../components/admin/UserManagementModal';
import { AnnouncementModal } from '../components/admin/AnnouncementModal';
import { UserRole } from '../types';

interface AdminDashboardProps {
  onNavigate: (page: string, params?: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { allUsers, departments, subjects, classworks, assignments, announcements, activityLogs, deleteUser, deleteClasswork, deleteAnnouncement } = useData();

  const [activeTab, setActiveTab] = useState<'users' | 'departments' | 'classwork' | 'announcements' | 'logs'>('users');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'student' | 'teacher' | 'admin'>('all');
  const [searchUser, setSearchUser] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [modalDefaultRole, setModalDefaultRole] = useState<UserRole>('student');

  const studentsCount = allUsers.filter(u => u.role === 'student').length;
  const teachersCount = allUsers.filter(u => u.role === 'teacher').length;

  const filteredUsers = allUsers.filter(u => {
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
      (u.rollNo && u.rollNo.toLowerCase().includes(searchUser.toLowerCase()));
    return matchesRole && matchesSearch;
  });

  const handleOpenAddUser = (role: UserRole) => {
    setModalDefaultRole(role);
    setIsAddUserModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Chief Administrator Console • Root Authority</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Administrative Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Complete oversight of academic programs, faculty assignments, enrollment rosters, course classwork streams, and security audit logs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleOpenAddUser('student')}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Student
            </button>
            <button
              onClick={() => handleOpenAddUser('teacher')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Teacher
            </button>
            <button
              onClick={() => setIsAnnouncementModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
            >
              <Megaphone className="w-4 h-4 text-rose-400" />
              New Circular
            </button>
          </div>
        </div>
      </div>

      {/* 4 Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Students"
          value={studentsCount}
          subtitle="Enrolled undergraduates"
          icon={Users}
          colorTheme="blue"
          onClick={() => {
            setActiveTab('users');
            setUserRoleFilter('student');
          }}
        />
        <StatCard
          title="Faculty Teachers"
          value={teachersCount}
          subtitle="Academic professors & deans"
          icon={GraduationCap}
          colorTheme="indigo"
          onClick={() => {
            setActiveTab('users');
            setUserRoleFilter('teacher');
          }}
        />
        <StatCard
          title="Departments & Courses"
          value={departments.length}
          subtitle="CSE, IT, ECE, ME"
          icon={Layers}
          colorTheme="emerald"
          onClick={() => setActiveTab('departments')}
        />
        <StatCard
          title="Total Classwork Uploads"
          value={classworks.length}
          subtitle="Live daily classwork lectures"
          icon={BookOpen}
          colorTheme="purple"
          onClick={() => setActiveTab('classwork')}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto gap-4">
        <button
          onClick={() => setActiveTab('users')}
          className={`py-3 px-2 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === 'users'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Accounts ({allUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('departments')}
          className={`py-3 px-2 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === 'departments'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Departments & Subjects ({departments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('classwork')}
          className={`py-3 px-2 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === 'classwork'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>All Classwork Stream ({classworks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`py-3 px-2 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === 'announcements'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Campus Notices ({announcements.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`py-3 px-2 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
            activeTab === 'logs'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Audit Activity Logs ({activityLogs.length})</span>
        </button>
      </div>

      {/* Tab 1: User Management */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchUser}
                onChange={e => setSearchUser(e.target.value)}
                placeholder="Search by name, email, roll number..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {(['all', 'student', 'teacher', 'admin'] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setUserRoleFilter(r)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition ${
                    userRoleFilter === r
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">User Details</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Department / Program</th>
                  <th className="p-4">Roll / Employee ID</th>
                  <th className="p-4">Contact Phone</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-200 dark:ring-slate-700"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{u.name}</p>
                        <p className="text-[11px] text-slate-400">{u.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={u.role === 'admin' ? 'purple' : u.role === 'teacher' ? 'primary' : 'success'}
                      >
                        {u.role.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {u.departmentId === 'dept-cse' ? 'Computer Science' : 'Information Tech'}
                      </span>
                      {u.semesterId && <span className="text-[10px] text-slate-400 block">Sem 5</span>}
                    </td>
                    <td className="p-4 font-mono font-medium">
                      {u.rollNo || u.employeeId || '—'}
                    </td>
                    <td className="p-4 text-slate-500">
                      {u.phone || '—'}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Departments & Subjects */}
      {activeTab === 'departments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map(dept => {
              const deptSubjects = subjects.filter(s => s.departmentId === dept.id);
              return (
                <div
                  key={dept.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {dept.code}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        {dept.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">Head of Department: {dept.hodName}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {dept.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Affiliated Curriculum Subjects ({deptSubjects.length})
                    </p>
                    <div className="space-y-1.5">
                      {deptSubjects.map(subj => (
                        <div
                          key={subj.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-xs"
                        >
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {subj.code} - {subj.name}
                          </span>
                          <span className="text-[10px] text-slate-400">{subj.credits} Credits</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: All Classwork Stream */}
      {activeTab === 'classwork' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Global Classwork Monitoring
              </h3>
              <p className="text-xs text-slate-400">Total {classworks.length} daily lecture logs across college</p>
            </div>
            <button
              onClick={() => onNavigate('daily-classwork')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              Open Classwork Portal <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {classworks.map(cw => (
              <div
                key={cw.id}
                className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-start justify-between gap-4 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {cw.date}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">By {cw.teacherName}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{cw.topic}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{cw.description}</p>
                </div>

                <button
                  onClick={() => deleteClasswork(cw.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Campus Notices */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Manage College Circulars
              </h3>
              <p className="text-xs text-slate-400">Official notices broadcast across student and teacher dashboards</p>
            </div>
            <button
              onClick={() => setIsAnnouncementModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              New Circular
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map(anc => (
              <div
                key={anc.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        anc.priority === 'Urgent'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}
                    >
                      {anc.priority}
                    </span>
                    <span className="text-xs text-slate-400">{anc.date}</span>
                    <span className="text-xs text-slate-500">• Target: {anc.targetAudience}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{anc.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{anc.content}</p>
                </div>

                <button
                  onClick={() => deleteAnnouncement(anc.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Audit Activity Logs */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              System Audit & Activity Trail
            </h3>
            <p className="text-xs text-slate-400">Timestamped security events, uploads, grade submissions and logins</p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {activityLogs.map(log => (
              <div key={log.id} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{log.action}</span>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {log.userRole}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{log.details}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Initiated by {log.userName} • IP {log.ipAddress}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {log.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add User Modal */}
      <UserManagementModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        defaultRole={modalDefaultRole}
      />

      {/* Announcement Modal */}
      <AnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
      />
    </div>
  );
};
