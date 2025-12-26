import Groq from 'groq-sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
})

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '')

export interface PrescriptionInput {
  patientName: string
  patientAge: number
  patientGender: string
  symptoms: string
  medicalHistory?: string
  allergies?: string
}

export interface PrescriptionOutput {
  diagnosis: string
  medications: Array<{
    name: string
    dosage: string
    frequency: string
    duration: string
    instructions: string
  }>
  advice: string
  followUp: string
  warnings?: string[]
}

export async function generatePrescription(
  input: PrescriptionInput
): Promise<PrescriptionOutput> {
  const prompt = `You are an experienced medical doctor. Generate a detailed prescription based on the following patient information:

Patient Name: ${input.patientName}
Age: ${input.patientAge}
Gender: ${input.patientGender}
Symptoms: ${input.symptoms}
${input.medicalHistory ? `Medical History: ${input.medicalHistory}` : ''}
${input.allergies ? `Allergies: ${input.allergies}` : ''}

Please provide:
1. A clear diagnosis
2. Medications with exact dosage, frequency, duration, and instructions
3. General advice for the patient
4. Follow-up recommendations
5. Any warnings or precautions

Format your response as JSON with this structure:
{
  "diagnosis": "string",
  "medications": [
    {
      "name": "string",
      "dosage": "string",
      "frequency": "string",
      "duration": "string",
      "instructions": "string"
    }
  ],
  "advice": "string",
  "followUp": "string",
  "warnings": ["string"]
}

IMPORTANT: Only respond with valid JSON, no additional text.`

  try {
    // Try Groq first (faster and free tier)
    const groqResponse = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a medical AI assistant. Always respond with valid JSON only.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.1-70b-versatile',
      temperature: 0.3,
      max_tokens: 2000,
    })

    const content = groqResponse.choices[0]?.message?.content || ''
    return JSON.parse(content)
  } catch (groqError) {
    console.error('Groq API error, falling back to Gemini:', groqError)

    // Fallback to Gemini
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      
      throw new Error('Invalid JSON response from Gemini')
    } catch (geminiError) {
      console.error('Gemini API error:', geminiError)
      throw new Error('Failed to generate prescription with both AI providers')
    }
  }
}

export async function checkDrugInteractions(medications: string[]): Promise<string[]> {
  // Basic drug interaction checker
  // In production, integrate with a proper drug database API
  const interactions: string[] = []
  
  const commonInteractions: Record<string, string[]> = {
    'aspirin': ['warfarin', 'ibuprofen'],
    'warfarin': ['aspirin', 'vitamin k'],
    'metformin': ['alcohol'],
    'amoxicillin': ['methotrexate'],
  }

  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i].toLowerCase()
      const med2 = medications[j].toLowerCase()
      
      if (commonInteractions[med1]?.some(int => med2.includes(int))) {
        interactions.push(`Potential interaction between ${medications[i]} and ${medications[j]}`)
      }
      if (commonInteractions[med2]?.some(int => med1.includes(int))) {
        interactions.push(`Potential interaction between ${medications[j]} and ${medications[i]}`)
      }
    }
  }

  return interactions
}
