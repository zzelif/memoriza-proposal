import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
// import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Memoriza Events Management | Premium Wedding & Event Coordination",
  description:
    "You are at the heart of everything we do. Full-service coordination, styling, and on-the-day event management you can trust.",
  keywords:
    "wedding coordinator, event management, wedding styling, Philippines events, wedding planner",
  openGraph: {
    title: "Memoriza Events Management",
    description: "Premium wedding and event coordination services",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
