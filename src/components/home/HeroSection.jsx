import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSection() {
  const navigate = useNavigate();
  const [listingType, setListingType] = useState('prodaja');
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (listingType) params.set('listing_type', listingType);
    if (searchQuery) params.set('search', searchQuery);
    if (location) params.set('location', location);
    if (minPrice) params.set('min_price', minPrice);
    if (maxPrice) params.set('max_price', maxPrice);
    navigate(createPageUrl('Properties') + '?' + params.toString());
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6961800f073fe5e6a0d3c722/a12d535d0_Gemini_Generated_Image_q05wvaq05wvaq05w.png"
          alt="Luxury Property Montenegro"
          className="hidden md:block w-full h-full object-cover object-center"
        />
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6961800f073fe5e6a0d3c722/3b5a1869a_Photoroom_20260112_213942.png"
          alt="Luxury Property Montenegro Mobile"
          className="md:hidden w-full h-full object-cover object-center"
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
          
          <p className="text-white/70 text-sm sm:text-base md:text-xl max-w-md sm:max-w-xl md:max-w-2xl mx-auto leading-relaxed px-4 sm:px-0" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
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
          <div className="flex justify-center mb-0">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Šta tražite? (npr. apartman, vila, Porto Montenegro...)"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11 sm:h-14 text-xs sm:text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Lokacija (npr. Tivat, Budva, Kotor...)"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11 sm:h-14 text-xs sm:text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min. cijena (€)"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11 sm:h-14 text-xs sm:text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max. cijena (€)"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11 sm:h-14 text-xs sm:text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
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


      </div>
    </section>
  );
}