import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';

import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import AboutSection from '@/components/home/AboutSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  const { data: properties = [] } = useQuery({
    queryKey: ['featuredProperties'],
    queryFn: () => base44.entities.Property.filter({ featured: true }, '-created_date', 6),
  });

  // If no featured properties, get latest ones
  const { data: latestProperties = [] } = useQuery({
    queryKey: ['latestProperties'],
    queryFn: () => base44.entities.Property.list('-created_date', 6),
    enabled: properties.length === 0,
  });

  const activeProperties = properties.filter(p => !p.is_deleted);
  const activeLatestProperties = latestProperties.filter(p => !p.is_deleted);
  const displayProperties = activeProperties.length > 0 ? activeProperties : activeLatestProperties;

  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProperties properties={displayProperties} />
      <AboutSection />
      <CTASection />
    </div>
  );
}