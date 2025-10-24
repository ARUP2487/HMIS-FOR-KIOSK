# Hospital Management & Information Services System

A comprehensive web-based hospital management system with multi-language support (English & Bengali) that enables patients to book appointments, manage billing, and search for appropriate doctors.

## Features

### Patient Features
- **User Authentication**: Secure login and registration system
- **Doctor Directory**: Browse and search doctors by name, specialization, or phonetic search
- **Multi-language Support**: Switch between English and Bengali seamlessly
- **Appointment Booking**: Book appointments with doctors and get slot numbers
- **Slot Management**: View queue numbers and appointment times
- **Billing System**: Self-service billing with payment tracking
- **Medical Reports**: View appointment history and details

### Admin Features
- **Admin Dashboard**: Overview of hospital operations with statistics
- **Doctor Management**: Add and manage doctor profiles
- **Appointment Management**: View all appointments across the hospital
- **Billing Overview**: Monitor all billing records and payment status

### Technical Features
- **Phonetic Search**: Search doctors using Bengali phonetic input
- **Bilingual Interface**: Complete UI translation for English and Bengali
- **Real-time Updates**: Slot numbers update automatically
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Role-based Access**: Different dashboards for patients and admins

## Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB
- **Authentication**: JWT tokens with bcrypt password hashing
- **API**: RESTful API with comprehensive endpoints

### Frontend
- **Framework**: React 19
- **UI Components**: Radix UI + Tailwind CSS
- **Routing**: React Router v7
- **State Management**: Context API
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner toast notifications

## Installation & Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB

### Backend Setup

1. Navigate to backend directory:
```bash
cd /app/backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set environment variables in `.env`:
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
JWT_SECRET_KEY=your-secret-key-change-in-production
CORS_ORIGINS=*
```

4. Seed the database with sample data:
```bash
python seed_data.py
```

5. Start the backend server (handled by supervisor):
```bash
sudo supervisorctl restart backend
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd /app/frontend
```

2. Install dependencies:
```bash
yarn install
```

3. Set environment variables in `.env`:
```env
REACT_APP_BACKEND_URL=your-backend-url
```

4. Start the frontend (handled by supervisor):
```bash
sudo supervisorctl restart frontend
```

## Test Credentials

### Admin Account
- **Username**: admin
- **Password**: admin123
- **Access**: Full admin dashboard, doctor management, view all appointments and billing

### Patient Account
- **Username**: patient
- **Password**: patient123
- **Access**: Patient dashboard, book appointments, view personal billing

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Doctors
- `GET /api/doctors` - List all doctors (with search & filter)
- `GET /api/doctors/{doctor_id}` - Get doctor details
- `POST /api/doctors` - Add new doctor (admin only)

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/my` - Get user's appointments
- `GET /api/appointments/{appointment_id}` - Get appointment details

### Billing
- `GET /api/billing/my` - Get user's bills
- `GET /api/billing/{bill_id}` - Get bill details
- `PUT /api/billing/{bill_id}/pay` - Mark bill as paid

### Admin
- `GET /api/admin/appointments` - Get all appointments
- `GET /api/admin/billing` - Get all billing records
- `GET /api/admin/stats` - Get hospital statistics

## Database Schema

### Users Collection
- id, username, password_hash, full_name, phone, email, role, language_preference, created_at

### Doctors Collection
- id, name, name_bengali, specialization, specialization_bengali, qualifications, experience_years, consultation_fee, available_days, consultation_hours, image_url, created_at

### Appointments Collection
- id, patient_id, patient_name, doctor_id, doctor_name, appointment_date, slot_time, slot_number, status, created_at

### Billing Collection
- id, patient_id, patient_name, appointment_id, amount, description, payment_status, created_at

## Multi-language Support

The system supports both English and Bengali languages:
- Language switcher in header
- All UI elements translated
- Doctor names and specializations in both languages
- Search functionality supports both languages
- Phonetic search for Bengali names

## Usage Flow

### Patient Journey
1. Register/Login to the system
2. Browse doctor directory
3. Search by specialization or name (English/Bengali)
4. View doctor details and availability
5. Book appointment with preferred date and time
6. Receive slot number
7. View appointment details on dashboard
8. Check billing and make payment

### Admin Journey
1. Login with admin credentials
2. View hospital statistics
3. Add new doctors with bilingual information
4. Monitor all appointments
5. Track billing and payments
6. Manage hospital operations

## Future Enhancements

- SMS/Email notifications for appointments
- Online payment gateway integration
- Medical prescription management
- Patient medical history
- Doctor availability calendar
- Video consultation feature
- More language support (Hindi, etc.)
- Advanced phonetic search algorithms
- Mobile application

## Support

For any issues or questions, please contact the development team.

## License

Copyright © 2025 Hospital Management System. All rights reserved.
"
