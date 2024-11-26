import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import HostelDetailPage from './pages/HostelDetailPage';
import BookingPage from './pages/BookingPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import FloatingActions from './components/FloatingActions';
import AuthProvider, { useAuth } from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              <Toaster position="top-right" />
              <Header />
              
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/hostel/:id" element={<HostelDetailPage />} />
                <Route 
                  path="/booking/:hostelId" 
                  element={
                    <ProtectedRoute>
                      <BookingPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>

              <FloatingActions />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;