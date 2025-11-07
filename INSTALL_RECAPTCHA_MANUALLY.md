# 🔧 Manual reCAPTCHA Installation Guide

## ⚠️ Network Issue Detected

Your npm is experiencing network timeouts when trying to download packages. Here are **3 proven solutions** to get reCAPTCHA working:

---

## ✅ **SOLUTION 1: Use npm with Different Network Settings (Quickest)**

### **Step 1: Clear npm Cache**
```bash
npm cache clean --force
```

### **Step 2: Set Registry to HTTP (if HTTPS fails)**
```bash
npm config set registry http://registry.npmjs.org/
```

### **Step 3: Increase Timeout**
```bash
npm config set fetch-timeout 60000
npm config set fetch-retries 5
```

### **Step 4: Try Installing Again**
```bash
npm install react-google-recaptcha
```

### **Step 5: Install Types**
```bash
npm install --save-dev @types/react-google-recaptcha
```

### **Step 6: Reset Registry (Optional)**
```bash
npm config set registry https://registry.npmjs.org/
```

---

## ✅ **SOLUTION 2: Download Package Files Directly**

Since npm can't download, you can add the package files manually:

### **Step 1: Download react-google-recaptcha**

Create file: `node_modules/react-google-recaptcha/index.js`

```javascript
// Paste this code
import * as React from 'react';

const ReCAPTCHA = React.forwardRef((props, ref) => {
  const { sitekey, onChange, theme, size, badge } = props;
  const [ready, setReady] = React.useState(false);
  const recaptchaRef = React.useRef(null);

  React.useImperativeHandle(ref, () => ({
    reset: () => {
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.reset(recaptchaRef.current);
      }
    },
    execute: () => {
      if (window.grecaptcha && recaptchaRef.current) {
        return window.grecaptcha.execute(recaptchaRef.current);
      }
    },
  }));

  React.useEffect(() => {
    if (typeof window !== 'undefined' && !window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => setReady(true);
      document.head.appendChild(script);
    } else if (window.grecaptcha) {
      setReady(true);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  React.useEffect(() => {
    if (ready && window.grecaptcha && recaptchaRef.current === null) {
      recaptchaRef.current = window.grecaptcha.render('recaptcha-container', {
        sitekey: sitekey,
        callback: onChange,
        theme: theme || 'light',
        size: size || 'normal',
        badge: badge || 'bottomright',
      });
    }
  }, [ready, sitekey, onChange, theme, size, badge]);

  return React.createElement('div', { id: 'recaptcha-container' });
});

export default ReCAPTCHA;
```

### **Step 2: Create package.json for it**

Create file: `node_modules/react-google-recaptcha/package.json`

```json
{
  "name": "react-google-recaptcha",
  "version": "3.1.0",
  "main": "index.js",
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

---

## ✅ **SOLUTION 3: Use Script Tag Approach (Recommended if npm fails)**

This bypasses the npm package entirely and uses Google's script directly.

### **Step 1: Update ContactForm.tsx**

Replace the import line and implementation:

```typescript
// Remove this line:
// import ReCAPTCHA from "react-google-recaptcha";

// Add this at the top of the component:
declare global {
  interface Window {
    grecaptcha: any;
  }
}
```

### **Step 2: Add Script to page**

Update `src/app/layout.tsx` to include reCAPTCHA script:

```typescript
<head>
  {/* Existing head content */}
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>
```

### **Step 3: Update ContactForm Component**

Replace the ReCAPTCHA component with this:

```tsx
// Instead of <ReCAPTCHA ... />
// Use this:

{/* Google reCAPTCHA */}
<div className="mb-6 flex justify-center">
  <div className="transform scale-100 hover:scale-105 transition-transform">
    <div
      className="g-recaptcha"
      data-sitekey={recaptchaSiteKey}
      data-theme="dark"
      data-callback="onRecaptchaSuccess"
    />
  </div>
</div>

{/* Add this script */}
<Script id="recaptcha-callback">
  {`
    window.onRecaptchaSuccess = function(token) {
      window.dispatchEvent(new CustomEvent('recaptcha-token', { detail: token }));
    }
  `}
</Script>
```

### **Step 4: Listen for Token**

Add this useEffect:

```typescript
useEffect(() => {
  const handleRecaptchaToken = (event: any) => {
    setRecaptchaToken(event.detail);
  };
  
  window.addEventListener('recaptcha-token', handleRecaptchaToken);
  
  return () => {
    window.removeEventListener('recaptcha-token', handleRecaptchaToken);
  };
}, []);
```

---

## ✅ **SOLUTION 4: Use Yarn Instead of npm**

### **Step 1: Install Yarn**
```bash
npm install -g yarn
```

### **Step 2: Use Yarn to Install**
```bash
yarn add react-google-recaptcha
```

### **Step 3: Install Types**
```bash
yarn add -D @types/react-google-recaptcha
```

---

## ✅ **SOLUTION 5: Use USB Tethering / Different Network**

If all else fails, the issue is your network connection to npm registry.

### **Options:**
1. **Mobile Hotspot** - Use your phone's internet
2. **Different WiFi** - Try a different network
3. **VPN** - Sometimes helps bypass network restrictions
4. **Ask IT** - If corporate network, ask IT to whitelist npm registry

---

## 🎯 **Recommended Approach (Fastest)**

**Try this exact sequence:**

```bash
# 1. Clear everything
npm cache clean --force

# 2. Configure npm for better connectivity
npm config set fetch-timeout 60000
npm config set fetch-retries 10

# 3. Try installation
npm install react-google-recaptcha

# 4. If that works, install types
npm install --save-dev @types/react-google-recaptcha

# 5. Restart server
npm run dev
```

**If that still fails after 2-3 attempts:** Use Solution 3 (Script Tag Approach) - it works without any npm packages!

---

## 📝 **After Successful Installation**

Once you get the package installed (any method):

### **1. Restart Dev Server**
```bash
# Stop: Ctrl+C
npm run dev
```

### **2. Test**
- Go to http://localhost:3000
- Fill form
- Click "I'm not a robot"
- Submit

### **3. Verify**
Terminal should show:
```
✅ reCAPTCHA verified successfully
✅ Emails sent
```

---

## 🆘 **Still Having Issues?**

If **ALL** methods fail, let me know and I'll provide:
1. A completely offline solution
2. Alternative CAPTCHA libraries
3. Custom bot protection code

---

## 📞 **Quick Troubleshooting**

| Error | Solution |
|-------|----------|
| ETIMEDOUT | Try Solution 1 (increase timeout) |
| ENOTFOUND | Check internet connection |
| ECONNREFUSED | Firewall blocking npm |
| 404 | Package name typo (unlikely) |
| Permission denied | Run as admin / use sudo |

---

## ✨ **Current Status**

✅ All code is ready  
✅ API keys configured  
✅ Server verification implemented  
⏳ Only need package installation  

**You're literally one command away from completion!**

---

**Try Solution 1 first (quickest), then Solution 3 if npm completely fails.**

Let me know which approach works for you!
