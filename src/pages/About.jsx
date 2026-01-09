import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Award, Users, Building2, Globe, Target, Shield, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Building2, value: '500+', label: 'Nekretnina u Ponudi' },
  { icon: Users, value: '1000+', label: 'Zadovoljnih Klijenata' },
  { icon: Award, value: '15+', label: 'Godina Iskustva' },
  { icon: Globe, value: '50+', label: 'Zemalja' },
];

const values = [
  {
    icon: Shield,
    title: 'Povjerenje',
    description: 'Gradimo dugoročne odnose sa našim klijentima zasnovane na povjerenju i transparentnosti.'
  },
  {
    icon: Star,
    title: 'Kvalitet',
    description: 'Posvećeni smo pružanju najvišeg kvaliteta usluge i odabiru samo najboljih nekretnina.'
  },
  {
    icon: Target,
    title: 'Stručnost',
    description: 'Naš tim profesionalaca poznaje tržište i prati sve trendove u industriji nekretnina.'
  }
];

export default function About() {
  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
            alt="Montenegro Coast"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">O Nama</span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-wide">
              Vaš Partner za
              <span className="gold-text font-serif italic"> Luksuzne Nekretnine</span>
            </h1>
            
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Montenegro Real Estate je vodeća agencija za luksuzne nekretnine u Crnoj Gori, 
              posvećena pružanju izuzetne usluge klijentima iz cijelog svijeta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-[#d4af37] mx-auto mb-4" />
                <p className="text-4xl font-light text-white mb-2">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop"
                  alt="Our Team"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-[#d4af37] hidden lg:block" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-[#d4af37]" />
                <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Naša Priča</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light text-white tracking-wide mb-6">
                Više od 15 Godina
                <span className="gold-text font-serif italic"> Izvrsnosti</span>
              </h2>
              
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                Osnovani 2008. godine, Montenegro Real Estate je izrastao u najprepoznatljivije 
                ime u industriji luksuznih nekretnina u Crnoj Gori.
              </p>
              
              <p className="text-white/60 leading-relaxed mb-6">
                Naš tim iskusnih profesionalaca poznaje svaki detalj crnogorskog tržišta nekretnina. 
                Bilo da tražite luksuzni apartman u Porto Montenegru, vilu sa pogledom na more u 
                Boki Kotorskoj, ili investicionu priliku u rastućem turističkom sektoru - mi smo tu 
                da vam pomognemo.
              </p>

              <p className="text-white/60 leading-relaxed">
                Ponosni smo na našu reputaciju pouzdanog partnera za klijente iz više od 50 zemalja, 
                koji nam vjeruju da će pronaći svoj savršen dom na obali Jadrana.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Naše Vrijednosti</span>
              <div className="h-[1px] w-12 bg-[#d4af37]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-white tracking-wide">
              Šta Nas
              <span className="gold-text font-serif italic"> Izdvaja</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-[#0a0a0a] border border-white/5 hover:border-[#d4af37]/30 transition-colors"
              >
                <value.icon className="w-10 h-10 text-[#d4af37] mb-6" />
                <h3 className="text-xl font-light text-white mb-4">{value.title}</h3>
                <p className="text-white/60 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">
              Spremni da Pronađete
              <span className="gold-text font-serif italic"> Vaš Dom?</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Kontaktirajte nas danas i dozvolite nam da vam pomognemo u pronalasku 
              savršene nekretnine u Crnoj Gori.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={createPageUrl('Properties')}>
                <Button className="px-10 py-6 bg-[#d4af37] hover:bg-[#b8960c] text-black tracking-wider uppercase">
                  Pogledaj Nekretnine
                </Button>
              </Link>
              <Link to={createPageUrl('Contact')}>
                <Button variant="outline" className="px-10 py-6 border-2 border-white/30 text-white hover:border-[#d4af37] hover:text-[#d4af37] bg-transparent tracking-wider uppercase">
                  Kontaktirajte Nas
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}