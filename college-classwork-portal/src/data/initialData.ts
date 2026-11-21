import {
  User,
  Department,
  Course,
  Semester,
  Subject,
  TeacherSubject,
  Enrollment,
  Classwork,
  Assignment,
  AssignmentSubmission,
  StudyMaterial,
  AttendanceSession,
  Announcement,
  NotificationItem,
  Bookmark,
  ActivityLog
} from '../types';

export const initialDepartments: Department[] = [
  {
    id: 'dept-cse',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    description: 'Premier department specializing in artificial intelligence, software engineering, systems, and theoretical computing.',
    hodName: 'Dr. Katherine Miller',
    iconName: 'Cpu'
  },
  {
    id: 'dept-it',
    code: 'IT',
    name: 'Information Technology',
    description: 'Focused on enterprise networking, cloud architecture, cybersecurity, and data analytics.',
    hodName: 'Dr. Robert Davis',
    iconName: 'Server'
  },
  {
    id: 'dept-ece',
    code: 'ECE',
    name: 'Electronics & Communication',
    description: 'Advanced studies in microelectronics, VLSI design, signal processing, and IoT systems.',
    hodName: 'Dr. Vikram Seth',
    iconName: 'Radio'
  },
  {
    id: 'dept-me',
    code: 'ME',
    name: 'Mechanical Engineering',
    description: 'Cutting-edge education in robotics, automation, thermodynamics, and manufacturing technologies.',
    hodName: 'Dr. Thomas Wayne',
    iconName: 'Cog'
  }
];

export const initialCourses: Course[] = [
  {
    id: 'course-btech-cse',
    departmentId: 'dept-cse',
    name: 'Bachelor of Technology in Computer Science & Engineering',
    code: 'B.Tech CSE',
    durationYears: 4
  },
  {
    id: 'course-btech-it',
    departmentId: 'dept-it',
    name: 'Bachelor of Technology in Information Technology',
    code: 'B.Tech IT',
    durationYears: 4
  },
  {
    id: 'course-btech-ece',
    departmentId: 'dept-ece',
    name: 'Bachelor of Technology in Electronics & Communication',
    code: 'B.Tech ECE',
    durationYears: 4
  }
];

export const initialSemesters: Semester[] = [
  { id: 'sem-1', courseId: 'course-btech-cse', number: 1, label: 'Semester 1', academicYear: '2026-2027' },
  { id: 'sem-2', courseId: 'course-btech-cse', number: 2, label: 'Semester 2', academicYear: '2026-2027' },
  { id: 'sem-3', courseId: 'course-btech-cse', number: 3, label: 'Semester 3', academicYear: '2026-2027' },
  { id: 'sem-4', courseId: 'course-btech-cse', number: 4, label: 'Semester 4', academicYear: '2026-2027' },
  { id: 'sem-5', courseId: 'course-btech-cse', number: 5, label: 'Semester 5 (Current)', academicYear: '2026-2027' },
  { id: 'sem-6', courseId: 'course-btech-cse', number: 6, label: 'Semester 6', academicYear: '2026-2027' },
  { id: 'sem-7', courseId: 'course-btech-cse', number: 7, label: 'Semester 7', academicYear: '2026-2027' },
  { id: 'sem-8', courseId: 'course-btech-cse', number: 8, label: 'Semester 8', academicYear: '2026-2027' },
];

export const initialSubjects: Subject[] = [
  {
    id: 'subj-cs501',
    code: 'CS501',
    name: 'Database Management Systems',
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    credits: 4,
    icon: 'Database',
    color: '#2563eb',
    teacherId: 'usr-teacher-1'
  },
  {
    id: 'subj-cs502',
    code: 'CS502',
    name: 'Design & Analysis of Algorithms',
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    credits: 4,
    icon: 'Binary',
    color: '#7c3aed',
    teacherId: 'usr-teacher-1'
  },
  {
    id: 'subj-cs503',
    code: 'CS503',
    name: 'Operating Systems & Concurrency',
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    credits: 4,
    icon: 'Terminal',
    color: '#0891b2',
    teacherId: 'usr-teacher-3'
  },
  {
    id: 'subj-cs504',
    code: 'CS504',
    name: 'Full Stack Web Architecture',
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    credits: 3,
    icon: 'Globe',
    color: '#ea580c',
    teacherId: 'usr-teacher-2'
  },
  {
    id: 'subj-cs505',
    code: 'CS505',
    name: 'Computer Networks & Protocols',
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    credits: 3,
    icon: 'Network',
    color: '#16a34a',
    teacherId: 'usr-teacher-2'
  },
  {
    id: 'subj-cs506',
    code: 'CS506',
    name: 'Cloud Computing & DevOps',
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    credits: 3,
    icon: 'Cloud',
    color: '#4f46e5',
    teacherId: 'usr-teacher-3'
  }
];

