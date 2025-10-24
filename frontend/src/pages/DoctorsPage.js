import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getDoctors } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Search, Stethoscope, Calendar } from 'lucide-react';

const DoctorsPage = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [search, specialization, doctors]);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    let filtered = doctors;

    if (search) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        doctor.name_bengali.includes(search) ||
        doctor.specialization.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization_bengali.includes(search)
      );
    }

    if (specialization && specialization !== 'all') {
      filtered = filtered.filter(doctor => 
        doctor.specialization.toLowerCase() === specialization.toLowerCase() ||
        doctor.specialization_bengali === specialization
      );
    }

    setFilteredDoctors(filtered);
  };

  const specializations = [...new Set(doctors.map(d => d.specialization))];

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6" data-testid="doctors-page">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Stethoscope className="h-8 w-8" />
          {t('findDoctor')}
        </h1>
        <p className="text-gray-600 mt-1">{t('searchDoctors')}</p>
      </div>

      <Card data-testid="doctor-search-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('searchDoctors')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                  data-testid="doctor-search-input"
                />
              </div>
            </div>
            <Select value={specialization} onValueChange={setSpecialization}>
              <SelectTrigger data-testid="specialization-select">
                <SelectValue placeholder={t('allSpecializations')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allSpecializations')}</SelectItem>
                {specializations.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow" data-testid={`doctor-card-${doctor.id}`}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Stethoscope className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">
                    {language === 'bn' ? doctor.name_bengali : doctor.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {language === 'bn' ? doctor.specialization_bengali : doctor.specialization}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">{t('qualifications')}</p>
                <p className="font-medium">{doctor.qualifications}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('experience')}</p>
                <p className="font-medium">{doctor.experience_years} {t('years')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('consultationFee')}</p>
                <p className="font-medium text-green-600">\u09f3{doctor.consultation_fee}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('availableDays')}</p>
                <p className="font-medium text-sm">{doctor.available_days.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('consultationHours')}</p>
                <p className="font-medium">{doctor.consultation_hours}</p>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={() => navigate(`/book-appointment/${doctor.id}`)}
                data-testid={`book-appointment-btn-${doctor.id}`}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {t('bookNow')}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12" data-testid="no-doctors-message">
          <Stethoscope className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No doctors found</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;