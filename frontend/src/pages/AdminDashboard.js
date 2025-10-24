import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getAllAppointments, getAllBilling, getAdminStats, createDoctor } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Users, Stethoscope, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [doctorData, setDoctorData] = useState({
    name: '',
    name_bengali: '',
    specialization: '',
    specialization_bengali: '',
    qualifications: '',
    experience_years: 0,
    consultation_fee: 0,
    available_days: [],
    consultation_hours: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsData, appointmentsData, billsData] = await Promise.all([
        getAdminStats(),
        getAllAppointments(),
        getAllBilling()
      ]);
      setStats(statsData);
      setAppointments(appointmentsData.slice(0, 10));
      setBills(billsData.slice(0, 10));
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await createDoctor({
        ...doctorData,
        available_days: doctorData.available_days.split(',').map(d => d.trim())
      });
      toast.success('Doctor added successfully!');
      setShowAddDoctor(false);
      setDoctorData({
        name: '',
        name_bengali: '',
        specialization: '',
        specialization_bengali: '',
        qualifications: '',
        experience_years: 0,
        consultation_fee: 0,
        available_days: [],
        consultation_hours: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.detail || t('error'));
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6" data-testid="admin-dashboard">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('adminDashboard')}</h1>
          <p className="text-gray-600 mt-1">Manage hospital operations</p>
        </div>
        <Dialog open={showAddDoctor} onOpenChange={setShowAddDoctor}>
          <DialogTrigger asChild>
            <Button data-testid="add-doctor-btn">{t('addDoctor')}</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('addDoctor')}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name (English)</Label>
                  <Input
                    id="name"
                    value={doctorData.name}
                    onChange={(e) => setDoctorData({...doctorData, name: e.target.value})}
                    required
                    data-testid="doctor-name-input"
                  />
                </div>
                <div>
                  <Label htmlFor="name_bengali">Name (Bengali)</Label>
                  <Input
                    id="name_bengali"
                    value={doctorData.name_bengali}
                    onChange={(e) => setDoctorData({...doctorData, name_bengali: e.target.value})}
                    required
                    data-testid="doctor-name-bengali-input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="specialization">Specialization (English)</Label>
                  <Input
                    id="specialization"
                    value={doctorData.specialization}
                    onChange={(e) => setDoctorData({...doctorData, specialization: e.target.value})}
                    required
                    data-testid="doctor-specialization-input"
                  />
                </div>
                <div>
                  <Label htmlFor="specialization_bengali">Specialization (Bengali)</Label>
                  <Input
                    id="specialization_bengali"
                    value={doctorData.specialization_bengali}
                    onChange={(e) => setDoctorData({...doctorData, specialization_bengali: e.target.value})}
                    required
                    data-testid="doctor-specialization-bengali-input"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="qualifications">Qualifications</Label>
                <Input
                  id="qualifications"
                  value={doctorData.qualifications}
                  onChange={(e) => setDoctorData({...doctorData, qualifications: e.target.value})}
                  required
                  data-testid="doctor-qualifications-input"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience_years">Experience (Years)</Label>
                  <Input
                    id="experience_years"
                    type="number"
                    value={doctorData.experience_years}
                    onChange={(e) => setDoctorData({...doctorData, experience_years: parseInt(e.target.value)})}
                    required
                    data-testid="doctor-experience-input"
                  />
                </div>
                <div>
                  <Label htmlFor="consultation_fee">Consultation Fee</Label>
                  <Input
                    id="consultation_fee"
                    type="number"
                    value={doctorData.consultation_fee}
                    onChange={(e) => setDoctorData({...doctorData, consultation_fee: parseFloat(e.target.value)})}
                    required
                    data-testid="doctor-fee-input"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="available_days">Available Days (comma separated)</Label>
                <Input
                  id="available_days"
                  placeholder="Monday, Tuesday, Wednesday"
                  value={doctorData.available_days}
                  onChange={(e) => setDoctorData({...doctorData, available_days: e.target.value})}
                  required
                  data-testid="doctor-days-input"
                />
              </div>
              <div>
                <Label htmlFor="consultation_hours">Consultation Hours</Label>
                <Input
                  id="consultation_hours"
                  placeholder="9:00 AM - 5:00 PM"
                  value={doctorData.consultation_hours}
                  onChange={(e) => setDoctorData({...doctorData, consultation_hours: e.target.value})}
                  required
                  data-testid="doctor-hours-input"
                />
              </div>
              <Button type="submit" className="w-full" data-testid="submit-doctor-btn">
                Add Doctor
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card data-testid="stat-patients-card">
          <CardContent className=\"pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('totalPatients')}</p>
                <p className="text-2xl font-bold">{stats?.total_patients || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="stat-doctors-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Stethoscope className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('totalDoctors')}</p>
                <p className="text-2xl font-bold">{stats?.total_doctors || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="stat-appointments-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('totalAppointments')}</p>
                <p className="text-2xl font-bold">{stats?.total_appointments || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="stat-bills-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('pendingBills')}</p>
                <p className="text-2xl font-bold">{stats?.pending_bills || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="recent-appointments-card">
          <CardHeader>
            <CardTitle>{t('allAppointments')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {appointments.map(appointment => (
                <div key={appointment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded" data-testid={`admin-appointment-${appointment.id}`}>
                  <div>
                    <p className="font-medium">{appointment.patient_name}</p>
                    <p className="text-sm text-gray-600">{appointment.doctor_name}</p>
                    <p className="text-xs text-gray-500">{appointment.appointment_date}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {t(appointment.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="recent-billing-card">
          <CardHeader>
            <CardTitle>{t('allBilling')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {bills.map(bill => (
                <div key={bill.id} className="flex justify-between items-center p-3 bg-gray-50 rounded" data-testid={`admin-bill-${bill.id}`}>
                  <div>
                    <p className="font-medium">{bill.patient_name}</p>
                    <p className="text-sm text-gray-600">৳{bill.amount}</p>
                  </div>
                  <Badge className={bill.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                    {t(bill.payment_status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
