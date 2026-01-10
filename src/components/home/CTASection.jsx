import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
          alt="Luxury View"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-20 left-20 w-32 h-[1px] bg-[#d4af37]/30 hidden lg:block" />
      <div className="absolute bottom-20 right-20 w-32 h-[1px] bg-[#d4af37]/30 hidden lg:block" />
      <div className="absolute top-20 left-20 w-[1px] h-32 bg-[#d4af37]/30 hidden lg:block" />
      <div className="absolute bottom-20 right-20 w-[1px] h-32 bg-[#d4af37]/30 hidden lg:block" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Kontaktirajte Nas</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 tracking-wide">
            Pronađite Svoj
            <span className="gold-text font-serif italic"> Savršen Dom</span>
          </h2>
          
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            Naš tim stručnjaka je tu da vam pomogne u pronalasku idealne nekretnine. 
            Kontaktirajte nas danas za besplatnu konsultaciju.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={createPageUrl('Contact')}>
              <Button className="px-10 py-6 bg-[#d4af37] hover:bg-[#b8960c] text-black tracking-wider uppercase group">
                Kontaktirajte Nas
                <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <a href="tel:+38269123456">
              <Button variant="outline" className="px-10 py-6 border-2 border-white/30 text-white hover:border-[#d4af37] hover:text-[#d4af37] bg-transparent tracking-wider uppercase">
                <Phone className="w-4 h-4 mr-2" />
                +382 69 123 456
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}