"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Leaf, ChevronLeft, ChevronRight } from "lucide-react";

const climateImages = [
  {
    id: 1,
    src: "/images/climate/time.jpg",
    title: "Renewable energy transition",
    description: " "
  },
  {
    id: 2,
    src: "/images/climate/coott.jpg",
    title: "Sustainable Lifestyles",
    description: " "
  },
  {
    id: 3,
    src: "/images/climate/planet.jpg",
    title: "Reforestation Projects",
    description: " "
  },
  {
    id: 4,
    src: "/images/climate/climate.jpg",
    title: "Proper Waste Management",
    description: " "
  },
  {
    id: 5,
    src: "/images/climate/rubbish.jpg",
    title: "Clean Water",
    description: " "
  },
  {
    id: 6,
    src: "/images/climate/change.jpg",
    title: "Wildlife Conservation",
    description: " "
  }
];

export function ClimateSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % climateImages.length);
    }, 4000); // Change slide every 4 seconds

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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Image Slider */}
      <div className="relative w-full h-full">
        {climateImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          {/* <div className="mb-6">
            <Leaf className="w-8 h-8 text-emerald mx-auto mb-4 animate-pulse" />
            <span className="text-emerald text-sm font-medium tracking-wider uppercase animate-fade-in">
              Climate Action
            </span>
          </div> */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
             Speak the Planet's Green Language
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up animate-delay-200">
            {climateImages[currentSlide].description}
          </p>
          
          {/* Current Image Title */}
          <div className="mb-8 animate-slide-up animate-delay-300">
            <h3 className="text-2xl md:text-3xl font-semibold text-emerald mb-2">
              {climateImages[currentSlide].title}
            </h3>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-slide-up animate-delay-400">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald mb-2">50K+</div>
              <div className="text-white/80 text-sm">Trees Planted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald mb-2">75%</div>
              <div className="text-white/80 text-sm">Waste Reduction</div>
            </div>
            {/* <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald mb-2">100%</div>
              <div className="text-white/80 text-sm">Renewable Energy</div>
            </div> */}
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-emerald mb-2">£ 1M</div>
              <div className="text-white/80 text-sm">Grants through Donations</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 animate-slide-up animate-delay-500">
            <a
              href="/donate"
              className="inline-block"
            >
              <button className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Donate
              </button>
            </a>
            <a
              href="/apply-grant"
              className="inline-block"
            >
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full border-2 border-white/50 hover:border-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Request for a Grant
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="w-10 h-10 bg-white/20 hover:bg-emerald rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

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
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="w-10 h-10 bg-white/20 hover:bg-emerald rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute top-8 right-8">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-emerald animate-pulse' : 'bg-white/40'}`}></div>
            {isAutoPlaying ? 'Auto-playing' : 'Paused'}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
        <div 
          className="h-full bg-emerald transition-all duration-4000 ease-linear"
          style={{ 
            width: isAutoPlaying ? '100%' : '0%',
            animation: isAutoPlaying ? 'progress 4s linear infinite' : 'none'
          }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </section>
  );
}