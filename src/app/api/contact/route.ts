import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ownerEmailTemplate, clientEmailTemplate } from "@/lib/email-templates";
import path from "path";
import fs from "fs";

// Create nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'memoriza.events@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password
  },
});

// Define the expected request body type
interface ContactFormData {
  fullName: string;
  email: string;
  contactNumber: string;
  eventType: string;
  eventDate: string;
  venue: string;
  message: string;
  recaptchaToken: string;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body: ContactFormData = await request.json();

    // Verify reCAPTCHA token
    const { recaptchaToken } = body;
    
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "reCAPTCHA verification required" },
        { status: 400 }
      );
    }

    // Verify the reCAPTCHA v3 token with Google
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    
    const recaptchaResponse = await fetch(recaptchaVerifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    // v3 returns a score (0.0 - 1.0). Higher = more human-like
    // Typical threshold is 0.5. Adjust if needed.
    if (!recaptchaData.success) {
      console.error("reCAPTCHA verification failed:", recaptchaData);
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    if (recaptchaData.score < 0.5) {
      console.error("reCAPTCHA score too low:", recaptchaData.score);
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    console.log("✅ reCAPTCHA v3 verified successfully. Score:", recaptchaData.score);

    // Validate required fields
    const { fullName, email, contactNumber, eventType, eventDate, venue, message } = body;

    if (!fullName || !email || !contactNumber || !eventType || !eventDate || !venue) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate event date (must be at least 2 days in advance)
    const selectedDate = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const twoDaysFromNow = new Date(today);
    twoDaysFromNow.setDate(today.getDate() + 2);

    if (selectedDate < twoDaysFromNow) {
      return NextResponse.json(
        { error: "Event date must be at least 2 days in advance" },
        { status: 400 }
      );
    }

    // Owner email address
    const OWNER_EMAIL = "memoriza.events@gmail.com";
    const FROM_EMAIL = process.env.GMAIL_USER || "memoriza.events@gmail.com";

    console.log("Attempting to send emails using Gmail SMTP...");
    console.log("From email:", FROM_EMAIL);
    console.log("Client email:", email);

    // Prepare logo attachment
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    const logoExists = fs.existsSync(logoPath);

    // Send email to owner with inquiry details
    let ownerEmailSent = false;
    try {
      await transporter.sendMail({
        from: `"Memoriza Events Management" <${FROM_EMAIL}>`,
        to: OWNER_EMAIL,
        replyTo: email,
        subject: `New Inquiry: ${eventType} - ${fullName}`,
        html: ownerEmailTemplate(body),
        attachments: logoExists ? [{
          filename: 'logo.png',
          path: logoPath,
          cid: 'logo' // Same cid value as in the html img src
        }] : [],
      });

      ownerEmailSent = true;
      console.log("✅ Owner inquiry email sent successfully to:", OWNER_EMAIL);
    } catch (error) {
      console.error("❌ Owner email sending failed:", error);
      throw new Error(`Failed to send inquiry notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Send confirmation email to CLIENT (their actual email)
    let clientEmailSent = false;
    try {
      await transporter.sendMail({
        from: `"Memoriza Events Management" <${FROM_EMAIL}>`,
        to: email, // Send to ACTUAL CLIENT EMAIL
        subject: "Thank You for Your Inquiry - Memoriza Events Management",
        html: clientEmailTemplate(body),
        attachments: logoExists ? [{
          filename: 'logo.png',
          path: logoPath,
          cid: 'logo' // Same cid value as in the html img src
        }] : [],
      });

      clientEmailSent = true;
      console.log("✅ Client confirmation email sent successfully to:", email);
    } catch (error) {
      console.error("❌ Client email sending failed:", error);
      throw new Error(`Failed to send client confirmation: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    console.log("🎉 Both emails sent successfully!");

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Inquiry submitted successfully",
        emailsSent: {
          owner: ownerEmailSent,
          client: clientEmailSent,
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { 
        error: "An unexpected error occurred. Please try again later.",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
