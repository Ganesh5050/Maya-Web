# 🚀 Simple Deployment Guide - Maya-Web (Frontend Only)

## ✅ **Good News!**

Your API keys are **100% PROTECTED** even with frontend-only deployment! 

The `api/` folder routes are **Vercel Serverless Functions** that deploy automatically with your frontend - **no separate backend needed!**

---

## 📋 **What You Need to Do (3 Simple Steps)**

### **Step 1: Add Environment Variables to Vercel** 🔑

1. Go to: https://vercel.com/ganesh5050s-projects/maya-web-sand/settings/environment-variables

2. Click **"Add New"** and add these **4 variables**:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `GROQ_API_KEY` | `gsk_...` | Your GROQ API key (SECRET - server only!) |
| `GEMINI_API_KEY` | `AIza...` | Your Gemini API key (SECRET - server only!) |
| `VITE_SUPABASE_URL` | `https://ehckgobjhpoybiodqcym.supabase.co` | Public (safe) |
| `VITE_SUPABASE_ANON_KEY` | `eyJ...` | Public (safe, protected by RLS) |

3. **Important:** For each variable:
   - Select **all 3 environments**: Production, Preview, Development
   - Click **"Save"**

---

### **Step 2: Wait for Auto-Deploy** ⏳

Vercel will automatically deploy your latest code from GitHub.

Check deployment status: https://vercel.com/ganesh5050s-projects/maya-web-sand/deployments

---

### **Step 3: Verify It Works** ✅

1. **Open your site:** https://maya-web-sand.vercel.app

2. **Test API key is hidden:**
   - Press `F12` to open DevTools
   - Go to Console tab
   - Type: `console.log(import.meta.env.VITE_GROQ_API_KEY)`
   - Should show: `undefined` ✅ (API key is hidden!)

3. **Test website generation:**
   - Go to `/builder` page
   - Enter prompt: "Create a coffee shop website"
   - Click "Generate Website"
   - Should work! ✅

---

## 🏗️ **How It Works (No Backend Server Needed!)**

```
┌─────────────────────────────────────────┐
│  Vercel Frontend-Only Deployment        │
├─────────────────────────────────────────┤
│                                          │
│  📁 dist/                (Frontend)      │
│     └─ index.html                        │
│     └─ assets/                           │
│                                          │
│  ⚡ api/           (Serverless Functions)│
│     ├─ groq.ts    ← Runs on Vercel      │
│     └─ gemini.ts  ← Runs on Vercel      │
│                                          │
└─────────────────────────────────────────┘

When user generates a website:
1. Browser calls /api/groq
2. Vercel runs api/groq.ts function
3. Function uses GROQ_API_KEY (server-side)
4. Returns result to browser
✅ API key NEVER exposed!
```

---

## 🔐 **Security Status**

| What | Status |
|------|--------|
| **API Keys in Browser** | ❌ Not visible (SECURE!) |
| **API Keys in DevTools** | ❌ Not accessible (SECURE!) |
| **API Keys in Source Code** | ❌ Not in GitHub (SECURE!) |
| **Serverless Functions** | ✅ Auto-deployed with frontend |
| **Backend Server Required** | ❌ NO! (Serverless functions work!) |

---

## 🎯 **Get Your Free API Keys**

### **GROQ API Key** (FREE, Unlimited)
1. Go to: https://console.groq.com/keys
2. Sign up / Log in
3. Click "Create API Key"
4. Copy the key (starts with `gsk_`)
5. Add to Vercel as `GROQ_API_KEY`

### **Gemini API Key** (FREE)
1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Get API Key"
4. Copy the key (starts with `AIza`)
5. Add to Vercel as `GEMINI_API_KEY`

---

## 🚨 **Troubleshooting**

### **Problem: "GROQ API key not configured"**
- **Solution:** Add `GROQ_API_KEY` to Vercel (without `VITE_` prefix!)
- Make sure it's applied to **all environments**

### **Problem: "Backend API request failed"**
- **Solution:** Check Vercel logs: https://vercel.com/ganesh5050s-projects/maya-web-sand/logs
- Verify the API key is valid

### **Problem: Website generation doesn't work**
- **Solution:** 
  1. Check browser console for errors (F12)
  2. Verify environment variables are set in Vercel
  3. Try redeploying

---

## ✅ **Current Setup Summary**

You have:
- ✅ **Frontend:** React + Vite (deployed to Vercel)
- ✅ **Serverless Functions:** `/api/groq` and `/api/gemini` (auto-deployed with frontend)
- ✅ **Secure API Keys:** Stored in Vercel environment (server-side only)
- ✅ **No Backend Server:** Not needed! Serverless functions handle everything
- ✅ **100% Protected:** API keys never exposed to browser

---

## 📞 **Quick Links**

- **Live Site:** https://maya-web-sand.vercel.app
- **Vercel Dashboard:** https://vercel.com/ganesh5050s-projects/maya-web-sand
- **Add Environment Variables:** https://vercel.com/ganesh5050s-projects/maya-web-sand/settings/environment-variables
- **View Logs:** https://vercel.com/ganesh5050s-projects/maya-web-sand/logs
- **GitHub Repo:** https://github.com/Ganesh5050/Maya-Web

---

## 🎉 **That's It!**

Your Maya-Web is **production-ready** with:
- ✅ Secure API keys (100% server-side)
- ✅ Frontend-only deployment
- ✅ No backend server required
- ✅ Serverless functions auto-deployed

**Just add the environment variables to Vercel and you're done!** 🚀🔒