export const initialUsers: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Dr. Arthur Vance',
    email: 'admin@college.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 234-8901',
    bio: 'Dean of Academic Affairs and Systems Administrator with 18+ years of higher education leadership.',
    designation: 'Dean of Academics & Principal Administrator',
    createdAt: '2024-01-15'
  },
  {
    id: 'usr-teacher-1',
    name: 'Prof. Sarah Jenkins',
    email: 'sarah.jenkins@college.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 345-6789',
    departmentId: 'dept-cse',
    employeeId: 'EMP-CSE-104',
    bio: 'Associate Professor of Computer Science specializing in Distributed Databases, Query Optimization, and Algorithms.',
    designation: 'Associate Professor, CSE',
    createdAt: '2024-03-10'
  },
  {
    id: 'usr-teacher-2',
    name: 'Dr. Marcus Reed',
    email: 'marcus.reed@college.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 456-7890',
    departmentId: 'dept-cse',
    employeeId: 'EMP-CSE-108',
    bio: 'Ph.D. in Network Systems from MIT. Tech lead researcher for web protocols, distributed consensus, and microservices.',
    designation: 'Professor & Lab Director, Web & Networks',
    createdAt: '2024-02-12'
  },
  {
    id: 'usr-teacher-3',
    name: 'Prof. Elena Rostova',
    email: 'elena.rostova@college.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 567-8901',
    departmentId: 'dept-cse',
    employeeId: 'EMP-CSE-112',
    bio: 'Specialist in Kernel Architecture, Memory Virtualization, and Real-Time Linux Systems.',
    designation: 'Assistant Professor, Systems & Cloud',
    createdAt: '2024-04-05'
  },
  {
    id: 'usr-student-1',
    name: 'Alex Mercer',
    email: 'alex.mercer@student.college.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 678-9012',
    departmentId: 'dept-cse',
    courseId: 'course-btech-cse',
    semesterId: 'sem-5',
    rollNo: '21CSE042',
    bio: 'Junior CSE student passionate about Full-Stack Engineering, Cloud Architecture, and Competitive Programming.',
    createdAt: '2024-08-20'
  },
  {
    id: 'usr-student-2',
    name: 'Samantha Clark',
    email: 'samantha.clark@student.college.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 789-0123',
    departmentId: 'dept-cse',
    courseId: 'course-btech-cse',
    semesterId: 'sem-5',
    rollNo: '21CSE043',
    bio: 'CSE undergraduate exploring Database Internals, Machine Learning, and Cloud DevOps.',
    createdAt: '2024-08-20'
  },
  {
    id: 'usr-student-3',
    name: 'Daniel Lee',
    email: 'daniel.lee@student.college.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 890-1234',
    departmentId: 'dept-cse',
    courseId: 'course-btech-cse',
    semesterId: 'sem-5',
    rollNo: '21CSE044',
    bio: 'Undergraduate student and Hackathon organizer.',
    createdAt: '2024-08-20'
  },
  {
    id: 'usr-student-4',
    name: 'Priyanshu Sharma',
    email: 'priyanshu.sharma@student.college.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 901-2345',
    departmentId: 'dept-cse',
    courseId: 'course-btech-cse',
    semesterId: 'sem-5',
    rollNo: '21CSE045',
    bio: 'Robotics enthusiast and open-source contributor.',
    createdAt: '2024-08-20'
  },
  {
    id: 'usr-student-5',
    name: 'Zoe Adams',
    email: 'zoe.adams@student.college.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 012-3456',
    departmentId: 'dept-cse',
    courseId: 'course-btech-cse',
    semesterId: 'sem-5',
    rollNo: '21CSE046',
    bio: 'Algorithm researcher and student representative.',
    createdAt: '2024-08-20'
  }
];

export const initialTeacherSubjects: TeacherSubject[] = [
  { id: 'ts-1', teacherId: 'usr-teacher-1', subjectId: 'subj-cs501', semesterId: 'sem-5', academicYear: '2026-2027' },
  { id: 'ts-2', teacherId: 'usr-teacher-1', subjectId: 'subj-cs502', semesterId: 'sem-5', academicYear: '2026-2027' },
  { id: 'ts-3', teacherId: 'usr-teacher-2', subjectId: 'subj-cs504', semesterId: 'sem-5', academicYear: '2026-2027' },
  { id: 'ts-4', teacherId: 'usr-teacher-2', subjectId: 'subj-cs505', semesterId: 'sem-5', academicYear: '2026-2027' },
  { id: 'ts-5', teacherId: 'usr-teacher-3', subjectId: 'subj-cs503', semesterId: 'sem-5', academicYear: '2026-2027' },
  { id: 'ts-6', teacherId: 'usr-teacher-3', subjectId: 'subj-cs506', semesterId: 'sem-5', academicYear: '2026-2027' }
];

