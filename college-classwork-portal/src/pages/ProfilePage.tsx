import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Award,
  Edit2,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Modal } from '../components/common/Modal';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateCurrentUser } = useAuth();
  const { classworks, submissions, assignments } = useData();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [bio, setBio] = useState(currentUser?.bio || '');

  if (!currentUser) return null;

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name: name.trim(),
      phone: phone.trim(),
      bio: bio.trim()
    });
    setIsEditModalOpen(false);
  };

  const studentSubmissions = submissions.filter(s => s.studentId === currentUser.id);
  const teacherClassworks = classworks.filter(cw => cw.teacherName === currentUser.name || cw.teacherId === currentUser.id);

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Profile Cover & Header */}
      <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        {/* Banner Graphic */}
        <div className="h-36 sm:h-44 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800" />

        {/* Profile Details Container */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
            <div className="flex items-end gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl bg-white"
              />
              <div className="space-y-1 mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                    {currentUser.name}
                  </h1>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentUser.role === 'student'
                    ? `Roll No: ${currentUser.rollNo || '21CSE042'} • B.Tech Semester 5`
                    : currentUser.designation || 'Faculty Member'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setName(currentUser.name);
                setPhone(currentUser.phone || '');
                setBio(currentUser.bio || '');
                setIsEditModalOpen(true);
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit Profile
            </button>
          </div>

          {/* Bio */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {currentUser.bio || 'Member of Apex Institute of Technology & Science.'}
          </p>

          {/* Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">Email Address</span>
                <span className="font-semibold">{currentUser.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">Contact Mobile</span>
                <span className="font-semibold">{currentUser.phone || '+1 (555) 234-8901'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-slate-400 block text-[10px]">Academic Department</span>
                <span className="font-semibold">Computer Science & Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role specific record highlights */}
      {currentUser.role === 'student' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            My Submitted Assignments & Evaluation Records
          </h3>
          <div className="space-y-3">
            {studentSubmissions.map(sub => {
              const asg = assignments.find(a => a.id === sub.assignmentId);
              return (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      Submitted on {new Date(sub.submittedAt).toLocaleDateString()}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {asg?.title || 'Assignment'}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      File: {sub.fileName} ({sub.fileSize})
                    </p>
                    {sub.feedback && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 italic font-medium">
                        Instructor Feedback: "{sub.feedback}"
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    {sub.status === 'Checked' ? (
                      <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                        <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold block">
                          Grade Awarded
                        </span>
                        <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                          {sub.marks} / {asg?.maxMarks || 20}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        Pending Evaluation
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {currentUser.role === 'teacher' && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            My Published Classwork Logs ({teacherClassworks.length})
          </h3>
          <div className="space-y-3">
            {teacherClassworks.map(cw => (
              <div
                key={cw.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {cw.date}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">{cw.topic}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{cw.description}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0">{cw.views || 40} student views</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Update Academic Profile" maxWidth="md">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Contact Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Academic Bio & Research Interests
            </label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
            >
              Save Profile
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
