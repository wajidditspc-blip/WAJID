export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  departmentId?: string;
  semesterId?: string;
  rollNo?: string;
  employeeId?: string;
  bio?: string;
  designation?: string;
  courseId?: string;
  createdAt: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  description: string;
  hodName: string;
  iconName: string;
}

export interface Course {
  id: string;
  departmentId: string;
  name: string;
  code: string;
  durationYears: number;
}

export interface Semester {
  id: string;
  courseId: string;
  number: number;
  label: string;
  academicYear: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  semesterId: string;
  credits: number;
  icon: string;
  color: string;
  teacherId?: string;
}

export interface TeacherSubject {
  id: string;
  teacherId: string;
  subjectId: string;
  semesterId: string;
  academicYear: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  semesterId: string;
  rollNo: string;
  academicYear: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: string;
  type: 'pdf' | 'doc' | 'image' | 'archive' | 'link';
}

export interface Classwork {
  id: string;
  date: string; // YYYY-MM-DD
  departmentId: string;
  semesterId: string;
  subjectId: string;
  teacherId: string;
  teacherName: string;
  topic: string;
  description: string;
  homework: string;
  attachments: Attachment[];
  images: string[];
  videoLinks: string[]; // YouTube or external URLs
  createdAt: string;
  views?: number;
}

export type AssignmentStatus = 'Pending' | 'Submitted' | 'Checked' | 'Late';

export interface Assignment {
  id: string;
  subjectId: string;
  teacherId: string;
  teacherName: string;
  semesterId: string;
  departmentId: string;
  title: string;
  description: string;
  attachments: Attachment[];
  deadline: string; // ISO string or YYYY-MM-DDTHH:mm
  maxMarks: number;
  createdAt: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  fileName: string;
  fileUrl: string;
  fileSize: string;
  submittedAt: string;
  status: AssignmentStatus;
  marks?: number;
  feedback?: string;
  notes?: string;
}

export interface StudyMaterial {
  id: string;
  subjectId: string;
  semesterId: string;
  departmentId: string;
  teacherId: string;
  teacherName: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'docx' | 'image' | 'ppt';
  fileName: string;
  fileUrl: string;
  fileSize: string;
  downloadCount: number;
  createdAt: string;
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  rollNo: string;
  status: 'Present' | 'Absent';
}

export interface AttendanceSession {
  id: string;
  date: string; // YYYY-MM-DD
  subjectId: string;
  semesterId: string;
  teacherId: string;
  teacherName: string;
  records: AttendanceRecord[];
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: 'Admin' | 'Teacher';
  targetAudience: 'All' | 'Students' | 'Teachers';
  priority: 'Normal' | 'High' | 'Urgent';
  date: string;
  pinned: boolean;
}

export interface NotificationItem {
  id: string;
  userId?: string; // If undefined, broadcast to role or all
  roleTarget?: 'all' | 'student' | 'teacher' | 'admin';
  title: string;
  message: string;
  type: 'classwork' | 'homework' | 'assignment' | 'deadline' | 'notes' | 'announcement' | 'grade';
  read: boolean;
  timestamp: string;
  linkPage?: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  itemType: 'classwork' | 'study_material';
  itemId: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}
