import ContactForm from "@/components/ContactForm";
import Hero from "@/components/Hero";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import ScrollButton from "@/components/ScrollButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Portfolio />
      <Services />
      <ContactForm />
      <Footer />
      <ScrollButton />
    </main>
  );
}
