-- AI Prescription Pro - Database Setup SQL
-- Run this in Supabase SQL Editor to create all tables

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'doctor' NOT NULL,
  phone TEXT,
  specialization TEXT,
  "licenseNumber" TEXT,
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  gender TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  "bloodGroup" TEXT,
  allergies TEXT,
  "medicalHistory" TEXT,
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "doctorId" TEXT NOT NULL,
  CONSTRAINT patients_doctorId_fkey FOREIGN KEY ("doctorId") REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id TEXT PRIMARY KEY,
  "patientName" TEXT NOT NULL,
  "patientAge" INTEGER NOT NULL,
  "patientGender" TEXT NOT NULL,
  symptoms TEXT NOT NULL,
  diagnosis TEXT NOT NULL,
  medications TEXT NOT NULL,
  advice TEXT,
  "followUp" TEXT,
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "doctorId" TEXT NOT NULL,
  "patientId" TEXT,
  CONSTRAINT prescriptions_doctorId_fkey FOREIGN KEY ("doctorId") REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT prescriptions_patientId_fkey FOREIGN KEY ("patientId") REFERENCES patients(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  condition TEXT NOT NULL,
  symptoms TEXT NOT NULL,
  diagnosis TEXT NOT NULL,
  medications TEXT NOT NULL,
  advice TEXT,
  "isDefault" BOOLEAN DEFAULT false NOT NULL,
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_patients_doctorId ON patients("doctorId");
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctorId ON prescriptions("doctorId");
CREATE INDEX IF NOT EXISTS idx_prescriptions_patientId ON prescriptions("patientId");

-- Insert demo doctor account (password: demo123)
INSERT INTO users (id, email, password, name, role, phone, specialization, "licenseNumber", "createdAt", "updatedAt")
VALUES (
  'demo-doctor-001',
  'doctor@demo.com',
  '$2a$10$rOvHPZYbXJZ5YqN5YqN5YeN5YqN5YqN5YqN5YqN5YqN5YqN5YqN5Y',
  'Dr. Demo',
  'doctor',
  '+91-9876543210',
  'General Physician',
  'MED-2024-001',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;

-- Insert sample template
INSERT INTO templates (id, name, condition, symptoms, diagnosis, medications, advice, "isDefault", "createdAt", "updatedAt")
VALUES (
  'template-001',
  'Common Cold',
  'Upper Respiratory Infection',
  'Runny nose, sneezing, mild fever, sore throat',
  'Viral Upper Respiratory Tract Infection (Common Cold)',
  '[{"name":"Paracetamol 500mg","dosage":"1 tablet","frequency":"3 times daily","duration":"3 days"},{"name":"Cetirizine 10mg","dosage":"1 tablet","frequency":"Once daily at night","duration":"5 days"}]',
  'Rest well, drink plenty of fluids, avoid cold beverages',
  true,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO NOTHING;
