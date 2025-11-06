"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");

  // Show button and determine direction
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Hide when at absolute top (< 100px from top)
      const isAtAbsoluteTop = scrollY < 100;
      
      // Hide when at absolute bottom (< 100px from bottom)
      const isAtAbsoluteBottom = scrollY + windowHeight > documentHeight - 100;

      // Show button only when scrolling in the middle (not at top or bottom)
      if (!isAtAbsoluteTop && !isAtAbsoluteBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine scroll direction based on position
      // If closer to top (< half of page), show DOWN arrow to scroll down
      // If closer to bottom (> half of page), show UP arrow to scroll up
      const halfwayPoint = (documentHeight - windowHeight) / 2;
      
      if (scrollY < halfwayPoint) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
    };

    // Initial check
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll function - normal slow speed
  const handleScroll = () => {
    let target = 0;

    if (scrollDirection === "down") {
      // Scroll to bottom
      target = document.documentElement.scrollHeight - window.innerHeight;
    } else {
      // Scroll to top
      target = 0;
    }

    // Use smooth scroll with normal speed
    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          onClick={handleScroll}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label={scrollDirection === "down" ? "Scroll to bottom" : "Scroll to top"}
        >
          {/* Outer Circle with Gradient Border */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
            
            {/* Main Button */}
            <div className="relative w-14 h-14 bg-black border-2 border-gold-400 rounded-full flex items-center justify-center group-hover:border-gold-300 group-hover:bg-gold-500/10 transition-all duration-300 shadow-lg shadow-gold-500/20">
              {/* Arrow Icon - Changes based on scroll position */}
              {scrollDirection === "down" ? (
                <ArrowDown 
                  className="w-6 h-6 text-gold-400 group-hover:text-gold-300 group-hover:translate-y-1 transition-all duration-300" 
                  strokeWidth={2.5}
                />
              ) : (
                <ArrowUp 
                  className="w-6 h-6 text-gold-400 group-hover:text-gold-300 group-hover:-translate-y-1 transition-all duration-300" 
                  strokeWidth={2.5}
                />
              )}
            </div>

            {/* Animated Ring on Hover */}
            <div className="absolute inset-0 rounded-full border-2 border-gold-400/30 group-hover:scale-110 group-hover:border-gold-300/50 transition-all duration-300" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollButton;
