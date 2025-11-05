"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069",
      title: "Elegant Garden Wedding",
      category: "Full Coordination",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070",
      title: "Modern Indoor Reception",
      category: "Styling & Theme",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069",
      title: "Beachside Ceremony",
      category: "On-the-Day Management",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2070",
      title: "Grand Ballroom Celebration",
      category: "Full Coordination",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070",
      title: "Intimate Garden Party",
      category: "Styling & Theme",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070",
      title: "Luxury Hotel Wedding",
      category: "Full Coordination",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="portfolio"
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
            Our <span className="text-gold-gradient">Portfolio</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Every event we handle is crafted with precision, elegance, and
            heart. See how we&apos;ve brought dreams to life for couples across
            the Philippines.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {portfolioItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg aspect-4/5 cursor-pointer"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-gold-400 text-sm font-semibold mb-2 uppercase tracking-wide">
                  {item.category}
                </span>
                <h3 className="text-white text-xl font-serif font-bold group-hover:text-gold-400 transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#contact" className="btn-primary">
            Start Planning Your Event
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
