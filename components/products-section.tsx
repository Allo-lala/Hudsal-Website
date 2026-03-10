"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SubscriptionModal } from "@/components/subscription-modal";

const products = [
  {
    id: 1,
    name: "Gold On Demand",
    tagline: "Operate without restrictive long-term commitments",
    description: "Gold On Demand is a Do-It-Yourself (DIY) package for those with full control but need expert support on standby. Operate as you wish and only use Hadsul when needed. Zero contracts, free pressure mapping, with last-minute support.",
    image: "/images/below/gold.png",
    color: "from-amber-500 to-amber-600",
    level: "Level 1"
  },
  {
    id: 2,
    name: "Platinum Selection",
    tagline: "Get external strategic intelligence with continuous insights",
    description: "With Platinum Selection, we Do It With You (DWY). You work side-by-side with Hadsul’s strategic intelligence unit, gaining continuous insight, proactive governance, and guided operational support. Together, we elevate with collaborative precision and ongoing expert oversight.   ",
    image: "/images/below/platinum.png",
    color: "from-slate-400 to-slate-500",
    level: "Level 2"
  },
  {
    id: 3,
    name: "Emerald Global",
    tagline: "Get outstanding results completely stress-free ",
    description: "With Emerald Global, we Do It For You (DFY). Hadsul takes full ownership of operations—delivering a completely stress-free experience engineered for outstanding results without you lifting a finger. ",
    image: "/images/below/emerald.png",
    color: "from-emerald-500 to-emerald-600",
    level: "Level 3"
  },
  {
    id: 4,
    name: "Hadsul House",
    tagline: "This is a, reserved, private and an invitation-only ",
    description: "The Hadsul House is a private, invitation-only service reserved for those seeking unmatched precision and operational mastery. Our senior experts take full command, delivering elite stewardship and flawless execution at every level.",
    image: "/images/below/hadsul.png",
    color: "from-emerald-700 to-emerald-900",
    level: "Level 4 - Premium",
    hasCrown: true
  }
];

