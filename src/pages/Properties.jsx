import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Grid3X3, List, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

import PropertyFilters from '@/components/properties/PropertyFilters';
import PropertyCard from '@/components/properties/PropertyCard';

export default function Properties() {
  const [filters, setFilters] = useState({});
  const [viewMode, setViewMode] = useState('grid');

  // Parse URL params on mount
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

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: () => base44.entities.Property.filter({ is_deleted: false }, '-created_date'),
  });

  // Filter properties
  const filteredProperties = properties.filter(property => {
    // Search filter - checks title, location, region, property_type, description, and features
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

    // Location filter
    if (filters.location) {
      const location = filters.location.toLowerCase();
      const matchesLocation = 
        property.location?.toLowerCase().includes(location) ||
        property.region?.toLowerCase().includes(location);
      if (!matchesLocation) return false;
    }

    // Price range filters
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
    
    if (filters.price) {
      const [min, max] = filters.price.split('-').map(p => parseInt(p.replace('+', '')));
      if (property.price < min) return false;
      if (max && property.price > max) return false;
    }
    
    return true;
  });

  const clearFilters = () => {
    setFilters({});
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <div className="bg-[#1a1a1a] py-16 mb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Portfolio</span>
              <div className="h-[1px] w-12 bg-[#d4af37]" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide">
              Sve
              <span className="gold-text font-serif italic"> Nekretnine</span>
            </h1>
            <p className="mt-4 text-white/60 max-w-xl mx-auto" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              Pregledajte našu kompletnu ponudu luksuznih nekretnina u Crnoj Gori
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Filters */}
        <PropertyFilters 
          filters={filters} 
          onFilterChange={setFilters}
          onClearFilters={clearFilters}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/60">
            <span className="text-[#d4af37] font-medium">{filteredProperties.length}</span> nekretnina pronađeno
          </p>
          
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'text-[#d4af37]' : 'text-white/40'}
            >
              <Grid3X3 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'text-[#d4af37]' : 'text-white/40'}
            >
              <List className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/60 text-lg mb-4">Nema pronađenih nekretnina</p>
            <Button
              onClick={clearFilters}
              className="bg-[#d4af37] hover:bg-[#b8960c] text-black"
            >
              Obriši Filtere
            </Button>
          </div>
        ) : (
          <div className={`grid gap-4 md:gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProperties.map((property, index) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}