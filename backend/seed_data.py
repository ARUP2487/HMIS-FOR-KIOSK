"import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import bcrypt
import uuid
from datetime import datetime, timezone
import os
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

async def seed_database():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    print(\"Seeding database...\")
    
    # Create admin user
    admin_exists = await db.users.find_one({\"username\": \"admin\"})
    if not admin_exists:
        admin = {
            \"id\": str(uuid.uuid4()),
            \"username\": \"admin\",
            \"password_hash\": hash_password(\"admin123\"),
            \"full_name\": \"Admin User\",
            \"phone\": \"01700000000\",
            \"email\": \"admin@hospital.com\",
            \"role\": \"admin\",
            \"language_preference\": \"en\",
            \"created_at\": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(admin)
        print(\"✓ Admin user created (username: admin, password: admin123)\")
    
    # Create patient user
    patient_exists = await db.users.find_one({\"username\": \"patient\"})
    if not patient_exists:
        patient = {
            \"id\": str(uuid.uuid4()),
            \"username\": \"patient\",
            \"password_hash\": hash_password(\"patient123\"),
            \"full_name\": \"John Doe\",
            \"phone\": \"01711111111\",
            \"email\": \"patient@example.com\",
            \"role\": \"patient\",
            \"language_preference\": \"en\",
            \"created_at\": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(patient)
        print(\"✓ Patient user created (username: patient, password: patient123)\")
    
    # Create sample doctors
    doctors_data = [
        {
            \"id\": str(uuid.uuid4()),
            \"name\": \"Dr. Sarah Ahmed\",
            \"name_bengali\": \"ডাঃ সারাহ আহমেদ\",
            \"specialization\": \"Cardiologist\",
            \"specialization_bengali\": \"হৃদরোগ বিশেষজ্ঞ\",
            \"qualifications\": \"MBBS, MD (Cardiology)\",
            \"experience_years\": 15,
            \"consultation_fee\": 1500.0,
            \"available_days\": [\"Monday\", \"Tuesday\", \"Wednesday\", \"Thursday\"],
            \"consultation_hours\": \"9:00 AM - 5:00 PM\",
            \"image_url\": None,
            \"created_at\": datetime.now(timezone.utc).isoformat()
        },
        {
            \"id\": str(uuid.uuid4()),
            \"name\": \"Dr. Kamal Hassan\",
            \"name_bengali\": \"ডাঃ কামাল হাসান\",
            \"specialization\": \"Neurologist\",
            \"specialization_bengali\": \"স্নায়ু বিশেষজ্ঞ\",
            \"qualifications\": \"MBBS, MD (Neurology)\",
            \"experience_years\": 12,
            \"consultation_fee\": 1200.0,
            \"available_days\": [\"Sunday\", \"Monday\", \"Wednesday\", \"Friday\"],
            \"consultation_hours\": \"10:00 AM - 6:00 PM\",
            \"image_url\": None,
            \"created_at\": datetime.now(timezone.utc).isoformat()
        },
        {
            \"id\": str(uuid.uuid4()),
            \"name\": \"Dr. Fatima Khan\",
            \"name_bengali\": \"ডাঃ ফাতিমা খান\",
            \"specialization\": \"Pediatrician\",
            \"specialization_bengali\": \"শিশু বিশেষজ্ঞ\",
            \"qualifications\": \"MBBS, DCH, MD (Pediatrics)\",
            \"experience_years\": 10,
            \"consultation_fee\": 1000.0,
            \"available_days\": [\"Saturday\", \"Sunday\", \"Tuesday\", \"Thursday\"],
            \"consultation_hours\": \"9:00 AM - 4:00 PM\",
            \"image_url\": None,
            \"created_at\": datetime.now(timezone.utc).isoformat()
        },
        {
            \"id\": str(uuid.uuid4()),
            \"name\": \"Dr. Rajesh Kumar\",
            \"name_bengali\": \"ডাঃ রাজেশ কুমার\",
            \"specialization\": \"Orthopedic Surgeon\",
            \"specialization_bengali\": \"অর্থোপেডিক সার্জন\",
            \"qualifications\": \"MBBS, MS (Orthopedics)\",
            \"experience_years\": 18,
            \"consultation_fee\": 1800.0,
            \"available_days\": [\"Monday\", \"Tuesday\", \"Thursday\", \"Saturday\"],
            \"consultation_hours\": \"8:00 AM - 3:00 PM\",
            \"image_url\": None,
            \"created_at\": datetime.now(timezone.utc).isoformat()
        },
        {
            \"id\": str(uuid.uuid4()),
            \"name\": \"Dr. Nazia Rahman\",
            \"name_bengali\": \"ডাঃ নাজিয়া রহমান\",
            \"specialization\": \"Dermatologist\",
            \"specialization_bengali\": \"চর্মরোগ বিশেষজ্ঞ\",
            \"qualifications\": \"MBBS, DDV, MD (Dermatology)\",
            \"experience_years\": 8,
            \"consultation_fee\": 900.0,
            \"available_days\": [\"Sunday\", \"Monday\", \"Tuesday\", \"Wednesday\"],
            \"consultation_hours\": \"11:00 AM - 7:00 PM\",
            \"image_url\": None,
            \"created_at\": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    existing_doctors = await db.doctors.count_documents({})
    if existing_doctors == 0:
        await db.doctors.insert_many(doctors_data)
        print(f\"✓ {len(doctors_data)} sample doctors created\")
    else:
        print(f\"✓ Doctors already exist ({existing_doctors} doctors)\")
    
    print(\"\n✅ Database seeding completed!\")
    print(\"\nTest Credentials:\")
    print(\"Admin - Username: admin, Password: admin123\")
    print(\"Patient - Username: patient, Password: patient123\")
    
    client.close()

if __name__ == \"__main__\":
    asyncio.run(seed_database())
"