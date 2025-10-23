# Maya Web - Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. Click **"New Project"**
4. **Import** your repository: `Ganesh5050/Maya-Web`
5. **Configure Project**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. **Add Environment Variables** (click "Environment Variables" section):
   ```
   VITE_SUPABASE_URL = your_supabase_project_url
   VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
   VITE_GROQ_API_KEY = your_groq_api_key
   VITE_GEMINI_API_KEY = your_gemini_api_key
   ```

7. Click **"Deploy"**

8. **Done!** Your site will be live at `https://your-project-name.vercel.app`

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variables** during deployment or via dashboard later

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## 🔐 Environment Variables Setup

### Required Environment Variables

You need to set these in Vercel's dashboard or during deployment:

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Supabase Dashboard → Settings → API |
| `VITE_GROQ_API_KEY` | GROQ API key for Llama 3.3 | https://console.groq.com/keys |
| `VITE_GEMINI_API_KEY` | Google Gemini API key | https://makersuite.google.com/app/apikey |

### Optional Environment Variables (for future features)

| Variable | Description |
|----------|-------------|
| `VITE_OPENAI_API_KEY` | OpenAI API key |
| `VITE_ANTHROPIC_API_KEY` | Claude API key |
| `VITE_XAI_API_KEY` | xAI Grok API key |
| `VITE_PERPLEXITY_API_KEY` | Perplexity API key |
| `VITE_ELEVENLABS_API_KEY` | ElevenLabs voice API key |

---

## 🔧 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ganesh5050/Maya-Web.git
   cd Maya-Web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file** in the project root:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   VITE_GROQ_API_KEY=your_groq_api_key_here
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open browser**: http://localhost:5173

---

## 📊 Supabase Setup

### 1. Create Supabase Project

1. Go to https://supabase.com
2. Create a new project
3. Note down your project URL and anon key

### 2. Run Database Schema

1. Go to **Supabase Dashboard → SQL Editor**
2. Open the file `supabase-schema.sql` from this repo
3. Copy and paste the entire contents into the SQL Editor
4. Click **"Run"**
5. Verify tables were created under **Database → Tables**

### 3. Enable Authentication

1. Go to **Authentication → Providers**
2. Enable **Email** provider
3. Optional: Enable **Google**, **GitHub** OAuth

---

## 🤖 GitHub Actions (Automatic Deployment)

This project includes GitHub Actions for automatic deployment to Vercel on every push to `main`.

### Setup GitHub Secrets

Go to your repository: https://github.com/Ganesh5050/Maya-Web/settings/secrets/actions

Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `VERCEL_TOKEN` | Get from https://vercel.com/account/tokens |
| `VERCEL_ORG_ID` | Found in Vercel project settings |
| `VERCEL_PROJECT_ID` | Found in Vercel project settings |
| `VITE_SUPABASE_URL` | Your Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |
| `VITE_GROQ_API_KEY` | Your GROQ API key |
| `VITE_GEMINI_API_KEY` | Your Gemini API key |

### How to Get Vercel Secrets

1. **VERCEL_TOKEN**:
   - Go to https://vercel.com/account/tokens
   - Create a new token
   - Copy and save it as a GitHub secret

2. **VERCEL_ORG_ID** and **VERCEL_PROJECT_ID**:
   - Deploy your project to Vercel first (Option 1 above)
   - Go to Project Settings → General
   - Scroll down to find these IDs
   - Or run `vercel` locally and check `.vercel/project.json`

---

## 🌐 Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update CORS in Supabase**:
   - Go to Supabase Dashboard → Authentication → URL Configuration
   - Add your custom domain to allowed redirect URLs

---

## 📝 Build Command

The project uses Vite. The build process is:

```bash
npm run build
```

This creates a production-ready build in the `dist` folder.

---

## 🐛 Troubleshooting

### Build Fails

- **Check environment variables**: Make sure all required env vars are set
- **Check dependencies**: Run `npm install` again
- **Check Node version**: Use Node 18 or higher

### Runtime Errors

- **"Missing environment variables"**: Add all required env vars to Vercel
- **CORS errors**: Check Supabase CORS settings
- **API key errors**: Verify your API keys are correct and active

### Supabase Connection Issues

- **Check URL format**: Should be `https://xxxxx.supabase.co`
- **Check anon key**: Should start with `eyJ...`
- **Verify database tables**: Make sure `supabase-schema.sql` was run

---

## 📚 Additional Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Vite Documentation**: https://vitejs.dev/guide/

---

## ✅ Deployment Checklist

- [ ] Created Supabase project
- [ ] Ran `supabase-schema.sql` in SQL Editor
- [ ] Got Supabase URL and Anon Key
- [ ] Got GROQ API key
- [ ] Got Gemini API key
- [ ] Deployed to Vercel
- [ ] Added all environment variables to Vercel
- [ ] Verified site is working
- [ ] Optional: Set up custom domain
- [ ] Optional: Configured GitHub Actions

---

## 🎉 You're Done!

Your Maya Web app should now be live and fully functional!

**Need help?** Open an issue on GitHub: https://github.com/Ganesh5050/Maya-Web/issues

