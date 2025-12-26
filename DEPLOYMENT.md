# 🚀 Deployment Guide - AI Prescription Pro

Complete step-by-step guide to deploy your AI Prescription application with **ZERO manual database setup**.

## 📋 Prerequisites

Before starting, ensure you have:
- GitHub account (already have ✅)
- Vercel account (free at https://vercel.com)
- Supabase account (free at https://supabase.com)
- Groq API key (free at https://console.groq.com)
- Google Gemini API key (free at https://makersuite.google.com)

## 🎯 Deployment Steps

### Step 1: Get Free API Keys (5 minutes)

#### A. Groq API Key (Primary AI - FREE 14,400 requests/day)

1. Visit https://console.groq.com
2. Click "Sign Up" (use Google/GitHub)
3. Go to "API Keys" in left sidebar
4. Click "Create API Key"
5. Copy the key (starts with `gsk_...`)
6. Save it securely

#### B. Google Gemini API Key (Backup AI - FREE 1,500 requests/day)

1. Visit https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Select "Create API key in new project"
5. Copy the key
6. Save it securely

### Step 2: Set Up Supabase Database (3 minutes)

1. Visit https://supabase.com
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in:
   - **Name:** ai-prescription-db
   - **Database Password:** (generate strong password)
   - **Region:** Choose closest to you
6. Click "Create new project" (takes 2 minutes)
7. Once ready, go to **Settings > Database**
8. Copy the **Connection String** (URI format)
9. Replace `[YOUR-PASSWORD]` with your database password
10. Save this connection string

### Step 3: Deploy to Vercel (2 minutes)

#### Option A: Automated Deployment (Recommended)

1. Visit https://vercel.com
2. Sign in with GitHub
3. Click "Add New" > "Project"
4. Import `vaibhaviimcal-web/ai-prescription-auto-deploy`
5. Click "Import"
6. **Add Environment Variables:**

```env
DATABASE_URL=your-supabase-connection-string
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=generate-random-32-char-string
GROQ_API_KEY=your-groq-api-key
GOOGLE_GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_NAME=AI Prescription Pro
NEXT_PUBLIC_CLINIC_NAME=Your Clinic Name
```

7. Click "Deploy"
8. Wait 2-3 minutes for deployment

#### Option B: Manual Deployment via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

### Step 4: Run Database Migrations (1 minute)

After deployment completes:

1. Go to your Vercel project dashboard
2. Click on "Settings" > "Functions"
3. Or use Vercel CLI:

```bash
# Set environment variables locally
cp .env.example .env
# Edit .env with your values

# Run migrations
npx prisma migrate deploy

# Seed demo data
npx prisma db seed
```

### Step 5: Verify Deployment (1 minute)

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. You should see the homepage
3. Click "Login"
4. Use demo credentials:
   - **Email:** doctor@demo.com
   - **Password:** demo123

## 🔧 Environment Variables Explained

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `DATABASE_URL` | PostgreSQL connection string | Supabase Dashboard > Settings > Database |
| `NEXTAUTH_URL` | Your app URL | Your Vercel deployment URL |
| `NEXTAUTH_SECRET` | Random secret for JWT | Generate with `openssl rand -base64 32` |
| `GROQ_API_KEY` | Groq AI API key | https://console.groq.com |
| `GOOGLE_GEMINI_API_KEY` | Google Gemini API key | https://makersuite.google.com |
| `NEXT_PUBLIC_APP_NAME` | Your app name | Any name you want |
| `NEXT_PUBLIC_CLINIC_NAME` | Your clinic name | Your clinic/hospital name |

## 🎉 Post-Deployment

### Test the Application

1. **Login as Doctor:**
   - Email: doctor@demo.com
   - Password: demo123

2. **Create a Prescription:**
   - Go to "New Prescription"
   - Enter patient details
   - Use voice input or type symptoms
   - Click "Generate Prescription"
   - Review AI-generated prescription
   - Download PDF

3. **View History:**
   - Check "Prescription History"
   - View all past prescriptions
   - Search and filter

### Customize Your App

1. **Update Clinic Branding:**
   - Go to Settings
   - Upload your clinic logo
   - Update clinic name and details

2. **Add More Templates:**
   - Create custom prescription templates
   - Save frequently used medications

3. **Invite Team Members:**
   - Add other doctors
   - Manage user roles

## 🔄 Updating Your App

When you push changes to GitHub, Vercel automatically redeploys:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically:
1. Pull latest code
2. Run build
3. Deploy new version
4. Keep environment variables

## 🐛 Troubleshooting

### Database Connection Error

**Problem:** "Can't reach database server"

**Solution:**
1. Check DATABASE_URL is correct
2. Verify Supabase project is active
3. Check password has no special characters that need escaping
4. Try connection string in "Connection Pooling" mode

### AI API Errors

**Problem:** "Failed to generate prescription"

**Solution:**
1. Verify API keys are correct
2. Check API quotas not exceeded
3. Try regenerating API keys
4. Check Vercel logs for detailed error

### Build Failures

**Problem:** Build fails on Vercel

**Solution:**
1. Check all environment variables are set
2. Verify no syntax errors in code
3. Check Vercel build logs
4. Try redeploying

### Migration Errors

**Problem:** "Migration failed"

**Solution:**
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Or push schema without migration
npx prisma db push
```

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Go to Vercel Dashboard
2. Click on your project
3. View "Analytics" tab
4. Monitor:
   - Page views
   - Response times
   - Error rates

### Supabase Monitoring

1. Go to Supabase Dashboard
2. Click on your project
3. View "Database" > "Usage"
4. Monitor:
   - Database size
   - Active connections
   - Query performance

## 💰 Cost Monitoring

### Free Tier Limits

- **Vercel:** Unlimited deployments, 100GB bandwidth/month
- **Supabase:** 500MB database, 2GB bandwidth/month
- **Groq:** 14,400 requests/day (free forever)
- **Gemini:** 1,500 requests/day (free tier)

### When to Upgrade

Upgrade when you exceed:
- 500MB database storage
- 2GB monthly bandwidth
- 14,400 daily AI requests

## 🔐 Security Best Practices

1. **Never commit `.env` file** - Already in .gitignore
2. **Rotate API keys regularly** - Every 3-6 months
3. **Use strong passwords** - For database and admin accounts
4. **Enable 2FA** - On Vercel, Supabase, GitHub
5. **Monitor logs** - Check for suspicious activity

## 📞 Support

- **GitHub Issues:** https://github.com/vaibhaviimcal-web/ai-prescription-auto-deploy/issues
- **Vercel Support:** https://vercel.com/support
- **Supabase Support:** https://supabase.com/support

## ✅ Deployment Checklist

- [ ] Created Groq API key
- [ ] Created Gemini API key
- [ ] Set up Supabase database
- [ ] Deployed to Vercel
- [ ] Added all environment variables
- [ ] Ran database migrations
- [ ] Seeded demo data
- [ ] Tested login with demo account
- [ ] Generated test prescription
- [ ] Downloaded PDF successfully
- [ ] Customized clinic branding

---

**🎉 Congratulations! Your AI Prescription app is now live!**

**Next Steps:**
1. Share your app URL with team
2. Create real doctor accounts
3. Start generating prescriptions
4. Collect feedback and iterate

**Live URL:** https://your-app-name.vercel.app