export function ProductsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    tagline: string;
    image: string;
  } | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const scrollToNext = () => {
    if (currentIndex < products.length - 1) {
      setDirection('next');
      setCurrentIndex(currentIndex + 1);
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubscribeClick = () => {
    setSelectedProduct({
      name: currentProduct.name,
      tagline: currentProduct.tagline,
      image: currentProduct.image,
    });
    setIsModalOpen(true);
  };

  // Auto-transition after 4 seconds - STOP when modal is open or hovering
  useEffect(() => {
    if (isModalOpen || isHovering) return; // Don't auto-transition when modal is open or hovering

    const timer = setTimeout(() => {
      if (currentIndex < products.length - 1) {
        setDirection('next');
        setCurrentIndex(prev => prev + 1);
      }
    }, 4000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, isModalOpen, isHovering]);

  // Handle wheel scroll - STRICT lock within section
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      // Check if section is in viewport
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isInView) return;

      // ALWAYS prevent default when in section (strict lock)
      e.preventDefault();
      e.stopPropagation();

      if (isScrolling) return;

      // Scroll down
      if (e.deltaY > 0) {
        if (currentIndex < products.length - 1) {
          setIsScrolling(true);
          scrollToNext();
          setTimeout(() => setIsScrolling(false), 1000);
        } else {
          // On last product, allow exit by scrolling the page
          setIsScrolling(true);
          window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          setTimeout(() => setIsScrolling(false), 1000);
        }
      }
      // Scroll up
      else if (e.deltaY < 0) {
        if (currentIndex > 0) {
          setIsScrolling(true);
          scrollToPrev();
          setTimeout(() => setIsScrolling(false), 1000);
        } else {
          // On first product, allow exit by scrolling the page
          setIsScrolling(true);
          window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
          setTimeout(() => setIsScrolling(false), 1000);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, isScrolling]);

  // Disable keyboard scrolling (arrow keys, page up/down, space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isInView) return;

      // Prevent keyboard scroll keys
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', ' '].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50 && !isScrolling) {
      if (diff > 0 && currentIndex < products.length - 1) {
        setIsScrolling(true);
        scrollToNext();
        setTimeout(() => setIsScrolling(false), 1000);
      } else if (diff < 0 && currentIndex > 0) {
        setIsScrolling(true);
        scrollToPrev();
        setTimeout(() => setIsScrolling(false), 1000);
      }
    }
  };

  const currentProduct = products[currentIndex];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-beige overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentProduct.color} opacity-10 transition-all duration-700`} />

      {/* Blurred Next Product Preview - Desktop Only - More visible and inside viewport */}
      {currentIndex < products.length - 1 && (
        <div className="hidden lg:block absolute right-16 xl:right-24 top-1/2 transform -translate-y-1/2 opacity-40 blur-lg pointer-events-none z-0 transition-all duration-700">
          <div className="relative w-72 h-72 xl:w-80 xl:h-80">
            <Image
              src={products[currentIndex + 1].image}
              alt={products[currentIndex + 1].name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* Blurred Previous Product Preview - Desktop Only - More visible and inside viewport */}
      {currentIndex > 0 && (
        <div className="hidden lg:block absolute left-16 xl:left-24 top-1/2 transform -translate-y-1/2 opacity-40 blur-lg pointer-events-none z-0 transition-all duration-700">
          <div className="relative w-72 h-72 xl:w-80 xl:h-80">
            <Image
              src={products[currentIndex - 1].image}
              alt={products[currentIndex - 1].name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Product Image with slide animation */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <Link href="/services" className="group relative">
                {/* Crown for Hadsul House */}
                {currentProduct.hasCrown && (
                  <div 
                    key={`crown-${currentIndex}`}
                    className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <Image
                      src="/images/below/crown.avif"
                      alt="Crown"
                      width={80}
                      height={80}
                      className="object-contain animate-bounce"
                    />
                  </div>
                )}
                
                {/* Product Image with slide and zoom animation */}
                <div 
                  key={`product-${currentIndex}`}
                  className={`relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 group-hover:scale-105 ${
                    direction === 'next' 
                      ? 'animate-slide-zoom-left' 
                      : 'animate-slide-zoom-right'
                  }`}
                >
                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Product Name Badge - Rectangular with curved bottom */}
                <div 
                  key={`badge-${currentIndex}`}
                  className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs ${
                    direction === 'next' 
                      ? 'animate-slide-in-left' 
                      : 'animate-slide-in-right'
                  }`}
                >
                  <div className="bg-emerald py-3 px-6 shadow-xl rounded-b-2xl">
                    <h3 className="text-white font-bold text-lg sm:text-xl text-center">
                      {currentProduct.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Side - Product Details with fade animation */}
            <div 
              key={`details-${currentIndex}`}
              className={`text-center lg:text-left order-1 lg:order-2 space-y-6 ${
                direction === 'next' 
                  ? 'animate-fade-in-right' 
                  : 'animate-fade-in-left'
              }`}
            >
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {currentProduct.name}
                </h2>
                
                <p className="text-xl sm:text-2xl text-emerald font-semibold">
                  {currentProduct.tagline}
                </p>
                
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                  {currentProduct.description}
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button 
                  onClick={handleSubscribeClick}
                  className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        {/* <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 'next' : 'prev');
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-emerald w-8' 
                  : 'bg-emerald/30 hover:bg-emerald/50'
              }`}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div> */}

        {/* Scroll Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          {currentIndex > 0 && (
            <button
              onClick={scrollToPrev}
              className="text-emerald hover:text-emerald-dark transition-colors animate-bounce"
              aria-label="Previous product"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
          )}
          
          {currentIndex < products.length - 1 && (
            <button
              onClick={scrollToNext}
              className="text-emerald hover:text-emerald-dark transition-colors animate-bounce"
              aria-label="Next product"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideZoomLeft {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateX(-30%) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translateX(-100%) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes slideZoomRight {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateX(30%) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes slideInLeft {
          0% {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translateX(30%) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          0% {
            transform: translateX(-100%) scale(0.8);
            opacity: 0;
          }
          50% {
            transform: translateX(-30%) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeInRight {
          0% {
            transform: translateX(50px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInLeft {
          0% {
            transform: translateX(-50px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-zoom-left {
          animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slide-zoom-right {
          animation: slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.6s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.6s ease-out forwards;
        }
      `}</style>

      {/* Subscription Modal */}
      {selectedProduct && (
        <SubscriptionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
          productName={selectedProduct.name}
          productDescription={selectedProduct.tagline}
          productIcon={() => (
            <div className="relative w-16 h-16">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-contain"
              />
            </div>
          )}
        />
      )}
    </section>
  );
}