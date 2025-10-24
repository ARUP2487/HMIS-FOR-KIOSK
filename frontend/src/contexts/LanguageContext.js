import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(null);

const translations = {
  en: {
    // Header
    appName: 'Hospital Management System',
    home: 'Home',
    doctors: 'Doctors',
    myAppointments: 'My Appointments',
    billing: 'Billing',
    adminDashboard: 'Admin Dashboard',
    logout: 'Logout',
    login: 'Login',
    
    // Auth
    loginTitle: 'Login to Your Account',
    registerTitle: 'Create New Account',
    username: 'Username',
    password: 'Password',
    fullName: 'Full Name',
    phone: 'Phone Number',
    email: 'Email Address',
    register: 'Register',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: \"Don't have an account?\",
    
    // Dashboard
    welcomeBack: 'Welcome Back',
    upcomingAppointments: 'Upcoming Appointments',
    recentBills: 'Recent Bills',
    bookAppointment: 'Book Appointment',
    viewAllDoctors: 'View All Doctors',
    
    // Doctors
    findDoctor: 'Find Your Doctor',
    searchDoctors: 'Search doctors by name or specialization...',
    search: 'Search',
    specialization: 'Specialization',
    allSpecializations: 'All Specializations',
    experience: 'Experience',
    years: 'years',
    consultationFee: 'Consultation Fee',
    availableDays: 'Available Days',
    consultationHours: 'Consultation Hours',
    bookNow: 'Book Now',
    
    // Appointments
    bookAppointmentWith: 'Book Appointment with',
    selectDate: 'Select Date',
    selectTime: 'Select Time Slot',
    confirmBooking: 'Confirm Booking',
    appointmentDetails: 'Appointment Details',
    date: 'Date',
    time: 'Time',
    slotNumber: 'Slot Number',
    status: 'Status',
    doctor: 'Doctor',
    patient: 'Patient',
    
    // Billing
    billDetails: 'Bill Details',
    amount: 'Amount',
    paymentStatus: 'Payment Status',
    description: 'Description',
    payNow: 'Pay Now',
    paid: 'Paid',
    pending: 'Pending',
    
    // Status
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
    
    // Admin
    totalPatients: 'Total Patients',
    totalDoctors: 'Total Doctors',
    totalAppointments: 'Total Appointments',
    pendingBills: 'Pending Bills',
    allAppointments: 'All Appointments',
    allBilling: 'All Billing Records',
    addDoctor: 'Add Doctor',
    
    // Messages
    loginSuccess: 'Login successful!',
    registerSuccess: 'Registration successful!',
    bookingSuccess: 'Appointment booked successfully!',
    paymentSuccess: 'Payment completed successfully!',
    error: 'An error occurred. Please try again.',
  },
  bn: {
    // Header
    appName: 'হাসপাতাল ব্যবস্থাপনা সিস্টেম',
    home: 'হোম',
    doctors: 'ডাক্তার',
    myAppointments: 'আমার অ্যাপয়েন্টমেন্ট',
    billing: 'বিলিং',
    adminDashboard: 'অ্যাডমিন ড্যাশবোর্ড',
    logout: 'লগআউট',
    login: 'লগইন',
    
    // Auth
    loginTitle: 'আপনার অ্যাকাউন্টে লগইন করুন',
    registerTitle: 'নতুন অ্যাকাউন্ট তৈরি করুন',
    username: 'ইউজারনেম',
    password: 'পাসওয়ার্ড',
    fullName: 'পূর্ন নাম',
    phone: 'ফোন নম্বর',
    email: 'ইমেইল ঠিকানা',
    register: 'নিবন্ধন করুন',
    alreadyHaveAccount: 'ইতিমধ্যে একটি অ্যাকাউন্ট আছে?',
    dontHaveAccount: 'অ্যাকাউন্ট নেই',
    
    // Dashboard
    welcomeBack: 'স্বাগতম',
    upcomingAppointments: 'আসন্ন অ্যাপেন্টমেন্ট',
    recentBills: 'সাম্প্রতিক বিল',
    bookAppointment: 'অ্যাপেন্টমেন্ট বুক করুন',
    viewAllDoctors: 'সব ডাক্তার দেখুন',

    // Doctors
    findDoctor: 'আপনার ডাক্তার খুঁজুন',
    searchDoctors: 'নাম বা বিশেষত্ব দিয়ে ডাক্তার খুঁজুন',
    search: 'খুঁজুন',
    specialization: 'বিশেষত্ব',
    allSpecializations: 'সব বিশেষত্ব',
    experience: 'অভিঞ্জতা',
    years: 'বছর',
    consultationFee: 'পরামর্শ ফি',
    availableDays: 'উপলব্ধ দিন',
    consultationHours: 'পরামর্শের সময়',
    bookNow: 'এখনই বুক করুন',

        // Appointments
    bookAppointmentWith: 'অ্যাপেন্টমেন্ট বুক করুন',
    selectDate: 'তারিখ নির্বাচন করুন',
    selectTime: 'সময় স্লট নির্বাচন করুন',
    confirmBooking: 'বুকিং নিশ্চিত করুন',
    appointmentDetails: 'অ্যাপেন্টমেন্ট  বিবরণ',
    date: 'তারিখ',
    time: 'সময়',
    slotNumber: 'স্লট নম্বর',
    status: 'অবস্থা',
    doctor: 'ডাক্তার',
    patient: 'রোগী',
    
    // Billing
    billDetails: 'বিল বিবরণ',
    amount: 'পরিমাণ',
    paymentStatus: 'পেমেন্ট স্ট্যাটাস',
    description: 'বিবরণ', 
    payNow: 'এখনই পরিশোধ করুন',
    paid: 'পরিশোধিত',
    pending: 'অপেক্ষমান',
    
    // Status
    confirmed: 'নিশ্চিত',
    completed: 'সম্পন্ন',
    cancelled: 'বাতিল',
    
    // Admin
    totalPatients: 'মোট রোগী',
    totalDoctors: 'মোট ডাক্তার', 
    totalAppointments: 'মোট অ্যাপেন্টমেন্ট',
    pendingBills: 'অমীমাংসিত বিল',
    allAppointments: 'সব অ্যাপেন্টমেন্ট',
    allBilling: 'সব বিলিং রেকর্ড',
    addDoctor: 'ডাক্তার যোগ  করুন',
    
    // Messages
    loginSuccess: 'লগইন সফল হয়েছে!',
    registerSuccess: 'নিবন্ধন সফল হয়েছে!',
    bookingSuccess: 'অ্যাপেন্টমেন্ট সফলভাবে বুক করা হয়েছে!',
    paymentSuccess: 'পেমেন্ট সফলভাবে সম্পন্ন হয়েছে!',
    error: 'একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন!',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
    