import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Facebook } from 'lucide-react';

const contactMethods = [
  {
    icon: Phone,
    title: 'Telefon',
    detail: '+382 67 518 587',
    href: 'tel:+38267518587',
    color: 'from-[#d4af37]/20 to-[#d4af37]/5'
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'info@montenegro-realestate.me',
    href: 'mailto:info@montenegro-realestate.me',
    color: 'from-blue-500/20 to-blue-500/5'
  },
  {
    icon: MessageCircle,
    title: 'Viber',
    detail: 'Pošaljite poruku',
    href: 'viber://chat?number=%2B38267518587',
    color: 'from-purple-500/20 to-purple-500/5'
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    detail: 'Stupite u kontakt',
    href: 'https://wa.me/38267518587',
    color: 'from-green-500/20 to-green-500/5'
  },
  {
    icon: Facebook,
    title: 'Facebook',
    detail: 'Pratite nas',
    href: 'https://www.facebook.com/neptunia.moon.3/',
    color: 'from-blue-600/20 to-blue-600/5'
  }
];

export default function ContactSection() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Kontaktirajte Nas</span>
            <div className="h-[1px] w-12 bg-[#d4af37]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide">
            Uvijek Tu Za
            <span className="gold-text font-serif italic"> Vas</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            Odaberite način komunikacije koji vam najviše odgovara
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
              
              <div className="relative h-full p-4 sm:p-8 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-500">
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#d4af37]/30" />
                <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#d4af37]/30" />
                
                {/* Icon */}
                <div className="mb-3 sm:mb-6">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center group-hover:bg-[#d4af37]/20 group-hover:scale-110 transition-all duration-300">
                    <method.icon className="w-5 h-5 sm:w-7 sm:h-7 text-[#d4af37]" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-[10px] sm:text-sm font-light text-[#d4af37] tracking-wider uppercase mb-1 sm:mb-2">
                    {method.title}
                  </h3>
                  <p className="text-white/70 text-[9px] sm:text-xs leading-relaxed" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                    {method.detail}
                  </p>
                </div>

                {/* Hover shimmer */}
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}