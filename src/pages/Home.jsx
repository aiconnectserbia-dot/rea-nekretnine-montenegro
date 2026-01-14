import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import AboutSection from '@/components/home/AboutSection';
import AskQuestionSection from '@/components/home/AskQuestionSection';
import ContactSection from '@/components/home/ContactSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  const { data: properties = [] } = useQuery({
    queryKey: ['featuredProperties'],
    queryFn: () => base44.entities.Property.filter({ featured: true, is_deleted: false }, '-created_date', 6),
  });

  // If no featured properties, get latest ones
  const { data: latestProperties = [] } = useQuery({
    queryKey: ['latestProperties'],
    queryFn: () => base44.entities.Property.filter({ is_deleted: false }, '-created_date', 6),
    enabled: properties.length === 0,
  });

  const activeProperties = properties.filter(p => !p.is_deleted);
  const activeLatestProperties = latestProperties.filter(p => !p.is_deleted);
  const displayProperties = activeProperties.length > 0 ? activeProperties : activeLatestProperties;

  return (
    <div>
      <SEOHead 
        title="Rea Nekretnine Montenegro - Luksuzne Nekretnine u Crnoj Gori | Porto Montenegro, Luštica Bay"
        description="Otkrijte najekskluzivnije nekretnine u Crnoj Gori. Apartmani, vile i luksuzne nekretnine u Porto Montenegro, Luštica Bay, Tivat, Budva, Kotor. Profesionalna agencija za nekretnine."
        keywords="nekretnine crna gora, luksuzne nekretnine crna gora, porto montenegro nekretnine, lustica bay, tivat apartmani, budva vile, kotor nekretnine, kupovina nekretnina, agencija nekretnine montenegro, jadran nekretnine, prodaja apartmana, vile na moru"
      />
      <StructuredData type="organization" />
      <HeroSection />
      <FeaturedProperties properties={displayProperties} />
      <CategoriesSection />
      <AboutSection />
      <AskQuestionSection />
      <ContactSection />
      <CTASection />
    </div>
  );
}