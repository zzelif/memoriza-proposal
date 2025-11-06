# ⚡ **ACTION REQUIRED - Gmail App Password Setup**

## 🎯 **What Changed:**

Switched from Resend to **Gmail SMTP** so clients can receive confirmation emails at THEIR email address!

---

## ✅ **What You Need to Do RIGHT NOW:**

### **1. Get Gmail App Password (2 minutes)**

Go to: **https://myaccount.google.com/apppasswords**

- Click "Select app" → Choose "Mail"
- Click "Select device" → Choose "Other" → Type "Memoriza"
- Click **Generate**
- **COPY the 16-character password** (example: `abcd efgh ijkl mnop`)

**Important:** Remove spaces! Should be: `abcdefghijklmnop`

---

### **2. Add to `.env.local` (30 seconds)**

Open `.env.local` and find this line:
```
GMAIL_APP_PASSWORD=your_app_password_here
```

Replace with your actual app password:
```
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

Save the file!

---

### **3. Restart Server (10 seconds)**

In your terminal:
1. Press `Ctrl + C`
2. Run `npm run dev`

---

### **4. Test! (1 minute)**

1. Go to http://localhost:3000
2. Fill form with **YOUR REAL EMAIL**
3. Submit
4. Check TWO inboxes:
   - ✅ **memoriza.events@gmail.com** - Should get inquiry
   - ✅ **YOUR EMAIL** - Should get confirmation!

---

## 🚨 **Need 2FA First?**

If you don't have 2-Step Verification enabled:

1. Go to: https://myaccount.google.com/security
2. Click "2-Step Verification"
3. Follow setup steps (2 minutes)
4. Then generate App Password

---

## ✨ **What's Fixed:**

| Before | After |
|--------|-------|
| ❌ Client can't receive email | ✅ Client receives confirmation |
| ❌ Both emails go to owner | ✅ Owner gets inquiry, Client gets confirmation |
| ❌ Test domain limitation | ✅ Works with ANY email address |

---

## 📧 **New Email Flow:**

1. **Client submits form** with their email (e.g., client@gmail.com)
2. **Owner receives:** Inquiry notification at memoriza.events@gmail.com
3. **Client receives:** Thank you confirmation at client@gmail.com
4. ✅ **Both work perfectly!**

---

## ⏱️ **Time Required: 3 minutes total**

1. Get App Password (2 min)
2. Update .env.local (30 sec)
3. Restart server (10 sec)
4. Test (1 min)

---

## 📚 **Full Guide Available:**

See `GMAIL_SETUP.md` for detailed instructions with screenshots.

---

## 🎯 **Bottom Line:**

**You just need a Gmail App Password!**

Get it here: https://myaccount.google.com/apppasswords

Then update `.env.local`, restart server, and you're done! 🚀
