import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation } from '@tanstack/react-query';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Bed, Bath, Maximize2, MapPin, Heart, Share2, 
  ChevronLeft, ChevronRight, X, Check, Phone, Mail, Loader2, Image as ImageIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

export default function PropertyDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = urlParams.get('id');

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', propertyId],
    queryFn: () => base44.entities.Property.filter({ id: propertyId }),
    enabled: !!propertyId,
    select: (data) => data[0]
  });

  const inquiryMutation = useMutation({
    mutationFn: (data) => base44.entities.Inquiry.create(data),
    onSuccess: () => {
      toast.success('Vaš upit je uspješno poslan!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  });

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    inquiryMutation.mutate({
      ...formData,
      property_id: propertyId,
      message: formData.message || `Zainteresovan/a sam za nekretninu: ${property?.title}`
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  if (!property || property.is_deleted) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <p className="text-white/60 text-lg mb-4">Nekretnina nije pronađena</p>
        <Link to={createPageUrl('Properties')}>
          <Button className="bg-[#d4af37] hover:bg-[#b8960c] text-black">
            Nazad na Nekretnine
          </Button>
        </Link>
      </div>
    );
  }

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

  const images = [property.image_url, ...(property.gallery || [])].filter(Boolean);
  if (images.length === 0) {
    images.push('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075');
  }

  return (
    <div className="min-h-screen pt-20">
      <SEOHead 
        title={`${property.title} - ${formatPrice(property.price, property.price_on_request)} | Rea Nekretnine Montenegro`}
        description={property.description || `${getPropertyTypeLabel(property.property_type)} u ${property.location}${property.region ? `, ${property.region}` : ''}. ${property.bedrooms ? property.bedrooms + ' sobe, ' : ''}${property.area ? property.area + ' m².' : ''}`}
        keywords={`${property.property_type}, nekretnine ${property.location}, ${property.region}, ${property.listing_type === 'iznajmljivanje' ? 'iznajmljivanje' : 'prodaja'} nekretnina, apartman ${property.location}, vila ${property.region}`}
        ogImage={property.image_url}
      />
      <StructuredData 
        type="property"
        data={property}
      />
      <StructuredData 
        type="breadcrumb" 
        data={[
          { name: "Početna", url: "/" },
          { name: "Nekretnine", url: "/Properties" },
          { name: property.title, url: `/PropertyDetail?id=${property.id}` }
        ]} 
      />
      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
            onClick={() => setShowGallery(false)}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-black/50 backdrop-blur-sm border-b border-white/5">
              <div className="text-white">
                <h3 className="text-lg font-light tracking-wider">{property.title}</h3>
                <p className="text-sm text-white/40 mt-1">Galerija Slika</p>
              </div>
              <button 
                onClick={() => setShowGallery(false)}
                className="p-3 hover:bg-white/5 text-white/80 hover:text-white transition-all rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image Area */}
            <div className="flex-1 flex items-center justify-center p-8 relative bg-black" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setCurrentImageIndex(i => i > 0 ? i - 1 : images.length - 1)}
                className="absolute left-8 p-4 bg-black/60 backdrop-blur-md border border-white/10 hover:bg-[#d4af37] hover:border-[#d4af37] text-white hover:text-black transition-all rounded-lg z-10 shadow-xl"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              
              <motion.img 
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={images[currentImageIndex]}
                alt={`${property.title} - Slika ${currentImageIndex + 1}`}
                className="max-h-[calc(100vh-280px)] max-w-[85vw] object-contain shadow-2xl"
              />
              
              <button
                onClick={() => setCurrentImageIndex(i => i < images.length - 1 ? i + 1 : 0)}
                className="absolute right-8 p-4 bg-black/60 backdrop-blur-md border border-white/10 hover:bg-[#d4af37] hover:border-[#d4af37] text-white hover:text-black transition-all rounded-lg z-10 shadow-xl"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/90 backdrop-blur-md border border-white/10 rounded-full shadow-xl">
                <span className="text-[#d4af37] font-medium text-lg">{currentImageIndex + 1}</span>
                <span className="text-white/40 mx-2 text-lg">/</span>
                <span className="text-white text-lg">{images.length}</span>
              </div>
            </div>
            
            {/* Thumbnail Strip */}
            <div className="p-6 bg-black/80 backdrop-blur-md border-t border-white/5" onClick={(e) => e.stopPropagation()}>
              <div className="max-w-6xl mx-auto flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#d4af37] scrollbar-track-white/5">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg border-2 transition-all ${
                      currentImageIndex === idx 
                        ? 'border-[#d4af37] scale-110 shadow-xl shadow-[#d4af37]/60' 
                        : 'border-white/10 hover:border-white/40 hover:scale-105'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[500px] group">
        <img 
          src={images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setShowGallery(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <Link 
          to={createPageUrl('Properties')}
          className="absolute top-8 left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm tracking-wider uppercase">Nazad</span>
        </Link>

        {/* Actions */}
        <div className="absolute top-8 right-8 flex items-center gap-3 z-10">
          <button className="p-3 bg-black/40 backdrop-blur-sm hover:bg-[#d4af37] text-white hover:text-black transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-3 bg-black/40 backdrop-blur-sm hover:bg-[#d4af37] text-white hover:text-black transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex(i => i > 0 ? i - 1 : images.length - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-sm hover:bg-[#d4af37] text-white hover:text-black transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setCurrentImageIndex(i => i < images.length - 1 ? i + 1 : 0)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-sm hover:bg-[#d4af37] text-white hover:text-black transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter & Gallery Button - Desktop */}
        <div className="hidden md:flex absolute bottom-8 left-8 items-center gap-4">
          <div className="px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
          <button
            onClick={() => setShowGallery(true)}
            className="px-4 py-2 bg-[#d4af37] hover:bg-[#b8960c] text-black text-sm font-medium tracking-wider transition-colors"
          >
            PRIKAŽI GALERIJU
          </button>
        </div>

        {/* Image Counter - Mobile (inside image) */}
        <div className="md:hidden absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs">
          {currentImageIndex + 1} / {images.length}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="absolute bottom-8 right-8 flex gap-2">
            {images.slice(0, 5).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-16 h-16 overflow-hidden border-2 transition-all hover:scale-110 ${
                  currentImageIndex === idx ? 'border-[#d4af37] scale-110' : 'border-white/30'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
            {images.length > 5 && (
              <button
                onClick={() => setShowGallery(true)}
                className="w-16 h-16 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white hover:bg-[#d4af37] hover:text-black transition-colors"
              >
                <span className="text-lg font-bold">+{images.length - 5}</span>
                <span className="text-[10px]">više</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Gallery Button - Mobile (Outside image, below hero) */}
      <div className="md:hidden max-w-7xl mx-auto px-6 py-4">
        <button
          onClick={() => setShowGallery(true)}
          className="w-full px-6 py-3 bg-[#d4af37] hover:bg-[#b8960c] text-black font-medium tracking-wider transition-colors flex items-center justify-center gap-2"
        >
          <ImageIcon className="w-5 h-5" />
          PRIKAŽI GALERIJU ({images.length})
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-[#d4af37] text-black text-xs tracking-wider uppercase">
                      {property.listing_type === 'iznajmljivanje' ? 'Iznajmljivanje' : 'Prodaja'}
                    </span>
                    <span className="text-[#d4af37] text-xs tracking-[0.15em] uppercase">
                      {getPropertyTypeLabel(property.property_type)}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-light text-white mb-3">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}{property.region ? `, ${property.region}` : ''}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-light text-[#d4af37]">
                    {formatPrice(property.price, property.price_on_request)}
                  </p>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-6 p-6 bg-[#1a1a1a] mb-8">
                {property.bedrooms && (
                  <div className="text-center">
                    <Bed className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
                    <p className="text-2xl font-light text-white">{property.bedrooms}</p>
                    <p className="text-white/50 text-sm">Sobe</p>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center">
                    <Bath className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
                    <p className="text-2xl font-light text-white">{property.bathrooms}</p>
                    <p className="text-white/50 text-sm">Kupatila</p>
                  </div>
                )}
                {property.area && (
                  <div className="text-center">
                    <Maximize2 className="w-6 h-6 text-[#d4af37] mx-auto mb-2" />
                    <p className="text-2xl font-light text-white">{property.area}</p>
                    <p className="text-white/50 text-sm">m²</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-light text-white mb-4 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#d4af37]" />
                  Opis
                </h2>
                <p className="text-white/70 leading-relaxed whitespace-pre-line">
                  {property.description || 'Kontaktirajte nas za više informacija o ovoj nekretnini.'}
                </p>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div>
                  <h2 className="text-xl font-light text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-[#d4af37]" />
                    Karakteristike
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-white/70">
                        <Check className="w-4 h-4 text-[#d4af37]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-28"
            >
              <div className="bg-[#1a1a1a] p-6">
                <h3 className="text-xl font-light text-white mb-6">Pošaljite Upit</h3>
                
                <form onSubmit={handleSubmitInquiry} className="space-y-4">
                  <Input
                    placeholder="Vaše Ime *"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Input
                    type="email"
                    placeholder="Email Adresa *"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Input
                    placeholder="Telefon"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                  <Textarea
                    placeholder="Vaša Poruka"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
                  />
                  <Button 
                    type="submit"
                    disabled={inquiryMutation.isPending}
                    className="w-full bg-[#d4af37] hover:bg-[#b8960c] text-black py-6"
                  >
                    {inquiryMutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Pošalji Upit'
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-white/60 text-sm mb-4">Ili nas kontaktirajte direktno:</p>
                  <div className="space-y-3">
                    <a href="tel:+38269123456" className="flex items-center gap-3 text-white/80 hover:text-[#d4af37] transition-colors">
                      <Phone className="w-4 h-4" />
                      +382 69 123 456
                    </a>
                    <a href="mailto:rearealestate88@gmail.com" className="flex items-center gap-3 text-white/80 hover:text-[#d4af37] transition-colors">
                      <Mail className="w-4 h-4" />
                      rearealestate88@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}