import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Department,
  Course,
  Semester,
  Subject,
  Classwork,
  Assignment,
  AssignmentSubmission,
  StudyMaterial,
  AttendanceSession,
  Announcement,
  NotificationItem,
  Bookmark,
  ActivityLog,
  User,
  UserRole
} from '../types';
import {
  initialDepartments,
  initialCourses,
  initialSemesters,
  initialSubjects,
  initialClasswork,
  initialAssignments,
  initialSubmissions,
  initialStudyMaterials,
  initialAttendanceSessions,
  initialAnnouncements,
  initialNotifications,
  initialBookmarks,
  initialActivityLogs,
  initialUsers
} from '../data/initialData';

interface DataContextType {
  departments: Department[];
  courses: Course[];
  semesters: Semester[];
  subjects: Subject[];
  classworks: Classwork[];
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  studyMaterials: StudyMaterial[];
  attendanceSessions: AttendanceSession[];
  announcements: Announcement[];
  notifications: NotificationItem[];
  bookmarks: Bookmark[];
  activityLogs: ActivityLog[];
  allUsers: User[];

  // Classwork actions
  addClasswork: (data: Omit<Classwork, 'id' | 'createdAt' | 'views'>) => Classwork;
  updateClasswork: (id: string, data: Partial<Classwork>) => void;
  deleteClasswork: (id: string) => void;

