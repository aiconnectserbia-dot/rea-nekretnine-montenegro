import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import ScrollToTop from './components/ScrollToTop';

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
      <ScrollToTop />
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
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6961800f073fe5e6a0d3c722/bd5fc2a32_Photoroom_20260109_215650.png" 
                alt="REA Nekretnine" 
                className="h-12 w-12 object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-light tracking-[0.2em] text-white uppercase">REA Nekretnine</h1>
                <p className="text-[10px] tracking-[0.3em] text-[#d4af37] uppercase">Montenegro</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
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
              <a href="tel:+38267518587" className="flex items-center gap-2 text-white/70 hover:text-[#d4af37] transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+382 67 518 587</span>
              </a>
              {isAdmin && (
                <Link 
                  to={createPageUrl('AdminPanel')}
                  className="text-white/20 hover:text-white/40 transition-colors"
                  title="Admin Panel"
                >
                  <Shield className="w-4 h-4" />
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white relative z-50"
            >
              <motion.div
                animate={mobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              />
              
              {/* Slide-in Menu */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 w-[85%] max-w-sm h-screen bg-[#0a0a0a]/98 backdrop-blur-xl border-l border-[#d4af37]/20 z-50 lg:hidden overflow-y-auto"
              >
                <div className="relative h-full flex flex-col">
                  {/* Menu Header */}
                  <div className="px-6 py-8 border-b border-[#d4af37]/10">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6961800f073fe5e6a0d3c722/bd5fc2a32_Photoroom_20260109_215650.png" 
                        alt="REA Nekretnine" 
                        className="h-12 w-12 object-contain"
                      />
                      <div>
                        <h2 className="text-base font-light tracking-[0.2em] text-white uppercase">REA Nekretnine</h2>
                        <p className="text-[9px] tracking-[0.3em] text-[#d4af37] uppercase">Montenegro</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Links */}
                  <nav className="flex-1 px-6 py-8 space-y-2">
                    {adminNavLinks.map((link, index) => (
                      <motion.div
                        key={link.page}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={createPageUrl(link.page)}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-all duration-300 ${
                            currentPageName === link.page 
                              ? 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30' 
                              : 'text-white/80 hover:bg-white/5 hover:text-white border border-transparent'
                          }`}
                        >
                          {link.icon && <link.icon className="w-5 h-5 flex-shrink-0" />}
                          <span className="text-base tracking-wider uppercase">{link.name}</span>
                          {currentPageName === link.page && (
                            <motion.div
                              layoutId="mobileDot"
                              className="ml-auto w-2 h-2 rounded-full bg-[#d4af37]"
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Menu Footer */}
                  <div className="px-6 py-6 border-t border-[#d4af37]/10 space-y-4">
                    <div className="text-xs tracking-widest uppercase text-white/40 mb-3">Kontakt</div>
                    <a 
                      href="tel:+38267518587" 
                      className="flex items-center gap-3 px-4 py-3 bg-[#d4af37]/10 rounded-lg hover:bg-[#d4af37]/20 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-[#d4af37]" />
                      <span className="text-white text-sm">+382 67 518 587</span>
                    </a>
                    <a 
                      href="mailto:info@montenegro-realestate.me" 
                      className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#d4af37]" />
                      <span className="text-white/70 text-sm">Email</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
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
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6961800f073fe5e6a0d3c722/bd5fc2a32_Photoroom_20260109_215650.png" 
                  alt="REA Nekretnine" 
                  className="h-14 w-14 object-contain"
                />
                <div>
                  <h3 className="text-lg font-light tracking-[0.2em] uppercase">REA Nekretnine</h3>
                  <p className="text-xs tracking-[0.3em] text-[#d4af37] uppercase">Montenegro</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Vaš pouzdani partner za luksuzne nekretnine u Crnoj Gori. Otkrijte savršen dom na obali Jadrana.
              </p>
            </div>

            {/* Quick Links */}
            <div className="hidden md:block">
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

            {/* Locations - Hidden on mobile */}
            <div className="hidden lg:block">
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
                  <a href="tel:+38267518587" className="text-white/60 hover:text-[#d4af37] text-sm transition-colors">
                    +382 67 518 587
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
              © 2026 REA Nekretnine. Sva prava zadržana.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="tel:+38267518587"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="mailto:info@montenegro-realestate.me"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href="viber://chat?number=%2B38267518587"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.398.002C9.473.028 5.331.344 2.473 3.277-.111 5.77-.457 8.799.204 11.613c.661 2.812 2.145 5.293 4.227 7.383.554.554 1.155 1.054 1.797 1.485.344.232.86.571 1.485.875.204.102.453.23.742.354.11.045.223.087.336.127.525.19 1.13.39 1.774.52.504.105 1.018.184 1.531.246.582.069 1.164.108 1.742.123.09.002.18.004.27.004.48 0 .96-.016 1.437-.055.66-.054 1.313-.16 1.945-.328.525-.14 1.058-.352 1.586-.598.29-.135.58-.29.867-.465.386-.235.77-.49 1.137-.774.458-.355.91-.74 1.34-1.162 2.37-2.322 3.748-5.098 4.172-7.555.453-2.625.246-5.022-1.121-7.059-.965-1.438-2.395-2.551-4.082-3.191-1.687-.64-3.535-.926-5.402-.918zm.004 1.137c1.683-.008 3.348.25 4.809.793 1.465.544 2.711 1.418 3.492 2.574 1.042 1.543 1.202 3.513.826 5.746-.375 2.23-1.648 4.722-3.816 6.844-.403.394-.826.74-1.246 1.066-.342.265-.687.497-1.028.703-.256.155-.514.287-.77.401-.496.222-.986.404-1.434.528-.576.16-1.147.253-1.717.302-.426.037-.853.05-1.277.05-.078 0-.156-.002-.234-.003-.533-.014-1.066-.049-1.594-.11-.473-.056-.94-.127-1.395-.219-.562-.114-1.102-.282-1.568-.446-.09-.032-.178-.064-.266-.099-.27-.107-.502-.223-.695-.316-.576-.277-1.047-.582-1.354-.785-.579-.382-1.126-.827-1.63-1.33-1.892-1.892-3.239-4.13-3.832-6.673-.589-2.508-.256-5.178 1.953-7.31C5.639 1.5 9.466 1.197 11.402 1.14zm-.665 2.271c-.39.04-.702.387-.702.777 0 .426.345.77.77.77.243 0 .457-.118.597-.297.131-.168.211-.377.211-.602 0-.43-.349-.778-.778-.778-.033 0-.065.001-.098.004zm3.43.648c-.054.004-.105.012-.157.024-.387.09-.637.48-.559.867.063.312.3.555.598.656.078.027.164.043.254.043.39 0 .719-.285.768-.664.054-.422-.278-.817-.7-.867-.065-.007-.133-.008-.204-.005zm-6.859.119c-.313.015-.598.168-.766.42-.224.336-.167.777.133 1.054.128.117.29.186.464.203.055.005.11.006.165.006.29 0 .56-.144.726-.386.223-.328.167-.77-.125-1.04-.168-.155-.383-.24-.597-.257zm10.267.414c-.01 0-.02 0-.03.002-.424.025-.757.39-.745.813.012.418.358.755.777.755.43 0 .781-.352.781-.781 0-.43-.352-.789-.783-.789z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/38267518587"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/neptunia.moon.3/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}