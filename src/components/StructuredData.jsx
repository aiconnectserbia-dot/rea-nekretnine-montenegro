import { useEffect } from 'react';

export default function StructuredData({ type = 'organization', data }) {
  useEffect(() => {
    const scriptId = `structured-data-${type}`;
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(getStructuredData(type, data));
    
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type, data]);

  return null;
}

function getStructuredData(type, customData) {
  const baseUrl = window.location.origin;
  
  if (type === 'organization') {
    return {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Rea Nekretnine Montenegro",
      "description": "Ekskluzivne luksuzne nekretnine u Crnoj Gori",
      "url": baseUrl,
      "logo": "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6961800f073fe5e6a0d3c722/7f0603cc4_Photoroom_20260109_215650.png",
      "telephone": "+382-67-518-587",
      "email": "info@montenegro-realestate.me",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "ME",
        "addressLocality": "Tivat",
        "addressRegion": "Porto Montenegro"
      },
      "areaServed": {
        "@type": "Place",
        "name": "Montenegro"
      },
      "priceRange": "€€€€",
      "sameAs": [
        "https://www.facebook.com/neptunia.moon.3/"
      ]
    };
  }
  
  if (type === 'property' && customData) {
    return {
      "@context": "https://schema.org",
      "@type": "Accommodation",
      "name": customData.title,
      "description": customData.description,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": customData.location,
        "addressRegion": customData.region,
        "addressCountry": "ME"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "addressCountry": "ME"
      },
      "numberOfRooms": customData.bedrooms,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": customData.area,
        "unitCode": "MTK"
      },
      "photo": customData.image_url,
      "amenityFeature": customData.features?.map(feature => ({
        "@type": "LocationFeatureSpecification",
        "name": feature
      })),
      "offers": customData.price_on_request ? undefined : {
        "@type": "Offer",
        "price": customData.price,
        "priceCurrency": "EUR",
        "availability": customData.is_sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock"
      }
    };
  }
  
  if (type === 'breadcrumb' && customData) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": customData.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${baseUrl}${item.url}`
      }))
    };
  }
  
  return {};
}