import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { initialUsers } from '../data/initialData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  switchUser: (userId: string) => void;
  registerStudent: (data: Partial<User>) => User;
  updateCurrentUser: (data: Partial<User>) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Store users in localStorage or fallback to initialUsers
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('ccp_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse users', e);
      }
    }
    return initialUsers;
  });

  // Current user defaults to student (Alex Mercer) for immediate interactive demonstration, or can be null
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ccp_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialUsers.find(u => u.id === 'usr-student-1') || initialUsers[0];
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('ccp_dark_mode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('ccp_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ccp_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ccp_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ccp_dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const login = (email: string, role?: UserRole): boolean => {
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      return true;
    }
    // If demo email didn't match, fallback by role
    if (role) {
      const matchRole = users.find(u => u.role === role);
      if (matchRole) {
        setCurrentUser(matchRole);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    const targetUser = users.find(u => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
    }
  };

  const switchUser = (userId: string) => {
    const targetUser = users.find(u => u.id === userId);
    if (targetUser) {
      setCurrentUser(targetUser);
    }
  };

  const registerStudent = (data: Partial<User>): User => {
    const newUser: User = {
      id: `usr-student-${Date.now()}`,
      name: data.name || 'New Student',
      email: data.email || `student_${Date.now()}@student.college.edu`,
      role: 'student',
      avatar: data.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name || 'student'}`,
      phone: data.phone || '+1 (555) 000-0000',
      departmentId: data.departmentId || 'dept-cse',
      courseId: data.courseId || 'course-btech-cse',
      semesterId: data.semesterId || 'sem-5',
      rollNo: data.rollNo || `21CSE${Math.floor(100 + Math.random() * 900)}`,
      bio: data.bio || 'Newly enrolled undergraduate student.',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    return newUser;
  };

  const updateCurrentUser = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        logout,
        switchRole,
        switchUser,
        registerStudent,
        updateCurrentUser,
        isDarkMode,
        toggleDarkMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
