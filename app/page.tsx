import Link from 'next/link'
import { FileText, Mic, Users, Download, Shield, Zap } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AI Prescription Pro</h1>
          </div>
          <nav className="flex gap-4">
            <Link href="/auth/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 transition">
              Login
            </Link>
            <Link href="/auth/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Medical Prescriptions
            <span className="block text-blue-600 mt-2">In Seconds, Not Minutes</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Generate accurate, professional prescriptions using advanced AI. 
            Voice input, patient management, and instant PDF generation - all in one platform.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/register" className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg">
              Start Free Trial
            </Link>
            <Link href="/demo" className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-50 transition border-2 border-blue-600">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need for Modern Practice
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Mic className="w-12 h-12 text-blue-600" />}
            title="Voice Input"
            description="Speak symptoms naturally. Our AI understands medical terminology and converts speech to accurate prescriptions."
          />
          <FeatureCard 
            icon={<Zap className="w-12 h-12 text-blue-600" />}
            title="AI-Powered"
            description="Advanced AI models (Groq, Gemini) generate accurate diagnoses and medication recommendations instantly."
          />
          <FeatureCard 
            icon={<Users className="w-12 h-12 text-blue-600" />}
            title="Patient Management"
            description="Complete patient records, history tracking, and follow-up management in one place."
          />
          <FeatureCard 
            icon={<Download className="w-12 h-12 text-blue-600" />}
            title="PDF Generation"
            description="Professional, print-ready prescriptions with your clinic branding. Download or print instantly."
          />
          <FeatureCard 
            icon={<Shield className="w-12 h-12 text-blue-600" />}
            title="Drug Safety"
            description="Built-in drug interaction checker and allergy warnings to ensure patient safety."
          />
          <FeatureCard 
            icon={<FileText className="w-12 h-12 text-blue-600" />}
            title="Templates"
            description="20+ pre-built templates for common conditions. Customize and save your own templates."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">Ready to Transform Your Practice?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of doctors using AI to save time and improve patient care.
          </p>
          <Link href="/auth/register" className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg inline-block">
            Get Started - It's Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 AI Prescription Pro. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with Next.js, Prisma, and AI</p>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
      <div className="mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
