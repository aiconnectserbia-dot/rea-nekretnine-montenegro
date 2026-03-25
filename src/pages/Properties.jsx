import React, { useState, useEffect } from 'react';
import { properties as allProperties } from '@/data/properties';
import { motion } from 'framer-motion';
import { Grid3X3, List } from 'lucide-react';
import { Button } from "@/components/ui/button";

import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import PropertyFilters from '@/components/properties/PropertyFilters';
import PropertyCard from '@/components/properties/PropertyCard';

export default function Properties() {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialFilters = {};
    if (urlParams.get('listing_type')) initialFilters.listing_type = urlParams.get('listing_type');
    if (urlParams.get('search')) initialFilters.search = urlParams.get('search');
    if (urlParams.get('location')) initialFilters.location = urlParams.get('location');
    if (urlParams.get('min_price')) initialFilters.min_price = urlParams.get('min_price');
    if (urlParams.get('max_price')) initialFilters.max_price = urlParams.get('max_price');
    if (urlParams.get('type')) initialFilters.type = urlParams.get('type');
    if (urlParams.get('bedrooms')) initialFilters.bedrooms = urlParams.get('bedrooms');
    if (urlParams.get('category')) initialFilters.category = urlParams.get('category');
    setFilters(initialFilters);
  }, []);

  const properties = allProperties.filter(p => !p.is_deleted);

  const filteredProperties = properties.filter(property => {
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const matchesSearch =
        property.title?.toLowerCase().includes(search) ||
        property.location?.toLowerCase().includes(search) ||
        property.region?.toLowerCase().includes(search) ||
        property.property_type?.toLowerCase().includes(search) ||
        property.description?.toLowerCase().includes(search) ||
        property.category?.toLowerCase().includes(search) ||
        property.features?.some(f => f.toLowerCase().includes(search));
      if (!matchesSearch) return false;
    }
    if (filters.location) {
      const location = filters.location.toLowerCase();
      const matchesLocation =
        property.location?.toLowerCase().includes(location) ||
        property.region?.toLowerCase().includes(location);
      if (!matchesLocation) return false;
    }
    if (filters.min_price) {
      const minPrice = parseFloat(filters.min_price);
      if (!property.price || property.price < minPrice) return false;
    }
    if (filters.max_price) {
      const maxPrice = parseFloat(filters.max_price);
      if (!property.price || property.price > maxPrice) return false;
    }
    if (filters.listing_type && property.listing_type !== filters.listing_type) return false;
    if (filters.type && property.property_type !== filters.type) return false;
    if (filters.category && property.category !== filters.category) return false;
    if (filters.bedrooms) {
      if (filters.bedrooms === '5+') {
        if (property.bedrooms < 5) return false;
      } else {
        if (property.bedrooms !== parseInt(filters.bedrooms)) return false;
      }
    }
    return true;
  });

  const clearFilters = () => {
    setFilters({});
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <SEOHead
        title="Sve Nekretnine - Apartmani, Vile i Kuće u Crnoj Gori | Rea Nekretnine"
        description="Pregledajte kompletnu ponudu luksuznih nekretnina u Crnoj Gori. Apartmani i vile u Porto Montenegro, Luštica Bay, Tivat, Budva, Kotor. Najbolje lokacije na Jadranu."
        keywords="nekretnine crna gora, apartmani porto montenegro, vile lustica bay, nekretnine tivat, budva apartmani, kotor nekretnine, prodaja nekretnina, luksuzni stanovi crna gora"
      />
      <StructuredData type="breadcrumb" data={[{ name: "Početna", url: "/" }, { name: "Nekretnine", url: "/Properties" }]} />

      <div className="bg-[#1a1a1a] py-16 mb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Portfolio</span>
              <div className="h-[1px] w-12 bg-[#d4af37]" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide">
              Sve <span className="gold-text font-serif italic"> Nekretnine</span>
            </h1>
            <p className="mt-4 text-white/60 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              Pregledajte našu kompletnu ponudu luksuznih nekretnina u Crnoj Gori
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <PropertyFilters filters={filters} onFilterChange={setFilters} onClearFilters={clearFilters} />

        <div className="flex items-center justify-between mb-6">
          <p className="text-white/60">
            <span className="text-[#d4af37] font-medium">{filteredProperties.length}</span> nekretnina pronađeno
          </p>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'text-[#d4af37]' : 'text-white/40'}>
              <Grid3X3 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'text-[#d4af37]' : 'text-white/40'}>
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg mb-4">Nema pronađenih nekretnina</p>
            <Button onClick={clearFilters} className="bg-[#d4af37] hover:bg-[#b8960c] text-black">Obriši Filtere</Button>
          </div>
        ) : (
          <div className={`grid gap-4 md:gap-6 ${viewMode === 'grid' ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}