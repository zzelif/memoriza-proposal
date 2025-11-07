# 🚀 Complete Vercel Deployment Guide

## 📋 **Overview**

This guide shows you **step-by-step** how to deploy your Memoriza Events website to Vercel with all environment variables configured correctly.

---

## ⚠️ **IMPORTANT: Environment Variables**

Your `.env.local` file is **NEVER** uploaded to Vercel (it's gitignored for security).

Instead, you manually add environment variables through the Vercel dashboard.

---

## 🔐 **Your Environment Variables**

You need to add these **4 variables** to Vercel:

```env
GMAIL_USER=memoriza.events@gmail.com
GMAIL_APP_PASSWORD=ltntfznoruigvpmh
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdCIAUsAAAAAA03b-8FPyj2CzdiucZMvhDABKeU
RECAPTCHA_SECRET_KEY=6LdCIAUsAAAAAOa7PkmlCtMefODNy7LTIuCoj-e1
```

---

## 📝 **Step-by-Step Deployment**

### **STEP 1: Prepare Your Code**

#### **1.1 Make Sure Git is Initialized**
```bash
# Check if git is initialized
git status

# If not, initialize it
git init
git add .
git commit -m "Initial commit - Memoriza Events website"
```

#### **1.2 Push to GitHub**
```bash
# Create repo on GitHub: https://github.com/new
# Name it: memoriza-proposal (or whatever you want)

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/memoriza-proposal.git

# Push code
git branch -M main
git push -u origin main
```

**Note:** If you already have it on GitHub, skip this step.

---

### **STEP 2: Create Vercel Account**

1. Go to: https://vercel.com/signup
2. Sign up with **GitHub** (recommended)
3. Authorize Vercel to access your repositories

---

### **STEP 3: Import Your Project to Vercel**

#### **3.1 New Project**
1. Go to: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Find your `memoriza-proposal` repository
4. Click **"Import"**

#### **3.2 Configure Project**
- **Project Name:** `memoriza-events` (or your choice)
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** `./` (keep default)
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** `.next` (auto-filled)

#### **3.3 Add Environment Variables** ⚠️ **CRITICAL STEP**

**BEFORE** clicking "Deploy", click **"Environment Variables"** dropdown:

##### **Variable 1: GMAIL_USER**
- **Name:** `GMAIL_USER`
- **Value:** `memoriza.events@gmail.com`
- **Environment:** Production, Preview, Development (check all)
- Click **"Add"**

##### **Variable 2: GMAIL_APP_PASSWORD**
- **Name:** `GMAIL_APP_PASSWORD`
- **Value:** `ltntfznoruigvpmh`
- **Environment:** Production, Preview, Development (check all)
- Click **"Add"**

##### **Variable 3: NEXT_PUBLIC_RECAPTCHA_SITE_KEY**
- **Name:** `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- **Value:** `6LdCIAUsAAAAAA03b-8FPyj2CzdiucZMvhDABKeU`
- **Environment:** Production, Preview, Development (check all)
- Click **"Add"**

##### **Variable 4: RECAPTCHA_SECRET_KEY**
- **Name:** `RECAPTCHA_SECRET_KEY`
- **Value:** `6LdCIAUsAAAAAOa7PkmlCtMefODNy7LTIuCoj-e1`
- **Environment:** Production, Preview, Development (check all)
- Click **"Add"**

#### **3.4 Deploy**
- Click **"Deploy"** button
- Wait 2-3 minutes for build to complete
- You'll see: "Congratulations! Your project has been deployed"

---

### **STEP 4: Add Vercel Domain to reCAPTCHA**

#### **4.1 Get Your Vercel URL**
After deployment, you'll get a URL like:
```
https://memoriza-events.vercel.app
```

#### **4.2 Add to Google reCAPTCHA**

1. Go to: https://www.google.com/recaptcha/admin
2. Click on your reCAPTCHA site
3. In **"Domains"** section, click **"+"** to add domain
4. Add these domains:
   ```
   memoriza-events.vercel.app
   localhost
   127.0.0.1
   ```
   (Add your custom domain later if you have one)
5. Click **"Save"**

---

### **STEP 5: Test Your Deployed Website**

#### **5.1 Visit Your Website**
```
https://your-project-name.vercel.app
```

#### **5.2 Test Contact Form**
1. Scroll to contact form
2. Fill all fields
3. Complete reCAPTCHA
4. Submit form

#### **5.3 Check Emails**
- Owner email: memoriza.events@gmail.com
- Client email: Your test email

#### **5.4 Check Vercel Logs**
If something fails:
1. Go to Vercel dashboard
2. Click your project
3. Go to **"Deployments"** → Click latest
4. Click **"Functions"** tab
5. Click **"/api/contact"**
6. View logs for errors

---

## 🔄 **Updating Your Website**

### **Method 1: Push to GitHub**
```bash
# Make changes locally
# Then:
git add .
git commit -m "Update website"
git push

# Vercel auto-deploys when you push!
```

### **Method 2: Vercel Dashboard**
1. Go to Vercel dashboard
2. Click your project
3. Click **"Deployments"**
4. Click **"Redeploy"**

---

## 🔧 **Managing Environment Variables**

### **View/Edit Variables:**
1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to **"Settings"** tab
4. Click **"Environment Variables"**
5. See all your variables
6. Click **"Edit"** to change
7. **Must redeploy** after changing!

### **Add New Variable:**
1. Same steps as above
2. Click **"Add"**
3. Enter name and value
4. Select environment (Production/Preview/Development)
5. Click **"Save"**
6. **Redeploy** your project

---

## 🌐 **Adding Custom Domain**

### **Option 1: Vercel Domain (Free)**
You already have:
```
https://your-project-name.vercel.app
```

### **Option 2: Custom Domain (e.g., memoriza-events.com)**

#### **Step 1: Buy Domain**
From: Namecheap, GoDaddy, Google Domains, etc.

#### **Step 2: Add to Vercel**
1. Vercel dashboard → Your project
2. Go to **"Settings"** → **"Domains"**
3. Click **"Add"**
4. Enter your domain: `memoriza-events.com`
5. Click **"Add"**

#### **Step 3: Configure DNS**
Vercel will show you DNS records to add:

**For Namecheap/GoDaddy:**
- Type: `A`
- Host: `@`
- Value: `76.76.21.21`
- TTL: Automatic

- Type: `CNAME`
- Host: `www`
- Value: `cname.vercel-dns.com`
- TTL: Automatic

#### **Step 4: Wait for Verification**
- DNS propagation: 5 minutes - 48 hours
- Usually works in 30 minutes

#### **Step 5: Add Domain to reCAPTCHA**
Go to Google reCAPTCHA admin and add:
```
memoriza-events.com
www.memoriza-events.com
```

---

## ✅ **Environment Variables Checklist**

Before deploying, make sure you added:

- [ ] `GMAIL_USER`
- [ ] `GMAIL_APP_PASSWORD`
- [ ] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- [ ] `RECAPTCHA_SECRET_KEY`

All should be in **Production**, **Preview**, and **Development** environments.

---

## 🧪 **Testing Checklist**

After deployment:

- [ ] Website loads
- [ ] All images show
- [ ] Contact form appears
- [ ] reCAPTCHA shows (no errors)
- [ ] Form can be filled
- [ ] reCAPTCHA can be completed
- [ ] Form submits successfully
- [ ] Owner email received
- [ ] Client email received
- [ ] Both emails have logo

---

## 🚨 **Common Issues & Solutions**

### **Issue 1: "ERROR for site owner: Invalid key type"**

**Cause:** Vercel domain not added to reCAPTCHA

**Solution:**
1. Go to https://www.google.com/recaptcha/admin
2. Add your Vercel domain: `your-app.vercel.app`
3. Save
4. Test again

---

### **Issue 2: Emails Not Sending**

**Cause:** Environment variables not set

**Solution:**
1. Vercel dashboard → Settings → Environment Variables
2. Check all 4 variables are added:
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`
3. If missing, add them
4. Redeploy: Deployments → Latest → Click ⋯ → Redeploy

---

### **Issue 3: "Module not found" Error**

**Cause:** Dependencies not installed

**Solution:**
1. Check `package.json` has all dependencies
2. Vercel auto-installs from `package.json`
3. If issue persists, check build logs

---

### **Issue 4: reCAPTCHA Not Showing**

**Cause:** `NEXT_PUBLIC_` prefix missing

**Solution:**
- Variable name MUST be: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- NOT just: `RECAPTCHA_SITE_KEY`
- The `NEXT_PUBLIC_` prefix is required for client-side access

---

### **Issue 5: Build Fails**

**Cause:** TypeScript/ESLint errors

**Solution:**
1. Check build logs in Vercel
2. Fix errors locally:
   ```bash
   npm run build
   ```
3. Fix all errors
4. Push to GitHub again

---

## 📊 **Vercel Dashboard Tour**

### **Overview Tab**
- See deployment status
- View latest deployment
- Analytics (visitors, page views)

### **Deployments Tab**
- All past deployments
- Click any to see logs
- Redeploy from here

### **Settings Tab**
- **Environment Variables** ← Important!
- Domains
- General settings

### **Functions Tab**
- API route logs
- Performance metrics
- Error tracking

---

## 🎯 **Quick Deployment Summary**

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 2. Vercel
# - Import project from GitHub
# - Add 4 environment variables
# - Deploy

# 3. reCAPTCHA
# - Add Vercel domain to allowed domains

# 4. Test
# - Submit form
# - Check emails
# - Verify reCAPTCHA works
```

---

## 📸 **Screenshots Locations**

### **Adding Environment Variables:**
```
Vercel Dashboard 
  → Your Project 
  → Settings (left sidebar)
  → Environment Variables
  → Add
```

### **Checking Logs:**
```
Vercel Dashboard
  → Your Project
  → Deployments
  → Click latest deployment
  → Functions tab
  → Click /api/contact
  → View logs
```

---

## 🎉 **After Successful Deployment**

Your website will be live at:
```
https://your-project-name.vercel.app
```

Features working:
- ✅ Contact form
- ✅ reCAPTCHA protection
- ✅ Email notifications (owner + client)
- ✅ Logo in emails
- ✅ All animations
- ✅ Responsive design

---

## 📞 **Need Help?**

### **Vercel Support:**
- Docs: https://vercel.com/docs
- Discord: https://vercel.com/discord

### **Check Logs:**
1. Vercel dashboard → Your project
2. Deployments → Latest
3. View function logs for errors

---

## 🔒 **Security Notes**

✅ **DO:**
- Add environment variables through Vercel dashboard
- Keep `.env.local` in `.gitignore`
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Use Gmail App Password (not regular password)

❌ **DON'T:**
- Commit `.env.local` to Git
- Share your secret keys publicly
- Use regular Gmail password
- Hardcode sensitive data in code

---

## ✨ **Congratulations!**

Once deployed, your website will be:
- ✅ Live on the internet
- ✅ Fully functional
- ✅ Protected from bots
- ✅ Sending emails
- ✅ Professional and ready

**Good luck with your deployment!** 🚀
