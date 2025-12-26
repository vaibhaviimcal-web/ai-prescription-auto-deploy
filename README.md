# 🏥 AI Prescription Pro - Automated Medical Prescription Generator

AI-powered prescription generator with voice input, patient management, and automated deployment. Built with Next.js 14, Prisma, and free-tier AI models.

## ✨ Features

- 🤖 **AI-Powered Prescription Generation** - Using Groq (Llama 3.1 70B) and Google Gemini 2.0
- 🎤 **Voice Input** - Speak symptoms naturally using Web Speech API
- 👥 **Patient Management** - Complete patient records and history tracking
- 📄 **PDF Generation** - Professional, print-ready prescriptions
- 🔒 **Secure Authentication** - NextAuth.js with role-based access
- 💊 **Drug Interaction Checker** - Basic safety warnings
- 📋 **Prescription Templates** - Quick templates for common conditions
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🆓 **100% Free Tier** - No payment required for demo/testing

## 🚀 Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, TailwindCSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Supabase free tier)
- **AI Models:** Groq API (Free 14,400 req/day), Google Gemini 2.0 Flash
- **Authentication:** NextAuth.js
- **PDF Generation:** jsPDF
- **Deployment:** Vercel (Free tier)

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Supabase recommended)
- Groq API key (free at https://console.groq.com)
- Google Gemini API key (free at https://makersuite.google.com/app/apikey)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/vaibhaviimcal-web/ai-prescription-auto-deploy.git
cd ai-prescription-auto-deploy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Supabase PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# AI API Keys (Free Tier)
GROQ_API_KEY="your-groq-api-key"
GOOGLE_GEMINI_API_KEY="your-gemini-api-key"

# App Configuration
NEXT_PUBLIC_APP_NAME="AI Prescription Pro"
NEXT_PUBLIC_CLINIC_NAME="Your Clinic Name"
```

### 4. Set Up Database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed demo data
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment to Vercel

### Automated Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🔑 Getting Free API Keys

### Groq API (Primary AI - Free 14,400 requests/day)

1. Visit https://console.groq.com
2. Sign up for free account
3. Go to API Keys section
4. Create new API key
5. Copy and add to `.env` as `GROQ_API_KEY`

### Google Gemini API (Backup AI - Free 1500 requests/day)

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy and add to `.env` as `GOOGLE_GEMINI_API_KEY`

### Supabase Database (Free 500MB)

1. Visit https://supabase.com
2. Create new project
3. Go to Settings > Database
4. Copy connection string
5. Add to `.env` as `DATABASE_URL`

## 📖 Usage

### Demo Accounts

After seeding the database:

- **Doctor:** doctor@demo.com / demo123
- **Patient:** patient@demo.com / demo123

### Creating Prescriptions

1. Login as doctor
2. Navigate to "New Prescription"
3. Enter patient details
4. Use voice input or type symptoms
5. Click "Generate Prescription"
6. Review and edit if needed
7. Download PDF or print

## 🗂️ Project Structure

```
ai-prescription-auto-deploy/
├── app/
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard pages
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── lib/
│   ├── ai-service.ts     # AI integration
│   ├── auth.ts           # NextAuth config
│   └── prisma.ts         # Prisma client
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── .env.example          # Environment template
├── next.config.js        # Next.js config
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind config
└── tsconfig.json         # TypeScript config
```

## 💰 Cost Breakdown (Free Tier)

- **Groq API:** FREE (14,400 requests/day)
- **Google Gemini:** FREE (1,500 requests/day)
- **Supabase Database:** FREE (500MB storage)
- **Vercel Hosting:** FREE (unlimited deployments)
- **Total:** $0/month for demo/testing

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Protected API routes
- SQL injection prevention (Prisma)
- XSS protection (React)

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test database connection
npx prisma db push
```

### AI API Errors

- Check API keys are correct
- Verify API quotas not exceeded
- Check network connectivity

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

## 📧 Support

For issues or questions, open a GitHub issue or contact support.

## 🎯 Roadmap

- [ ] Advanced drug interaction database
- [ ] Multi-language support (Hindi, Spanish)
- [ ] Appointment scheduling
- [ ] Billing & invoicing
- [ ] Mobile app (React Native)
- [ ] Telemedicine integration
- [ ] Lab test integration
- [ ] E-prescription compliance

---

**Built with ❤️ using Next.js, Prisma, and AI**

**Live Demo:** Coming soon!

**Repository:** https://github.com/vaibhaviimcal-web/ai-prescription-auto-deploy
