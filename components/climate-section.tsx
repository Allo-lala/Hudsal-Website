"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GrantApplicationModal } from "@/components/grant-application-modal";

const climateImages = [
  {
    id: 1,
    src: "/images/climate/climate-talks.png",
    title: "Sustainability ",
    description: " "
  },
  {
    id: 2,
    src: "/images/climate/hadsul-climate.jpeg",
    title: "Clean Water",
    description: " "
  },
  {
    id: 3,
    src: "/images/climate/waste.png",
    title: "Waste Management ",
    description: " "
  },
  {
    id: 4,
    src: "/images/climate/planet.jpg",
    title: "Sustainability ",
    description: " "
  },
  {
    id: 5,
    src: "/images/climate/climate.jpg",
    title: "Clean Water",
    description: " "
  },
  {
    id: 6,
    src: "/images/climate/change.jpg",
    title: "Waste Management ",
    description: " "
  }
];

export function ClimateSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % climateImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % climateImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + climateImages.length) % climateImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-screen w-full bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Content Side */}
          <div className="order-2 lg:order-1 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
                Speak the Planet's Green Language
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up animate-delay-200">
                Be part of creating a sustainable future through innovative climate solutions and community action.
              </p>
            </div>

            {/* Current Image Title */}
            <div className="animate-slide-up animate-delay-300">
              <h3 className="text-2xl md:text-3xl font-semibold text-emerald mb-4">
                {climateImages[currentSlide].title}
              </h3>
              <p className="text-muted-foreground">
                {climateImages[currentSlide].description || "Making a positive impact on our environment through dedicated action and community involvement."}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-slide-up animate-delay-400">
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-emerald mb-2">50K+</div>
                <div className="text-muted-foreground text-sm">Trees Planted</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-emerald mb-2">75K+</div>
                <div className="text-muted-foreground text-sm">Waste Recycled</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-emerald mb-2">£1M</div>
                <div className="text-muted-foreground text-sm">Donations</div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 animate-slide-up animate-delay-500">
              {/* Previous Button */}
              {/* <button
                onClick={prevSlide}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="w-12 h-12 bg-emerald/10 hover:bg-emerald rounded-full flex items-center justify-center text-emerald hover:text-white transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button> */}

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {climateImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide 
                        ? 'bg-emerald scale-125' 
                        : 'bg-emerald/30 hover:bg-emerald/50'
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              {/* <button
                onClick={nextSlide}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                className="w-12 h-12 bg-emerald/10 hover:bg-emerald rounded-full flex items-center justify-center text-emerald hover:text-white transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button> */}
            </div>
          </div>

          {/* Images Side - Stacked with transitions */}
          <div className="order-1 lg:order-2 relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
            {climateImages.map((image, index) => (
              <div
                key={image.id}
                className={`absolute transition-all duration-1000 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 z-10 scale-100 inset-0' 
                    : index === (currentSlide - 1 + climateImages.length) % climateImages.length
                    ? 'opacity-80 z-5 scale-95 top-4 left-4 right-0 bottom-0 blur-sm'
                    : index === (currentSlide - 2 + climateImages.length) % climateImages.length
                    ? 'opacity-60 z-0 scale-90 top-8 left-8 right-0 bottom-0 blur-md'
                    : index === (currentSlide + 1) % climateImages.length
                    ? 'opacity-80 z-5 scale-95 top-4 right-4 left-0 bottom-0 blur-sm'
                    : index === (currentSlide + 2) % climateImages.length
                    ? 'opacity-60 z-0 scale-90 top-8 right-8 left-0 bottom-0 blur-md'
                    : 'opacity-0 z-0 scale-85'
                }`}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Grant Application Modal */}
      <GrantApplicationModal 
        isOpen={isGrantModalOpen} 
        onClose={() => setIsGrantModalOpen(false)} 
      />
    </section>
  );
}