import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize2, MapPin, Heart } from 'lucide-react';

export default function PropertyCard({ property, index = 0 }) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link 
        to={createPageUrl('PropertyDetail') + '?id=' + property.id}
        className="group block bg-[#1a1a1a] overflow-hidden hover:ring-1 hover:ring-[#d4af37]/50 transition-all"
      >
        {/* Image */}
        <div className="relative h-[180px] sm:h-[260px] overflow-hidden">
          <img 
            src={property.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075'}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Tags */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex gap-1 sm:gap-2 flex-wrap">
            <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-[#d4af37] text-black text-[10px] sm:text-xs tracking-wider uppercase font-medium">
              {property.listing_type === 'iznajmljivanje' ? 'Rent' : 'Prodaja'}
            </span>
            {property.featured && (
              <span className="hidden sm:inline-block px-3 py-1 bg-black/60 text-[#d4af37] text-xs tracking-wider uppercase border border-[#d4af37]/50">
                Istaknuto
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-[#d4af37] transition-colors group/fav"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover/fav:text-black transition-colors" />
          </button>

          {/* Price */}
          <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4">
            <p className="text-lg sm:text-2xl font-light text-white">
              {formatPrice(property.price, property.price_on_request)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-[#d4af37] text-[9px] sm:text-xs tracking-[0.15em] uppercase">
              {getPropertyTypeLabel(property.property_type)}
            </span>
            {property.category && (
              <span className="hidden sm:inline text-white/40 text-xs">
                {property.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            )}
          </div>
          
          <h3 className="text-sm sm:text-lg font-light text-white mb-2 sm:mb-3 group-hover:text-[#d4af37] transition-colors line-clamp-2">
            {property.title}
          </h3>
          
          <div className="flex items-center gap-1 sm:gap-2 text-white/50 text-xs sm:text-sm mb-3 sm:mb-4">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">
              {property.location}
              {property.region ? `, ${property.region}` : ''}
            </span>
          </div>

          {/* Specs */}
          <div className="flex items-center gap-2 sm:gap-5 pt-3 sm:pt-4 border-t border-white/10 flex-wrap">
            {property.bedrooms && (
              <div className="flex items-center gap-1 sm:gap-2 text-white/50">
                <Bed className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-sm">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1 sm:gap-2 text-white/50">
                <Bath className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-sm">{property.bathrooms}</span>
              </div>
            )}
            {property.area && (
              <div className="flex items-center gap-1 sm:gap-2 text-white/50">
                <Maximize2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-sm">{property.area}m²</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}