  // Assignment actions
  addAssignment: (data: Omit<Assignment, 'id' | 'createdAt'>) => Assignment;
  updateAssignment: (id: string, data: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;

  // Submission actions
  submitAssignment: (data: { assignmentId: string; studentId: string; studentName: string; studentRoll: string; fileName: string; fileSize: string; notes?: string }) => AssignmentSubmission;
  gradeSubmission: (submissionId: string, marks: number, feedback: string, status?: 'Checked' | 'Pending') => void;

  // Study Materials actions
  addStudyMaterial: (data: Omit<StudyMaterial, 'id' | 'downloadCount' | 'createdAt'>) => StudyMaterial;
  deleteStudyMaterial: (id: string) => void;
  incrementDownload: (id: string) => void;

  // Attendance actions
  saveAttendance: (date: string, subjectId: string, semesterId: string, teacherId: string, teacherName: string, records: { studentId: string; studentName: string; rollNo: string; status: 'Present' | 'Absent' }[]) => void;

  // Announcements actions
  addAnnouncement: (data: Omit<Announcement, 'id'>) => Announcement;
  deleteAnnouncement: (id: string) => void;
  togglePinAnnouncement: (id: string) => void;

  // Notification actions
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationCount: number;

  // Bookmark actions
  toggleBookmark: (userId: string, itemType: 'classwork' | 'study_material', itemId: string) => boolean;
  isBookmarked: (userId: string, itemType: 'classwork' | 'study_material', itemId: string) => boolean;

  // Admin User & Structure Management
  addUser: (user: Partial<User>) => User;
  updateUser: (id: string, data: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addDepartment: (dept: Omit<Department, 'id'>) => Department;
  addSubject: (subj: Omit<Subject, 'id'>) => Subject;
  deleteSubject: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Helper to load or default
  const load = <T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(`ccp_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [departments, setDepartments] = useState<Department[]>(() => load('departments', initialDepartments));
  const [courses] = useState<Course[]>(() => load('courses', initialCourses));
  const [semesters] = useState<Semester[]>(() => load('semesters', initialSemesters));
  const [subjects, setSubjects] = useState<Subject[]>(() => load('subjects', initialSubjects));
  const [classworks, setClassworks] = useState<Classwork[]>(() => load('classworks', initialClasswork));
  const [assignments, setAssignments] = useState<Assignment[]>(() => load('assignments', initialAssignments));
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(() => load('submissions', initialSubmissions));
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(() => load('studyMaterials', initialStudyMaterials));
  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSession[]>(() => load('attendanceSessions', initialAttendanceSessions));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => load('announcements', initialAnnouncements));
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => load('notifications', initialNotifications));
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => load('bookmarks', initialBookmarks));
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => load('activityLogs', initialActivityLogs));
  const [allUsers, setAllUsers] = useState<User[]>(() => load('users', initialUsers));

  // Sync state to local storage
  useEffect(() => { localStorage.setItem('ccp_departments', JSON.stringify(departments)); }, [departments]);
  useEffect(() => { localStorage.setItem('ccp_subjects', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('ccp_classworks', JSON.stringify(classworks)); }, [classworks]);
  useEffect(() => { localStorage.setItem('ccp_assignments', JSON.stringify(assignments)); }, [assignments]);
  useEffect(() => { localStorage.setItem('ccp_submissions', JSON.stringify(submissions)); }, [submissions]);
  useEffect(() => { localStorage.setItem('ccp_studyMaterials', JSON.stringify(studyMaterials)); }, [studyMaterials]);
  useEffect(() => { localStorage.setItem('ccp_attendanceSessions', JSON.stringify(attendanceSessions)); }, [attendanceSessions]);
  useEffect(() => { localStorage.setItem('ccp_announcements', JSON.stringify(announcements)); }, [announcements]);
  useEffect(() => { localStorage.setItem('ccp_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem('ccp_bookmarks', JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem('ccp_activityLogs', JSON.stringify(activityLogs)); }, [activityLogs]);
  useEffect(() => { localStorage.setItem('ccp_users', JSON.stringify(allUsers)); }, [allUsers]);

  const addActivity = (userName: string, userRole: UserRole, action: string, details: string) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      userName,
      userRole,
      action,
      details,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      ipAddress: '192.168.1.' + Math.floor(10 + Math.random() * 200)
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Classwork handlers
  const addClasswork = (data: Omit<Classwork, 'id' | 'createdAt' | 'views'>): Classwork => {
    const newCw: Classwork = {
      ...data,
      id: `cw-${Date.now()}`,
      createdAt: new Date().toISOString(),
      views: 1
    };
    setClassworks(prev => [newCw, ...prev]);

    // Dispatch notification to students
    const subject = subjects.find(s => s.id === data.subjectId);
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: 'student',
      title: "New Daily Classwork Uploaded",
      message: `${data.teacherName} uploaded today's classwork for ${subject?.name || 'Subject'}: "${data.topic}".`,
      type: 'classwork',
      read: false,
      timestamp: 'Just now',
      linkPage: 'daily-classwork'
    };
    setNotifications(prev => [notif, ...prev]);
    addActivity(data.teacherName, 'teacher', 'Classwork Uploaded', `Topic: "${data.topic}" for ${subject?.name || 'Subject'}`);
    return newCw;
  };

  const updateClasswork = (id: string, data: Partial<Classwork>) => {
    setClassworks(prev => prev.map(cw => cw.id === id ? { ...cw, ...data } : cw));
  };

  const deleteClasswork = (id: string) => {
    const item = classworks.find(cw => cw.id === id);
    setClassworks(prev => prev.filter(cw => cw.id !== id));
    if (item) {
      addActivity(item.teacherName, 'teacher', 'Classwork Deleted', `Deleted classwork on ${item.topic}`);
    }
  };

  // Assignment handlers
  const addAssignment = (data: Omit<Assignment, 'id' | 'createdAt'>): Assignment => {
    const newAsg: Assignment = {
      ...data,
      id: `asg-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setAssignments(prev => [newAsg, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: 'student',
      title: "New Assignment Posted",
      message: `${data.teacherName} assigned "${data.title}" due by ${new Date(data.deadline).toLocaleDateString()}.`,
      type: 'assignment',
      read: false,
      timestamp: 'Just now',
      linkPage: 'assignments'
    };
    setNotifications(prev => [notif, ...prev]);
    addActivity(data.teacherName, 'teacher', 'Assignment Created', `Assignment: "${data.title}" (Max Marks: ${data.maxMarks})`);
    return newAsg;
  };

  const updateAssignment = (id: string, data: Partial<Assignment>) => {
    setAssignments(prev => prev.map(asg => asg.id === id ? { ...asg, ...data } : asg));
  };

  const deleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(asg => asg.id !== id));
  };

  // Submission handlers
  const submitAssignment = (data: {
    assignmentId: string;
    studentId: string;
    studentName: string;
    studentRoll: string;
    fileName: string;
    fileSize: string;
    notes?: string;
  }): AssignmentSubmission => {
    // Check if previous submission exists
    const existing = submissions.find(s => s.assignmentId === data.assignmentId && s.studentId === data.studentId);
    if (existing) {
      const updated: AssignmentSubmission = {
        ...existing,
        fileName: data.fileName,
        fileSize: data.fileSize,
        submittedAt: new Date().toISOString(),
        status: 'Submitted',
        notes: data.notes || existing.notes
      };
      setSubmissions(prev => prev.map(s => s.id === existing.id ? updated : s));
      addActivity(data.studentName, 'student', 'Assignment Re-submitted', `Updated submission for Assignment #${data.assignmentId}`);
      return updated;
    }

    const newSub: AssignmentSubmission = {
      id: `sub-${Date.now()}`,
      assignmentId: data.assignmentId,
      studentId: data.studentId,
      studentName: data.studentName,
      studentRoll: data.studentRoll,
      fileName: data.fileName,
      fileUrl: '#',
      fileSize: data.fileSize,
      submittedAt: new Date().toISOString(),
      status: 'Submitted',
      notes: data.notes
    };
    setSubmissions(prev => [newSub, ...prev]);

    const asg = assignments.find(a => a.id === data.assignmentId);
    addActivity(data.studentName, 'student', 'Assignment Submitted', `Submitted: "${asg?.title || 'Assignment'}"`);
    return newSub;
  };

  const gradeSubmission = (submissionId: string, marks: number, feedback: string, status: 'Checked' | 'Pending' = 'Checked') => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        const asg = assignments.find(a => a.id === s.assignmentId);
        // Send notification to student
        const notif: NotificationItem = {
          id: `notif-${Date.now()}`,
          userId: s.studentId,
          title: `Assignment Graded: ${marks}/${asg?.maxMarks || 20}`,
          message: `Your submission for "${asg?.title}" was graded with feedback: "${feedback}".`,
          type: 'grade',
          read: false,
          timestamp: 'Just now',
          linkPage: 'assignments'
        };
        setNotifications(n => [notif, ...n]);
        addActivity('Teacher', 'teacher', 'Submission Graded', `Graded ${s.studentName}'s assignment (${marks} marks)`);
        return { ...s, marks, feedback, status };
      }
      return s;
    }));
  };

  // Study Materials
  const addStudyMaterial = (data: Omit<StudyMaterial, 'id' | 'downloadCount' | 'createdAt'>): StudyMaterial => {
    const newMaterial: StudyMaterial = {
      ...data,
      id: `sm-${Date.now()}`,
      downloadCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setStudyMaterials(prev => [newMaterial, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: 'student',
      title: "New Study Material Uploaded",
      message: `${data.teacherName} uploaded "${data.title}" to the digital library.`,
      type: 'notes',
      read: false,
      timestamp: 'Just now',
      linkPage: 'study-materials'
    };
    setNotifications(prev => [notif, ...prev]);
    addActivity(data.teacherName, 'teacher', 'Study Material Uploaded', `Uploaded: "${data.title}"`);
    return newMaterial;
  };

  const deleteStudyMaterial = (id: string) => {
    setStudyMaterials(prev => prev.filter(sm => sm.id !== id));
  };

  const incrementDownload = (id: string) => {
    setStudyMaterials(prev => prev.map(sm => sm.id === id ? { ...sm, downloadCount: sm.downloadCount + 1 } : sm));
  };

  // Attendance
  const saveAttendance = (
    date: string,
    subjectId: string,
    semesterId: string,
    teacherId: string,
    teacherName: string,
    records: { studentId: string; studentName: string; rollNo: string; status: 'Present' | 'Absent' }[]
  ) => {
    // Check if session exists for this date and subject
    const existingIndex = attendanceSessions.findIndex(s => s.date === date && s.subjectId === subjectId);
    const newSession: AttendanceSession = {
      id: existingIndex >= 0 ? attendanceSessions[existingIndex].id : `att-session-${Date.now()}`,
      date,
      subjectId,
      semesterId,
      teacherId,
      teacherName,
      records,
      createdAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      setAttendanceSessions(prev => {
        const copy = [...prev];
        copy[existingIndex] = newSession;
        return copy;
      });
    } else {
      setAttendanceSessions(prev => [newSession, ...prev]);
    }

    const subj = subjects.find(s => s.id === subjectId);
    const presentCount = records.filter(r => r.status === 'Present').length;
    addActivity(teacherName, 'teacher', 'Attendance Recorded', `Subject: ${subj?.name} (${presentCount}/${records.length} Present) on ${date}`);
  };

  // Announcements
  const addAnnouncement = (data: Omit<Announcement, 'id'>): Announcement => {
    const newAnc: Announcement = {
      ...data,
      id: `anc-${Date.now()}`
    };
    setAnnouncements(prev => [newAnc, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: data.targetAudience === 'All' ? 'all' : (data.targetAudience === 'Students' ? 'student' : 'teacher'),
      title: `Notice: ${data.title}`,
      message: data.content.substring(0, 100) + '...',
      type: 'announcement',
      read: false,
      timestamp: 'Just now',
      linkPage: 'announcements'
    };
    setNotifications(prev => [notif, ...prev]);
    addActivity(data.authorName, data.authorRole.toLowerCase() as UserRole, 'Announcement Published', `Title: "${data.title}"`);
    return newAnc;
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const togglePinAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a));
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  // Bookmarks
  const toggleBookmark = (userId: string, itemType: 'classwork' | 'study_material', itemId: string): boolean => {
    const existing = bookmarks.find(b => b.userId === userId && b.itemType === itemType && b.itemId === itemId);
    if (existing) {
      setBookmarks(prev => prev.filter(b => b.id !== existing.id));
      return false; // Removed
    } else {
      const newBm: Bookmark = {
        id: `bm-${Date.now()}`,
        userId,
        itemType,
        itemId,
        createdAt: new Date().toISOString()
      };
      setBookmarks(prev => [newBm, ...prev]);
      return true; // Added
    }
  };

  const isBookmarked = (userId: string, itemType: 'classwork' | 'study_material', itemId: string): boolean => {
    return bookmarks.some(b => b.userId === userId && b.itemType === itemType && b.itemId === itemId);
  };

  // User Management
  const addUser = (userData: Partial<User>): User => {
    const newUser: User = {
      id: `usr-${userData.role}-${Date.now()}`,
      name: userData.name || 'User',
      email: userData.email || `user_${Date.now()}@college.edu`,
      role: userData.role || 'student',
      avatar: userData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name || 'user'}`,
      phone: userData.phone || '+1 (555) 123-4567',
      departmentId: userData.departmentId || 'dept-cse',
      courseId: userData.courseId || 'course-btech-cse',
      semesterId: userData.semesterId || 'sem-5',
      rollNo: userData.rollNo,
      employeeId: userData.employeeId,
      designation: userData.designation,
      bio: userData.bio || 'College member profile.',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setAllUsers(prev => [newUser, ...prev]);
    addActivity('Admin', 'admin', 'User Account Created', `Created ${userData.role} account for ${userData.name}`);
    return newUser;
  };

  const updateUser = (id: string, data: Partial<User>) => {
    setAllUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u));
    addActivity('Admin', 'admin', 'User Account Updated', `Updated account details for user ID: ${id}`);
  };

  const deleteUser = (id: string) => {
    const u = allUsers.find(user => user.id === id);
    setAllUsers(prev => prev.filter(user => user.id !== id));
    if (u) {
      addActivity('Admin', 'admin', 'User Account Deleted', `Deleted ${u.role}: ${u.name}`);
    }
  };

  // Structure Management
  const addDepartment = (dept: Omit<Department, 'id'>): Department => {
    const newDept: Department = {
      ...dept,
      id: `dept-${Date.now()}`
    };
    setDepartments(prev => [...prev, newDept]);
    addActivity('Admin', 'admin', 'Department Created', `Added department: ${dept.name}`);
    return newDept;
  };

  const addSubject = (subj: Omit<Subject, 'id'>): Subject => {
    const newSubj: Subject = {
      ...subj,
      id: `subj-${Date.now()}`
    };
    setSubjects(prev => [...prev, newSubj]);
    addActivity('Admin', 'admin', 'Subject Added', `Added subject: ${subj.code} - ${subj.name}`);
    return newSubj;
  };

  const deleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        departments,
        courses,
        semesters,
        subjects,
        classworks,
        assignments,
        submissions,
        studyMaterials,
        attendanceSessions,
        announcements,
        notifications,
        bookmarks,
        activityLogs,
        allUsers,

        addClasswork,
        updateClasswork,
        deleteClasswork,

        addAssignment,
        updateAssignment,
        deleteAssignment,

        submitAssignment,
        gradeSubmission,

        addStudyMaterial,
        deleteStudyMaterial,
        incrementDownload,

        saveAttendance,

        addAnnouncement,
        deleteAnnouncement,
        togglePinAnnouncement,

        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationCount,

        toggleBookmark,
        isBookmarked,

        addUser,
        updateUser,
        deleteUser,
        addDepartment,
        addSubject,
        deleteSubject
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
