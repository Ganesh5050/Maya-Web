# Maya Web - AI Website Builder

An advanced AI-powered website builder with real-time generation, multi-model support, and full user authentication.

## 🚀 Features

- **Multi-Model AI Generation**: Support for GROQ (Llama 3.3) and Google Gemini
- **User Authentication**: Full Supabase authentication with email/password
- **Project Management**: Save, load, and manage your generated projects
- **Template Marketplace**: Browse and use pre-made templates
- **Real-time Preview**: Live preview with Sandpack integration
- **Agent-Based Generation**: Multi-step AI workflow for better results

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI Models**: GROQ, Google Gemini
- **Preview**: CodeSandbox Sandpack
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Ganesh5050/Maya-Web.git
cd Maya-Web
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GROQ_API_KEY=your_groq_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. Set up Supabase:
- Run the SQL schema from `supabase-schema.sql` in your Supabase SQL Editor
- See `SUPABASE-SETUP-GUIDE.md` for detailed instructions

5. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Automatic Deployment with GitHub Actions

This project includes GitHub Actions for automatic deployment to Vercel.

**Required GitHub Secrets:**
- `VERCEL_TOKEN`: Your Vercel authentication token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `VITE_SUPABASE_URL`: Your Supabase URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_GROQ_API_KEY`: Your GROQ API key
- `VITE_GEMINI_API_KEY`: Your Gemini API key

## 📖 Documentation

- [Supabase Setup Guide](SUPABASE-SETUP-GUIDE.md)
- [Backend README](BACKEND-README.md)

## 🎯 Features Roadmap

- [ ] GitHub integration for project export
- [ ] One-click deployment to Vercel/Netlify
- [ ] Real-time collaboration
- [ ] User-created templates
- [ ] Pricing plans and monetization
- [ ] Analytics dashboard

## 📝 License

MIT License

## 👤 Author

**Ganesh**
- GitHub: [@Ganesh5050](https://github.com/Ganesh5050)

## 🙏 Acknowledgments

- Built with React, Vite, and Tailwind CSS
- UI components from shadcn/ui
- AI models: GROQ and Google Gemini
- Backend: Supabase
