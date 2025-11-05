"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-container text-center mx-auto px-4 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-primary-foreground/90 leading-relaxed">
                Creating Moments
              </span>
              <br />
              <span className="text-gold-gradient">Worth</span>
              <br />
              <span className="text-gold-gradient">Remembering</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl font-serif text-gold-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            &quot;You are at the heart of everything we do.&quot;
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-primary-foreground/70 mb-12 max-w-3xl mx-auto"
          >
            To ensure your event is a success, our experienced team works with
            you every step of the way. Full-service coordination, styling, and
            on-the-day event management you can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#contact" className="btn-primary">
              Check Availability
            </a>
            <a href="#portfolio" className="btn-secondary">
              View Our Work
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <a
            href="#portfolio"
            className="flex flex-col items-center text-accent-foreground-400 hover:text-accent-foreground transition-colors"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="animate-bounce" size={32} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
