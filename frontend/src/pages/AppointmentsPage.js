import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getMyAppointments } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

const AppointmentsPage = () => {
  const { t } = useLanguage();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getMyAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6" data-testid="appointments-page">
      <div>
        <h1 className="text-3xl font-bold">{t('myAppointments')}</h1>
        <p className="text-gray-600 mt-1">View and manage your appointments</p>
      </div>

      {appointments.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-md transition-shadow" data-testid={`appointment-card-${appointment.id}`}>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold" data-testid={`doctor-name-${appointment.id}`}>{appointment.doctor_name}</h3>
                      <Badge className={getStatusColor(appointment.status)} data-testid={`appointment-status-${appointment.id}`}>
                        {t(appointment.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-600">{t('date')}</p>
                          <p className="font-medium" data-testid={`appointment-date-${appointment.id}`}>{appointment.appointment_date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-600">{t('time')}</p>
                          <p className="font-medium" data-testid={`appointment-time-${appointment.id}`}>{appointment.slot_time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-600">{t('slotNumber')}</p>
                          <p className="font-medium text-blue-600" data-testid={`slot-number-${appointment.id}`}>#{appointment.slot_number}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card data-testid="no-appointments-card">
          <CardContent className="py-12 text-center">
            <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">No appointments found</p>
            <p className="text-gray-500 text-sm mt-2">Book an appointment to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AppointmentsPage;