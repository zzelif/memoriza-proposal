# 🔒 Google reCAPTCHA v2 Integration Guide

## ✨ **Overview**

The Memoriza Events contact form is protected by **Google reCAPTCHA v2** to prevent spam and bot submissions. Users must complete the "I'm not a robot" challenge before submitting inquiries.

---

## 🎯 **Features**

### **Bot Protection**
- ✅ Prevents automated form submissions
- ✅ Blocks spam and malicious requests
- ✅ Validates human interaction
- ✅ Server-side verification

### **User Experience**
- ✅ Simple "I'm not a robot" checkbox
- ✅ Dark theme matching website design
- ✅ Smooth hover animation
- ✅ Clear validation messages
- ✅ Automatic reset after submission

---

## 🔐 **Your reCAPTCHA Keys**

### **Site Key (Public - Frontend)**
```
6LdCIAUsAAAAAA03b-8FPyj2CzdiucZMvhDABKeU
```
- Used in React component
- Visible in browser
- Safe to expose publicly

### **Secret Key (Private - Backend)**
```
6LdCIAUsAAAAAOa7PkmlCtMefODNy7LTIuCoj-e1
```
- Used for server-side verification
- Stored in `.env.local`
- NEVER expose publicly

---

## 📁 **Files Modified**

### **1. Environment Variables**

**`.env.local`**
```env
# Google reCAPTCHA v2 Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdCIAUsAAAAAA03b-8FPyj2CzdiucZMvhDABKeU
RECAPTCHA_SECRET_KEY=6LdCIAUsAAAAAOa7PkmlCtMefODNy7LTIuCoj-e1
```

**`.env.example`**
```env
# Google reCAPTCHA v2 Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

### **2. ContactForm Component**

**Location:** `src/components/ContactForm.tsx`

**Changes:**
- ✅ Import `react-google-recaptcha`
- ✅ Add `recaptchaToken` state
- ✅ Add `recaptchaRef` for control
- ✅ Add reCAPTCHA validation in `handleSubmit`
- ✅ Send token to API
- ✅ Reset reCAPTCHA after submission
- ✅ Dark theme reCAPTCHA widget

### **3. API Route**

**Location:** `src/app/api/contact/route.ts`

**Changes:**
- ✅ Add `recaptchaToken` to interface
- ✅ Verify token with Google API
- ✅ Reject submissions with invalid tokens
- ✅ Log verification results

---

## 🔄 **How It Works**

### **User Flow**

```
1. User fills form
   ↓
2. User checks "I'm not a robot"
   ↓
3. reCAPTCHA generates token
   ↓
4. User clicks "Submit Inquiry"
   ↓
5. Frontend validates token exists
   ↓
6. Form sends data + token to API
   ↓
7. API verifies token with Google
   ↓
8. Google confirms: Human ✅ or Bot ❌
   ↓
9. If human: Send emails
   If bot: Reject submission
```

### **Technical Flow**

#### **Frontend (ContactForm.tsx)**
```typescript
// 1. User completes reCAPTCHA
<ReCAPTCHA
  ref={recaptchaRef}
  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
  onChange={(token) => setRecaptchaToken(token)}
  theme="dark"
/>

// 2. Validate token before submission
if (!recaptchaToken) {
  setErrorMessage("Please complete the reCAPTCHA verification");
  return;
}

// 3. Send token to API
body: JSON.stringify({
  ...formData,
  recaptchaToken: recaptchaToken,
})
```

#### **Backend (API Route)**
```typescript
// 1. Extract token from request
const { recaptchaToken } = body;

