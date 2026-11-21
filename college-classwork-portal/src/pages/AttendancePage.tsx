import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  Calendar,
  Download,
  AlertTriangle,
  User,
  Filter,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { AttendanceRing } from '../components/student/AttendanceRing';

export const AttendancePage: React.FC = () => {
  const { currentUser } = useAuth();
  const { attendanceSessions, subjects, allUsers, saveAttendance } = useData();

  const isTeacherOrAdmin = currentUser?.role === 'teacher' || currentUser?.role === 'admin';

  // Teacher marking state
  const [selectedSubjectId, setSelectedSubjectId] = useState('subj-cs501');
  const [selectedDate, setSelectedDate] = useState('2026-11-21');
  const studentsList = allUsers.filter(u => u.role === 'student');

  // Existing session for selected date & subject, or default all present
  const existingSession = attendanceSessions.find(
    s => s.date === selectedDate && s.subjectId === selectedSubjectId
  );

  const [studentStatuses, setStudentStatuses] = useState<Record<string, 'Present' | 'Absent'>>(() => {
    const initial: Record<string, 'Present' | 'Absent'> = {};
    studentsList.forEach(s => {
      const recorded = existingSession?.records.find(r => r.studentId === s.id);
      initial[s.id] = recorded ? recorded.status : 'Present';
    });
    return initial;
  });

  const [isSavedToast, setIsSavedToast] = useState(false);

  // Toggle student status
  const toggleStudent = (studentId: string) => {
    setStudentStatuses(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, 'Present' | 'Absent'> = {};
    studentsList.forEach(s => {
      updated[s.id] = 'Present';
    });
    setStudentStatuses(updated);
  };

  const handleSaveAttendance = () => {
    const records = studentsList.map(s => ({
      studentId: s.id,
      studentName: s.name,
      rollNo: s.rollNo || '21CSE042',
      status: studentStatuses[s.id] || 'Present'
    }));

    saveAttendance(
      selectedDate,
      selectedSubjectId,
      'sem-5',
      currentUser?.id || 'usr-teacher-1',
      currentUser?.name || 'Prof. Sarah Jenkins',
      records
    );

    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  // Export Attendance CSV
  const handleExportCSV = () => {
    let csv = 'Date,Subject,Roll No,Student Name,Status\n';
    attendanceSessions.forEach(session => {
      const subj = subjects.find(s => s.id === session.subjectId)?.code || '';
      session.records.forEach(r => {
        csv += `"${session.date}","${subj}","${r.rollNo}","${r.studentName}","${r.status}"\n`;
      });
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Attendance_Report_${selectedDate}.csv`;
    a.click();
  };

  // Student specific stats
  let studentTotal = 0;
  let studentPresent = 0;
  const studentHistory: Array<{ date: string; subject: string; teacher: string; status: 'Present' | 'Absent' }> = [];

  attendanceSessions.forEach(session => {
    const record = session.records.find(r => r.studentId === currentUser?.id);
    const subjName = subjects.find(s => s.id === session.subjectId)?.name || 'Subject';
    if (record) {
      studentTotal++;
      if (record.status === 'Present') studentPresent++;
      studentHistory.push({
        date: session.date,
        subject: subjName,
        teacher: session.teacherName,
        status: record.status
      });
    }
  });

  if (studentTotal === 0) {
    studentTotal = 24;
    studentPresent = 21;
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Attendance Management Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isTeacherOrAdmin
              ? 'Record daily classroom attendance rosters, track absentees, and export compliance reports'
              : 'Monitor semester attendance percentage, required lecture thresholds, and historical logs'}
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          Export Attendance Report (CSV)
        </button>
      </div>

      {/* Student View */}
      {!isTeacherOrAdmin && (
        <div className="space-y-8">
          {/* Progress Ring Widget */}
          <AttendanceRing present={studentPresent} total={studentTotal} size={130} />

          {/* Subject-Wise Attendance Breakdown */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Subject-Wise Attendance Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((s, idx) => {
                const subPresent = 18 - (idx % 3);
                const subTotal = 20;
                const subPct = Math.round((subPresent / subTotal) * 100);
                return (
                  <div key={s.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {s.code}
                      </span>
                      <span className={`text-xs font-bold ${subPct >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {subPct}%
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{s.name}</h4>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${subPct >= 75 ? 'bg-blue-600' : 'bg-rose-500'}`}
                        style={{ width: `${subPct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Attended: {subPresent}/{subTotal}</span>
                      <span>{subPct >= 75 ? 'Eligible' : 'Warning'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Attendance History Table */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Attendance History Log
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Subject</th>
                    <th className="p-4">Instructor</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {studentHistory.map((hist, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="p-4 font-mono font-medium">{hist.date}</td>
                      <td className="p-4 font-semibold text-slate-900 dark:text-white">{hist.subject}</td>
                      <td className="p-4 text-slate-500">{hist.teacher}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          hist.status === 'Present'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        }`}>
                          {hist.status === 'Present' ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          {hist.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Teacher View: Take / Record Attendance */}
      {isTeacherOrAdmin && (
        <div className="space-y-6">
          {/* Controls: Date, Subject, Class */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Attendance Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={selectedSubjectId}
                  onChange={e => setSelectedSubjectId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.code} - {s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Class Section
                </label>
                <div className="px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  B.Tech CSE - Semester 5 (Sec A)
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMarkAllPresent}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
                >
                  ✓ Mark All Present
                </button>
              </div>

              <div className="flex items-center gap-3">
                {isSavedToast && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" /> Attendance saved successfully!
                  </span>
                )}
                <button
                  onClick={handleSaveAttendance}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Save & Publish Attendance
                </button>
              </div>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Roll Number</th>
                  <th className="p-4">Student Name</th>
                  <th className="p-4">Program</th>
                  <th className="p-4 text-center">Toggle Attendance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {studentsList.map(st => {
                  const status = studentStatuses[st.id] || 'Present';
                  const isPresent = status === 'Present';

                  return (
                    <tr key={st.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                      <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                        {st.rollNo || '21CSE042'}
                      </td>
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{st.name}</p>
                          <p className="text-[10px] text-slate-400">{st.email}</p>
                        </div>
                      </td>
                      <td className="p-4 text-slate-500">
                        B.Tech CSE (Sem 5)
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleStudent(st.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 mx-auto ${
                            isPresent
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                          }`}
                        >
                          {isPresent ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Present</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-600" />
                              <span>Absent</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
