"use client";

import { motion } from "framer-motion";
import { Calendar, Palette, Users, Sparkles } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Calendar,
      title: "Full Wedding Coordination",
      description:
        "From venue selection to vendor management, we handle every detail so you can focus on enjoying your journey to 'I do.'",
    },
    {
      icon: Sparkles,
      title: "On-the-Day Management",
      description:
        "Relax and be present on your special day. Our team ensures flawless execution, managing timelines, vendors, and all logistics.",
    },
    {
      icon: Palette,
      title: "Styling & Theme Direction",
      description:
        "Transform your vision into reality with our expert aesthetic direction, from color palettes to decor concepts that reflect your unique style.",
    },
    {
      icon: Users,
      title: "Program & Flow Management",
      description:
        "Seamless ceremony and reception coordination ensuring every moment unfolds beautifully, keeping your guests engaged and delighted.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      id="services"
      className="relative bg-linear-to-b from-gray-900 to-black"
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
            Our <span className="text-gold-gradient">Services</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Comprehensive event management services tailored to your needs,
            delivered with professionalism and care at every step.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gold-500/10 hover:border-gold-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/10"
            >
              {/* Icon */}
              <div className="mb-6 inline-flex p-4 rounded-lg bg-linear-to-br from-gold-500/20 to-gold-700/20 border border-gold-500/20 group-hover:border-gold-500/40 transition-all duration-300">
                <service.icon className="w-8 h-8 text-gold-400" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-gold-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-linear-to-r from-gold-500/10 to-gold-700/10 rounded-xl border border-gold-500/20"
        >
          <p className="text-2xl font-serif text-gold-400 mb-2">
            Trusted by 1.2K+ Followers
          </p>
          <p className="text-gray-300">
            Join our community and let us make your event unforgettable
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
