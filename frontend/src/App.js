import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import DoctorsPage from './pages/DoctorsPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import AppointmentsPage from './pages/AppointmentsPage';
import BillingPage from './pages/BillingPage';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return user ? children : <Navigate to="/auth" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth\" />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/doctors"
        element={
          <PrivateRoute>
            <Layout>
              <DoctorsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/book-appointment/:doctorId"
        element={
          <PrivateRoute>
            <Layout>
              <BookAppointmentPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/appointments"
        element={
          <PrivateRoute>
            <Layout>
              <AppointmentsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/billing"
        element={
          <PrivateRoute>
            <Layout>
              <BillingPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Layout>
              <AdminDashboard />
            </Layout>
          </AdminRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <Toaster position="top-right" richColors />
          <AppRoutes />
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
