# Deploying to Vercel

This guide will help you deploy your portfolio to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (sign up at https://vercel.com)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Vercel will auto-detect the settings:
     - **Framework Preset:** Other
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist/public`
     - **Install Command:** `npm install`
   - Click "Deploy"

3. **Wait for deployment to complete** - Vercel will provide you with a URL

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

## Configuration

The project is already configured with:
- `vercel.json` - Vercel configuration
- `api/index.ts` - Serverless API handler for contact form

## Environment Variables

If you need to add environment variables:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add any required variables

## Notes

- The contact form uses in-memory storage (messages won't persist after serverless function restarts)
- For production contact form storage, consider using a database service like:
  - Vercel Postgres
  - Supabase
  - MongoDB Atlas
  - Or an email service like SendGrid/Resend

## Troubleshooting

- **Build fails:** Make sure all dependencies are in `package.json`
- **API routes not working:** Check that `api/index.ts` is in the root directory
- **Static files not loading:** Verify `outputDirectory` in `vercel.json` matches your build output

## Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
