import { useEffect } from 'react';

export default function SEOHead({ 
  title = "Rea Nekretnine Montenegro - Luksuzne Nekretnine u Crnoj Gori",
  description = "Ekskluzivne nekretnine u Crnoj Gori. Apartmani, vile i luksuzne nekretnine na Jadranskoj obali. Porto Montenegro, Luštica Bay, Tivat, Budva, Kotor.",
  keywords = "nekretnine crna gora, luksuzne nekretnine, apartmani crna gora, vile crna gora, porto montenegro, lustica bay, tivat nekretnine, budva nekretnine, kotor nekretnine, prodaja nekretnina, agencija za nekretnine",
  ogImage = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6961800f073fe5e6a0d3c722/7f0603cc4_Photoroom_20260109_215650.png",
  canonical
}) {
  useEffect(() => {
    // Set document title
    document.title = title;
    
    // Meta description
    updateMetaTag('name', 'description', description);
    
    // Keywords
    updateMetaTag('name', 'keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:locale', 'sr_ME');
    
    // Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);
    
    // Additional SEO tags
    updateMetaTag('name', 'robots', 'index, follow');
    updateMetaTag('name', 'author', 'Rea Nekretnine Montenegro');
    updateMetaTag('name', 'language', 'Serbian');
    updateMetaTag('name', 'geo.region', 'ME');
    updateMetaTag('name', 'geo.placename', 'Montenegro');
    
    // Canonical URL
    if (canonical) {
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }, [title, description, keywords, ogImage, canonical]);

  return null;
}

function updateMetaTag(attribute, attributeValue, content) {
  let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}