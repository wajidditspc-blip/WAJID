import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/common/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { DailyClassworkPage } from './pages/DailyClassworkPage';
import { SubjectWisePage } from './pages/SubjectWisePage';
import { AssignmentsPage } from './pages/AssignmentsPage';
import { StudyMaterialsPage } from './pages/StudyMaterialsPage';
import { AttendancePage } from './pages/AttendancePage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutCollegePage } from './pages/AboutCollegePage';
import { ContactPage } from './pages/ContactPage';
import { HelpSupportPage } from './pages/HelpSupportPage';

const AppContent: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('student-dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Global Cmd+K / Ctrl+K keyboard shortcut for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top on page transition
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine if current page is full-width public page (Home, Login, Register)
  const isPublicPage = ['home', 'login', 'register'].includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'student-dashboard':
        return <StudentDashboard onNavigate={handleNavigate} />;
      case 'teacher-dashboard':
        return <TeacherDashboard onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'daily-classwork':
        return <DailyClassworkPage />;
      case 'subject-wise':
        return <SubjectWisePage onNavigate={handleNavigate} />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'study-materials':
        return <StudyMaterialsPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'announcements':
        return <AnnouncementsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'about':
        return <AboutCollegePage />;
      case 'contact':
        return <ContactPage />;
      case 'help':
        return <HelpSupportPage />;
      default:
        return <StudentDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sticky Top Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />

      {/* Main Body */}
      {isPublicPage ? (
        <main className="flex-1">
          {renderPage()}
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Sidebar Navigation */}
          <Sidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Page Content Viewport */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
            {renderPage()}
          </main>
        </div>
      )}

      {/* Institutional College Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Search Dialog Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
