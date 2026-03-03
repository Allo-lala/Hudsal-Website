export function ServiceSchema() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hadsul Services",
    "description": "Comprehensive solutions",
    "itemListElement": [
      {
        "@type": "Service",
        "position": 1,
        "name": "Healthcare Staffing",
        "description": "Experienced healthcare professionals providing routine screenings and comprehensive health assessments",
        "provider": {
          "@type": "Organization",
          "name": "Hadsul Limited"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        }
      },
      {
        "@type": "Service",
        "position": 2,
        "name": "Consultancy",
        "description": "Professional IT, financial, and healthcare services",
        "provider": {
          "@type": "Organization",
          "name": "Hadsul Limited"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        }
      },
      {
        "@type": "Service",
        "position": 3,
        "name": "Client Relationship Management",
        "description": "Comprehensive CRM solutions for healthcare organizations",
        "provider": {
          "@type": "Organization",
          "name": "Hadsul Limited"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        }
      },
      {
        "@type": "Service",
        "position": 4,
        "name": "IT Solutions",
        "description": "Innovative technology solutions",
        "provider": {
          "@type": "Organization",
          "name": "Hadsul Limited"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        }
      },
      {
        "@type": "Service",
        "position": 5,
        "name": "Staff Training",
        "description": "Comprehensive training programs for healthcare professionals",
        "provider": {
          "@type": "Organization",
          "name": "Hadsul Limited"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        }
      },
      {
        "@type": "Service",
        "position": 6,
        "name": "Software Licensing Solutions",
        "description": "Complete software licensing and management solutions",
        "provider": {
          "@type": "Organization",
          "name": "Hadsul Limited"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  );
}
