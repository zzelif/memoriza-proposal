# 📧 Gmail SMTP Setup Guide

## ✅ **Why We Switched to Gmail**

**Problem with Resend:** The free test domain can only send to your registered email (memoriza.events@gmail.com). Clients couldn't receive confirmation emails.

**Solution:** Use Gmail SMTP - can send to ANY email address for FREE!

---

## 🚀 **Quick Setup (5 Minutes)**

### **Step 1: Enable 2-Factor Authentication on Gmail**

1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** (left sidebar)
3. Under "How you sign in to Google", click **2-Step Verification**
4. Click **Get Started** and follow the steps
5. ✅ Complete the setup

**Why?** App Passwords only work with 2FA enabled.

---

### **Step 2: Generate Gmail App Password**

1. Go to: https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → 2-Step Verification → App passwords
2. You may need to sign in again
3. Under "App passwords", click **Select app** dropdown
4. Choose **Mail**
5. Under "Select device", choose **Other (Custom name)**
6. Type: `Memoriza Website`
7. Click **Generate**
8. **COPY THE 16-CHARACTER PASSWORD** (looks like: `abcd efgh ijkl mnop`)
9. ✅ Save it immediately - you won't see it again!

---

### **Step 3: Add to `.env.local`**

1. Open `.env.local` in your project root
2. Find this line:
   ```
   GMAIL_APP_PASSWORD=your_app_password_here
   ```
3. Replace `your_app_password_here` with your 16-character app password
4. **Remove spaces** - it should look like: `abcdefghijklmnop`
5. Example:
   ```
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```
6. ✅ Save the file

---

### **Step 4: Restart Development Server**

1. Go to terminal running `npm run dev`
2. Press `Ctrl + C` to stop
3. Run `npm run dev` again
4. Wait for "Ready" message

---

### **Step 5: Test the Form**

1. Open http://localhost:3000
2. Fill out the contact form with:
   - **Use YOUR ACTUAL EMAIL** (any email you want - Gmail, Yahoo, etc.)
   - Fill all required fields
   - Select date 2+ days ahead
   - Check privacy checkbox
3. Click "Submit Inquiry"

---

## 📧 **What Will Happen:**

### **✅ Owner (memoriza.events@gmail.com) will receive:**
- **Subject:** "New Inquiry: [Event Type] - [Client Name]"
- **Content:** Full inquiry details with all form information

### **✅ Client (their email from form) will receive:**
- **Subject:** "Thank You for Your Inquiry - Memoriza Events Management"
- **Content:** Professional thank you message with next steps

---

## 🔍 **Troubleshooting**

### **Issue: "Invalid login credentials"**

**Solutions:**
1. ✅ Make sure 2FA is enabled on your Gmail
2. ✅ Use App Password, NOT your regular Gmail password
3. ✅ Remove all spaces from app password
4. ✅ Restart dev server after updating .env.local

### **Issue: "Username and Password not accepted"**

**Solutions:**
1. Go back to App Passwords and generate a NEW one
2. Copy it WITHOUT spaces
3. Update `.env.local`
4. Restart server

### **Issue: Emails going to spam**

**Expected behavior** for now. To fix:
1. Ask recipients to mark as "Not Spam"
2. For production, consider using a professional email service
3. Or set up SPF/DKIM records for your domain

### **Issue: Rate limiting**

Gmail free account limits:
- 500 emails per day
- 100 recipients per email

This should be plenty for your inquiry form!

---

## 📝 **Your Current Configuration**

```env
GMAIL_USER=memoriza.events@gmail.com
GMAIL_APP_PASSWORD=[your 16-character app password]
```

---

## ✨ **Advantages of Gmail SMTP**

| Feature | Gmail SMTP | Resend Test Domain |
|---------|------------|-------------------|
| **Send to any email** | ✅ Yes | ❌ No (only your email) |
| **Free** | ✅ Yes | ✅ Yes |
| **Setup time** | ⚡ 5 minutes | ❌ Requires domain verification |
| **Daily limit** | 500 emails | 100 emails |
| **Deliverability** | ✅ High | ⚠️ May go to spam |
| **Professional** | ✅ Yes | ✅ Yes |

---

## 🔒 **Security Notes**

1. ✅ **App Password ≠ Gmail Password**
   - App passwords are separate from your main password
   - Can be revoked anytime without changing your Gmail password

2. ✅ **Safe to Use**
   - Specifically designed for third-party apps
   - More secure than using your actual password

3. ✅ **In `.gitignore`**
   - `.env.local` won't be committed to git
   - Your credentials stay private

---

## 🎯 **Next Steps After Setup**

1. ✅ Generate Gmail App Password
2. ✅ Add to `.env.local`
3. ✅ Restart dev server
4. ✅ Test with YOUR email
5. ✅ Verify both emails arrive
6. ✅ Check spam folders if needed
7. ✅ You're done! 🎉

---

## 📞 **Common Questions**

### **Q: Do I need a custom domain?**
**A:** No! Gmail SMTP works with any email address.

### **Q: Will clients see my Gmail address?**
**A:** Yes, emails will come from `memoriza.events@gmail.com`. This looks professional!

### **Q: Can I use a different Gmail account?**
**A:** Yes! Just update `GMAIL_USER` in `.env.local` and generate an app password for that account.

### **Q: What if I don't have 2FA enabled?**
**A:** You MUST enable it. App Passwords require 2FA. Follow Step 1 above.

### **Q: Is this production-ready?**
**A:** Yes! Many businesses use Gmail SMTP for contact forms. The 500 email/day limit is plenty for an inquiry form.

---

## 🚀 **You're Almost Done!**

Just need your Gmail App Password:
1. Go to: https://myaccount.google.com/apppasswords
2. Generate password
3. Add to `.env.local`
4. Restart server
5. Test!

---

**Need help?** Make sure:
- 2FA is enabled on Gmail
- You're using App Password (not regular password)
- No spaces in the password
- Server was restarted after changing .env.local
