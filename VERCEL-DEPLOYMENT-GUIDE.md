# 🚀 Vercel Deployment Guide - Maya-Web

## 📋 **Quick Setup Checklist**

- [ ] Add environment variables to Vercel
- [ ] Deploy the application
- [ ] Verify API keys are secure
- [ ] Test website generation feature

---

## 🔐 **Step 1: Configure Environment Variables**

### **Access Vercel Dashboard**
Go to: https://vercel.com/ganesh5050s-projects/maya-web-sand/settings/environment-variables

### **Add These Variables:**

#### **Frontend Variables (VITE_ prefix)**
These are exposed to the browser but are SAFE to be public:

```
VITE_SUPABASE_URL = https://ehckgobjhpoybiodqcym.supabase.co
VITE_SUPABASE_ANON_KEY = your_supabase_anon_key_here
```

#### **Backend Variables (NO VITE_ prefix)**
These stay on the server and are NEVER exposed to the browser:

```
GROQ_API_KEY = your_groq_api_key_here
GEMINI_API_KEY = your_gemini_api_key_here
```

### **Important Notes:**
- ✅ Use **plain text** values (not JSON)
- ✅ Apply to all environments: Production, Preview, Development
- ✅ Click **"Save"** after adding each variable
- ❌ **NEVER** add `VITE_` prefix to secret API keys

---

## 🚀 **Step 2: Deploy to Vercel**

### **Option A: Deploy via GitHub (Recommended)**

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add secure API routes and environment setup"
   git push origin main
   ```

2. **Vercel auto-deploys:**
   - Vercel detects the push
   - Builds the project automatically
   - Deploys to: https://maya-web-sand.vercel.app

### **Option B: Manual Deploy via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## ✅ **Step 3: Verify Security**

After deployment, test that your API keys are protected:

### **Test 1: Check Browser Exposure**
1. Open: https://maya-web-sand.vercel.app
2. Open DevTools (F12) → Console
3. Run these commands:
   ```javascript
   console.log(import.meta.env.VITE_GROQ_API_KEY)
   // Expected: undefined ✅
   
   console.log(import.meta.env.VITE_GEMINI_API_KEY)
   // Expected: undefined ✅
   
   console.log(import.meta.env.VITE_SUPABASE_URL)
   // Expected: https://ehckgobjhpoybiodqcym.supabase.co ✅
   ```

### **Test 2: Check API Routes**
1. Test GROQ endpoint:
   ```bash
   curl -X GET https://maya-web-sand.vercel.app/api/groq
   # Expected: {"error":"Method not allowed"} ✅
   ```

2. Test Gemini endpoint:
   ```bash
   curl -X GET https://maya-web-sand.vercel.app/api/gemini
   # Expected: {"error":"Method not allowed"} ✅
   ```

### **Test 3: Test Website Generation**
1. Go to: https://maya-web-sand.vercel.app/builder
2. Enter a prompt: "Create a coffee shop website"
3. Click "Generate Website"
4. If it works, your API routes are configured correctly! ✅

---

## 📊 **Project Structure**

```
maya-web-sand/
├── api/                     # 🔒 SECURE - Serverless API routes
│   ├── groq.ts             # GROQ API proxy (server-side only)
│   ├── gemini.ts           # Gemini API proxy (server-side only)
│   └── package.json        # API dependencies
│
├── src/                    # ✅ SAFE - Frontend code
│   ├── services/           # Calls /api/* routes
│   ├── components/         # React components
│   └── pages/              # App pages
│
├── dist/                   # Build output (auto-generated)
├── vercel.json            # Vercel configuration
└── package.json           # Frontend dependencies
```

---

## 🔧 **How It Works**

### **Frontend → Backend → AI API Flow**

```
1. User clicks "Generate Website"
   ↓
2. Frontend calls /api/groq
   ↓
3. Vercel Serverless Function (api/groq.ts)
   - Adds secret GROQ_API_KEY from environment
   - Calls GROQ API
   ↓
4. GROQ API responds
   ↓
5. Response sent back to frontend
   ↓
6. Website displayed to user
```

**API key NEVER leaves the server!** 🔒

---

## 🚨 **Troubleshooting**

### **Problem: "GROQ API key not configured"**
**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Add `GROQ_API_KEY` (without `VITE_` prefix)
3. Redeploy the site

### **Problem: "Backend API request failed"**
**Solution:**
1. Check Vercel logs: https://vercel.com/ganesh5050s-projects/maya-web-sand/logs
2. Verify environment variables are set
3. Ensure API key is valid

### **Problem: "Failed to parse project JSON"**
**Solution:**
- AI response may be malformed
- Try regenerating with a different prompt
- Check Vercel logs for full error details

### **Problem: Website shows blank screen**
**Solution:**
1. Check browser console for errors (F12)
2. Verify `VITE_SUPABASE_URL` is set
3. Check Vercel deployment logs

---

## 📈 **Monitoring & Logs**

### **View Deployment Logs:**
https://vercel.com/ganesh5050s-projects/maya-web-sand/deployments

### **View Runtime Logs:**
https://vercel.com/ganesh5050s-projects/maya-web-sand/logs

### **Check Analytics:**
https://vercel.com/ganesh5050s-projects/maya-web-sand/analytics

---

## 🔄 **Updating Environment Variables**

If you need to change API keys:

1. Go to: https://vercel.com/ganesh5050s-projects/maya-web-sand/settings/environment-variables
2. Click **"Edit"** on the variable
3. Enter new value
4. Click **"Save"**
5. **Redeploy** (or wait for next auto-deploy)

**Note:** Vercel requires a redeploy for environment variable changes to take effect.

---

## 🎯 **Best Practices**

### ✅ **DO:**
- Keep production and development keys separate
- Set spending limits on all AI API keys
- Monitor Vercel logs regularly
- Use environment variables for ALL secrets
- Test in Preview environment before production

### ❌ **DON'T:**
- ❌ Hardcode API keys in source code
- ❌ Use `VITE_` prefix for secret keys
- ❌ Commit `.env` files to Git
- ❌ Share API keys in screenshots/docs
- ❌ Ignore deployment errors

---

## 📞 **Resources**

- **Live Site:** https://maya-web-sand.vercel.app
- **GitHub Repo:** https://github.com/Ganesh5050/Maya-Web
- **Vercel Dashboard:** https://vercel.com/ganesh5050s-projects/maya-web-sand
- **Supabase Dashboard:** https://supabase.com/dashboard/project/ehckgobjhpoybiodqcym

---

## ✅ **Deployment Complete!**

Your Maya-Web is now:
- ✅ Deployed to Vercel
- ✅ API keys secured on server-side
- ✅ Ready for production use
- ✅ Protected from key theft

**Congratulations!** 🎉🚀