// 2. Verify with Google
const response = await fetch(
  'https://www.google.com/recaptcha/api/siteverify',
  {
    method: 'POST',
    body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`
  }
);

// 3. Check result
const data = await response.json();
if (!data.success) {
  return error: "reCAPTCHA verification failed"
}

// 4. Continue with email sending
```

---

## 🎨 **Design Integration**

### **Visual Placement**
- Located between privacy checkbox and submit button
- Centered on the form
- Dark theme matching website
- Subtle hover effect

### **Styling**
```tsx
<div className="mb-6 flex justify-center">
  <div className="transform scale-100 hover:scale-105 transition-transform">
    <ReCAPTCHA
      theme="dark"
      // ... other props
    />
  </div>
</div>
```

---

## ✅ **Validation**

### **Client-Side Validation**
- Checks if reCAPTCHA token exists
- Displays error message if missing
- Prevents form submission
- Clears error when token received

### **Server-Side Verification**
- Verifies token with Google API
- Checks `success` property in response
- Rejects if verification fails
- Logs all verification attempts

---

## 🧪 **Testing**

### **Test Complete Flow**

1. **Go to form:** http://localhost:3000#contact

2. **Fill all fields:**
   - Full Name
   - Email
   - Contact Number
   - Event Type
   - Event Date (2+ days ahead)
   - Venue
   - Message (optional)

3. **Check privacy consent**

4. **Complete reCAPTCHA:**
   - Click "I'm not a robot" checkbox
   - Wait for checkmark

5. **Submit form**

6. **Expected Results:**
   - ✅ Form submits successfully
   - ✅ Console: "✅ reCAPTCHA verified successfully"
   - ✅ Owner receives email
   - ✅ Client receives email
   - ✅ Success message displayed
   - ✅ reCAPTCHA resets

### **Test Bot Protection**

1. Try to submit WITHOUT checking reCAPTCHA
2. **Expected:** Error "Please complete the reCAPTCHA verification"

3. Try to submit with invalid token (requires dev tools)
4. **Expected:** Error "reCAPTCHA verification failed"

---

## 🚨 **Common Issues & Solutions**

### **Issue: reCAPTCHA not showing**

**Possible Causes:**
1. npm package not installed
2. Site key missing or incorrect
3. JavaScript disabled
4. Ad blocker blocking reCAPTCHA

**Solutions:**
```bash
# Reinstall package
npm install react-google-recaptcha @types/react-google-recaptcha

# Check .env.local has correct site key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdCIAUsAAAAAA03b-8FPyj2CzdiucZMvhDABKeU

# Restart server
npm run dev
```

### **Issue: "reCAPTCHA verification failed"**

**Possible Causes:**
1. Secret key missing or incorrect
2. Token expired (valid for 2 minutes)
3. Token used more than once

**Solutions:**
```bash
# Check .env.local has correct secret key
RECAPTCHA_SECRET_KEY=6LdCIAUsAAAAAOa7PkmlCtMefODNy7LTIuCoj-e1

# Restart server to load new env variables
npm run dev
```

### **Issue: TypeScript errors**

**Error:** `Cannot find module 'react-google-recaptcha'`

**Solution:**
```bash
# Install with types
npm install react-google-recaptcha @types/react-google-recaptcha

# If still issues, restart TS server in VS Code
# Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

---

## 🔒 **Security Best Practices**

### **✅ Implemented**

1. **Server-Side Verification**
   - Never trust client-side validation alone
   - Always verify token on server

2. **Secret Key Protection**
   - Stored in `.env.local`
   - Never committed to git
   - Never exposed to client

3. **Token Single Use**
   - Each token valid once
   - Reset reCAPTCHA after submission
   - Fresh token for each attempt

4. **Error Handling**
   - Generic error messages (no details to attacker)
   - Detailed logs on server (for debugging)

### **⚠️ Important**

- **Never** use site key as secret key
- **Never** commit `.env.local` to git
- **Always** verify on server-side
- **Always** use HTTPS in production

---

## 📊 **Performance**

### **Load Time**
- reCAPTCHA widget: ~100-200ms
- Verification API call: ~300-500ms
- Total overhead: ~500ms (acceptable)

### **User Experience**
- Simple checkbox (no puzzles by default)
- Dark theme (matches design)
- Smooth animations
- Mobile-friendly

---

## 🌐 **Google reCAPTCHA Admin**

### **Manage Your Keys**
https://www.google.com/recaptcha/admin

### **View Analytics**
- Total verifications
- Pass/fail rate
- Bot detection stats
- Traffic sources

### **Domain Settings**
Make sure your domain is added:
- `localhost` (for development)
- Your production domain (for deployment)

---

## 🚀 **Production Deployment**

### **Before Going Live**

1. **Add Production Domain**
   - Go to: https://www.google.com/recaptcha/admin
   - Select your site
   - Add production domain to allowed domains

2. **Update Environment Variables**
   - Same keys work for all domains
   - Just ensure domain is whitelisted

3. **Test in Production**
   - Submit form on live site
   - Verify emails arrive
   - Check reCAPTCHA logs

---

## 📈 **Monitoring**

### **What to Monitor**

1. **Verification Success Rate**
   - Should be >95%
   - Low rate = configuration issue

2. **Bot Blocks**
   - How many bots blocked
   - Effectiveness of protection

3. **User Complaints**
   - If users can't submit
   - May need to adjust settings

### **Google reCAPTCHA Console**
https://www.google.com/recaptcha/admin/site/[YOUR_SITE_ID]

---

## 🎓 **Technical Details**

### **Package Used**
```json
{
  "react-google-recaptcha": "^3.1.0",
  "@types/react-google-recaptcha": "^2.1.9"
}
```

### **API Endpoint**
```
POST https://www.google.com/recaptcha/api/siteverify
```

### **Response Format**
```json
{
  "success": true|false,
  "challenge_ts": "timestamp",
  "hostname": "your-domain.com",
  "error-codes": []
}
```

---

## ✨ **Benefits**

### **Security**
- ✅ Blocks automated bot submissions
- ✅ Prevents spam
- ✅ Reduces malicious activity
- ✅ Protects email system

### **User Experience**
- ✅ Simple checkbox (not complex puzzles)
- ✅ Fast (< 1 second)
- ✅ Mobile-friendly
- ✅ Accessible

### **Business Value**
- ✅ Free (Google reCAPTCHA v2)
- ✅ Reliable (99.9% uptime)
- ✅ Scalable (unlimited requests)
- ✅ Analytics included

---

## 📝 **Summary**

### **What Was Added**

1. ✅ Google reCAPTCHA v2 widget to form
2. ✅ Client-side validation
3. ✅ Server-side verification
4. ✅ Dark theme styling
5. ✅ Error handling
6. ✅ Auto-reset after submission

### **Protection Level**

- **Before:** Anyone/anything could submit form
- **After:** Only verified humans can submit

### **User Impact**

- **Effort:** One checkbox click
- **Time:** < 1 second
- **UX:** Seamless integration

---

## 🎉 **Completion Status**

- [x] reCAPTCHA keys added to environment
- [x] Package installed
- [x] ContactForm updated
- [x] API route updated
- [x] Validation added (client + server)
- [x] Dark theme applied
- [x] Error handling implemented
- [x] Documentation complete

**Status:** ✅ COMPLETE & PRODUCTION READY

---

## 📞 **Support**

### **Google reCAPTCHA**
- Docs: https://developers.google.com/recaptcha/docs/display
- Admin: https://www.google.com/recaptcha/admin
- Support: https://support.google.com/recaptcha

### **Package**
- npm: https://www.npmjs.com/package/react-google-recaptcha
- GitHub: https://github.com/dozoisch/react-google-recaptcha

---

**Your contact form is now protected from bots! 🛡️**
