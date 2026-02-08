"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/images/hero-care.jpg",
    title: "Seniors Deserve Better Life Taking Care of Relatives",
    buttonText: "Get Care Support"
  },
  {
    id: 2,
    image: "/images/about-hero.jpg",
    title: "Professional Healthcare Services for Every Need",
    buttonText: "Order Products"
  },
  {
    id: 3,
    image: "/images/hero-care.jpg",
    title: "Compassionate Care That Makes a Difference",
    buttonText: "Our CRM"
  },
  {
    id: 4,
    image: "/images/about-hero.jpg",
    title: "Expand Your Knowledge with Books and Podcasts",
    buttonText: "Explore Content"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen bg-[#1a2e1a] overflow-hidden">
      {/* Background Images with Transition */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-60' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={`Healthcare slide ${slide.id}`}
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={index === 0}
              quality={90}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e1a]/95 via-[#1a2e1a]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen flex items-center">
        {/* <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            {/* Badge - Dynamic based on current slide */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              {/* <div className="flex gap-1">
                <Sparkles className="w-4 h-4 text-emerald" />
                <Sparkles className="w-4 h-4 text-emerald" />
                <Sparkles className="w-4 h-4 text-emerald" />
              </div> */}
              {/* <span className="text-emerald text-sm font-medium tracking-wider uppercase">
                {slides[currentSlide].subtitle}
              </span> */}
            </div>

            {/* Main Heading - Dynamic based on current slide */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              {slides[currentSlide].title.split(' ').map((word, index) => (
                <span key={index} className={index % 2 === 0 ? "text-white" : "text-emerald"}>
                  {word}{' '}
                </span>
              ))}
            </h1>

            {/* WhatsApp-colored Pill Button */}
            <div className="mb-12 flex justify-center lg:justify-start">
              <button
                type="button"
                className="bg-[#25D366] hover:bg-[#20b858] text-white font-medium px-8 py-4 rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                {slides[currentSlide].buttonText}
              </button>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-3 justify-center lg:justify-start mb-6">
              <button
                type="button"
                onClick={prevSlide}
                className="w-12 h-12 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-12 h-12 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 justify-center lg:justify-start">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-emerald' : 'bg-white/30'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Content - Circular Badge */}
          <div className="flex-shrink-0">
            <div className="relative w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40">
              {/* Rotating Text */}
              <svg
                className="w-full h-full animate-spin"
                viewBox="0 0 200 200"
                style={{ animationDuration: '20s' }}
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                  />
                </defs>
                <text className="fill-white text-xs uppercase tracking-widest">
                  <textPath href="#circlePath">
                    • HEALTHCARE STAFFING • CONSULTANCY • IT SOLUTIONS • We Do
                  </textPath>
                </text>
              </svg>
              
              {/* Center - Red Filled Beating Heart */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 animate-pulse"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="#EF4444"
                  />
                </svg>
              </div>
            </div>
          </div>
          </div>
        {/* </div> */}
      </div>
    </section>
  );
}