export const initialEnrollments: Enrollment[] = [
  { id: 'enr-1', studentId: 'usr-student-1', courseId: 'course-btech-cse', semesterId: 'sem-5', rollNo: '21CSE042', academicYear: '2026-2027' },
  { id: 'enr-2', studentId: 'usr-student-2', courseId: 'course-btech-cse', semesterId: 'sem-5', rollNo: '21CSE043', academicYear: '2026-2027' },
  { id: 'enr-3', studentId: 'usr-student-3', courseId: 'course-btech-cse', semesterId: 'sem-5', rollNo: '21CSE044', academicYear: '2026-2027' },
  { id: 'enr-4', studentId: 'usr-student-4', courseId: 'course-btech-cse', semesterId: 'sem-5', rollNo: '21CSE045', academicYear: '2026-2027' },
  { id: 'enr-5', studentId: 'usr-student-5', courseId: 'course-btech-cse', semesterId: 'sem-5', rollNo: '21CSE046', academicYear: '2026-2027' }
];

// Helper to get formatted date relative to current date (2026-11-21)
export const getRelativeDate = (offsetDays: number = 0): string => {
  const d = new Date('2026-11-21T00:00:00');
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const initialClasswork: Classwork[] = [
  {
    id: 'cw-1',
    date: getRelativeDate(0), // Today (2026-11-21)
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    subjectId: 'subj-cs501',
    teacherId: 'usr-teacher-1',
    teacherName: 'Prof. Sarah Jenkins',
    topic: 'B-Tree & B+ Tree Indexing in Relational Databases',
    description: 'Explored multi-level indexing structures, order-m B-Trees, node splits and merges, disk block allocation strategies, and performance benchmarks for range searches in MySQL InnoDB.',
    homework: 'Solve textbook exercises 14.5 through 14.9 on B+ Tree insertion with degree d=2. Sketch the tree state after inserting keys [12, 33, 45, 19, 8, 27].',
    attachments: [
      { id: 'att-1', name: 'Lecture-28-B-Tree-Indexes.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '2.4 MB', type: 'pdf' },
      { id: 'att-2', name: 'SQL_Index_Benchmarking_Queries.sql', url: '#', size: '18 KB', type: 'doc' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600'
    ],
    videoLinks: [
      'https://www.youtube.com/watch?v=aZjYr87r1b8' // B-Tree Visualization
    ],
    createdAt: '2026-11-21T09:30:00Z',
    views: 48
  },
  {
    id: 'cw-2',
    date: getRelativeDate(0), // Today (2026-11-21)
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    subjectId: 'subj-cs504',
    teacherId: 'usr-teacher-2',
    teacherName: 'Dr. Marcus Reed',
    topic: 'RESTful Architecture, HTTP Status Codes & Express Middleware',
    description: 'Detailed analysis of REST constraints, idempotency in HTTP methods (GET, POST, PUT, DELETE, PATCH), error propagation using custom middleware, and rate limiting with Redis.',
    homework: 'Build an Express middleware function that validates incoming JSON schema for user registration and records request duration in milliseconds.',
    attachments: [
      { id: 'att-3', name: 'Express-Middleware-Patterns.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '3.1 MB', type: 'pdf' }
    ],
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600'
    ],
    videoLinks: [
      'https://www.youtube.com/watch?v=lY6icfhap2o' // Express Middleware Guide
    ],
    createdAt: '2026-11-21T11:15:00Z',
    views: 52
  },
  {
    id: 'cw-3',
    date: getRelativeDate(-1), // Yesterday (2026-11-20)
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    subjectId: 'subj-cs502',
    teacherId: 'usr-teacher-1',
    teacherName: 'Prof. Sarah Jenkins',
    topic: 'Dynamic Programming: 0/1 Knapsack & Bellman Equation',
    description: 'Derived the optimal substructure and overlapping subproblems for the 0/1 Knapsack problem. Compared space complexity of 2D DP matrix O(N*W) vs 1D array space optimization O(W).',
    homework: 'Implement the bottom-up DP solution for 0/1 Knapsack in C++ or Python. Trace with weights [2, 3, 4, 5] and values [3, 4, 5, 6] with maximum capacity W=8.',
    attachments: [
      { id: 'att-4', name: 'DP-01-Knapsack-Formulation.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '1.8 MB', type: 'pdf' }
    ],
    images: [
      'https://images.unsplash.com/photo-1516116211227-bbc0429f55e5?auto=format&fit=crop&q=80&w=600'
    ],
    videoLinks: [
      'https://www.youtube.com/watch?v=8LusJS5-AGo' // 0/1 Knapsack tutorial
    ],
    createdAt: '2026-11-20T10:00:00Z',
    views: 61
  },
  {
    id: 'cw-4',
    date: getRelativeDate(-1), // Yesterday (2026-11-20)
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    subjectId: 'subj-cs503',
    teacherId: 'usr-teacher-3',
    teacherName: 'Prof. Elena Rostova',
    topic: 'Virtual Memory, Page Replacement & Thrashing Prevention',
    description: 'Discussed demand paging, hardware MMU translation, Translation Lookaside Buffer (TLB), page fault handling cycle, and evaluation of FIFO, Optimal (MIN), and Least Recently Used (LRU) algorithms.',
    homework: 'Calculate the total page faults for the reference string: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2 with 3 memory page frames under FIFO and LRU.',
    attachments: [
      { id: 'att-5', name: 'OS-Virtual-Memory-Paging.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '4.2 MB', type: 'pdf' }
    ],
    images: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600'
    ],
    videoLinks: [
      'https://www.youtube.com/watch?v=qcBI539OG5M' // Virtual memory explanation
    ],
    createdAt: '2026-11-20T14:30:00Z',
    views: 57
  },
  {
    id: 'cw-5',
    date: getRelativeDate(-2), // 2 days ago (2026-11-19)
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    subjectId: 'subj-cs505',
    teacherId: 'usr-teacher-2',
    teacherName: 'Dr. Marcus Reed',
    topic: 'Transport Layer Protocols: TCP 3-Way Handshake & Congestion Control',
    description: 'Examined TCP connection establishment (SYN, SYN-ACK, ACK), connection termination (FIN, ACK), TCP window size, Reno vs Cubic congestion control algorithms (Slow Start, Congestion Avoidance, Fast Retransmit).',
    homework: 'Analyze the provided Wireshark packet capture file and identify the sequence numbers and advertised window sizes for the TCP handshake.',
    attachments: [
      { id: 'att-6', name: 'TCP_Handshake_Wireshark_Analysis.pcapng', url: '#', size: '540 KB', type: 'archive' },
      { id: 'att-7', name: 'Transport-Layer-SlideDeck.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '2.9 MB', type: 'pdf' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600'
    ],
    videoLinks: [
      'https://www.youtube.com/watch?v=bW_W1tVf7QY'
    ],
    createdAt: '2026-11-19T11:00:00Z',
    views: 64
  },
  {
    id: 'cw-6',
    date: getRelativeDate(-3), // 3 days ago (2026-11-18)
    departmentId: 'dept-cse',
    semesterId: 'sem-5',
    subjectId: 'subj-cs506',
    teacherId: 'usr-teacher-3',
    teacherName: 'Prof. Elena Rostova',
    topic: 'Docker Architecture, Multi-Stage Builds & Container Networking',
    description: 'Hands-on laboratory session covering Dockerfile optimization, reducing image layers with multi-stage builds, container volume persistence, and bridge networks.',
    homework: 'Containerize a Node.js + PostgreSQL application using Docker Compose with health checks and restart policies.',
    attachments: [
      { id: 'att-8', name: 'Docker-MultiStage-LabGuide.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '1.5 MB', type: 'pdf' }
    ],
    images: [
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&q=80&w=600'
    ],
    videoLinks: [
      'https://www.youtube.com/watch?v=gAkwW2tuIqE'
    ],
    createdAt: '2026-11-18T13:00:00Z',
    views: 70
  }
];

export const initialAssignments: Assignment[] = [
  {
    id: 'asg-1',
    subjectId: 'subj-cs501',
    teacherId: 'usr-teacher-1',
    teacherName: 'Prof. Sarah Jenkins',
    semesterId: 'sem-5',
    departmentId: 'dept-cse',
    title: 'Relational Schema Normalization & Complex SQL Query Optimization',
    description: 'Transform an unnormalized university registrar data set into 3NF and BCNF. Provide SQL schemas with primary/foreign keys, create non-clustered composite indexes, and execute query execution plan comparisons.',
    attachments: [
      { id: 'asg-att-1', name: 'Assignment-1-Specification.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '420 KB', type: 'pdf' },
      { id: 'asg-att-2', name: 'Raw_Registrar_Dataset.csv', url: '#', size: '110 KB', type: 'doc' }
    ],
    deadline: '2026-11-23T23:59:00', // Due in 2 days
    maxMarks: 25,
    createdAt: '2026-11-16T10:00:00Z'
  },
  {
    id: 'asg-2',
    subjectId: 'subj-cs502',
    teacherId: 'usr-teacher-1',
    teacherName: 'Prof. Sarah Jenkins',
    semesterId: 'sem-5',
    departmentId: 'dept-cse',
    title: 'Dynamic Programming Memoization vs Tabulation Benchmark Suite',
    description: 'Implement Longest Common Subsequence (LCS) and Matrix Chain Multiplication in two variants: Top-Down with Memoization and Bottom-Up Tabulation. Graph memory consumption and execution time across input sizes from 10 to 10,000.',
    attachments: [
      { id: 'asg-att-3', name: 'DP_Benchmark_Guidelines.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '610 KB', type: 'pdf' }
    ],
    deadline: '2026-11-26T23:59:00', // Due in 5 days
    maxMarks: 20,
    createdAt: '2026-11-18T12:00:00Z'
  },
  {
    id: 'asg-3',
    subjectId: 'subj-cs504',
    teacherId: 'usr-teacher-2',
    teacherName: 'Dr. Marcus Reed',
    semesterId: 'sem-5',
    departmentId: 'dept-cse',
    title: 'Full Stack JWT Authentication & Role-Based Access Control (RBAC)',
    description: 'Create a secured REST API backend implementing JSON Web Tokens (access + refresh tokens in HttpOnly cookies), bcrypt password hashing, and middleware guards for Admin, Teacher, and Student roles.',
    attachments: [
      { id: 'asg-att-4', name: 'RBAC_Architecture_Spec.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '850 KB', type: 'pdf' }
    ],
    deadline: '2026-11-20T23:59:00', // Was due yesterday
    maxMarks: 30,
    createdAt: '2026-11-10T09:00:00Z'
  },
  {
    id: 'asg-4',
    subjectId: 'subj-cs503',
    teacherId: 'usr-teacher-3',
    teacherName: 'Prof. Elena Rostova',
    semesterId: 'sem-5',
    departmentId: 'dept-cse',
    title: 'Virtual Memory Page Replacement Simulator (FIFO & LRU)',
    description: 'Write an interactive CLI or GUI program simulating FIFO and LRU page replacement policies. Calculate hit ratio, fault ratio, and display frame state visualization at each time step.',
    attachments: [
      { id: 'asg-att-5', name: 'OS_PageReplacement_Project.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', size: '340 KB', type: 'pdf' }
    ],
    deadline: '2026-11-15T23:59:00', // Graded earlier
    maxMarks: 20,
    createdAt: '2026-11-05T08:00:00Z'
  }
];

export const initialSubmissions: AssignmentSubmission[] = [
  {
    id: 'sub-1',
    assignmentId: 'asg-3',
    studentId: 'usr-student-1', // Alex Mercer
    studentName: 'Alex Mercer',
    studentRoll: '21CSE042',
    fileName: 'AlexMercer_21CSE042_RBAC_Auth_Project.zip',
    fileUrl: '#',
    fileSize: '4.8 MB',
    submittedAt: '2026-11-20T20:15:00Z',
    status: 'Submitted',
    notes: 'Implemented refresh token rotation and argon2 hashing. Included Postman collection in repository.'
  },
  {
    id: 'sub-2',
    assignmentId: 'asg-4',
    studentId: 'usr-student-1', // Alex Mercer
    studentName: 'Alex Mercer',
    studentRoll: '21CSE042',
    fileName: 'AlexMercer_21CSE042_PageReplacement_Sim.py',
    fileUrl: '#',
    fileSize: '18 KB',
    submittedAt: '2026-11-14T18:40:00Z',
    status: 'Checked',
    marks: 19,
    feedback: 'Exceptional work Alex! The ANSI color-coded frame visualization made debugging clear. Slight edge case on duplicate references handled well.',
    notes: 'Python 3.12 script with rich CLI tables.'
  },
  {
    id: 'sub-3',
    assignmentId: 'asg-3',
    studentId: 'usr-student-2', // Samantha Clark
    studentName: 'Samantha Clark',
    studentRoll: '21CSE043',
    fileName: 'SamanthaClark_RBAC_Backend.zip',
    fileUrl: '#',
    fileSize: '3.2 MB',
    submittedAt: '2026-11-20T22:30:00Z',
    status: 'Submitted',
    notes: 'Added Swagger documentation.'
  },
  {
    id: 'sub-4',
    assignmentId: 'asg-4',
    studentId: 'usr-student-2', // Samantha Clark
    studentName: 'Samantha Clark',
    studentRoll: '21CSE043',
    fileName: 'Samantha_Page_Sim.zip',
    fileUrl: '#',
    fileSize: '1.1 MB',
    submittedAt: '2026-11-15T15:20:00Z',
    status: 'Checked',
    marks: 18,
    feedback: 'Solid implementation of LRU doubly-linked list. Well documented.'
  }
];

export const initialStudyMaterials: StudyMaterial[] = [
  {
    id: 'sm-1',
    subjectId: 'subj-cs501',
    semesterId: 'sem-5',
    departmentId: 'dept-cse',
    teacherId: 'usr-teacher-1',
    teacherName: 'Prof. Sarah Jenkins',
    title: 'Unit 3: B+ Trees, Query Optimization & Transaction ACID Properties',
    description: 'Comprehensive study notes explaining storage engines, physical database design, serializability, two-phase locking (2PL), and isolation levels with practical diagrams.',
    fileType: 'pdf',
    fileName: 'Unit3_DBMS_Advanced_Query_Optimization.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '4.8 MB',
    downloadCount: 124,
    createdAt: '2026-11-19'
  },
  {
    id: 'sm-2',
    subjectId: 'subj-cs502',
    semesterId: 'sem-5',
    departmentId: 'dept-cse',
    teacherId: 'usr-teacher-1',
    teacherName: 'Prof. Sarah Jenkins',
    title: 'Unit 4: Advanced Graph Algorithms - Bellman Ford, Floyd Warshall & Max Flow',
    description: 'Step-by-step mathematical proofs, pseudocode, and time/space complexity analysis for single-source shortest path with negative edges and Ford-Fulkerson network flow.',
    fileType: 'pdf',
    fileName: 'Unit4_Algorithms_Graph_Theory_Mastery.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '3.6 MB',
    downloadCount: 98,
    createdAt: '2026-11-17'
  },
  {
    id: 'sm-3',
    subjectId: 'subj-cs503',
    semesterId: 'sem-5',
    departmentId: 'dept-cse',
    teacherId: 'usr-teacher-3',
    teacherName: 'Prof. Elena Rostova',
    title: 'Operating System Kernel Synchronization: Semaphores & Monitors Guide',
    description: 'Classic synchronization problems explored: Producer-Consumer, Dining Philosophers, and Readers-Writers solved using POSIX pthread semaphores and condition variables.',
    fileType: 'pdf',
    fileName: 'OS_Kernel_Sync_Semaphores_POSIX.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '2.9 MB',
    downloadCount: 110,
    createdAt: '2026-11-14'
  },
  {
    id: 'sm-4',
    subjectId: 'subj-cs504',
    semesterId: 'sem-5',
    departmentId: 'dept-cse',
    teacherId: 'usr-teacher-2',
    teacherName: 'Dr. Marcus Reed',
    title: 'Modern Full-Stack Microservices Architecture Handbook (v3.2)',
    description: 'Architectural patterns for scalable web applications: Event-driven pub/sub, API Gateways, CQRS pattern, and WebSockets for real-time bidirectional communication.',
    fileType: 'docx',
    fileName: 'FullStack_Microservices_Handbook.docx',
    fileUrl: '#',
    fileSize: '5.2 MB',
    downloadCount: 165,
    createdAt: '2026-11-12'
  },
  {
    id: 'sm-5',
    subjectId: 'subj-cs505',
    semesterId: 'sem-5',
    departmentId: 'dept-cse',
    teacherId: 'usr-teacher-2',
    teacherName: 'Dr. Marcus Reed',
    title: 'Computer Networks: Protocol Stack Deep Dive & RFC References',
    description: 'Detailed analysis of IPv4 vs IPv6 headers, subnetting cheatsheet, CIDR calculations, BGP routing, and TLS 1.3 cryptographic handshake protocol.',
    fileType: 'pdf',
    fileName: 'Computer_Networks_Protocol_DeepDive.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '6.1 MB',
    downloadCount: 142,
    createdAt: '2026-11-10'
  }
];

export const initialAttendanceSessions: AttendanceSession[] = [
  {
    id: 'att-session-1',
    date: getRelativeDate(0), // Today
    subjectId: 'subj-cs501',
    semesterId: 'sem-5',
    teacherId: 'usr-teacher-1',
    teacherName: 'Prof. Sarah Jenkins',
    createdAt: '2026-11-21T10:30:00Z',
    records: [
      { studentId: 'usr-student-1', studentName: 'Alex Mercer', rollNo: '21CSE042', status: 'Present' },
      { studentId: 'usr-student-2', studentName: 'Samantha Clark', rollNo: '21CSE043', status: 'Present' },
      { studentId: 'usr-student-3', studentName: 'Daniel Lee', rollNo: '21CSE044', status: 'Present' },
      { studentId: 'usr-student-4', studentName: 'Priyanshu Sharma', rollNo: '21CSE045', status: 'Absent' },
      { studentId: 'usr-student-5', studentName: 'Zoe Adams', rollNo: '21CSE046', status: 'Present' }
    ]
  },
  {
    id: 'att-session-2',
    date: getRelativeDate(0), // Today
    subjectId: 'subj-cs504',
    semesterId: 'sem-5',
    teacherId: 'usr-teacher-2',
    teacherName: 'Dr. Marcus Reed',
    createdAt: '2026-11-21T12:00:00Z',
    records: [
      { studentId: 'usr-student-1', studentName: 'Alex Mercer', rollNo: '21CSE042', status: 'Present' },
      { studentId: 'usr-student-2', studentName: 'Samantha Clark', rollNo: '21CSE043', status: 'Present' },
      { studentId: 'usr-student-3', studentName: 'Daniel Lee', rollNo: '21CSE044', status: 'Absent' },
      { studentId: 'usr-student-4', studentName: 'Priyanshu Sharma', rollNo: '21CSE045', status: 'Present' },
      { studentId: 'usr-student-5', studentName: 'Zoe Adams', rollNo: '21CSE046', status: 'Present' }
    ]
  },
  {
    id: 'att-session-3',
    date: getRelativeDate(-1), // Yesterday
    subjectId: 'subj-cs502',
    semesterId: 'sem-5',
    teacherId: 'usr-teacher-1',
    teacherName: 'Prof. Sarah Jenkins',
    createdAt: '2026-11-20T11:00:00Z',
    records: [
      { studentId: 'usr-student-1', studentName: 'Alex Mercer', rollNo: '21CSE042', status: 'Present' },
      { studentId: 'usr-student-2', studentName: 'Samantha Clark', rollNo: '21CSE043', status: 'Present' },
      { studentId: 'usr-student-3', studentName: 'Daniel Lee', rollNo: '21CSE044', status: 'Present' },
      { studentId: 'usr-student-4', studentName: 'Priyanshu Sharma', rollNo: '21CSE045', status: 'Present' },
      { studentId: 'usr-student-5', studentName: 'Zoe Adams', rollNo: '21CSE046', status: 'Present' }
    ]
  },
  {
    id: 'att-session-4',
    date: getRelativeDate(-1), // Yesterday
    subjectId: 'subj-cs503',
    semesterId: 'sem-5',
    teacherId: 'usr-teacher-3',
    teacherName: 'Prof. Elena Rostova',
    createdAt: '2026-11-20T15:00:00Z',
    records: [
      { studentId: 'usr-student-1', studentName: 'Alex Mercer', rollNo: '21CSE042', status: 'Present' },
      { studentId: 'usr-student-2', studentName: 'Samantha Clark', rollNo: '21CSE043', status: 'Absent' },
      { studentId: 'usr-student-3', studentName: 'Daniel Lee', rollNo: '21CSE044', status: 'Present' },
      { studentId: 'usr-student-4', studentName: 'Priyanshu Sharma', rollNo: '21CSE045', status: 'Present' },
      { studentId: 'usr-student-5', studentName: 'Zoe Adams', rollNo: '21CSE046', status: 'Present' }
    ]
  },
  {
    id: 'att-session-5',
    date: getRelativeDate(-2), // 2 days ago
    subjectId: 'subj-cs505',
    semesterId: 'sem-5',
    teacherId: 'usr-teacher-2',
    teacherName: 'Dr. Marcus Reed',
    createdAt: '2026-11-19T11:45:00Z',
    records: [
      { studentId: 'usr-student-1', studentName: 'Alex Mercer', rollNo: '21CSE042', status: 'Present' },
      { studentId: 'usr-student-2', studentName: 'Samantha Clark', rollNo: '21CSE043', status: 'Present' },
      { studentId: 'usr-student-3', studentName: 'Daniel Lee', rollNo: '21CSE044', status: 'Present' },
      { studentId: 'usr-student-4', studentName: 'Priyanshu Sharma', rollNo: '21CSE045', status: 'Present' },
      { studentId: 'usr-student-5', studentName: 'Zoe Adams', rollNo: '21CSE046', status: 'Absent' }
    ]
  },
  {
    id: 'att-session-6',
    date: getRelativeDate(-3), // 3 days ago
    subjectId: 'subj-cs501',
    semesterId: 'sem-5',
    teacherId: 'usr-teacher-1',
    teacherName: 'Prof. Sarah Jenkins',
    createdAt: '2026-11-18T10:30:00Z',
    records: [
      { studentId: 'usr-student-1', studentName: 'Alex Mercer', rollNo: '21CSE042', status: 'Absent' },
      { studentId: 'usr-student-2', studentName: 'Samantha Clark', rollNo: '21CSE043', status: 'Present' },
      { studentId: 'usr-student-3', studentName: 'Daniel Lee', rollNo: '21CSE044', status: 'Present' },
      { studentId: 'usr-student-4', studentName: 'Priyanshu Sharma', rollNo: '21CSE045', status: 'Present' },
      { studentId: 'usr-student-5', studentName: 'Zoe Adams', rollNo: '21CSE046', status: 'Present' }
    ]
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'anc-1',
    title: 'Mid-Semester Examination Schedule for Fall 2026 Announced',
    content: 'The Office of the Controller of Examinations has published the Mid-Term timetable for all B.Tech programs. Exams commence on December 4th, 2026. Hall tickets will be downloadable from the portal starting November 28th. Students must clear any pending lab dues before downloading.',
    authorName: 'Dr. Arthur Vance',
    authorRole: 'Admin',
    targetAudience: 'All',
    priority: 'Urgent',
    date: '2026-11-20',
    pinned: true
  },
  {
    id: 'anc-2',
    title: 'Annual Apex Hackathon & Tech Innovation Expo: Registration Open',
    content: 'Apex Institute is hosting its flagship 36-hour hackathon on December 12-14, 2026 with \$15,000 in prizes and direct mentorship from Google, Microsoft, and NVIDIA engineers. Themes include Generative AI, Sustainable Energy, and Decentralized Systems. Teams of 2 to 4 students can register.',
    authorName: 'Prof. Sarah Jenkins',
    authorRole: 'Teacher',
    targetAudience: 'Students',
    priority: 'High',
    date: '2026-11-19',
    pinned: true
  },
  {
    id: 'anc-3',
    title: 'Library Digital Research Repository: 24/7 Remote IEEE & ACM Access Active',
    content: 'The Central Library has renewed enterprise subscriptions to IEEE Xplore, ACM Digital Library, and Springer Nature. Students and faculty can access full-text whitepapers off-campus using their institutional email credentials.',
    authorName: 'Dr. Arthur Vance',
    authorRole: 'Admin',
    targetAudience: 'All',
    priority: 'Normal',
    date: '2026-11-18',
    pinned: false
  },
  {
    id: 'anc-4',
    title: 'Guest Lecture: Scalable Microservices Architecture with Google Cloud Engineers',
    content: 'Distinguished engineering leaders from Google Cloud will be delivering a live keynote on resilient Kubernetes clusters and gRPC streaming on November 25th at 3:00 PM in the Main Auditorium.',
    authorName: 'Dr. Marcus Reed',
    authorRole: 'Teacher',
    targetAudience: 'Students',
    priority: 'Normal',
    date: '2026-11-16',
    pinned: false
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'usr-student-1',
    title: "New Daily Classwork Uploaded",
    message: "Prof. Sarah Jenkins posted today's classwork for Database Management Systems (B-Tree & B+ Tree Indexing).",
    type: 'classwork',
    read: false,
    timestamp: '10 minutes ago',
    linkPage: 'daily-classwork'
  },
  {
    id: 'notif-2',
    userId: 'usr-student-1',
    title: "Upcoming Assignment Deadline",
    message: "Relational Schema Normalization & Complex SQL is due in less than 48 hours (Nov 23).",
    type: 'deadline',
    read: false,
    timestamp: '1 hour ago',
    linkPage: 'assignments'
  },
  {
    id: 'notif-3',
    userId: 'usr-student-1',
    title: "Assignment Graded: 19/20",
    message: "Prof. Elena Rostova graded your Virtual Memory Page Replacement Simulator with positive feedback.",
    type: 'grade',
    read: false,
    timestamp: '3 hours ago',
    linkPage: 'assignments'
  },
  {
    id: 'notif-4',
    userId: 'usr-student-1',
    title: "New Study Material Available",
    message: "Unit 3: B+ Trees, Query Optimization & Transaction ACID Properties is now available in the Library.",
    type: 'notes',
    read: true,
    timestamp: 'Yesterday',
    linkPage: 'study-materials'
  },
  {
    id: 'notif-5',
    roleTarget: 'all',
    title: "Important College Announcement",
    message: "Mid-Semester Examination Schedule for Fall 2026 has been published by Dr. Arthur Vance.",
    type: 'announcement',
    read: true,
    timestamp: 'Yesterday',
    linkPage: 'announcements'
  }
];

export const initialBookmarks: Bookmark[] = [
  {
    id: 'bm-1',
    userId: 'usr-student-1',
    itemType: 'classwork',
    itemId: 'cw-1',
    createdAt: '2026-11-21T10:00:00Z'
  },
  {
    id: 'bm-2',
    userId: 'usr-student-1',
    itemType: 'study_material',
    itemId: 'sm-1',
    createdAt: '2026-11-20T16:00:00Z'
  }
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'act-1',
    userName: 'Prof. Sarah Jenkins',
    userRole: 'teacher',
    action: 'Classwork Uploaded',
    details: 'Uploaded topic: B-Tree & B+ Tree Indexing for CS501 DBMS',
    timestamp: '2026-11-21 09:30:15',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'act-2',
    userName: 'Prof. Sarah Jenkins',
    userRole: 'teacher',
    action: 'Attendance Recorded',
    details: 'Marked attendance for CS501 (4 Present, 1 Absent)',
    timestamp: '2026-11-21 10:30:00',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'act-3',
    userName: 'Alex Mercer',
    userRole: 'student',
    action: 'Assignment Submitted',
    details: 'Submitted assignment: Full Stack JWT Authentication & RBAC',
    timestamp: '2026-11-20 20:15:32',
    ipAddress: '192.168.1.201'
  },
  {
    id: 'act-4',
    userName: 'Dr. Arthur Vance',
    userRole: 'admin',
    action: 'Announcement Published',
    details: 'Published notice: Mid-Semester Examination Schedule for Fall 2026',
    timestamp: '2026-11-20 14:10:00',
    ipAddress: '192.168.1.5'
  },
  {
    id: 'act-5',
    userName: 'Dr. Marcus Reed',
    userRole: 'teacher',
    action: 'Study Material Uploaded',
    details: 'Uploaded handbook: Modern Full-Stack Microservices Architecture',
    timestamp: '2026-11-19 15:45:10',
    ipAddress: '192.168.1.108'
  }
];
