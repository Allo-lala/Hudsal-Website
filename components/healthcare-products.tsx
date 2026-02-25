"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Hand Sanitizer",
    category: " ",
    // price: "£12.99",
    reference: "HS001",
    image: "/images/products/sanitizer.png",
    hoverImage: "/images/products/sanitizer-detail.png",
  },
  {
    id: 2,
    name: "Nitrile Gloves",
    category: " ",
    // price: "£29.51",
    reference: "GL001",
    image: "/images/products/gloves.png",
    hoverImage: "/images/products/gloves-detail.png",
  },
  {
    id: 3,
    name: "Disposable Face Masks",
    category: " ",
    // price: "£15.99",
    reference: "FM001",
    image: "/images/products/face-mask.png",
    hoverImage: "/images/products/face-mask-detail.png",
  },
  {
    id: 4,
    name: "Respirator Face Mask",
    category: " ",
    // price: "£24.99",
    reference: "RM001",
    image: "/images/products/respirator.png",
    hoverImage: "/images/products/respirator-detail.png",
  },
  {
    id: 5,
    name: "Shoe Covers",
    category: " ",
    // price: "£8.99",
    reference: "SC001",
    image: "/images/products/shoe-covers.png",
    hoverImage: "/images/products/shoe-covers-detail.png",
  },
  {
    id: 6,
    name: "Disposable Aprons",
    category: " ",
    // price: "£18.99",
    reference: "AP001",
    image: "/images/products/aprons.png",
    hoverImage: "/images/products/aprons-detail.png",
  },
  {
    id: 7,
    name: "Face Shields",
    category: " ",
    // price: "£22.99",
    reference: "FS001",
    image: "/images/products/face-shield.jpeg",
    hoverImage: "/images/products/face-shield-detail.jpeg",
  },
  {
    id: 8,
    name: "Wipes",
    category: " ",
    // price: "£18.99",
    reference: "WI001",
    image: "/images/products/wipes.png",
    hoverImage: "/images/products/aprons-detail.jpeg",
  },
  {
    id: 9,
    name: "Surface Cleanser",
    category: " ",
    price: " ",
    reference: "SC001",
    image: "/images/products/surface.png",
    hoverImage: "/images/products/surface_cleanser-detail.png",
  },
];

export function HealthcareProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablet
      } else {
        setItemsPerView(4); // Desktop
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (direction === "right") {
          if (prev >= maxIndex) {
            setDirection("left");
            return prev - 1;
          }
          return prev + 1;
        } else {
          if (prev <= 0) {
            setDirection("right");
            return prev + 1;
          }
          return prev - 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [direction, maxIndex, isAutoPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleAddToCart = (productId: number) => {
    // Add to cart functionality
    console.log("Add to cart:", productId);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Personal Protective Equipment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We fulfil small orders, work with you on larger orders and help to design a safe and practical PPE programme for your site.
          </p>
        </div>

        {/* Products Slider */}
        <div 
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <button
            onClick={() => {
              handlePrev();
              setIsAutoPlaying(false);
            }}
            disabled={currentIndex === 0}
            className="absolute left-0 sm:left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 w-10 h-10 bg-emerald hover:bg-emerald-dark rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={() => {
              handleNext();
              setIsAutoPlaying(false);
            }}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 w-10 h-10 bg-emerald hover:bg-emerald-dark rounded-full shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Products Container */}
          <div className="overflow-hidden px-2 sm:px-0">
            <div
              className="flex gap-2 sm:gap-4 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0"
                  style={{ 
                    width: itemsPerView === 1 
                      ? 'calc(100% - 8px)' 
                      : itemsPerView === 2 
                      ? 'calc(50% - 8px)' 
                      : 'calc(25% - 12.8px)' 
                  }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="bg-transparent overflow-hidden transition-all duration-300 h-full">
                    {/* Product Image */}
                    <div className="relative w-full h-80 bg-transparent overflow-hidden mb-4">
                      <img
                        src={
                          hoveredProduct === product.id
                            ? product.hoverImage
                            : product.image
                        }
                        alt={product.name}
                        className={`w-full h-full object-contain transition-all duration-300 ${
                          hoveredProduct === product.id ? "scale-110" : "scale-100"
                        }`}
                      />
                      
                      {/* Add to Cart Button - Shows on Hover */}
                      {hoveredProduct === product.id && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                          <Button
                            onClick={() => handleAddToCart(product.id)}
                            className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-6 py-2 flex items-center gap-2 transform scale-100 animate-fade-in"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            {/* Add to Cart */}
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-2">
                        {product.category}
                      </p>
                      <h3 className="font-semibold text-base text-foreground mb-3 line-clamp-2 min-h-[3rem]">
                        {product.name}
                      </h3>
                      <p className="text-xl font-bold text-[#25D366]">
                        {product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-emerald hover:bg-emerald-dark text-white rounded-full px-8 py-3"
          >
            <a href="/products">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
