import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { Award, Users, Building2, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Building2, value: '500+', label: 'Nekretnina' },
  { icon: Users, value: '1000+', label: 'Zadovoljnih Klijenata' },
  { icon: Award, value: '15+', label: 'Godina Iskustva' },
  { icon: Globe, value: '50+', label: 'Zemalja' },
];

export default function AboutSection() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
                alt="Luxury Interior"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-[#d4af37] hidden lg:block" />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-10 -left-6 bg-[#d4af37] p-8 hidden lg:block"
            >
              <p className="text-5xl font-light text-black mb-2">15+</p>
              <p className="text-black/80 text-sm tracking-wider uppercase">Godina Iskustva</p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">O Nama</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide mb-6">
              Vaš Pouzdani Partner
              <span className="gold-text font-serif italic"> na Jadranu</span>
            </h2>
            
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              Montenegro Real Estate je vodeća agencija za luksuzne nekretnine u Crnoj Gori. 
              Sa više od 15 godina iskustva, pomažemo klijentima iz cijelog svijeta da pronađu 
              svoj savršen dom na obali Jadrana.
            </p>
            
            <p className="text-white/60 leading-relaxed mb-8">
              Naš tim stručnjaka poznaje svaki kutak crnogorskog primorja i pruža 
              personalizovanu uslugu prilagođenu vašim potrebama. Od luksuznih vila 
              do ekskluzivnih apartmana, tu smo da vam pomognemo u svakom koraku.
            </p>

            {/* Mini Stats */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {stats.slice(0, 4).map((stat, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 border border-[#d4af37]/30">
                    <stat.icon className="w-5 h-5 text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-2xl font-light text-white">{stat.value}</p>
                    <p className="text-white/50 text-sm">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to={createPageUrl('About')}>
              <Button className="px-8 py-6 bg-[#d4af37] hover:bg-[#b8960c] text-black tracking-wider uppercase">
                Saznaj Više
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}