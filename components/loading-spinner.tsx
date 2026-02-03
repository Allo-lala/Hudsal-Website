"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export function LoadingSpinner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show spinner for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#1a2e1a] flex items-center justify-center">
      <div className="text-center">
        {/* Animated Hudsal Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-emerald/20 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-12 h-12 text-emerald animate-pulse" />
          </div>
          
          {/* Rotating ring around the heart */}
          <div className="absolute inset-0 w-24 h-24 mx-auto">
            <div className="w-full h-full border-4 border-emerald/30 border-t-emerald rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Company Name */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">HUDSAL</h1>
          <p className="text-white/70 text-sm">Living in harmony, every day</p>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-emerald rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-emerald rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-emerald rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Loading Text */}
        <p className="text-white/60 text-sm mt-4 animate-pulse">Loading your healthcare experience...</p>
      </div>
    </div>
  );
}