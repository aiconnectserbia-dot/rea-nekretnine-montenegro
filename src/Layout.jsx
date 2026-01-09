import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = await base44.auth.me();
        setIsAdmin(user.role === 'admin');
      } catch (error) {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  const navLinks = [
    { name: 'Početna', page: 'Home' },
    { name: 'Nekretnine', page: 'Properties' },
    { name: 'O Nama', page: 'About' },
    { name: 'Kontakt', page: 'Contact' },
  ];

  const adminNavLinks = isAdmin ? [
    ...navLinks,
    { name: 'Admin Panel', page: 'AdminPanel', icon: Shield }
  ] : navLinks;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <style>{`
        :root {
          --gold: #d4af37;
          --gold-light: #e6c65c;
          --gold-dark: #b8960c;
          --black: #0a0a0a;
          --black-light: #1a1a1a;
          --black-lighter: #2a2a2a;
        }
        
        .gold-gradient {
          background: linear-gradient(135deg, #d4af37 0%, #f5d673 50%, #d4af37 100%);
        }
        
        .gold-text {
          background: linear-gradient(135deg, #d4af37 0%, #f5d673 50%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gold-border {
          border-color: #d4af37;
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-3 shadow-lg shadow-black/50' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 border-2 border-[#d4af37] flex items-center justify-center">
                  <span className="text-[#d4af37] font-serif text-xl font-bold">M</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-light tracking-[0.3em] text-white uppercase">Montenegro</h1>
                <p className="text-[10px] tracking-[0.5em] text-[#d4af37] uppercase">Real Estate</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {adminNavLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`relative text-sm tracking-wider uppercase transition-colors duration-300 flex items-center gap-2 ${
                    currentPageName === link.page 
                      ? 'text-[#d4af37]' 
                      : 'text-white/80 hover:text-[#d4af37]'
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.name}
                  {currentPageName === link.page && (
                    <motion.div 
                      layoutId="navIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#d4af37]"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Contact CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="tel:+38269123456" className="flex items-center gap-2 text-white/70 hover:text-[#d4af37] transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+382 69 123 456</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0a0a0a] border-t border-[#d4af37]/20"
            >
              <nav className="px-6 py-6 space-y-4">
                {adminNavLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 py-2 text-lg tracking-wider uppercase ${
                      currentPageName === link.page ? 'text-[#d4af37]' : 'text-white/80'
                    }`}
                  >
                    {link.icon && <link.icon className="w-5 h-5" />}
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <a href="tel:+38269123456" className="flex items-center gap-2 text-[#d4af37]">
                    <Phone className="w-4 h-4" />
                    <span>+382 69 123 456</span>
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 border-2 border-[#d4af37] flex items-center justify-center">
                  <span className="text-[#d4af37] font-serif text-2xl font-bold">M</span>
                </div>
                <div>
                  <h3 className="text-lg font-light tracking-[0.2em] uppercase">Montenegro</h3>
                  <p className="text-xs tracking-[0.3em] text-[#d4af37] uppercase">Real Estate</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Vaš pouzdani partner za luksuzne nekretnine u Crnoj Gori. Otkrijte savršen dom na obali Jadrana.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-[#d4af37] text-sm tracking-wider uppercase mb-6">Brzi Linkovi</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.page}>
                    <Link 
                      to={createPageUrl(link.page)}
                      className="text-white/60 hover:text-[#d4af37] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-[#d4af37] text-sm tracking-wider uppercase mb-6">Lokacije</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li>Porto Montenegro</li>
                <li>Luštica Bay</li>
                <li>Portonovi</li>
                <li>Boka Kotorska</li>
                <li>Budva</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#d4af37] text-sm tracking-wider uppercase mb-6">Kontakt</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#d4af37] mt-0.5 flex-shrink-0" />
                  <span className="text-white/60 text-sm">Tivat, Porto Montenegro<br />Crna Gora</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                  <a href="tel:+38269123456" className="text-white/60 hover:text-[#d4af37] text-sm transition-colors">
                    +382 69 123 456
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#d4af37] flex-shrink-0" />
                  <a href="mailto:info@montenegro-realestate.me" className="text-white/60 hover:text-[#d4af37] text-sm transition-colors">
                    info@montenegro-realestate.me
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/40 text-sm">
              © 2024 Montenegro Real Estate. Sva prava zadržana.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}