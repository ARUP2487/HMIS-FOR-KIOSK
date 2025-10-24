import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { getMyAppointments, getMyBilling } from '../services/api';
import { Calendar, DollarSign, UserCheck } from 'lucide-react';

  const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appointmentsData, billsData] = await Promise.all([
        getMyAppointments(),
        getMyBilling()
      ]);
      setAppointments(appointmentsData.slice(0, 3));
      setBills(billsData.slice(0, 3));
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6" data-testid="dashboard">
      <div>
        <h1 className="text-3xl font-bold">{t('welcomeBack')}, {user?.full_name}!</h1>
        <p className="text-gray-600 mt-1">{t('appName')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/doctors')} data-testid="book-appointment-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('bookAppointment')}</p>
                <p className="text-2xl font-bold">{appointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow" data-testid="appointments-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('upcomingAppointments')}</p>
                <p className="text-2xl font-bold">{appointments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow" data-testid="billing-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('recentBills')}</p>
                <p className="text-2xl font-bold">{bills.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="upcoming-appointments-section">
          <CardHeader>
            <CardTitle>{t('upcomingAppointments')}</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className=\"flex justify-between items-center p-3 bg-gray-50 rounded-lg\" data-testid={`appointment-item-${appointment.id}`}>
                    <div>
                      <p className="font-medium">{appointment.doctor_name}</p>
                      <p className="text-sm text-gray-600">{appointment.appointment_date} at {appointment.slot_time}</p>
                      <p className="text-xs text-gray-500">{t('slotNumber')}: {appointment.slot_number}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {t(appointment.status)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">{t('bookAppointment')}</p>
            )}
            <Button className="w-full mt-4" onClick={() => navigate('/appointments')} data-testid="view-all-appointments-btn">
              {t('myAppointments')}
            </Button>
          </CardContent>
        </Card>

        <Card data-testid="recent-bills-section">
          <CardHeader>
            <CardTitle>{t('recentBills')}</CardTitle>
          </CardHeader>
          <CardContent>
            {bills.length > 0 ? (
              <div className="space-y-3">
                {bills.map((bill) => (
                  <div key={bill.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg" data-testid={`bill-item-${bill.id}`}>
                    <div>
                      <p className="font-medium">{bill.description}</p>
                      <p className="text-sm text-gray-600">\u09f3{bill.amount}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      bill.payment_status === 'paid' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {t(bill.payment_status)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">{t('billing')}</p>
            )}
            <Button className="w-full mt-4" onClick={() => navigate('/billing')} data-testid="view-all-billing-btn">
              {t('billing')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card data-testid="quick-actions-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="w-full" onClick={() => navigate('/doctors')} data-testid="find-doctor-btn">
              {t('findDoctor')}
            </Button>
            <Button className="w-full" variant="outline" onClick={() => navigate('/appointments')} data-testid="my-appointments-nav-btn">
              {t('myAppointments')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;