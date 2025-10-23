# 🔒 API Security Setup Guide

## ✅ **Your API Keys Are Now Protected!**

We've implemented a **secure backend proxy** using Vercel Serverless Functions to keep your API keys safe from public exposure.

---

## 🏗️ **Architecture**

### **Before (Insecure ❌)**
```
Browser → AI API (using VITE_GROQ_API_KEY)
         ❌ Key exposed in browser DevTools!
```

### **After (Secure ✅)**
```
Browser → Vercel Serverless API → AI API (using GROQ_API_KEY)
         ✅ Key stays on server, never exposed to browser!
```

---

## 📁 **File Structure**

```
aura-builder-14-main/
├── api/                          # 🔒 SECURE - Server-side only
│   ├── groq.ts                   # GROQ API proxy (keeps key secret)
│   └── gemini.ts                 # Gemini API proxy (keeps key secret)
│
├── src/services/                 # ✅ SAFE - Calls backend API routes
│   ├── groqService.ts           # Calls /api/groq (no exposed keys)
│   ├── advancedGroqService.ts   # Calls /api/groq (no exposed keys)
│   ├── geminiService.ts         # Calls /api/gemini (no exposed keys)
│   └── advancedGeminiService.ts # Calls /api/gemini (no exposed keys)
│
└── backend.env.example           # Template for environment variables
```

---

## 🔑 **Environment Variables**

### **Frontend Variables (VITE_)** - Exposed to browser ⚠️
These are **SAFE** to be public:
```bash
VITE_SUPABASE_URL=https://ehckgobjhpoybiodqcym.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...  # Protected by RLS (Row Level Security)
```

### **Backend Variables** - Server-side only 🔒
These are **PRIVATE** and NEVER exposed to browser:
```bash
GROQ_API_KEY=gsk_...           # KEEP SECRET!
GEMINI_API_KEY=AIza...         # KEEP SECRET!
SUPABASE_SERVICE_ROLE_KEY=...  # KEEP SECRET!
```

---

## 🚀 **Deployment Setup (Vercel)**

### **Step 1: Add Environment Variables to Vercel**

1. Go to: https://vercel.com/ganesh5050s-projects/maya-web-sand/settings/environment-variables

2. Add these **BACKEND** variables (without VITE_ prefix):
   - `GROQ_API_KEY` = `your_groq_api_key_here`
   - `GEMINI_API_KEY` = `your_gemini_api_key_here`
   - `SUPABASE_SERVICE_ROLE_KEY` = `your_supabase_service_role_key_here` (optional)

3. Add these **FRONTEND** variables (with VITE_ prefix):
   - `VITE_SUPABASE_URL` = `https://ehckgobjhpoybiodqcym.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your_supabase_anon_key_here`

4. Click **"Save"** and **redeploy** your site

### **Step 2: Verify Security**

After deployment, test that your keys are protected:

1. Open your website: https://maya-web-sand.vercel.app
2. Open DevTools (F12) → Console
3. Try to access keys:
   ```javascript
   console.log(import.meta.env.VITE_GROQ_API_KEY)  // ❌ Should be undefined!
   console.log(import.meta.env.VITE_GEMINI_API_KEY) // ❌ Should be undefined!
   ```

If both return `undefined`, **you're secure!** ✅

---

## 🧪 **Local Development Setup**

### **Step 1: Create `.env` file**

```bash
# Copy the example file
cp backend.env.example .env
```

### **Step 2: Fill in your API keys**

Edit `.env`:
```bash
# Frontend (VITE_ prefix)
VITE_SUPABASE_URL=https://ehckgobjhpoybiodqcym.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Backend (no prefix - server-side only)
GROQ_API_KEY=gsk_your_groq_key_here
GEMINI_API_KEY=AIza_your_gemini_key_here
```

### **Step 3: Run development server**

```bash
npm run dev
```

Vite will automatically:
- Load `VITE_*` variables into the browser ✅
- Keep non-`VITE_*` variables server-side only 🔒

---

## 🛡️ **Security Best Practices**

### ✅ **DO:**
1. Use environment variables for ALL API keys
2. Keep backend keys **without** `VITE_` prefix
3. Store keys in Vercel dashboard (never in code)
4. Add `.env` to `.gitignore`
5. Regenerate keys if accidentally exposed
6. Set spending limits on all AI API keys

### ❌ **DON'T:**
1. ❌ Hardcode API keys in source code
2. ❌ Commit `.env` files to Git
3. ❌ Use `VITE_` prefix for secret keys
4. ❌ Share API keys in screenshots/docs
5. ❌ Use production keys in development
6. ❌ Expose service role keys to frontend

---

## 🔍 **How the Proxy Works**

### **Example: GROQ API Call**

#### **Before (Insecure):**
```typescript
// ❌ Exposed in browser!
const groq = new Groq({ 
  apiKey: import.meta.env.VITE_GROQ_API_KEY, 
  dangerouslyAllowBrowser: true 
});
const response = await groq.chat.completions.create({...});
```

#### **After (Secure):**
```typescript
// ✅ Calls backend API route
const response = await fetch('/api/groq', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages, model, temperature })
});
```

The **backend API route** (`api/groq.ts`) then:
1. Receives the request from browser
2. Adds the secret `GROQ_API_KEY` (from server environment)
3. Calls GROQ API
4. Returns the response to browser

**Your API key never leaves the server!** 🔒

---

## 📊 **Risk Assessment**

| Variable | Location | Exposure Risk | Protection |
|----------|----------|---------------|------------|
| `VITE_SUPABASE_URL` | Browser | ✅ **None** | Meant to be public |
| `VITE_SUPABASE_ANON_KEY` | Browser | ✅ **Low** | Protected by RLS |
| `GROQ_API_KEY` | Server | ✅ **None** | Server-side only |
| `GEMINI_API_KEY` | Server | ✅ **None** | Server-side only |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | ✅ **None** | Server-side only |

---

## 🚨 **What If My Keys Were Exposed?**

If you accidentally committed API keys to Git:

### **Step 1: Revoke/Regenerate Keys**
- Go to GROQ dashboard → Regenerate API key
- Go to Gemini dashboard → Regenerate API key

### **Step 2: Update Vercel**
- Update environment variables in Vercel dashboard
- Redeploy the site

### **Step 3: Clean Git History** (Optional)
```bash
# Remove sensitive data from Git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend.env.example" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (⚠️ Use with caution!)
git push origin --force --all
```

---

## ✅ **Current Status**

- ✅ Backend API routes created (`/api/groq`, `/api/gemini`)
- ✅ Frontend services updated to use secure routes
- ✅ Environment variables properly configured
- ✅ No API keys exposed in browser
- ✅ Git history cleaned
- ✅ `.gitignore` updated

---

## 📞 **Support**

If you have questions or need help:
1. Check Vercel logs: https://vercel.com/ganesh5050s-projects/maya-web-sand/logs
2. Test API routes: https://maya-web-sand.vercel.app/api/groq (should return 405 Method Not Allowed)
3. Review this guide again

**Your API keys are now SECURE!** 🎉🔒

