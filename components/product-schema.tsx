"use client";

export function ProductSchema() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hadsul Subscription Products",
    "description": "Healthcare subscription plans for organizations",
    "itemListElement": [
      {
        "@type": "Product",
        "position": 1,
        "name": "Gold On Demand",
        "description": "Flexible support when you need it most. Operate without restrictive long-term commitments while getting expert oversight and staffing support.",
        "offers": {
          "@type": "Offer",
          "price": "99",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock",
          "url": "https://hadsul.co.uk/products"
        }
      },
      {
        "@type": "Product",
        "position": 2,
        "name": "Platinum Selection",
        "description": "Leadership demands more than effort. Get your external strategic intelligence unit with continuous insight and proactive governance.",
        "offers": {
          "@type": "Offer",
          "price": "199",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock",
          "url": "https://hadsul.co.uk/products"
        }
      },
      {
        "@type": "Product",
        "position": 3,
        "name": "Emerald Global",
        "description": "Our comprehensive global solution for organizations seeking excellence and clear delivery and operational efficiency.",
        "offers": {
          "@type": "Offer",
          "price": "299",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock",
          "url": "https://hadsul.co.uk/products"
        }
      },
      {
        "@type": "Product",
        "position": 4,
        "name": "Hadsul House",
        "description": "The ultimate partnership for Organizations seeking complete operational transformation and long-term success.",
        "offers": {
          "@type": "Offer",
          "price": "499",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock",
          "url": "https://hadsul.co.uk/products"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}
