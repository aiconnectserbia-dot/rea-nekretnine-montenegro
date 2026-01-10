import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { ArrowRight, Bed, Bath, Maximize2, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FeaturedProperties({ properties }) {
  const activeProperties = properties?.filter(p => !p.is_deleted) || [];
  if (!activeProperties || activeProperties.length === 0) return null;

  const formatPrice = (price, priceOnRequest) => {
    if (priceOnRequest) return 'Cijena na upit';
    if (!price) return 'Cijena na upit';
    return new Intl.NumberFormat('de-DE').format(price) + '€';
  };

  const getPropertyTypeLabel = (type) => {
    const types = {
      apartman: 'Apartman',
      vila: 'Vila',
      kuca: 'Kuća',
      zemljiste: 'Zemljište',
      hotel: 'Hotel',
      poslovni_prostor: 'Poslovni Prostor'
    };
    return types[type] || type;
  };

  return (
    <section className="py-24 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Istaknute Nekretnine</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide">
              Ekskluzivna
              <span className="gold-text font-serif italic"> Ponuda</span>
            </h2>
          </div>
          <Link 
            to={createPageUrl('Properties')}
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-[#d4af37] hover:text-[#e6c65c] transition-colors group"
          >
            <span className="text-sm tracking-wider uppercase">Pogledaj Sve</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {activeProperties.slice(0, 6).map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                to={createPageUrl('PropertyDetail') + '?id=' + property.id}
                className="group block bg-[#0a0a0a] overflow-hidden"
              >
                {/* Image */}
<parameter name="relative h-[180px] sm:h-[280px] lg:h-[320px] overflow-hidden">
                  <img 
                    src={property.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075'}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Tag */}
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-[#d4af37] text-black text-[9px] sm:text-xs tracking-wider uppercase">
                      {property.listing_type === 'iznajmljivanje' ? 'Iznajmljivanje' : 'Prodaja'}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                    <p className="text-base sm:text-2xl font-light text-white">
                      {formatPrice(property.price, property.price_on_request)}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-6 lg:h-[200px] flex flex-col">
                  <span className="text-[#d4af37] text-[9px] sm:text-xs tracking-[0.15em] uppercase">
                    {getPropertyTypeLabel(property.property_type)}
                  </span>
                  <h3 className="text-sm sm:text-xl font-light text-white mt-1 sm:mt-2 mb-2 sm:mb-3 group-hover:text-[#d4af37] transition-colors line-clamp-2 flex-shrink-0">
                    {property.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 sm:gap-2 text-white/60 text-xs sm:text-sm mb-2 sm:mb-4">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{property.location}{property.region ? `, ${property.region}` : ''}</span>
                  </div>

                  {/* Specs */}
                  <div className="flex items-center gap-3 sm:gap-6 pt-2 sm:pt-4 border-t border-white/10 mt-auto">
                    {property.bedrooms && (
                      <div className="flex items-center gap-1 sm:gap-2 text-white/60">
                        <Bed className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">{property.bedrooms}</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-1 sm:gap-2 text-white/60">
                        <Bath className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">{property.bathrooms}</span>
                      </div>
                    )}
                    {property.area && (
                      <div className="flex items-center gap-1 sm:gap-2 text-white/60">
                        <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">{property.area} m²</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to={createPageUrl('Properties')}>
            <Button className="px-10 py-6 bg-transparent border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 tracking-wider uppercase">
              Pogledaj Sve Nekretnine
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}