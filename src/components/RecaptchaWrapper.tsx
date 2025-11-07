"use client";

import { useEffect, forwardRef, useImperativeHandle } from "react";

interface RecaptchaWrapperProps {
  sitekey: string;
  action?: string;
}

export interface RecaptchaWrapperHandle {
  execute: () => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha: any;
  }
}

// reCAPTCHA v3 - Invisible, runs in background
const RecaptchaWrapper = forwardRef<RecaptchaWrapperHandle, RecaptchaWrapperProps>(
  ({ sitekey, action = "submit" }, ref) => {
    useEffect(() => {
      // Load reCAPTCHA v3 script if not already loaded
      if (!document.querySelector(`script[src*="recaptcha/api.js"][src*="render=${sitekey}"]`)) {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${sitekey}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }

      // Move reCAPTCHA badge to bottom-left and keep it compact
      const style = document.createElement("style");
      style.innerHTML = `
        .grecaptcha-badge {
          left: 4px !important;
          right: auto !important;
          bottom: 14px !important;
          width: 70px !important;
          transition: width 0.3s ease !important;
          overflow: hidden !important;
        }
        .grecaptcha-badge:hover {
          width: 256px !important;
        }
      `;
      document.head.appendChild(style);
    }, [sitekey]);

    useImperativeHandle(ref, () => ({
      execute: async () => {
        return new Promise((resolve, reject) => {
          if (!window.grecaptcha || !window.grecaptcha.ready) {
            reject(new Error("reCAPTCHA not loaded"));
            return;
          }

          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(sitekey, { action });
              resolve(token);
            } catch (error) {
              console.error("reCAPTCHA execution error:", error);
              reject(error);
            }
          });
        });
      },
    }));

    // v3 is invisible - no UI needed
    return null;
  }
);

RecaptchaWrapper.displayName = "RecaptchaWrapper";

export default RecaptchaWrapper;
