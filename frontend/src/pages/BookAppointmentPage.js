import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getDoctor, createAppointment } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const BookAppointmentPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  useEffect(() => {
    fetchDoctor();
  }, [doctorId]);

  const fetchDoctor = async () => {
    try {
      const data = await getDoctor(doctorId);
      setDoctor(data);
    } catch (error) {
      console.error('Failed to fetch doctor:', error);
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!date || !timeSlot) {
      toast.error('Please select date and time slot');
      return;
    }

    setSubmitting(true);
    try {
      const appointmentDate = date.toISOString().split('T')[0];
      await createAppointment({
        doctor_id: doctorId,
        appointment_date: appointmentDate,
        slot_time: timeSlot
      });
      toast.success(t('bookingSuccess'));
      navigate('/appointments');
    } catch (error) {
      console.error('Failed to book appointment:', error);
      toast.error(error.response?.data?.detail || t('error'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!doctor) {
    return <div className="text-center py-12">Doctor not found</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto" data-testid="book-appointment-page">
      <Button variant="ghost" onClick={() => navigate('/doctors')} data-testid="back-to-doctors-btn">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Doctors
      </Button>

      <Card data-testid="doctor-info-card">
        <CardHeader>
          <CardTitle className="text-2xl">
            {t('bookAppointmentWith')} {language === 'bn' ? doctor.name_bengali : doctor.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">{t('specialization')}</p>
                <p className="font-medium">{language === 'bn' ? doctor.specialization_bengali : doctor.specialization}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('experience')}</p>
                <p className="font-medium">{doctor.experience_years} {t('years')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('consultationFee')}</p>
                <p className="font-medium text-green-600">৳{doctor.consultation_fee}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">{t('availableDays')}</p>
                <p className="font-medium">{doctor.available_days.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('consultationHours')}</p>
                <p className="font-medium">{doctor.consultation_hours}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card data-testid="date-selection-card">
          <CardHeader>
            <CardTitle>{t('selectDate')}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              className="rounded-md border"
              data-testid="appointment-calendar"
            />
          </CardContent>
        </Card>

        <Card data-testid="time-selection-card">
          <CardHeader>
            <CardTitle>{t('selectTime')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger data-testid="time-slot-select">
                <SelectValue placeholder={t('selectTime')} />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(slot => (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {date && timeSlot && (
              <div className="p-4 bg-blue-50 rounded-lg" data-testid="booking-summary">
                <h4 className="font-medium mb-2">{t('appointmentDetails')}</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-600">{t('doctor')}:</span> {doctor.name}</p>
                  <p><span className="text-gray-600">{t('date')}:</span> {date.toLocaleDateString()}</p>
                  <p><span className="text-gray-600">{t('time')}:</span> {timeSlot}</p>
                  <p><span className="text-gray-600">{t('consultationFee')}:</span> \u09f3{doctor.consultation_fee}</p>
                </div>
              </div>
            )}

            <Button 
              className="w-full" 
              onClick={handleBooking} 
              disabled={!date || !timeSlot || submitting}
              data-testid="confirm-booking-btn"
            >
              {submitting ? 'Booking...' : t('confirmBooking')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookAppointmentPage;