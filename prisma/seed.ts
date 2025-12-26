import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo doctor
  const doctorPassword = await hash('demo123', 12)
  const doctor = await prisma.user.upsert({
    where: { email: 'doctor@demo.com' },
    update: {},
    create: {
      email: 'doctor@demo.com',
      password: doctorPassword,
      name: 'Dr. Kumar Vaibhav',
      role: 'doctor',
      phone: '+91 9876543210',
      specialization: 'General Physician',
      licenseNumber: 'MED-2024-001',
    },
  })

  console.log('✅ Created demo doctor:', doctor.email)

  // Create demo patient user
  const patientPassword = await hash('demo123', 12)
  const patientUser = await prisma.user.upsert({
    where: { email: 'patient@demo.com' },
    update: {},
    create: {
      email: 'patient@demo.com',
      password: patientPassword,
      name: 'Rahul Sharma',
      role: 'patient',
      phone: '+91 9876543211',
    },
  })

  console.log('✅ Created demo patient user:', patientUser.email)

  // Create patient record
  const patient = await prisma.patient.create({
    data: {
      name: 'Rahul Sharma',
      age: 35,
      gender: 'Male',
      phone: '+91 9876543211',
      email: 'patient@demo.com',
      bloodGroup: 'O+',
      allergies: 'Penicillin',
      medicalHistory: 'Hypertension, Type 2 Diabetes',
      doctorId: doctor.id,
    },
  })

  console.log('✅ Created patient record:', patient.name)

  // Create sample prescription
  const prescription = await prisma.prescription.create({
    data: {
      patientName: 'Rahul Sharma',
      patientAge: 35,
      patientGender: 'Male',
      symptoms: 'Fever, headache, body ache for 3 days',
      diagnosis: 'Viral Fever',
      medications: JSON.stringify([
        {
          name: 'Paracetamol 500mg',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '5 days',
          instructions: 'Take after meals',
        },
        {
          name: 'Cetirizine 10mg',
          dosage: '10mg',
          frequency: 'Once daily at bedtime',
          duration: '5 days',
          instructions: 'Take with water',
        },
      ]),
      advice: 'Rest well, drink plenty of fluids, avoid cold foods',
      followUp: 'Follow up after 5 days if symptoms persist',
      doctorId: doctor.id,
      patientId: patient.id,
    },
  })

  console.log('✅ Created sample prescription:', prescription.id)

  // Create prescription templates
  const templates = [
    {
      name: 'Common Cold',
      condition: 'Upper Respiratory Tract Infection',
      symptoms: 'Runny nose, sneezing, mild fever, sore throat',
      diagnosis: 'Common Cold (Viral URTI)',
      medications: JSON.stringify([
        {
          name: 'Paracetamol 500mg',
          dosage: '500mg',
          frequency: 'Three times daily',
          duration: '3 days',
          instructions: 'Take after meals',
        },
        {
          name: 'Cetirizine 10mg',
          dosage: '10mg',
          frequency: 'Once daily',
          duration: '5 days',
          instructions: 'Take at bedtime',
        },
      ]),
      advice: 'Rest, warm fluids, steam inhalation',
      isDefault: true,
    },
    {
      name: 'Fever',
      condition: 'Pyrexia',
      symptoms: 'High temperature, body ache, weakness',
      diagnosis: 'Fever (Viral)',
      medications: JSON.stringify([
        {
          name: 'Paracetamol 650mg',
          dosage: '650mg',
          frequency: 'Every 6 hours if needed',
          duration: '3 days',
          instructions: 'Take with food',
        },
      ]),
      advice: 'Rest, plenty of fluids, sponge bath if fever is high',
      isDefault: true,
    },
    {
      name: 'Headache',
      condition: 'Cephalgia',
      symptoms: 'Headache, mild nausea',
      diagnosis: 'Tension Headache',
      medications: JSON.stringify([
        {
          name: 'Ibuprofen 400mg',
          dosage: '400mg',
          frequency: 'Twice daily',
          duration: '3 days',
          instructions: 'Take after meals',
        },
      ]),
      advice: 'Adequate sleep, reduce screen time, stay hydrated',
      isDefault: true,
    },
  ]

  for (const template of templates) {
    await prisma.template.create({ data: template })
  }

  console.log('✅ Created prescription templates')

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
