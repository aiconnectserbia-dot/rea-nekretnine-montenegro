import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Porto Montenegro',
    slug: 'porto_montenegro',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
    description: 'Luksuzna marina svjetske klase'
  },
  {
    name: 'Luštica Bay',
    slug: 'lustica_bay',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
    description: 'Mediteranski raj na poluostrvu'
  },
  {
    name: 'Portonovi',
    slug: 'portonovi',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
    description: 'Ekskluzivni wellness resort'
  },
  {
    name: 'Waterfront',
    slug: 'waterfront',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    description: 'Nekretnine uz samu obalu'
  },
  {
    name: 'Boka Kotorska',
    slug: 'boka_kotorska',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    description: 'UNESCO baština na moru'
  }
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-[#d4af37]" />
            <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Istaknute Kategorije</span>
            <div className="h-[1px] w-12 bg-[#d4af37]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide">
            Premium Lokacije u
            <span className="gold-text font-serif italic"> Crnoj Gori</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            Istražite najekskluzivnije lokacije i projekte na crnogorskom primorju
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {/* Large Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 lg:col-span-2 lg:row-span-2"
          >
            <Link 
              to={createPageUrl('Properties') + '?category=' + categories[0].slug}
              className="group relative block h-full min-h-[280px] sm:min-h-[500px] overflow-hidden"
            >
              <img 
                src={categories[0].image}
                alt={categories[0].name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 border border-[#d4af37]/0 group-hover:border-[#d4af37]/50 transition-colors duration-500" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                <span className="text-[#d4af37] text-[9px] sm:text-xs tracking-[0.2em] uppercase">{categories[0].description}</span>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-light text-white mt-1 sm:mt-2 mb-2 sm:mb-4">{categories[0].name}</h3>
                <div className="hidden sm:flex items-center gap-2 text-white/70 group-hover:text-[#d4af37] transition-colors">
                  <span className="text-sm tracking-wider uppercase">Pogledaj nekretnine</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Smaller Cards */}
          {categories.slice(1).map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={createPageUrl('Properties') + '?category=' + category.slug}
                className="group relative block h-[140px] sm:h-[240px] overflow-hidden"
              >
                <img 
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 border border-[#d4af37]/0 group-hover:border-[#d4af37]/50 transition-colors duration-500" />
                
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6">
                  <span className="text-[#d4af37] text-[8px] sm:text-[10px] tracking-[0.2em] uppercase">{category.description}</span>
                  <h3 className="text-sm sm:text-xl font-light text-white mt-0.5 sm:mt-1">{category.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}