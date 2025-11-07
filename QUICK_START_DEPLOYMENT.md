# ⚡ Quick Start: Fix & Deploy

## 🔧 **Fix reCAPTCHA Error NOW**

### **Problem:** "ERROR for site owner: Invalid key type"

### **Solution:** Add localhost to reCAPTCHA domains

1. **Go to:** https://www.google.com/recaptcha/admin
2. **Find your site** (with key `6LdCIAUsAAAAAA03b-8FPyj2CzdiucZMvhDABKeU`)
3. **Click "Settings" (gear icon)**
4. **In "Domains" section, add:**
   ```
   localhost
   127.0.0.1
   ```
5. **Make sure reCAPTCHA type is:** "reCAPTCHA v2" → "I'm not a robot" Checkbox
6. **Click "Save"**
7. **Refresh your browser:** http://localhost:3000

---

## 🎨 **Alignment Fixed**

✅ reCAPTCHA is now left-aligned on the form (changed from centered)

---

## 🚀 **Deploy to Vercel: 5-Minute Guide**

### **Step 1: Push to GitHub** (if not already)
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### **Step 2: Import to Vercel**
1. Go to: https://vercel.com/new
2. Sign in with GitHub
3. Import your repository
4. **WAIT! Don't click Deploy yet!**

### **Step 3: Add Environment Variables** ⚠️

Click "Environment Variables" and add these **4 variables**:

| Name | Value |
|------|-------|
| `GMAIL_USER` | `memoriza.events@gmail.com` |
| `GMAIL_APP_PASSWORD` | `ltntfznoruigvpmh` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | `6LdCIAUsAAAAAA03b-8FPyj2CzdiucZMvhDABKeU` |
| `RECAPTCHA_SECRET_KEY` | `6LdCIAUsAAAAAOa7PkmlCtMefODNy7LTIuCoj-e1` |

**For each variable:**
- Select: Production ✅ Preview ✅ Development ✅
- Click "Add"

### **Step 4: Deploy**
Click "Deploy" button

### **Step 5: Add Vercel Domain to reCAPTCHA**
1. After deployment, copy your Vercel URL (e.g., `memoriza-events.vercel.app`)
2. Go to: https://www.google.com/recaptcha/admin
3. Add domain: `memoriza-events.vercel.app` (or your URL)
4. Save

### **Step 6: Test**
Visit your Vercel URL and test the contact form!

---

## 📋 **Environment Variables Checklist**

Before deploying, ensure you have these 4 variables:

- [ ] `GMAIL_USER` = `memoriza.events@gmail.com`
- [ ] `GMAIL_APP_PASSWORD` = `ltntfznoruigvpmh`
- [ ] `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` = `6LdCIAUsAAAAAA03b-8FPyj2CzdiucZMvhDABKeU`
- [ ] `RECAPTCHA_SECRET_KEY` = `6LdCIAUsAAAAAOa7PkmlCtMefODNy7LTIuCoj-e1`

---

## 🧪 **Testing Checklist**

After deployment:

- [ ] Website loads
- [ ] reCAPTCHA shows (no error)
- [ ] Can complete reCAPTCHA
- [ ] Form submits
- [ ] Owner email arrives
- [ ] Client email arrives

---

## 🚨 **If reCAPTCHA Still Shows Error**

### **For Localhost Testing:**
Domains should include:
- `localhost`
- `127.0.0.1`

### **For Vercel Production:**
Domains should include:
- `your-app.vercel.app`
- `localhost`
- `127.0.0.1`

### **reCAPTCHA Type Must Be:**
- **Version:** reCAPTCHA v2
- **Type:** "I'm not a robot" Checkbox
- **NOT** v3 or invisible!

---

## 💡 **Key Points**

1. **`.env.local` is NOT uploaded** - You add variables in Vercel dashboard
2. **reCAPTCHA needs domains** - Add localhost for testing, Vercel URL for production
3. **4 environment variables required** - All must be added to Vercel
4. **Alignment changed** - reCAPTCHA now left-aligned

---

## 📞 **Help Resources**

- **Fix reCAPTCHA:** `FIX_RECAPTCHA_ERROR.md`
- **Full Deployment Guide:** `VERCEL_DEPLOYMENT_GUIDE.md`
- **Vercel Docs:** https://vercel.com/docs

---

**You're ready to fix and deploy!** 🚀
