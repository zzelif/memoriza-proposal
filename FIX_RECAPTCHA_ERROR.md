# 🔧 Fix reCAPTCHA "Invalid key type" Error

## ⚠️ Error: "ERROR for site owner: Invalid key type"

This means your reCAPTCHA keys are not configured for localhost testing.

## ✅ **SOLUTION: Add localhost to Your reCAPTCHA Domain**

### **Step 1: Go to Google reCAPTCHA Admin**
https://www.google.com/recaptcha/admin

### **Step 2: Find Your Site**
Look for your site with these keys:
- Site key: `6LdCIAUsAAAAAA03b-8FPyj2CzdiucZMvhDABKeU`

### **Step 3: Add Localhost Domain**

In the "Domains" section, add:
```
localhost
127.0.0.1
```

### **Step 4: Save Changes**

### **Step 5: Verify reCAPTCHA Type**
Make sure you selected **"reCAPTCHA v2"** with **"I'm not a robot" Checkbox**

NOT v3 or invisible - this is important!

---

## 🔄 **Alternative: Create New reCAPTCHA Keys for Testing**

If you can't edit the existing keys, create new ones:

### **1. Go to reCAPTCHA Admin**
https://www.google.com/recaptcha/admin/create

### **2. Fill Form:**
- **Label:** Memoriza Events (Localhost Testing)
- **reCAPTCHA type:** Select **"reCAPTCHA v2"**
- **Sub-type:** Select **"I'm not a robot" Checkbox**
- **Domains:** 
  ```
  localhost
  127.0.0.1
  ```
- Click **Submit**

### **3. Copy New Keys**
You'll get:
- Site key (public)
- Secret key (private)

### **4. Update .env.local**
Replace with new keys:
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_new_site_key
RECAPTCHA_SECRET_KEY=your_new_secret_key
```

### **5. Restart Server**
```bash
npm run dev
```

---

## 📝 **Important Notes**

### **For Localhost:**
- Domain: `localhost` or `127.0.0.1`
- Type: **reCAPTCHA v2 Checkbox**

### **For Production (Vercel):**
- Add your Vercel domain (e.g., `memoriza-events.vercel.app`)
- Same keys work for both if both domains are added

---

## ✅ **After Fixing**

Test again:
1. Go to http://localhost:3000
2. Scroll to contact form
3. reCAPTCHA should show without errors
4. Click "I'm not a robot"
5. Should work!
