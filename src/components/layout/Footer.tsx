import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-gold-400 mb-4">
              Memoriza Events Management
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Creating unforgettable moments through professional event
              coordination, styling, and on-the-day management across the
              Philippines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <div className="space-y-3 mb-6">
              <a
                href="mailto:inquiries@memoriza-events.com"
                className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors text-sm"
              >
                <Mail size={16} />
                inquiries@memoriza-events.com
              </a>
              <a
                href="tel:+639123456789"
                className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors text-sm"
              >
                <Phone size={16} />
                +63 912 345 6789
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/memorizaevents"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gold-500/10 border border-gold-500/20 rounded-full flex items-center justify-center text-gold-400 hover:bg-gold-500/20 hover:border-gold-500/40 transition-all"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/memorizaevents"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gold-500/10 border border-gold-500/20 rounded-full flex items-center justify-center text-gold-400 hover:bg-gold-500/20 hover:border-gold-500/40 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gold-500/20 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Memoriza Events Management. All
            rights reserved.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Designed & Developed by Lettac • Baquiran • Borre
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
