# 🚀 Hosting Your Portfolio on Vercel

Your portfolio is ready to deploy! Here are two easy ways to host it:

## Option 1: Deploy via Vercel Dashboard (Easiest - Recommended)

### Step 1: Push to GitHub
1. Create a new repository on GitHub (if you haven't already)
2. Push your code:
   ```powershell
   git add .
   git commit -m "Ready for deployment"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Sign up/Login with your GitHub account
3. Click "Import Git Repository"
4. Select your portfolio repository
5. Vercel will auto-detect:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/public`
6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment
8. Your portfolio will be live at: `https://your-project.vercel.app`

## Option 2: Deploy via Vercel CLI

### Step 1: Login to Vercel
```powershell
vercel login
```
This will open your browser for authentication.

### Step 2: Deploy
```powershell
vercel
```
Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (first time)
- **Project name?** → Press Enter (uses default)
- **Directory?** → Press Enter (uses current directory)

### Step 3: Deploy to Production
```powershell
vercel --prod
```

## ✅ What's Already Configured

- ✅ `vercel.json` - Vercel configuration
- ✅ `api/contact.ts` - Serverless API for contact form
- ✅ Build script configured
- ✅ Output directory set to `dist/public`

## 📝 Important Notes

1. **Contact Form**: Currently uses in-memory storage (messages won't persist after serverless function restarts)
   - For production, consider using:
     - Vercel Postgres
     - Supabase
     - MongoDB Atlas
     - Email service (SendGrid/Resend)

2. **Environment Variables**: If you need any, add them in:
   - Vercel Dashboard → Your Project → Settings → Environment Variables

3. **Custom Domain**: 
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add your custom domain and follow DNS instructions

## 🔄 Updating Your Portfolio

After making changes:
```powershell
git add .
git commit -m "Update portfolio"
git push
```
Vercel will automatically redeploy!

## 🐛 Troubleshooting

**Build fails?**
- Make sure all dependencies are installed: `npm install`
- Check build locally: `npm run build`

**API not working?**
- Verify `api/contact.ts` exists
- Check Vercel function logs in dashboard

**Need help?**
- Check Vercel docs: https://vercel.com/docs
- Check your deployment logs in Vercel dashboard

---

**Your portfolio is ready! Choose one of the options above to go live! 🎉**

