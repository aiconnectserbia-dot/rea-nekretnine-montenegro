import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Search, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HeroSection() {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState('prodaja');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (listingType) params.set('listing_type', listingType);
    if (propertyType) params.set('type', propertyType);
    if (priceRange) params.set('price', priceRange);
    if (bedrooms) params.set('bedrooms', bedrooms);
    navigate(createPageUrl('Properties') + '?' + params.toString());
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6961800f073fe5e6a0d3c722/21271f48a_tamnija.png"
          alt="Luxury Property Montenegro"
          className="w-full h-full object-cover object-left md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 w-32 h-32 border border-[#d4af37]/20 rotate-45 hidden lg:block" />
      <div className="absolute bottom-32 right-10 w-24 h-24 border border-[#d4af37]/20 hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
            <span className="text-[#d4af37] text-sm tracking-[0.3em] uppercase">Ekskluzivne Nekretnine</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-wide">
            Luksuzne Nekretnine
            <br />
            <span className="gold-text font-serif italic">u Crnoj Gori</span>
          </h1>
          
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Otkrijte najekskluzivnije nekretnine na crnogorskoj obali. 
            Vaš savršen dom čeka vas.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex justify-center gap-1 sm:gap-0 mb-0">
            <button
              onClick={() => setListingType('prodaja')}
              className={`flex-1 sm:flex-none px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm tracking-wider uppercase transition-all ${
                listingType === 'prodaja'
                  ? 'bg-[#d4af37] text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Prodaja
            </button>
            <button
              onClick={() => setListingType('iznajmljivanje')}
              className={`flex-1 sm:flex-none px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm tracking-wider uppercase transition-all ${
                listingType === 'iznajmljivanje'
                  ? 'bg-[#d4af37] text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Iznajmljivanje
            </button>
          </div>

          {/* Search Fields */}
          <div className="bg-white/10 backdrop-blur-md p-3 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white h-11 sm:h-14 text-xs sm:text-sm">
                  <SelectValue placeholder="Tip Nekretnine" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/20">
                  <SelectItem value="apartman">Apartman</SelectItem>
                  <SelectItem value="vila">Vila</SelectItem>
                  <SelectItem value="kuca">Kuća</SelectItem>
                  <SelectItem value="zemljiste">Zemljište</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="poslovni_prostor">Poslovni Prostor</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white h-11 sm:h-14 text-xs sm:text-sm">
                  <SelectValue placeholder="Raspon Cijene" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/20">
                  <SelectItem value="100000-500000">100.000€ - 500.000€</SelectItem>
                  <SelectItem value="500000-1000000">500.000€ - 1.000.000€</SelectItem>
                  <SelectItem value="1000000-2000000">1.000.000€ - 2.000.000€</SelectItem>
                  <SelectItem value="2000000-5000000">2.000.000€ - 5.000.000€</SelectItem>
                  <SelectItem value="5000000+">5.000.000€+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white h-11 sm:h-14 text-xs sm:text-sm">
                  <SelectValue placeholder="Broj Soba" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/20">
                  <SelectItem value="1">1 Soba</SelectItem>
                  <SelectItem value="2">2 Sobe</SelectItem>
                  <SelectItem value="3">3 Sobe</SelectItem>
                  <SelectItem value="4">4 Sobe</SelectItem>
                  <SelectItem value="5+">5+ Soba</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={handleSearch}
                className="h-11 sm:h-14 bg-[#d4af37] hover:bg-[#b8960c] text-black font-medium tracking-wider uppercase text-xs sm:text-sm"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Pretraži
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">Skrolaj</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-5 h-5 text-[#d4af37]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}