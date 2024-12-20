import React from 'react';
import { useAuth } from './hooks/useAuth';
import LoginForm from './components/auth/LoginForm';
import AdminDashboard from './components/dashboard/AdminDashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        onNavigate={() => {}} 
        currentPage="dashboard"
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={logout} user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            {user?.role === 'admin' ? (
              <AdminDashboard />
            ) : (
              <TeacherDashboard user={user!} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;