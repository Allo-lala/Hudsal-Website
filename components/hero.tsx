"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#1a2e1a] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-care.jpg"
          alt="Healthcare professional caring for elderly patient"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e1a]/95 via-[#1a2e1a]/70 to-transparent" />
      </div>

      {/* Decorative Cursive Line with Glowing Heart - positioned at far left */}
      <div className="absolute left-0 md:left-4 top-[15%] bottom-[15%] w-14 md:w-16 pointer-events-none z-0">
        <svg
          viewBox="0 0 50 400"
          fill="none"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Glow filter for the heart */}
            <filter id="heartGlowLeft" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="blur1"/>
              <feGaussianBlur stdDeviation="4" result="blur2"/>
              <feMerge>
                <feMergeNode in="blur2"/>
                <feMergeNode in="blur1"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Line glow */}
            <filter id="lineGlowLeft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Top flowing curve - elegant S-curve connected to heart */}
          <path
            d="M25 0 C25 30, 12 60, 20 100 C28 140, 10 160, 25 180"
            stroke="#25D366"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="url(#lineGlowLeft)"
          />
          
          {/* Small heart shape - outer glow layer */}
          <path
            d="M25 190 C25 190, 15 180, 15 195 C15 206, 25 218, 25 218 C25 218, 35 206, 35 195 C35 180, 25 190, 25 190"
            stroke="#25D366"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#heartGlowLeft)"
            className="animate-pulse"
            opacity="0.6"
          />
          
          {/* Small heart shape - main */}
          <path
            d="M25 190 C25 190, 15 180, 15 195 C15 206, 25 218, 25 218 C25 218, 35 206, 35 195 C35 180, 25 190, 25 190"
            stroke="#25D366"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#heartGlowLeft)"
          />
          
          {/* Bottom flowing curve - connected to heart */}
          <path
            d="M25 225 C25 235, 40 260, 25 290 C10 320, 30 360, 25 400"
            stroke="#25D366"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="url(#lineGlowLeft)"
          />
        </svg>
      </div>

      {/* Decorative Cursive Line with Glowing Heart - positioned at far right (mirrored) */}
      <div className="absolute right-0 md:right-4 top-[15%] bottom-[15%] w-14 md:w-16 pointer-events-none z-0">
        <svg
          viewBox="0 0 50 400"
          fill="none"
          className="w-full h-full"
          preserveAspectRatio="none"
          style={{ transform: 'scaleX(-1)' }}
        >
          <defs>
            {/* Glow filter for the heart */}
            <filter id="heartGlowRight" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="2" result="blur1"/>
              <feGaussianBlur stdDeviation="4" result="blur2"/>
              <feMerge>
                <feMergeNode in="blur2"/>
                <feMergeNode in="blur1"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Line glow */}
            <filter id="lineGlowRight" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Top flowing curve - elegant S-curve connected to heart */}
          <path
            d="M25 0 C25 30, 12 60, 20 100 C28 140, 10 160, 25 180"
            stroke="#25D366"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="url(#lineGlowRight)"
          />
          
          {/* Small heart shape - outer glow layer */}
          <path
            d="M25 190 C25 190, 15 180, 15 195 C15 206, 25 218, 25 218 C25 218, 35 206, 35 195 C35 180, 25 190, 25 190"
            stroke="#25D366"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#heartGlowRight)"
            className="animate-pulse"
            opacity="0.6"
          />
          
          {/* Small heart shape - main */}
          <path
            d="M25 190 C25 190, 15 180, 15 195 C15 206, 25 218, 25 218 C25 218, 35 206, 35 195 C35 180, 25 190, 25 190"
            stroke="#25D366"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#heartGlowRight)"
          />
          
          {/* Bottom flowing curve - connected to heart */}
          <path
            d="M25 225 C25 235, 40 260, 25 290 C10 320, 30 360, 25 400"
            stroke="#25D366"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            filter="url(#lineGlowRight)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto pl-20 md:pl-28 lg:pl-32 pr-4 sm:pr-6 lg:pr-8 pt-32 pb-20 min-h-screen flex items-center">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1">
              <Sparkles className="w-4 h-4 text-emerald" />
              <Sparkles className="w-4 h-4 text-emerald" />
              <Sparkles className="w-4 h-4 text-emerald" />
            </div>
            <span className="text-emerald text-sm font-medium tracking-wider uppercase">
              Raise Your Voice to Win
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
            <span className="text-white">Seniors Deserve</span>
            <br />
            <span className="text-emerald">Better Life </span>
            <span className="text-white">Taking</span>
            <br />
            <span className="text-emerald">Care of </span>
            <span className="text-white">Relatives</span>
          </h1>

          {/* Navigation Arrows */}
          <div className="flex gap-3 mt-12">
            <button
              type="button"
              className="w-12 h-12 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              type="button"
              className="w-12 h-12 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Circular Badge */}
        <div className="absolute right-8 md:right-24 bottom-24 md:bottom-32">
          <div className="relative w-28 h-28 md:w-36 md:h-36">
            {/* Rotating Text */}
            <svg
              className="w-full h-full animate-spin-slow"
              viewBox="0 0 200 200"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                />
              </defs>
              <text className="fill-white text-xs uppercase tracking-widest">
                <textPath href="#circlePath">
                  • MEDICAL SUPPORT • HEALTH • CARE • DONATE • HELP •
                </textPath>
              </text>
            </svg>
            {/* Center Circle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald flex items-center justify-center">
                <Heart className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
