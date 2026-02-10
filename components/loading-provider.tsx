"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Image from "next/image";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-[#1a2e1a] flex items-center justify-center">
          <div className="text-center">
            {/* Animated Hudsal Logo */}
            <div className="relative mb-8">
              {/* Outer rotating ring */}
              {/* <div className="w-32 h-32 border-4 border-emerald/20 border-t-emerald rounded-full animate-spin mx-auto"></div> */}
              
              {/* Inner pulsing heart */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald/20 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-emerald animate-pulse" fill="currentColor" />
                </div>
              </div> */}
            </div>

            {/* Company Logo with fade-in effect */}
            <div className="mb-6">
              <div className="animate-fade-in">
                <Image
                  src="/images/logo.png"
                  alt="Hudsal Logo"
                  width={200}
                  height={80}
                  className="mx-auto"
                  // style={{ width: 'auto', height: 'auto' }}
                  priority
                />
              </div>
              {/* <p className="text-white/70 text-sm animate-fade-in-delay">....What....</p> */}
            </div>

            {/* Loading Progress Bar */}
            <div className="w-64 h-1 bg-white/20 rounded-full mx-auto mb-4 overflow-hidden">
              <div className="h-full bg-emerald rounded-full animate-loading-bar"></div>
            </div>

            {/* Loading Text */}
            <p className="text-white/60 text-sm animate-pulse">Please wait...</p>
          </div>
        </div>
      )}
      {children}
      
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay {
          0%, 50% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 2s ease-out;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2.5s ease-in-out;
        }
      `}</style>
    </LoadingContext.Provider>
  );
}