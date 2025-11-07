"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Calendar } from "lucide-react";
import { format, addDays } from "date-fns";
import RecaptchaWrapper, { RecaptchaWrapperHandle } from "./RecaptchaWrapper";
import VenueSelector from "./VenueSelector";

interface FormData {
  fullName: string;
  email: string;
  contactNumber: string;
  eventType: string;
  eventDate: string;
  venue: string;
  message: string;
  privacyConsent: boolean;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    contactNumber: "",
    eventType: "Wedding",
    eventDate: "",
    venue: "",
    message: "",
    privacyConsent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const recaptchaRef = useRef<RecaptchaWrapperHandle>(null);

  // Calculate minimum date (2 days from now)
  const minDate = format(addDays(new Date(), 2), "yyyy-MM-dd");

  // reCAPTCHA site key from environment variable
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate privacy consent
    if (!formData.privacyConsent) {
      setErrorMessage("Please agree to the privacy policy to continue");
      return;
    }

    // Validate date
    if (!formData.eventDate) {
      setErrorMessage("Please select your preferred event date");
      return;
    }

    setStatus("loading");

    try {
      // Execute reCAPTCHA v3 - runs invisibly in background
      let token: string;
      try {
        if (!recaptchaRef.current) {
          throw new Error("reCAPTCHA not initialized");
        }
        token = await recaptchaRef.current.execute();
      } catch (recaptchaError) {
        console.error("reCAPTCHA execution failed:", recaptchaError);
        throw new Error("reCAPTCHA verification failed. Please try again.");
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          contactNumber: formData.contactNumber,
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          venue: formData.venue,
          message: formData.message,
          recaptchaToken: token,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setStatus("success");

      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        eventType: "Wedding",
        eventDate: "",
        venue: "",
        message: "",
        privacyConsent: false,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again."
      );
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-linear-to-b from-black to-gray-900"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary">
            Check <span className="text-gold-gradient">Availability</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Ready to start planning your special day? Fill out the form below
            and we&apos;ll get back to you within 24 hours to discuss how we can
            bring your vision to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-linear-to-br from-green-500/20 to-green-700/20 border border-green-500/30 rounded-xl p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                Thank You for Your Inquiry!
              </h3>
              <p className="text-gray-300 mb-4">
                We&apos;ve received your inquiry and sent confirmation emails to both you and our team.
              </p>
              <p className="text-gray-300 mb-6">
                Expect a personalized response within <strong className="text-white">48 hours</strong>. 
                We&apos;re excited to help make your event unforgettable!
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="btn-secondary"
              >
                Submit Another Inquiry
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 md:p-10 rounded-xl border border-gold-500/10 shadow-xl"
            >
              {/* Error Message */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-200 text-sm">{errorMessage}</p>
                </motion.div>
              )}
              {/* Name */}
              <div className="mb-6">
                <label
                  htmlFor="fullName"
                  className="block text-white font-medium mb-2"
                >
                  Full Name <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                  placeholder="Juan & Maria Dela Cruz"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-medium mb-2"
                  >
                    Email Address <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-white font-medium mb-2"
                  >
                    Contact Number <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                    placeholder="+63 912 345 6789"
                  />
                </div>
              </div>

              {/* Event Type & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="eventType"
                    className="block text-white font-medium mb-2"
                  >
                    Event Type <span className="text-gold-400">*</span>
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Debut">Debut</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-white font-medium mb-2"
                  >
                    Preferred Event Date{" "}
                    <span className="text-gold-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      min={minDate}
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Bookings must be at least 2 days in advance
                  </p>
                </div>
              </div>

              {/* Venue / Location with Search & Map Options */}
              <div className="mb-6">
                <label
                  htmlFor="venue"
                  className="block text-white font-medium mb-2"
                >
                  Venue / Location <span className="text-gold-400">*</span>
                </label>
                <VenueSelector
                  value={formData.venue}
                  onChange={(value: string) => setFormData({ ...formData, venue: value })}
                  placeholder="Search for venue or location..."
                  required
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-white font-medium mb-2"
                >
                  Message / Special Requests
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your vision, guest count, or any specific requirements..."
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-0.5">
                    <input
                      type="checkbox"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleChange}
                      className="w-5 h-5 bg-black/50 border-2 border-gray-700 rounded cursor-pointer appearance-none checked:bg-gold-500 checked:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                    />
                    {formData.privacyConsent && (
                      <CheckCircle className="absolute w-5 h-5 text-black pointer-events-none" strokeWidth={3} />
                    )}
                  </div>
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors flex-1">
                    I agree to be contacted by Memoriza Events Management about event availability and coordination services. We respect your privacy and will never share your information. <span className="text-gold-400">*</span>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Inquiry
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* reCAPTCHA v3 - Invisible, loads in background */}
      <RecaptchaWrapper
        ref={recaptchaRef}
        sitekey={recaptchaSiteKey}
        action="contact_form"
      />
    </section>
  );
};

export default ContactForm;
