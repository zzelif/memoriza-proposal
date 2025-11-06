# 📧 Email System Documentation - Memoriza Events

## ✨ **Overview**

The Memoriza Events website features a fully functional contact form that sends professional emails to both the business owner and clients using **Gmail SMTP**.

---

## 🎯 **Features**

### **1. Dual Email Dispatch**
- ✅ **Owner receives:** Inquiry notification with all form details
- ✅ **Client receives:** Professional thank you confirmation
- ✅ **Both emails include:** Memoriza logo (50px height, auto width)

### **2. Email Design**
- ✅ **Professional HTML templates** with black & gold branding
- ✅ **Responsive design** for all email clients
- ✅ **Embedded logo** using CID attachments
- ✅ **Mobile-optimized** layout

### **3. Form Validation**
- ✅ All required fields validated
- ✅ Email format validation
- ✅ Date validation (2+ days advance booking required)
- ✅ Privacy consent checkbox (required)
- ✅ Client & server-side validation

---

## 📁 **File Structure**

```
memoriza-proposal/
├── src/
│   ├── app/
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts           # API endpoint for form submission
│   ├── components/
│   │   ├── ContactForm.tsx            # Contact form component
│   │   └── ScrollButton.tsx           # Bidirectional scroll button
│   └── lib/
│       └── email-templates.tsx        # HTML email templates
├── public/
│   └── logo.png                       # Logo embedded in emails
├── .env.local                         # Environment variables (Gmail config)
├── .env.example                       # Example env file
├── GMAIL_SETUP.md                     # Setup instructions
├── ACTION_REQUIRED.md                 # Quick start guide
└── EMAIL_DOCUMENTATION.md             # This file
```

---

## 🔧 **Technical Stack**

| Technology | Purpose |
|-----------|---------|
| **Nodemailer** | Email sending library |
| **Gmail SMTP** | Email service provider |
| **Next.js API Routes** | Backend endpoint |
| **TypeScript** | Type safety |
| **HTML Email Templates** | Professional styling |
| **CID Attachments** | Logo embedding |

---

## 📧 **Email Templates**

### **Owner Email (Inquiry Notification)**

**Subject:** `New Inquiry: [Event Type] - [Client Name]`

**Includes:**
- Memoriza logo (embedded)
- Professional header with gradient
- All form fields in formatted table:
  - Full Name
  - Email Address (clickable)
  - Contact Number (clickable)
  - Event Type
  - Requested Event Date (formatted)
  - Venue/Location
  - Message/Special Requests
- Action reminder (48-hour response time)
- Professional footer

### **Client Email (Thank You Confirmation)**

**Subject:** `Thank You for Your Inquiry - Memoriza Events Management`

**Includes:**
- Memoriza logo (embedded)
- Personalized greeting
- Thank you message
- "What Happens Next" section
- Inquiry summary in styled box
- 48-hour response expectation
- Contact information
- Social media links
- Professional footer

---

## ⚙️ **Configuration**

### **Environment Variables**

Required in `.env.local`:

```env
GMAIL_USER=memoriza.events@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
```

### **Setup Steps**

1. **Enable 2FA on Gmail**
   - Required for App Passwords

2. **Generate Gmail App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" → "Other (Custom name)"
   - Copy 16-character password

3. **Update `.env.local`**
   - Add Gmail credentials
   - Remove spaces from app password

4. **Restart Server**
   - `Ctrl + C` then `npm run dev`

See `GMAIL_SETUP.md` for detailed instructions.

---

## 🎨 **Logo in Emails**

### **Implementation**

The logo is embedded using **CID (Content-ID) attachments**:

```typescript
attachments: [{
  filename: 'logo.png',
  path: path.join(process.cwd(), 'public', 'logo.png'),
  cid: 'logo'
}]
```

### **HTML Reference**

```html
<img src="cid:logo" alt="Memoriza Events Management" 
     style="height: 50px; width: auto; margin-bottom: 15px;" />
```

### **Specifications**
- **File:** `/public/logo.png`
- **Display Height:** 50px
- **Width:** Auto (maintains aspect ratio)
- **Position:** Top center of email
- **Fallback:** If logo missing, email still sends without it

---

## 🚀 **API Endpoint**

### **POST /api/contact**

**Request Body:**
```json
{
  "fullName": "string",
  "email": "string",
  "contactNumber": "string",
  "eventType": "string",
  "eventDate": "string (YYYY-MM-DD)",
  "venue": "string",
  "message": "string (optional)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Inquiry submitted successfully",
  "emailsSent": {
    "owner": true,
    "client": true
  }
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message"
}
```

---

## 📊 **Form Validation Rules**

| Field | Validation |
|-------|-----------|
| **Full Name** | Required |
| **Email** | Required, valid format |
| **Contact Number** | Required |
| **Event Type** | Required (dropdown) |
| **Event Date** | Required, min 2 days ahead, not past |
| **Venue** | Required |
| **Message** | Optional |
| **Privacy Consent** | Required (checkbox) |

---

## 🔍 **Email Flow**

