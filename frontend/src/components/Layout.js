import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t, language, changeLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navItems = [
    { path: '/dashboard', label: t('home'), role: ['patient', 'admin'] },
    { path: '/doctors', label: t('doctors'), role: ['patient', 'admin'] },
    { path: '/appointments', label: t('myAppointments'), role: ['patient'] },
    { path: '/billing', label: t('billing'), role: ['patient'] },
    { path: '/admin', label: t('adminDashboard'), role: ['admin'] },
  ];

  const filteredNavItems = navItems.filter(item => item.role.includes(user?.role));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50" data-testid="app-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="mobile-menu-btn"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <h1 className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/dashboard')} data-testid="app-title">
                {t('appName')}
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-4" data-testid="desktop-nav">
              {filteredNavItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  data-testid={`nav-${item.path.replace('/', '')}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant={language === 'en' ? 'default' : 'outline'}
                size="sm"
                onClick={() => changeLanguage('en')}
                data-testid="header-lang-en-btn"
              >
                EN
              </Button>
              <Button
                variant={language === 'bn' ? 'default' : 'outline'}
                size="sm"
                onClick={() => changeLanguage('bn')}
                data-testid="header-lang-bn-btn"
              >
                BN
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="logout-btn">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4" data-testid="mobile-nav">
              {filteredNavItems.map(item => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  data-testid={`mobile-nav-${item.path.replace('/', '')}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12" data-testid="app-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            Ⓒ 2025 {t('appName')}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;