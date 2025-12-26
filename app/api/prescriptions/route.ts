import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generatePrescription, checkDrugInteractions } from '@/lib/ai-service'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { patientName, patientAge, patientGender, symptoms, medicalHistory, allergies } = body

    if (!patientName || !patientAge || !patientGender || !symptoms) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate prescription using AI
    const prescription = await generatePrescription({
      patientName,
      patientAge: parseInt(patientAge),
      patientGender,
      symptoms,
      medicalHistory,
      allergies,
    })

    // Check for drug interactions
    const medicationNames = prescription.medications.map(m => m.name)
    const interactions = await checkDrugInteractions(medicationNames)

    if (interactions.length > 0) {
      prescription.warnings = [...(prescription.warnings || []), ...interactions]
    }

    // Save to database
    const savedPrescription = await prisma.prescription.create({
      data: {
        patientName,
        patientAge: parseInt(patientAge),
        patientGender,
        symptoms,
        diagnosis: prescription.diagnosis,
        medications: JSON.stringify(prescription.medications),
        advice: prescription.advice,
        followUp: prescription.followUp,
        doctorId: session.user.id,
      },
    })

    return NextResponse.json({
      success: true,
      prescription: {
        ...prescription,
        id: savedPrescription.id,
      },
    })
  } catch (error) {
    console.error('Error generating prescription:', error)
    return NextResponse.json(
      { error: 'Failed to generate prescription' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const prescriptions = await prisma.prescription.findMany({
      where: {
        doctorId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    })

    return NextResponse.json({
      success: true,
      prescriptions: prescriptions.map(p => ({
        ...p,
        medications: JSON.parse(p.medications),
      })),
    })
  } catch (error) {
    console.error('Error fetching prescriptions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prescriptions' },
      { status: 500 }
    )
  }
}