```
User Submits Form
       ↓
Client-Side Validation
       ↓
POST /api/contact
       ↓
Server-Side Validation
       ↓
   Load Logo
       ↓
┌──────┴──────┐
│             │
Owner Email   Client Email
(Inquiry)     (Confirmation)
    ↓             ↓
Gmail SMTP    Gmail SMTP
    ↓             ↓
✅ Delivered  ✅ Delivered
```

---

## 💡 **Key Features**

### **1. Professional Design**
- Black & gold theme matching website
- Responsive HTML email templates
- Mobile-friendly layout
- Professional typography

### **2. Logo Integration**
- 50px height (optimal for email clients)
- Auto width (maintains aspect ratio)
- Embedded via CID attachments
- Graceful fallback if missing

### **3. Reliability**
- Gmail SMTP (99.9% uptime)
- Error handling with detailed logs
- Separate validation for each field
- Retry-ready architecture

### **4. User Experience**
- Loading states during submission
- Clear success/error messages
- Form reset after success
- Privacy consent requirement

---

## 📈 **Limits & Quotas**

### **Gmail Free Account**
- **Daily limit:** 500 emails
- **Rate limit:** ~2,000 emails/day (burst)
- **Attachment size:** 25 MB total
- **Cost:** FREE

### **Current Usage**
- ~2 emails per inquiry (owner + client)
- Logo size: ~50-100 KB per email
- Well within Gmail limits for inquiry form

---

## 🔒 **Security**

### **Best Practices Implemented**
- ✅ App Password (not regular password)
- ✅ Environment variables for credentials
- ✅ `.env.local` in `.gitignore`
- ✅ Server-side validation
- ✅ Email format validation
- ✅ Type-safe TypeScript code
- ✅ Error logging (no credential exposure)

---

## 🧪 **Testing**

### **Manual Testing**

1. Fill form with valid data
2. Use actual email address
3. Check two inboxes:
   - Owner: memoriza.events@gmail.com
   - Client: your test email
4. Verify logo displays
5. Check spam folders if needed

### **Expected Behavior**

✅ Owner receives inquiry within seconds  
✅ Client receives confirmation within seconds  
✅ Both emails show logo correctly  
✅ All form data appears in owner email  
✅ Success message shows on form  

---

## 🐛 **Troubleshooting**

### **Emails Not Sending**

**Check:**
1. Gmail App Password is correct
2. No spaces in app password
3. 2FA enabled on Gmail account
4. Server restarted after `.env.local` change
5. Terminal shows no errors

### **Logo Not Showing**

**Check:**
1. `/public/logo.png` exists
2. File is valid PNG image
3. File size < 1MB (recommended)
4. Terminal shows "logo exists" message

### **Emails Going to Spam**

**Normal Behavior:**
- Gmail SMTP emails may go to spam initially
- Ask recipients to mark as "Not Spam"
- Improves over time with positive engagement

**Long-term Solution:**
- Set up SPF/DKIM records (if using custom domain)
- Maintain consistent sending patterns
- Monitor bounce rates

---

## 📝 **Maintenance**

### **Regular Tasks**

1. **Monitor Gmail App Password**
   - Regenerate if compromised
   - Update `.env.local` if changed

2. **Check Email Deliverability**
   - Test periodically
   - Monitor spam rates

3. **Update Logo**
   - Replace `/public/logo.png` as needed
   - Restart server after change
   - Test emails

4. **Review Email Templates**
   - Update copy in `email-templates.tsx`
   - Test after changes

---

## 🚀 **Future Enhancements**

### **Potential Improvements**

1. **Email Queue**
   - Implement retry logic
   - Better error handling

2. **Analytics**
   - Track email open rates
   - Monitor delivery success

3. **Templates**
   - More email templates
   - Seasonal variations

4. **Admin Dashboard**
   - View all inquiries
   - Email history
   - Analytics dashboard

5. **Custom Domain**
   - Set up company domain
   - Improve deliverability
   - Professional sender address

---

## 📞 **Support**

### **Documentation Files**

- **GMAIL_SETUP.md** - Complete setup guide
- **ACTION_REQUIRED.md** - Quick start (3 minutes)
- **EMAIL_DOCUMENTATION.md** - Technical documentation (this file)

### **Quick Links**

- Gmail App Passwords: https://myaccount.google.com/apppasswords
- Gmail Security: https://myaccount.google.com/security
- Nodemailer Docs: https://nodemailer.com

---

## ✅ **Completion Checklist**

- [x] Gmail SMTP configured
- [x] Logo embedded in emails
- [x] Dual email dispatch working
- [x] Form validation complete
- [x] Professional email templates
- [x] Error handling implemented
- [x] Documentation complete
- [x] Resend dependencies removed
- [x] Code cleaned up
- [x] All files organized

---

## 🎉 **Summary**

The Memoriza Events contact form is **production-ready** with:

✅ **Professional emails** to owner and clients  
✅ **Embedded logo** (50px, optimized size)  
✅ **Gmail SMTP** (reliable, free, 500 emails/day)  
✅ **Comprehensive validation** (client & server)  
✅ **Beautiful design** (black & gold theme)  
✅ **Complete documentation**  
✅ **Clean codebase** (no unused dependencies)  

**Everything is ready to go!** 🚀
