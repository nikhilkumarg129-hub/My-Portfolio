# Quick Deploy to Vercel Guide

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the project (test locally):**
   ```bash
   npm run build
   ```

3. **Deploy to Vercel:**

   **Option A: Via Vercel Dashboard (Easiest)**
   - Push your code to GitHub
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-detect settings
   - Click "Deploy"

   **Option B: Via Vercel CLI**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

## 📁 Project Structure for Vercel

```
Portfolio-Builder-1/
├── api/
│   └── contact.ts          # Serverless API for contact form
├── client/                 # Frontend React app
├── server/                 # Server code (used in API)
├── shared/                 # Shared schemas
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies and scripts
```

## ⚙️ Configuration

- **Build Command:** `npm run build`
- **Output Directory:** `dist/public`
- **Framework:** Other (Vite + Express)

## 🔧 API Routes

The contact form API is available at `/api/contact`:
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (for admin)

## 📝 Notes

- Contact messages are stored in-memory (won't persist after function restart)
- For production, consider using a database (Vercel Postgres, Supabase, etc.)
- All static files are served from `dist/public`
- The app uses React Router (Wouter) for client-side routing

## 🐛 Troubleshooting

**Build fails:**
- Make sure all dependencies are installed: `npm install`
- Check that TypeScript compiles: `npm run check`

**API not working:**
- Verify `api/contact.ts` exists
- Check Vercel function logs in dashboard

**Static files not loading:**
- Ensure build output is in `dist/public`
- Check `vercel.json` outputDirectory setting

## 🌐 Custom Domain

1. Go to Vercel project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed

---

**Need help?** Check the full deployment guide in `DEPLOYMENT.md`
